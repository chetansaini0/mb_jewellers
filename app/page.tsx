import type { Metadata } from "next";
import { JsonLd } from "@/app/components/seo/JsonLd";
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
      <JsonLd id="home-faq-schema" data={homeFaqSchema} />
      <PremiumHome />
    </>
  );
}
