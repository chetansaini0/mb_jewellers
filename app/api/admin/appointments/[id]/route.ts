import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, verifySessionToken } from "@/app/lib/admin-auth";
import { updateAppointmentStatus, type AppointmentStatus } from "@/app/lib/lead-store";

const validStatuses = new Set<AppointmentStatus>([
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  const status = String((body as Record<string, unknown>).status ?? "") as AppointmentStatus;
  if (!validStatuses.has(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  const updated = await updateAppointmentStatus(id, status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Appointment not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, appointment: updated });
}
