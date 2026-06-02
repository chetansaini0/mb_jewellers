import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, goldCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Gold Collection | MB Jewellers",
  description:
    "Discover traditional and modern gold jewellery collections including bridal sets, ranihaar, bangles, and rings.",
  path: "/collections/gold",
});

export default function GoldPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={goldCollectionPage.eyebrow}
      title={goldCollectionPage.title}
      description={goldCollectionPage.description}
      items={collectionSectionsToCards("gold", goldCollectionPage)}
    />
  );
}
