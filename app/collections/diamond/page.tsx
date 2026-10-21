import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, diamondCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { pageIntros, pageSeo } from "@/app/lib/seoContent";

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
      intro={pageIntros.diamond}
      related={[
        { href: "/rings", label: "Diamond rings" },
        { href: "/earrings", label: "Diamond earrings" },
        { href: "/blog/diamond-jewellery-buying-guide", label: "Buying guide" },
        { href: "/contact", label: "Private viewing" },
      ]}
    />
  );
}
