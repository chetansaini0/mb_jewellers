import { siteConfig } from "@/app/lib/siteConfig";

const contact = `${siteConfig.contact.email} or ${siteConfig.contact.phoneDisplay}`;

export type LegalSection = { title: string; body: string };

/** Shown across policies: this website is a showcase, not an online store. */
export const websiteShowcaseNotice =
  "The MB Jewellers website is a digital showcase for our collections. It does not sell jewellery online, accept online payments, or fulfil orders through the website. All purchases, pricing, and handover happen in person at our studio after a private consultation.";

export const refundPolicySections: LegalSection[] = [
  {
    title: "Website vs studio",
    body: `${websiteShowcaseNotice} Exchange, refund, and service terms below apply only to jewellery bought in person at MB Jewellers studios (Sikar / Jaipur) with a valid invoice — not to browsing or enquiries made on this website.`,
  },
  {
    title: "Exchange eligibility (studio purchases)",
    body: "Eligible ready-made pieces bought in studio may be considered for exchange within 7 days, subject to original condition, intact hallmarks, tags, and invoice. Worn, resized, or altered items are not eligible unless covered by a separate service agreement.",
  },
  {
    title: "Refunds (studio purchases)",
    body: "Refunds, where applicable, are processed to the original payment method after inspection and approval. Making charges, customization fees, and certification costs may be non-refundable. Gold rate differences at exchange or refund follow prevailing market rates on the transaction date.",
  },
  {
    title: "Bespoke & special orders",
    body: "Custom bridal suites, engraved pieces, and special-order gemstones are generally non-refundable and non-exchangeable unless a manufacturing defect is verified by our atelier. Terms are confirmed in writing before work begins.",
  },
  {
    title: "Contact",
    body: `For studio after-care, contact ${contact} with your invoice number and product details.`,
  },
];

export const shippingPolicySections: LegalSection[] = [
  {
    title: "No online shipping",
    body: `${websiteShowcaseNotice} We do not dispatch jewellery purchased through this website because nothing is sold online here.`,
  },
  {
    title: "Studio collection",
    body: "Pieces bought in studio are normally collected in person at MB Jewellers, Sikar. You will be notified when your item is ready. Please bring valid ID and your invoice at collection.",
  },
  {
    title: "Insured delivery (studio orders only)",
    body: "For select studio-confirmed orders, insured domestic delivery may be arranged separately by our team. Charges, insurance, and timelines are quoted in writing before dispatch — never at checkout on this website.",
  },
  {
    title: "Packaging & risk",
    body: "When delivery is arranged for a studio order, pieces travel in tamper-evident, cushioned packaging with insured transit where agreed. Risk transfers on signed delivery unless otherwise stated in your invoice.",
  },
  {
    title: "Enquiries from the website",
    body: `If you discovered a piece on this site and wish to see it, book a private viewing or WhatsApp our team at ${contact}. We will advise availability and next steps in studio.`,
  },
];

export const cancellationPolicySections: LegalSection[] = [
  {
    title: "Website enquiries & appointments",
    body: `${websiteShowcaseNotice} You may cancel or reschedule a private viewing, consultation, or callback request with at least 24 hours notice. Repeated no-shows may affect future booking priority.`,
  },
  {
    title: "Studio custom work",
    body: "Custom and bridal work confirmed in studio may be cancelled before production starts. Once materials are ordered or workmanship begins, cancellation may incur charges documented on your order confirmation.",
  },
  {
    title: "Deposits (studio only)",
    body: "Deposits on confirmed studio work apply to the final invoice. Whether a deposit is refundable depends on production stage and is explained before you pay — not through this website.",
  },
  {
    title: "Newsletter & marketing",
    body: "You may unsubscribe from emails at any time using the link in our messages or by contacting us. Unsubscribing does not affect studio purchase agreements already in place.",
  },
  {
    title: "Contact",
    body: `To change or cancel an appointment or enquiry, reach ${contact}.`,
  },
];

export const cookiePolicySections: LegalSection[] = [
  {
    title: "What are cookies",
    body: "Cookies are small text files stored on your device to help websites function, remember preferences, and understand how visitors use the site.",
  },
  {
    title: "Cookies we use",
    body: "We use essential cookies for security and session management. With your consent, we may use analytics cookies (such as Google Analytics) to understand how visitors explore our showcase. We do not use cookies to process payments — we do not sell online.",
  },
  {
    title: "Managing preferences",
    body: "Accept or decline non-essential cookies using the banner on our website. You may also clear or block cookies in your browser; some features may not work if essential cookies are disabled.",
  },
  {
    title: "Third-party services",
    body: "Embedded maps, social links, and analytics providers may set their own cookies under their policies.",
  },
  {
    title: "Updates",
    body: "We may update this Cookie Policy periodically. Continued browsing after changes constitutes acceptance of the revised policy.",
  },
];

export const disclaimerSections: LegalSection[] = [
  {
    title: "Showcase website only",
    body: websiteShowcaseNotice,
  },
  {
    title: "Images & descriptions",
    body: "Photography and copy celebrate our craftsmanship. Weights, stone grades, and finishes may vary with natural materials and hand work. Specifications are confirmed only during an in-studio consultation and on your invoice.",
  },
  {
    title: "Pricing on the website",
    body: "Any indicative pricing or estimates online are for discovery only. Final quotes depend on gold rates, stone quality, labour, and design — shared privately in studio or by our consultants after enquiry.",
  },
  {
    title: "No financial advice",
    body: "Content is for general information about our jewellery and does not constitute investment or financial advice regarding precious metals or gemstones.",
  },
  {
    title: "External links & liability",
    body: "Links to Instagram, Facebook, maps, and other sites are for convenience. MB Jewellers is not responsible for external content. To the extent permitted by law, we are not liable for indirect damages from use of this showcase site.",
  },
];

export const legalFooterLinks = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms & conditions" },
  { href: "/refund-policy", label: "Studio exchange policy" },
  { href: "/shipping-policy", label: "Collection policy" },
  { href: "/cancellation-policy", label: "Appointments policy" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;
