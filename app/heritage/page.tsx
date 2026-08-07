import type { Metadata } from "next";
import { PremiumAboutPage } from "@/app/components/premium/pages/PremiumAboutPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.heritage.title,
  description: pageSeo.heritage.description,
  path: "/heritage",
});

export default function HeritagePage() {
  return <PremiumAboutPage variant="heritage" />;
}
