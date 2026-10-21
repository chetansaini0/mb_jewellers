import type { Metadata } from "next";
import { PremiumSeoHubPage } from "@/app/components/premium/pages/PremiumSeoHubPage";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";
import { dailyWearHub } from "@/app/lib/seoHubPages";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.dailyWear.title,
  description: pageSeo.dailyWear.description,
  path: "/daily-wear",
});

const faqSchema = createFaqPageSchema(dailyWearHub.faqs);

export default function DailyWearPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PremiumSeoHubPage page={dailyWearHub} />
    </>
  );
}
