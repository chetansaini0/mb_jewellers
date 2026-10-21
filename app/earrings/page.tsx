import type { Metadata } from "next";
import { PremiumSeoHubPage } from "@/app/components/premium/pages/PremiumSeoHubPage";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";
import { earringsHub } from "@/app/lib/seoHubPages";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.earrings.title,
  description: pageSeo.earrings.description,
  path: "/earrings",
});

const faqSchema = createFaqPageSchema(earringsHub.faqs);

export default function EarringsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PremiumSeoHubPage page={earringsHub} />
    </>
  );
}
