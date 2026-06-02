import { premiumTestimonials } from "@/app/lib/premiumContent";
import { getWhatsAppUrl, siteConfig } from "@/app/lib/siteConfig";
import { categoryShowcase, featuredPieces, socialLinks } from "@/app/lib/siteData";

export const trustValues = [
  {
    id: "craft",
    title: "Quality Craftsmanship",
    detail: "Hand-finished silhouettes with atelier-level detailing on every surface.",
    icon: "craft",
  },
  {
    id: "purity",
    title: "Purity Guarantee",
    detail: "Hallmarked gold and certified diamonds with transparent sourcing notes.",
    icon: "purity",
  },
  {
    id: "trust",
    title: "100% Trust",
    detail: "Documented valuations, clear exchange conversations, and lifetime studio care.",
    icon: "trust",
  },
  {
    id: "experience",
    title: "30+ Years of Experience",
    detail: "Three decades of family-led jewellery expertise rooted in Rajasthan.",
    icon: "experience",
    counter: { value: 30, suffix: "+", label: "Years" },
  },
  {
    id: "customers",
    title: "5 Lakh+ Happy Customers",
    detail: "Generations of families who return for bridal, heirloom, and gifting moments.",
    icon: "customers",
    counter: { value: 5, suffix: " Lakh+", label: "Happy customers" },
  },
] as const;

export const aboutJourney = [
  {
    year: "1950",
    title: "The first atelier flame",
    copy: "MB Jewellers began as a family bench in Sikar, shaping gold with patience, proportion, and ceremony in mind.",
  },
  {
    year: "1988",
    title: "Bridal suites take form",
    copy: "Private bridal consultations expanded into full-suite curation for engagement, wedding, and reception styling.",
  },
  {
    year: "2008",
    title: "Diamond atelier opens",
    copy: "Certified diamond selection, custom settings, and contemporary silhouettes joined the heritage gold vocabulary.",
  },
  {
    year: "Today",
    title: "Cinematic luxury, rooted in trust",
    copy: "A world-class studio experience that feels intimate, emotional, and unmistakably MB from first sketch to final polish.",
  },
] as const;

export const customJewellerySteps = [
  {
    step: "01",
    title: "Private discovery",
    copy: "Share your occasion, references, and metal preferences in a calm, appointment-only consultation.",
  },
  {
    step: "02",
    title: "Design translation",
    copy: "Our designers translate your story into sketches, stone layouts, and proportion studies.",
  },
  {
    step: "03",
    title: "Prototype & approval",
    copy: "Review silhouettes, weight balance, and finish direction before the piece moves into production.",
  },
  {
    step: "04",
    title: "Atelier finishing",
    copy: "Master craftspeople set, polish, and inspect every surface for long-term wear and luminous presence.",
  },
] as const;

export const bridalCeremonyMoments = [
  {
    title: "Engagement",
    copy: "Rings, delicate chains, and first-light styling that feels personal without overpowering the moment.",
    pieces: "Solitaires, bands, light necklaces",
  },
  {
    title: "Wedding day",
    copy: "Statement necklaces, chokars, and coordinated sets balanced for mandap light, photography, and long wear.",
    pieces: "Bridal sets, chokars, jhumkas, bangles",
  },
  {
    title: "Reception",
    copy: "Elevated silhouettes with contemporary restraint — pieces that catch candlelight and movement on the dance floor.",
    pieces: "Drops, cuffs, layered bangles",
  },
  {
    title: "Gifting & vidai",
    copy: "Heirloom-weight gold and thoughtful finishing for family gifting, blessings, and pieces meant to be passed forward.",
    pieces: "Bangles, pendants, coin motifs",
  },
] as const;

export const bridalSuiteCategories = [
  {
    title: "Necklace & chokar",
    copy: "From heritage kundan profiles to modern collar lines — proportioned for your neckline and ceremony palette.",
    image: "/pics/Bridal/b2.jpg",
    alt: "Bridal necklace and chokar styling",
  },
  {
    title: "Earrings & mathapatti",
    copy: "Jhumkas, drops, and temple-inspired pairs selected for face shape, hairstyle, and dupatta framing.",
    image: "/pics/Bridal/b3.jpg",
    alt: "Bridal earrings close-up",
  },
  {
    title: "Bangles & haathphool",
    copy: "Stacked kadas, delicate kangan, and hand jewellery composed for comfort through every ritual.",
    image: "/pics/Bridal/b4.jpg",
    alt: "Bridal bangles and hand jewellery",
  },
  {
    title: "Rings & finishing pieces",
    copy: "Engagement solitaires, cocktail rings, and subtle accents that complete the suite without visual noise.",
    image: "/pics/Bridal/b1.jpg",
    alt: "Bridal rings and finishing details",
  },
] as const;

export const bridalConsultationSteps = [
  {
    step: "01",
    title: "Ceremony discovery",
    copy: "Share your dates, venues, outfit palette, and family traditions so we understand how each piece will be worn.",
  },
  {
    step: "02",
    title: "Suite shortlist",
    copy: "Our bridal consultants curate necklace, earring, and bangle options across gold and diamond — presented in private salon lighting.",
  },
  {
    step: "03",
    title: "Try-on & balance",
    copy: "Review weight, movement, and harmony together. We adjust pairings until the suite feels inevitable, not overloaded.",
  },
  {
    step: "04",
    title: "Finishing & care",
    copy: "Hallmark documentation, fitting notes, and studio care guidance so your pieces stay luminous through every function.",
  },
] as const;

