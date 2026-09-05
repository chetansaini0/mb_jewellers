/**
 * Central page-level SEO copy for MB Jewellers.
 * Titles are absolute (include brand). Keep descriptions factual — no unverifiable claims.
 */

export const pageSeo = {
  home: {
    title: "MB Jewellers | Jewellery Shop in Sikar & Shekhawati, Rajasthan",
    description:
      "Looking for a trusted jewellery store in Sikar? MB Jewellers offers gold, diamond, silver, and bridal jewellery at two Sikar showrooms — serving families across the Shekhawati region. Book a private in-person viewing.",
  },
  collections: {
    title: "Jewellery Collections in Sikar | MB Jewellers",
    description:
      "Explore gold, diamond, silver, and accessory collections at MB Jewellers, Sikar. Browse online, then visit our showrooms for private selection.",
  },
  gold: {
    title: "Gold Jewellery in Sikar | MB Jewellers",
    description:
      "Traditional and contemporary gold jewellery in Sikar — bridal sets, Ranihaar, Rajputi profiles, bangles, chains, and rings at MB Jewellers showrooms.",
  },
  silver: {
    title: "Silver Jewellery in Sikar | MB Jewellers",
    description:
      "Refined silver jewellery and artefacts at MB Jewellers in Sikar. View collections online and shortlist pieces for a private studio appointment.",
  },
  diamond: {
    title: "Diamond Jewellery in Sikar | MB Jewellers",
    description:
      "Diamond sets, rings, necklaces, earrings, and bracelets at MB Jewellers, Sikar. Certified stones presented in private salon lighting.",
  },
  accessories: {
    title: "Silver Accessories & Artefacts | MB Jewellers, Sikar",
    description:
      "Polished silver accessories and gift-ready artefacts from MB Jewellers in Sikar — explore the selection and discuss finishing in studio.",
  },
  bridal: {
    title: "Bridal & Wedding Jewellery in Sikar | MB Jewellers",
    description:
      "Bridal and wedding jewellery consultations in Sikar — curated suites for engagement, wedding day, and reception at MB Jewellers.",
  },
  about: {
    title: "About MB Jewellers | Jewellery Showroom in Sikar",
    description:
      "Learn about MB Jewellers — a family jewellery business rooted in Sikar, Rajasthan, known for craftsmanship, hallmark purity, and private studio care.",
  },
  heritage: {
    title: "Heritage & Craftsmanship | MB Jewellers, Sikar",
    description:
      "Discover the heritage craft and atelier traditions behind MB Jewellers in Sikar — gold finishing, bridal curation, and lasting trust.",
  },
  gallery: {
    title: "Jewellery Gallery | MB Jewellers, Sikar",
    description:
      "Browse jewellery photography from MB Jewellers in Sikar — gold, diamond, silver, and bridal silhouettes from our showrooms.",
  },
  services: {
    title: "Custom Jewellery Atelier in Sikar | MB Jewellers",
    description:
      "Custom and bespoke jewellery services in Sikar — private discovery, design translation, and atelier finishing at MB Jewellers.",
  },
  faq: {
    title: "FAQ | Jewellery Shop in Sikar — MB Jewellers",
    description:
      "Answers about choosing a jewellery store in Sikar and Shekhawati — MB Jewellers locations, hours, bridal appointments, hallmark purity, and in-person purchase.",
  },
  testimonials: {
    title: "Customer Experiences | MB Jewellers, Sikar",
    description:
      "Read customer experiences from MB Jewellers in Sikar. Genuine reflections from bridal and family jewellery visits — no fabricated reviews.",
  },
  blog: {
    title: "Jewellery Journal | Guides from MB Jewellers, Sikar",
    description:
      "Practical jewellery buying guides from MB Jewellers in Sikar — bridal suites, gold finishes, diamonds, and care advice for Shekhawati families.",
  },
  contact: {
    title: "Visit Our Jewellery Store in Sikar | Contact MB Jewellers",
    description:
      "Find MB Jewellers showrooms in Sikar — Ghantaghar and Ramlila Maidan. Phone, email, hours, and directions for a private jewellery viewing across Shekhawati.",
  },
} as const;

/** Visible local SEO copy — written for customers, not keyword stuffing. */
export const localSeoContent = {
  eyebrow: "Sikar · Shekhawati · Rajasthan",
  title: "A trusted jewellery store for Sikar and the Shekhawati region",
  lead:
    "MB Jewellers is a jewellery showroom based in Sikar, Rajasthan. Families visit us for gold, diamond, silver, and bridal jewellery — whether they live in Sikar or travel from nearby Shekhawati towns.",
  paragraphs: [
    "If you are searching for a jewellery shop in Sikar or a reliable jeweller across Shekhawati, look for hallmarked gold, certified diamonds, clear pricing conversations in person, and unhurried selection. MB Jewellers was built around those standards — not online checkout.",
    "Our two Sikar showrooms — at Ghantaghar (Purana Dujod Gate) and Ramlila Maidan — welcome private, appointment-friendly viewings. Explore collections on this website, then see weight, finish, and movement in person before you buy.",
    "Customers regularly visit from Fatehpur, Laxmangarh, Neem Ka Thana, Jhunjhunu, Churu, Khandela, Ringas, Danta Ramgarh, and other towns across Shekhawati. Share your occasion and we will help you shortlist the right gold, diamond, silver, or bridal suite.",
  ],
  links: [
    { href: "/collections/gold", label: "Gold jewellery" },
    { href: "/collections/diamond", label: "Diamond jewellery" },
    { href: "/collections/silver", label: "Silver jewellery" },
    { href: "/bridal", label: "Bridal & wedding jewellery" },
    { href: "/faq", label: "Jewellery shop FAQ" },
    { href: "/contact", label: "Visit our store" },
  ],
} as const;
