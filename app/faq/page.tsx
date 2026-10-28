import type { Metadata } from "next";
import { JsonLd } from "@/app/components/seo/JsonLd";
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
      <JsonLd id="faq-page-schema" data={faqSchema} />
      <PremiumFaqPage />
    </>
  );
}
