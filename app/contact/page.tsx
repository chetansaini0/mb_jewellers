import type { Metadata } from "next";
import { PremiumContactPage } from "@/app/components/premium/pages/PremiumContactPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book Jewellery Appointment | MB Jewellers",
  description:
    "Request a private studio viewing at MB Jewellers, Sikar. Showcase website — enquire by form, phone, or WhatsApp; purchases in studio only.",
  path: "/contact",
});

export default function ContactPage() {
  return <PremiumContactPage />;
}
