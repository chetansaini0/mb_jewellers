import type { Metadata } from "next";
import { PremiumSeoHubPage } from "@/app/components/premium/pages/PremiumSeoHubPage";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";
import { necklacesHub } from "@/app/lib/seoHubPages";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.necklaces.title,
  description: pageSeo.necklaces.description,
  path: "/necklaces",
});

const faqSchema = createFaqPageSchema(necklacesHub.faqs);

export default function NecklacesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PremiumSeoHubPage page={necklacesHub} />
    </>
  );
}
