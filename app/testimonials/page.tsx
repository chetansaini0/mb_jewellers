import type { Metadata } from "next";
import { PremiumTestimonialsPage } from "@/app/components/premium/pages/PremiumTestimonialsPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.testimonials.title,
  description: pageSeo.testimonials.description,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return <PremiumTestimonialsPage />;
}
