import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { insertInquiry } from "@/app/lib/lead-store";
import { sendLeadEmail } from "@/app/lib/notifications";
import { checkRateLimit, getRequestIp } from "@/app/lib/rate-limit";
import { isAllowedRequestOrigin } from "@/app/lib/request-security";
import { parseContactInquiry } from "@/app/lib/validation";

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request.headers)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const ip = getRequestIp(request.headers);
  const limit = await checkRateLimit(`contact:${ip}`, 8, 15 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  const parsed = parseContactInquiry(body);
  if (!parsed) {
    return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 400 });
  }

  if (parsed.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    id: randomUUID(),
    fullName: parsed.fullName,
    email: parsed.email,
    phone: parsed.phone,
    category: parsed.category,
    message: parsed.message,
    source: "website-contact-form",
    createdAt: new Date().toISOString(),
  };

  await insertInquiry(lead);

  await sendLeadEmail({
    subject: `New inquiry from ${lead.fullName}`,
    text: [
      `Name: ${lead.fullName}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone ?? "-"}`,
      `Category: ${lead.category ?? "-"}`,
      "",
      "Message:",
      lead.message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true, leadId: lead.id });
}
