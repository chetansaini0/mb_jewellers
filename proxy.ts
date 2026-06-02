import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminCookieName, verifySessionToken } from "@/app/lib/admin-auth";

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(getAdminCookieName())?.value;
  const session = await verifySessionToken(token);

  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
