import type { Metadata } from "next";
import { PremiumServicesPage } from "@/app/components/premium/pages/PremiumServicesPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  path: "/services",
});

export default function ServicesPage() {
  return <PremiumServicesPage />;
}
