import type { Metadata } from "next";
import { PremiumAboutPage } from "@/app/components/premium/pages/PremiumAboutPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About MB Jewellers | Heritage Jewellery House in Sikar",
  description:
    "Discover the heritage, craftsmanship values, and atelier philosophy behind MB Jewellers in Sikar.",
  path: "/about",
});

export default function AboutPage() {
  return <PremiumAboutPage />;
}
