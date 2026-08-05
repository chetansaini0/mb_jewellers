import { createHmac, timingSafeEqual } from "node:crypto";

import { siteConfig } from "@/app/lib/siteConfig";

function unsubscribeSecret() {
  return (
    process.env.NEWSLETTER_UNSUBSCRIBE_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.NEXTAUTH_SECRET?.trim() ||
    "mb-jewellers-dev-unsubscribe"
  );
}

export function createUnsubscribeToken(email: string) {
  const normalized = email.trim().toLowerCase();
  return createHmac("sha256", unsubscribeSecret()).update(normalized).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string | null | undefined) {
  if (!token) return false;
  const expected = createUnsubscribeToken(email);
  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(token);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Prefer this link in future marketing emails (signed). */
export function buildUnsubscribeUrl(email: string) {
  const token = createUnsubscribeToken(email);
  const params = new URLSearchParams({
    email: email.trim().toLowerCase(),
    token,
  });
  return `${siteConfig.url.replace(/\/$/, "")}/unsubscribe?${params.toString()}`;
}
