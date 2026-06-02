import type { Metadata } from "next";
import { PremiumBlogPage } from "@/app/components/premium/pages/PremiumBlogPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Jewellery Journal | MB Jewellers Blog",
  description:
    "Read MB Jewellers insights on bridal styling, gold finish selection, and jewellery craftsmanship.",
  path: "/blog",
});

export default function BlogPage() {
  return <PremiumBlogPage />;
}
