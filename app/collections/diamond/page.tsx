import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, diamondCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Diamond Collection | MB Jewellers",
  description: "Explore elegant diamond sets, necklaces, earrings, bracelets, and rings from MB Jewellers.",
  path: "/collections/diamond",
});

export default function DiamondPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={diamondCollectionPage.eyebrow}
      title={diamondCollectionPage.title}
      description={diamondCollectionPage.description}
      items={collectionSectionsToCards("diamond", diamondCollectionPage)}
    />
  );
}
