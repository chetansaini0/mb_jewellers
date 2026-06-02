import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { insertAppointment } from "@/app/lib/lead-store";
import { sendLeadEmail } from "@/app/lib/notifications";
import { checkRateLimit, getRequestIp } from "@/app/lib/rate-limit";
import { isAllowedRequestOrigin } from "@/app/lib/request-security";
import { parseAppointment } from "@/app/lib/validation";

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request.headers)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const ip = getRequestIp(request.headers);
  const limit = await checkRateLimit(`appointment:${ip}`, 6, 15 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many appointment requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  const parsed = parseAppointment(body);
  if (!parsed) {
    return NextResponse.json(
      { ok: false, error: "Please check your appointment details and try again." },
      { status: 400 },
    );
  }

  if (parsed.website) {
    return NextResponse.json({ ok: true });
  }

  const preferredDate = new Date(parsed.preferredDate);
  if (Number.isNaN(preferredDate.getTime())) {
    return NextResponse.json({ ok: false, error: "Invalid appointment date." }, { status: 400 });
  }

  const appointment = {
    id: randomUUID(),
    fullName: parsed.fullName,
    email: parsed.email,
    phone: parsed.phone,
    appointmentType: parsed.appointmentType,
    preferredDate: preferredDate.toISOString(),
    preferredTimeSlot: parsed.preferredTimeSlot,
    category: parsed.category,
    occasion: parsed.occasion,
    notes: parsed.notes,
    source: "website-appointment-form",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  await insertAppointment(appointment);

  await sendLeadEmail({
    subject: `New appointment request from ${appointment.fullName}`,
    text: [
      `Name: ${appointment.fullName}`,
      `Email: ${appointment.email}`,
      `Phone: ${appointment.phone}`,
      `Type: ${appointment.appointmentType}`,
      `Date: ${appointment.preferredDate.slice(0, 10)}`,
      `Time slot: ${appointment.preferredTimeSlot}`,
      `Category: ${appointment.category ?? "-"}`,
      `Occasion: ${appointment.occasion ?? "-"}`,
      "",
      "Notes:",
      appointment.notes ?? "-",
    ].join("\n"),
  });

  return NextResponse.json({ ok: true, appointmentId: appointment.id });
}
