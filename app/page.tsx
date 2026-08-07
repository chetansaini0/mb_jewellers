import type { Metadata } from "next";
import { PremiumHome } from "@/app/components/premium/PremiumHome";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: "/",
});

export default function Home() {
  return <PremiumHome />;
}
