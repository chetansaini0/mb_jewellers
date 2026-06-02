import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { websiteShowcaseNotice } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions | MB Jewellers",
  description:
    "Terms for using the MB Jewellers showcase website — consultations, studio visits, and in-person purchases only.",
  path: "/terms-and-conditions",
});

const termsSections = [
  {
    title: "Nature of this website",
    body: websiteShowcaseNotice,
  },
  {
    title: "Consultations & enquiries",
    body: "Form submissions and messages invite our team to contact you about private viewings, bridal curation, or bespoke work. Submitting an enquiry does not reserve or purchase jewellery until confirmed in studio with documented terms.",
  },
  {
    title: "Pricing & availability",
    body: "Collections shown online illustrate our craftsmanship. Availability, gold rates, stone selection, and final quotes are confirmed only by our consultants during or after a studio visit.",
  },
  {
    title: "Studio purchases & after-care",
    body: "Exchange, resizing, cleaning guidance, and related policies for pieces bought in studio are governed by separate studio policies and your invoice — not by actions taken on this website alone.",
  },
  {
    title: "Acceptable use",
    body: "You agree to use this site lawfully and respectfully. MB Jewellers is not liable for losses from unauthorized use, third-party outages, or events outside our reasonable control.",
  },
] as const;

export default function TermsAndConditionsPage() {
  return (
    <PremiumLegalPage
      eyebrow="Terms"
      title="Terms for exploring MB Jewellers online"
      lede="These conditions describe how our showcase website works and how studio relationships begin."
      sections={termsSections}
    />
  );
}
