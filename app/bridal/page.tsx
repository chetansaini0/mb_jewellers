import type { Metadata } from "next";
import { PremiumBridalPage } from "@/app/components/premium/pages/PremiumBridalPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bridal Jewellery Collections | MB Jewellers",
  description:
    "Explore premium bridal jewellery styling, wedding suite curation, and private bridal consultations at MB Jewellers.",
  path: "/bridal",
});

export default function BridalPage() {
  return <PremiumBridalPage />;
}
