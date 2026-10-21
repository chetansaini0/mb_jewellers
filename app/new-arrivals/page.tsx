import type { Metadata } from "next";
import { PremiumSeoHubPage } from "@/app/components/premium/pages/PremiumSeoHubPage";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";
import { newArrivalsHub } from "@/app/lib/seoHubPages";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.newArrivals.title,
  description: pageSeo.newArrivals.description,
  path: "/new-arrivals",
});

const faqSchema = createFaqPageSchema(newArrivalsHub.faqs);

export default function NewArrivalsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PremiumSeoHubPage page={newArrivalsHub} />
    </>
  );
}
