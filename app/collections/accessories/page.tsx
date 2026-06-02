import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, accessoriesCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Silver Accessories & Artefacts | MB Jewellers",
  description:
    "Explore decorative silver accessories including curated statues and premium serveware collections.",
  path: "/collections/accessories",
});

export default function AccessoriesPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={accessoriesCollectionPage.eyebrow}
      title={accessoriesCollectionPage.title}
      description={accessoriesCollectionPage.description}
      items={collectionSectionsToCards("accessories", accessoriesCollectionPage)}
    />
  );
}
