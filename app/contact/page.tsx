import type { Metadata } from "next";
import { PremiumContactPage } from "@/app/components/premium/pages/PremiumContactPage";
import { createPageMetadata } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";

export const metadata: Metadata = createPageMetadata({
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  path: "/contact",
});

export default function ContactPage() {
  return <PremiumContactPage />;
}
