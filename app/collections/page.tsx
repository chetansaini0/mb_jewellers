import type { Metadata } from "next";
import { PremiumCollectionsHubPage } from "@/app/components/premium/pages/PremiumCollectionsHubPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.collections.title,
  description: pageSeo.collections.description,
  path: "/collections",
});

export default function CollectionsPage() {
  return <PremiumCollectionsHubPage />;
}
