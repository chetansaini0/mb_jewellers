import type { Metadata } from "next";
import { PremiumCategoryCollectionPage } from "@/app/components/premium/pages/PremiumCategoryCollectionPage";
import { collectionSectionsToCards, silverCollectionPage } from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { pageIntros, pageSeo } from "@/app/lib/seoContent";

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
      intro={pageIntros.silver}
      related={[
        { href: "/bangles", label: "Silver bangles" },
        { href: "/daily-wear", label: "Daily wear" },
        { href: "/contact", label: "Visit the showroom" },
      ]}
    />
  );
}
