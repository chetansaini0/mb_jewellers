import type { Metadata } from "next";
import { PremiumBridalPage } from "@/app/components/premium/pages/PremiumBridalPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.bridal.title,
  description: pageSeo.bridal.description,
  path: "/bridal",
});

export default function BridalPage() {
  return <PremiumBridalPage />;
}
