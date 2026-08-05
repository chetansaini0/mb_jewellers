import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";
import { POST as createAppointment } from "@/app/api/appointments/route";
import { POST as submitContact } from "@/app/api/contact/route";
import { POST as adminLogin } from "@/app/api/admin/login/route";
import { createSessionToken, getAdminCookieName, verifySessionToken } from "@/app/lib/admin-auth";
import { getLeadStoreSnapshot } from "@/app/lib/lead-store";

const originalCwd = process.cwd();
let testDirectory = "";

before(async () => {
  testDirectory = await mkdtemp(join(tmpdir(), "mb-jewellers-test-"));
  process.chdir(testDirectory);
  process.env.ADMIN_EMAIL = "admin@example.com";
  process.env.ADMIN_PASSWORD_HASH =
    "scrypt:208141148531e3029e8547ccfd24adc3:3a8ecc29b990cda8c2e46927dc3924e4cf10d4c1c4e6b167256a74cdfdaa4c01f1dd27beebe6b21a6204f282dec27e2b4cb0a4b08e89868c74662c50713a7b3b";
  process.env.ADMIN_SESSION_SECRET = "test-session-secret-that-is-at-least-32-characters";
  delete process.env.ADMIN_PASSWORD;
  delete process.env.DATABASE_URL;
  delete process.env.LEAD_STORAGE_MODE;
  delete process.env.RESEND_API_KEY;
});

after(async () => {
  process.chdir(originalCwd);
  await rm(testDirectory, { recursive: true, force: true });
});

function jsonRequest(path: string, body: unknown, ip: string) {
  return new Request(`http://localhost:3000${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

test("contact flow validates, rejects honeypots, and persists valid inquiries", async () => {
  const invalidResponse = await submitContact(
    jsonRequest("/api/contact", { fullName: "A", email: "invalid", message: "short" }, "test-contact-1"),
  );
  assert.equal(invalidResponse.status, 400);

  const honeypotResponse = await submitContact(
    jsonRequest(
      "/api/contact",
      {
        fullName: "Automated Visitor",
        email: "bot@example.com",
        message: "This submission should be ignored.",
        website: "https://spam.example",
      },
      "test-contact-2",
    ),
  );
  assert.equal(honeypotResponse.status, 200);
  assert.equal((await getLeadStoreSnapshot()).inquiries.length, 0);

  const validResponse = await submitContact(
    jsonRequest(
      "/api/contact",
      {
        fullName: "Test Customer",
        email: "customer@example.com",
        phone: "+91 9876543210",
        category: "Gold",
        message: "I would like to arrange a private viewing.",
      },
      "test-contact-3",
    ),
  );
  assert.equal(validResponse.status, 200);
  const payload = (await validResponse.json()) as { ok: boolean; leadId?: string };
  assert.equal(payload.ok, true);
  assert.ok(payload.leadId);

  const store = await getLeadStoreSnapshot();
  assert.equal(store.inquiries.length, 1);
  assert.equal(store.inquiries[0]?.email, "customer@example.com");
});

test("appointment flow persists validated appointment requests", async () => {
  const response = await createAppointment(
    jsonRequest(
      "/api/appointments",
      {
        fullName: "Bridal Customer",
        email: "bridal@example.com",
        phone: "+91 9876543210",
        appointmentType: "BRIDAL",
        preferredDate: "2026-08-15",
        preferredTimeSlot: "11:00 AM",
        category: "Bridal",
      },
      "test-appointment-1",
    ),
  );

  assert.equal(response.status, 200);
  const payload = (await response.json()) as { ok: boolean; appointmentId?: string };
  assert.equal(payload.ok, true);
  assert.ok(payload.appointmentId);

  const store = await getLeadStoreSnapshot();
  assert.equal(store.appointments.length, 1);
  assert.equal(store.appointments[0]?.status, "PENDING");
});

test("newsletter unsubscribe soft-deactivates subscribers", async () => {
  const { POST: subscribe } = await import("@/app/api/newsletter/route");
  const { POST: unsubscribe } = await import("@/app/api/newsletter/unsubscribe/route");

  const subscribed = await subscribe(
    jsonRequest("/api/newsletter", { email: "unsub@example.com", website: "" }, "test-unsub-1"),
  );
  assert.equal(subscribed.status, 200);

  const before = await getLeadStoreSnapshot();
  assert.equal(before.subscribers.some((item) => item.email === "unsub@example.com" && item.isActive), true);

  const response = await unsubscribe(
    jsonRequest("/api/newsletter/unsubscribe", { email: "unsub@example.com", website: "" }, "test-unsub-2"),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);

  const after = await getLeadStoreSnapshot();
  const row = after.subscribers.find((item) => item.email === "unsub@example.com");
  assert.ok(row);
  assert.equal(row?.isActive, false);
});

test("admin login rejects invalid credentials and issues a verifiable session", async () => {
  const rejected = await adminLogin(
    jsonRequest("/api/admin/login", { email: "admin@example.com", password: "wrong-password" }, "test-admin-1"),
  );
  assert.equal(rejected.status, 401);

  const accepted = await adminLogin(
    jsonRequest("/api/admin/login", { email: "admin@example.com", password: "ci-build-password" }, "test-admin-2"),
  );
  assert.equal(accepted.status, 200);
  assert.match(accepted.headers.get("set-cookie") ?? "", new RegExp(`${getAdminCookieName()}=`));

  const token = await createSessionToken("admin@example.com");
  assert.equal((await verifySessionToken(token))?.email, "admin@example.com");
  assert.equal(await verifySessionToken(`${token}tampered`), null);
});
