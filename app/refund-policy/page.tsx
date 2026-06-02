import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { refundPolicySections } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Studio Exchange Policy | MB Jewellers",
  description:
    "Exchange and refund guidelines for jewellery purchased in person at MB Jewellers — not applicable to online browsing on this showcase site.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <PremiumLegalPage
      eyebrow="Studio policy"
      title="Exchange & refunds for in-studio purchases"
      lede="This policy applies to jewellery bought at our studio. This website does not process sales, payments, or returns."
      sections={refundPolicySections}
    />
  );
}
