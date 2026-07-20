import { scryptSync, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE_NAME = "mb_admin_session";
const PRODUCTION_ADMIN_COOKIE_NAME = "__Host-mb_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;
const SCRYPT_KEY_LENGTH = 64;

type SessionPayload = {
  email: string;
  exp: number;
};

function getAdminConfig() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (process.env.NODE_ENV === "production") {
    if (!email || !passwordHash || !secret) {
      throw new Error("ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET are required in production.");
    }
    if (secret.length < 32) {
      throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters in production.");
    }
  }

  return {
    email: email ?? "mbjeweller21@gmail.com",
    password: password ?? "ChangeThisAdminPassword",
    passwordHash,
    secret: secret ?? "replace-this-session-secret",
  };
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  const bytes = Array.from(new Uint8Array(signature));
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(email: string) {
  const { secret } = getAdminConfig();
  const payload: SessionPayload = {
    email,
    exp: Date.now() + SESSION_DURATION_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = await sign(encoded, secret);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token) return null;
  const { secret } = getAdminConfig();
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = await sign(encoded, secret);
  if (!constantTimeEquals(expected, signature)) return null;

  let payload: SessionPayload | null = null;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }

  if (!payload?.email || payload.exp < Date.now()) return null;
  return payload;
}

export function getAdminCookieName() {
  return process.env.NODE_ENV === "production" ? PRODUCTION_ADMIN_COOKIE_NAME : ADMIN_COOKIE_NAME;
}

function constantTimeEquals(a: string, b: string) {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  let mismatch = aBytes.length === bBytes.length ? 0 : 1;
  const length = Math.max(aBytes.length, bBytes.length);
  for (let i = 0; i < length; i++) {
    mismatch |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return mismatch === 0;
}

function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, saltHex, hashHex] = encodedHash.split(":");
  if (algorithm !== "scrypt" || !saltHex || !hashHex) return false;

  try {
    const expected = Buffer.from(hashHex, "hex");
    if (expected.length !== SCRYPT_KEY_LENGTH) return false;
    const actual = scryptSync(password, Buffer.from(saltHex, "hex"), SCRYPT_KEY_LENGTH);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function isValidAdminLogin(email: string, password: string) {
  const config = getAdminConfig();
  const emailMatches = constantTimeEquals(email, config.email.toLowerCase());
  const passwordMatches = config.passwordHash
    ? verifyPassword(password, config.passwordHash)
    : constantTimeEquals(password, config.password);
  return emailMatches && passwordMatches;
}
