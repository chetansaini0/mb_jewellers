import { NextResponse } from "next/server";
import { createSessionToken, getAdminCookieName, isValidAdminLogin } from "@/app/lib/admin-auth";
import { checkRateLimit, getRequestIp } from "@/app/lib/rate-limit";
import { isAllowedRequestOrigin } from "@/app/lib/request-security";

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request.headers)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const ip = getRequestIp(request.headers);
  const limit = await checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid login payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const email = String(payload.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(payload.password ?? "");

  if (!isValidAdminLogin(email, password)) {
    return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
  }

  const token = await createSessionToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: getAdminCookieName(),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
