import type { Metadata } from "next";
import { PremiumTestimonialsPage } from "@/app/components/premium/pages/PremiumTestimonialsPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Client Testimonials | MB Jewellers",
  description: "Read experiences from bridal and jewellery clients who trust MB Jewellers for milestone purchases.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return <PremiumTestimonialsPage />;
}
