import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, diamondCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.diamond.title,
  description: pageSeo.diamond.description,
  path: "/collections/diamond",
});

export default function DiamondPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={diamondCollectionPage.eyebrow}
      title={diamondCollectionPage.title}
      description={diamondCollectionPage.description}
      items={collectionSectionsToCards("diamond", diamondCollectionPage)}
      collectionPath="/collections/diamond"
    />
  );
}