export const bridalStudioPillars = [
  {
    title: "Proportion before volume",
    detail: "We build suites around your silhouette and ceremony lighting — never adding pieces simply to fill a tray.",
  },
  {
    title: "Heritage, edited for today",
    detail: "Kundan, filigree, and polki vocabulary shaped with contemporary restraint for photography and long wear.",
  },
  {
    title: "Appointment-only calm",
    detail: "No crowded counters. Each bridal visit is unhurried, with pieces presented one chapter at a time.",
  },
  {
    title: "Documented purity",
    detail: "Hallmarked gold, certified diamonds, and clear material notes shared during your consultation.",
  },
] as const;

export const bridalFaqs = [
  {
    question: "How far in advance should I book a bridal appointment?",
    answer:
      "We recommend reaching out 8–12 weeks before your first function. For peak wedding season, earlier is ideal so we can reserve salon time and curate your shortlist.",
  },
  {
    question: "Can I mix family heirloom pieces with new MB designs?",
    answer:
      "Yes. Many clients reset heirloom gold, pair vintage stones with new settings, or style family bangles alongside freshly finished MB silhouettes.",
  },
  {
    question: "Do you style complete suites or individual pieces?",
    answer:
      "Both. Some families commission full wedding suites; others visit for a statement necklace, engagement ring, or reception drops only.",
  },
  {
    question: "Will pricing be shared during the visit?",
    answer:
      "Yes — every consultation includes transparent discussion of weight, purity, stone notes, and finish so you can decide with confidence.",
  },
] as const;

export const bridalFeaturedQuote = {
  quote:
    "The studio felt like a private salon. Every piece was presented with patience, and the bridal set looked even richer in person.",
  meta: "Bridal client, Jaipur",
} as const;

export const faqItems = [
  {
    question: "Can I buy jewellery on this website?",
    answer:
      "No. This website is a showcase to explore our collections. Pricing, availability, and purchase happen in studio during a private consultation.",
  },
  {
    question: "Can I book a bridal appointment?",
    answer:
      "Yes. Share your timeline and ceremony details through the contact form and our bridal studio will respond with curated options.",
  },
  {
    question: "Do you offer custom jewellery?",
    answer:
      "Absolutely. From heirloom resets to bespoke bridal suites, our atelier guides you through design, prototyping, and finishing.",
  },
  {
    question: "What purity standards do you follow?",
    answer:
      "Gold is hallmarked and diamonds are certified. We document material notes and finishing standards for every major purchase.",
  },
  {
    question: "Do you provide after-care support?",
    answer:
      "Our studio offers cleaning guidance, resizing conversations, and restoration support for MB pieces over time.",
  },
] as const;

export const blogPosts = [
  {
    slug: "bridal-suite-curation",
    title: "How to curate a bridal suite that feels inevitable",
    excerpt: "A calm, cinematic approach to balancing necklace weight, earring presence, and ceremony lighting.",
    image: "/pics/Bridal/b1.jpg",
    date: "April 2026",
    category: "Bridal",
  },
  {
    slug: "gold-finish-language",
    title: "Reading gold finish like a jeweller",
    excerpt: "Warm polish, satin glow, and filigree shadow — the details that change how gold feels on skin.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80",
    date: "March 2026",
    category: "Gold",
  },
  {
    slug: "diamond-fire-in-daylight",
    title: "Why diamond fire matters beyond the showcase",
    excerpt: "Selecting stones for movement, daylight, and the emotional rhythm of real celebrations.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
    date: "February 2026",
    category: "Diamond",
  },
] as const;

export const galleryItems = [
  { src: "/pics/Bridal/b1.jpg", alt: "Bridal portrait in warm light", span: "tall" },
  { src: "/pics/Bridal/b2.jpg", alt: "Bridal jewellery close-up", span: "wide" },
  { src: "/pics/Bridal/b3.jpg", alt: "Bridal styling detail", span: "square" },
  {
    src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1200&q=80",
    alt: "Gold necklace styling",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
    alt: "Gold bangles detail",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=1200&q=80",
    alt: "Diamond pendant",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80",
    alt: "Silver pendant styling",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1612177343582-665b6b11d2b8?w=1200&q=80",
    alt: "Silver hoops",
    span: "tall",
  },
] as const;

export const contactChannels = [
  { label: "Studio email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { label: "Private line", value: siteConfig.contact.phoneDisplay, href: `tel:${siteConfig.contact.phoneE164}` },
  {
    label: "WhatsApp",
    value: "Start chat",
    href: getWhatsAppUrl("Hello MB Jewellers, I would like to book an appointment."),
  },
  { label: "Visiting hours", value: "Mon–Sat, 10:00 AM – 7:00 PM" },
  { label: "Instagram", value: "@mbjewellerssikar", href: socialLinks.instagram },
] as const;

export function slugifyProductName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const premiumProductsBySlug = Object.fromEntries(
  featuredPieces.map((piece) => [slugifyProductName(piece.name), piece]),
);

export const premiumCollections = categoryShowcase;
export const premiumCategoryShowcase = categoryShowcase;
export const premiumTestimonialItems = premiumTestimonials;
