const ADMIN_COOKIE_NAME = "mb_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

type SessionPayload = {
  email: string;
  exp: number;
};

function getAdminConfig() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (process.env.NODE_ENV === "production") {
    if (!email || !password || !secret) {
      throw new Error("ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET are required in production.");
    }
    if (secret.length < 32) {
      throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters in production.");
    }
  }

  return {
    email: email ?? "mbjeweller21@gmail.com",
    password: password ?? "ChangeThisAdminPassword",
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
  const encoded = encodeURIComponent(JSON.stringify(payload));
  const signature = await sign(encoded, secret);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token) return null;
  const { secret } = getAdminConfig();
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = await sign(encoded, secret);
  if (expected !== signature) return null;

  let payload: SessionPayload | null = null;
  try {
    payload = JSON.parse(decodeURIComponent(encoded)) as SessionPayload;
  } catch {
    return null;
  }

  if (!payload?.email || payload.exp < Date.now()) return null;
  return payload;
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
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

export function isValidAdminLogin(email: string, password: string) {
  const config = getAdminConfig();
  const emailMatches = constantTimeEquals(email, config.email.toLowerCase());
  const passwordMatches = constantTimeEquals(password, config.password);
  return emailMatches && passwordMatches;
}
