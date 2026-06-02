import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { cookiePolicySections } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy | MB Jewellers",
  description: "How MB Jewellers uses cookies and how you can manage your preferences.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <PremiumLegalPage
      eyebrow="Cookies"
      title="Your choices, clearly explained"
      lede="We use cookies to run this showcase site securely and, with consent, to understand how visitors explore our collections."
      sections={cookiePolicySections}
    />
  );
}
