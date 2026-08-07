import type { Metadata } from "next";
import { PremiumGalleryPage } from "@/app/components/premium/pages/PremiumGalleryPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.gallery.title,
  description: pageSeo.gallery.description,
  path: "/gallery",
});

export default function GalleryPage() {
  return <PremiumGalleryPage />;
}
