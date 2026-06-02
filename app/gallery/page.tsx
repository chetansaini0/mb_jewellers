import type { Metadata } from "next";
import { PremiumGalleryPage } from "@/app/components/premium/pages/PremiumGalleryPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Jewellery Gallery | MB Jewellers",
  description: "View cinematic jewellery imagery from MB Jewellers across bridal, gold, diamond, and silver showcases.",
  path: "/gallery",
});

export default function GalleryPage() {
  return <PremiumGalleryPage />;
}
