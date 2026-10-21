import type { Metadata } from "next";
import { PremiumSeoHubPage } from "@/app/components/premium/pages/PremiumSeoHubPage";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";
import { banglesHub } from "@/app/lib/seoHubPages";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.bangles.title,
  description: pageSeo.bangles.description,
  path: "/bangles",
});

const faqSchema = createFaqPageSchema(banglesHub.faqs);

export default function BanglesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PremiumSeoHubPage page={banglesHub} />
    </>
  );
}
