import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { shippingPolicySections } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Collection Policy | MB Jewellers",
  description:
    "How MB Jewellers handles studio collection and optional insured delivery for in-person purchases — no online shipping from this website.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <PremiumLegalPage
      eyebrow="Collection"
      title="Handover for studio purchases"
      lede="Jewellery is acquired and collected through our atelier — not shipped from this showcase website."
      sections={shippingPolicySections}
    />
  );
}
