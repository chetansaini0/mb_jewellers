import { NextResponse } from "next/server";

import { deactivateSubscriber } from "@/app/lib/lead-store";
import { verifyUnsubscribeToken } from "@/app/lib/newsletter-unsubscribe";
import { checkRateLimit, getRequestIp } from "@/app/lib/rate-limit";
import { isAllowedRequestOrigin } from "@/app/lib/request-security";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request.headers)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const ip = getRequestIp(request.headers);
  const limit = await checkRateLimit(`newsletter-unsub:${ip}`, 20, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const token = typeof payload.token === "string" ? payload.token.trim() : undefined;
  const website = typeof payload.website === "string" ? payload.website.trim() : "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  // Signed email links skip the form honeypot path; token is optional for manual form unsubscribes.
  if (token && !verifyUnsubscribeToken(email, token)) {
    return NextResponse.json({ ok: false, error: "This unsubscribe link is invalid or expired." }, { status: 400 });
  }

  try {
    await deactivateSubscriber(email);
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to update preferences right now." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
