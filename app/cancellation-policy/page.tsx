import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { cancellationPolicySections } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Appointments Policy | MB Jewellers",
  description:
    "How to reschedule or cancel private viewings, consultations, and enquiries on the MB Jewellers showcase website.",
  path: "/cancellation-policy",
});

export default function CancellationPolicyPage() {
  return (
    <PremiumLegalPage
      eyebrow="Appointments"
      title="Changing your visit or enquiry"
      lede="We keep scheduling flexible for private viewings and studio consultations booked through our website."
      sections={cancellationPolicySections}
    />
  );
}
