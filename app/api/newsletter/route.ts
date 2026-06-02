import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { upsertSubscriber } from "@/app/lib/lead-store";
import { checkRateLimit, getRequestIp } from "@/app/lib/rate-limit";
import { isAllowedRequestOrigin } from "@/app/lib/request-security";
import { parseNewsletter } from "@/app/lib/validation";

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request.headers)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const ip = getRequestIp(request.headers);
  const limit = await checkRateLimit(`newsletter:${ip}`, 10, 10 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  const parsed = parseNewsletter(body);
  if (!parsed) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (parsed.website) {
    return NextResponse.json({ ok: true });
  }

  await upsertSubscriber({
    id: randomUUID(),
    email: parsed.email,
    fullName: parsed.fullName,
    source: "website-footer",
    isActive: true,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
