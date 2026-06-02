import type { Metadata } from "next";
import { PremiumCollectionsHubPage } from "@/app/components/premium/pages/PremiumCollectionsHubPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Jewellery Collections | Gold, Diamond, Silver",
  description:
    "Browse curated MB Jewellers collections across gold, diamond, silver, and accessories for bridal and everyday styling.",
  path: "/collections",
});

export default function CollectionsPage() {
  return <PremiumCollectionsHubPage />;
}
