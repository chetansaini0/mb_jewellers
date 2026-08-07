import type { Metadata } from "next";
import { PremiumAboutPage } from "@/app/components/premium/pages/PremiumAboutPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  path: "/about",
});

export default function AboutPage() {
  return <PremiumAboutPage />;
}
