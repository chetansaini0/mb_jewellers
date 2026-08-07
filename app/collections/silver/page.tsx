import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, silverCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.silver.title,
  description: pageSeo.silver.description,
  path: "/collections/silver",
});

export default function SilverPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={silverCollectionPage.eyebrow}
      title={silverCollectionPage.title}
      description={silverCollectionPage.description}
      items={collectionSectionsToCards("silver", silverCollectionPage)}
      collectionPath="/collections/silver"
    />
  );
}
