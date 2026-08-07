import type { Metadata } from "next";
import { PremiumBlogPage } from "@/app/components/premium/pages/PremiumBlogPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.blog.title,
  description: pageSeo.blog.description,
  path: "/blog",
});

export default function BlogPage() {
  return <PremiumBlogPage />;
}
