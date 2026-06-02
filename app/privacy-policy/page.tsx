import type { Metadata } from "next";
import { PremiumLegalPage } from "@/app/components/premium/pages/PremiumLegalPage";
import { websiteShowcaseNotice } from "@/app/lib/legalContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | MB Jewellers",
  description:
    "How MB Jewellers handles information when you browse our jewellery showcase, book appointments, or contact our studio.",
  path: "/privacy-policy",
});

const privacySections = [
  {
    title: "About this website",
    body: websiteShowcaseNotice,
  },
  {
    title: "Information we collect",
    body: "We collect details you choose to share through enquiry, appointment, and newsletter forms — such as name, email, phone number, occasion notes, and jewellery preferences. We do not collect payment card data on this website because we do not sell online.",
  },
  {
    title: "How we use your data",
    body: "Your information helps us respond to viewing requests, arrange studio visits, share curated updates you opt into, and improve our showcase experience. We do not sell personal data.",
  },
  {
    title: "Security and retention",
    body: "MB Jewellers applies technical and operational safeguards to protect submitted information. Records are kept only as long as needed for consultations, studio service, and legal compliance.",
  },
  {
    title: "Your rights",
    body: "You may request correction, export, or deletion of your personal data by contacting mbjeweller21@gmail.com.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <PremiumLegalPage
      eyebrow="Privacy"
      title="Your trust matters — online and in the atelier"
      lede="This policy explains how we handle information when you explore our collections online and connect with our studio."
      sections={privacySections}
    />
  );
}
