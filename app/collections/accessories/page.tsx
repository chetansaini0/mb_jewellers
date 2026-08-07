import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { accessoriesCollectionPage, collectionSectionsToCards } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.accessories.title,
  description: pageSeo.accessories.description,
  path: "/collections/accessories",
});

export default function AccessoriesPage() {
  return (
    <PremiumCategoryCollectionPage
      eyebrow={accessoriesCollectionPage.eyebrow}
      title={accessoriesCollectionPage.title}
      description={accessoriesCollectionPage.description}
      items={collectionSectionsToCards("accessories", accessoriesCollectionPage)}
      collectionPath="/collections/accessories"
    />
  );
}
