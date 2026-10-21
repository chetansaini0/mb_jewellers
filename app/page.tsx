import type { Metadata } from "next";
import Script from "next/script";
import { PremiumHome } from "@/app/components/premium/PremiumHome";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo, sikarSearchFaqs } from "@/app/lib/seoContent";

const homeFaqSchema = createFaqPageSchema(sikarSearchFaqs);

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <PremiumHome />
    </>
  );
}
