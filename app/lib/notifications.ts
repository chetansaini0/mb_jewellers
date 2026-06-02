import { siteConfig } from "@/app/lib/siteConfig";

type NotificationPayload = {
  subject: string;
  text: string;
};

export async function sendLeadEmail(payload: NotificationPayload) {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "MB Jewellers <noreply@mbjewellers.in>",
      to: process.env.LEADS_NOTIFICATION_EMAIL ?? siteConfig.contact.email,
      subject: payload.subject,
      text: payload.text,
    }),
  });
}
