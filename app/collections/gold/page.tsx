import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, goldCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.gold.title,
  description: pageSeo.gold.description,
  path: "/collections/gold",
});

export default function GoldPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={goldCollectionPage.eyebrow}
      title={goldCollectionPage.title}
      description={goldCollectionPage.description}
      items={collectionSectionsToCards("gold", goldCollectionPage)}
      collectionPath="/collections/gold"
    />
  );
}
