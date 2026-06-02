import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, silverCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Silver Collection | MB Jewellers",
  description:
    "Shop refined silver jewellery with curated sets, chains, earrings, bangles, and gifting-ready pieces.",
  path: "/collections/silver",
});

export default function SilverPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={silverCollectionPage.eyebrow}
      title={silverCollectionPage.title}
      description={silverCollectionPage.description}
      items={collectionSectionsToCards("silver", silverCollectionPage)}
    />
  );
}
