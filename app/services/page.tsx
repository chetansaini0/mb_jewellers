import type { Metadata } from "next";
import { PremiumServicesPage } from "@/app/components/premium/pages/PremiumServicesPage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Atelier Services | MB Jewellers",
  description:
    "Discover private consultations, custom jewellery design, bridal curation, and after-care services by MB Jewellers.",
  path: "/services",
});

export default function ServicesPage() {
  return <PremiumServicesPage />;
}
