import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, verifySessionToken } from "@/app/lib/admin-auth";
import { updateInquiryStatus, type LeadStatus } from "@/app/lib/lead-store";

const validStatuses = new Set<LeadStatus>(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"]);

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

  const status = String((body as Record<string, unknown>).leadStatus ?? "") as LeadStatus;
  if (!validStatuses.has(status)) {
    return NextResponse.json({ ok: false, error: "Invalid lead status." }, { status: 400 });
  }

  const updated = await updateInquiryStatus(id, status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Inquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, inquiry: updated });
}
