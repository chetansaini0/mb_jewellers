import type { Metadata } from "next";
import { PremiumAboutPage } from "@/app/components/premium/pages/PremiumAboutPage";
import { createCanonicalUrl, createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "MB Jewellers Heritage",
    description:
      "Explore the heritage story, craftsmanship values, and legacy milestones behind MB Jewellers.",
    path: "/heritage",
  }),
  alternates: { canonical: createCanonicalUrl("/about") },
};

export default function HeritagePage() {
  return <PremiumAboutPage />;
}
