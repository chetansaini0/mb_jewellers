import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/app/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: getAdminCookieName(),
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
