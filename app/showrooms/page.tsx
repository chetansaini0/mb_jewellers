import type { Metadata } from "next";
import { PremiumShowroomsPage } from "@/app/components/premium/pages/PremiumShowroomsPage";
import { showroomVisitFaqs } from "@/app/lib/premiumPages";
import { createFaqPageSchema, createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.showrooms.title,
  description: pageSeo.showrooms.description,
  path: "/showrooms",
});

const faqSchema = createFaqPageSchema(showroomVisitFaqs);

export default function ShowroomsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PremiumShowroomsPage />
    </>
  );
}
