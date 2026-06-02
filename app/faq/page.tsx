import type { Metadata } from "next";
import Script from "next/script";
import { PremiumFaqPage } from "@/app/components/premium/pages/PremiumFaqPage";
import { faqItems } from "@/app/lib/premiumPages";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";

const faqSchema = createFaqPageSchema(faqItems);

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions | MB Jewellers",
  description:
    "Find answers about pricing, consultations, custom jewellery, hallmarking, and after-care at MB Jewellers.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PremiumFaqPage />
    </>
  );
}
