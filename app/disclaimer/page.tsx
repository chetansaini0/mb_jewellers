import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { disclaimerSections } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Disclaimer | MB Jewellers",
  description: "MB Jewellers website disclaimer — showcase and enquiries only, no online sales or checkout.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <PremiumLegalPage
      eyebrow="Disclaimer"
      title="A showcase — not an online store"
      lede="Please read this before browsing our collections or submitting an enquiry."
      sections={disclaimerSections}
    />
  );
}
