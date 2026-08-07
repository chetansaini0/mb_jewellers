import type { Metadata } from "next";
import Script from "next/script";
import { PremiumFaqPage } from "@/app/components/premium/pages/PremiumFaqPage";
import { faqItems } from "@/app/lib/premiumPages";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

const faqSchema = createFaqPageSchema(faqItems);

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.faq.title,
  description: pageSeo.faq.description,
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
