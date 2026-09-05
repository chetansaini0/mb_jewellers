import { galleryItems, premiumTestimonials } from "@/app/lib/premiumContent";
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
    question: "Where is MB Jewellers located in Sikar?",
    answer:
      "MB Jewellers has two showrooms in Sikar, Rajasthan: Ghantaghar Showroom at Purana Dujod Gate, Ghantaghar, and Ramlila Maidan Showroom at Ramlila Maidan. Use the Contact page for maps, phone numbers, and directions.",
  },
  {
    question: "How do I choose a trusted jewellery shop in Sikar?",
    answer:
      "Compare hallmark documentation for gold, certification for diamonds, clear pricing conversations in person, after-care support, and whether the team understands bridal and family occasions. MB Jewellers operates two Sikar showrooms with private viewings for gold, diamond, silver, and bridal jewellery — purchases are completed in studio, not online.",
  },
  {
    question: "Why do families choose MB Jewellers for jewellery in Sikar and Shekhawati?",
    answer:
      "Families across Sikar and the Shekhawati region visit MB Jewellers for hallmarked gold, certified diamonds, bridal suite curation, and calm private consultations. With showrooms at Ghantaghar and Ramlila Maidan, we serve customers from Fatehpur, Laxmangarh, Neem Ka Thana, Jhunjhunu, Churu, and nearby towns who prefer in-person selection before buying.",
  },
  {
    question: "Is MB Jewellers a good jewellery store for bridal and wedding jewellery in Sikar?",
    answer:
      "Yes. Our bridal studio helps with engagement, wedding-day, and reception styling — including full suites or individual statement pieces. Book a bridal appointment through the Contact page so we can prepare shortlists before you visit.",
  },
  {
    question: "What are MB Jewellers' opening hours?",
    answer:
      "Our showrooms are open Monday to Saturday, 10:00 AM to 7:00 PM. Sundays are typically closed unless a private appointment is confirmed in advance.",
  },
  {
    question: "How can I contact MB Jewellers?",
    answer:
      "Call our Ghantaghar showroom on 01572 491103, or the Ramlila Maidan lines on 01572 409431 / 01572 250061. You can also email mbjeweller21@gmail.com or use the contact form on this website.",
  },
  {
    question: "What types of jewellery does MB Jewellers offer?",
    answer:
      "We showcase gold, diamond, silver, bridal and wedding jewellery, plus silver accessories. Categories include sets, necklaces, rings, earrings, bangles, bracelets, chains, and custom atelier work.",
  },
  {
    question: "Can I buy jewellery on this website?",
    answer:
      "No. This website is a showcase to explore our collections. Pricing, availability, and purchase happen in studio during a private consultation.",
  },
  {
    question: "Do you offer custom jewellery?",
    answer:
      "Yes. From heirloom resets to bespoke bridal suites, our atelier guides you through design, prototyping, and finishing.",
  },
  {
    question: "What purity standards do you follow?",
    answer:
      "Gold is hallmarked and diamonds are certified. We document material notes and finishing standards for every major purchase.",
  },
  {
    question: "Should I choose 22K or 18K gold jewellery in Sikar?",
    answer:
      "22K is often preferred for traditional bridal and festive jewellery because of its warm colour; 18K is harder and frequently chosen for contemporary or high-detail settings. Compare hallmark, comfort, and occasion in a private viewing at MB Jewellers before you decide.",
  },
  {
    question: "Do you provide after-care support?",
    answer:
      "Our studio offers cleaning guidance, resizing conversations, and restoration support for MB pieces over time.",
  },
  {
    question: "Do you serve customers from outside Sikar?",
    answer:
      "Yes. Families regularly visit from across the Shekhawati region — including towns such as Fatehpur, Laxmangarh, Neem Ka Thana, Jhunjhunu, Churu, Khandela, Ringas, and Danta Ramgarh — for private jewellery viewings in Sikar.",
  },
] as const;

export const blogPosts = [
  {
    slug: "bridal-suite-curation",
    title: "How to curate a bridal suite that feels inevitable",
    excerpt:
      "A calm approach to balancing necklace weight, earring presence, and ceremony lighting — for weddings planned in Sikar and across Shekhawati.",
    image: "/pics/Bridal/b1.jpg",
    date: "April 2026",
    datePublished: "2026-04-10",
    category: "Bridal",
    body: [
      "Bridal jewellery works best when every piece has a job: framing the face, anchoring the neckline, or catching movement in photographs. Start with the ceremony that needs the strongest silhouette, then build lighter accents for other functions.",
      "In our Sikar bridal studio, we often begin with necklace proportion — length, density, and how the piece sits against your outfit fabric — before choosing earrings and bangles that support rather than compete.",
      "If you are travelling from nearby Shekhawati towns for a private viewing, share your dates, venues, and outfit palette in advance so we can shortlist suites that suit your timeline and comfort.",
    ],
    relatedLinks: [
      { href: "/bridal", label: "Bridal jewellery consultations" },
      { href: "/collections/gold", label: "Gold jewellery in Sikar" },
      { href: "/contact", label: "Book a bridal appointment" },
    ],
  },
  {
    slug: "gold-finish-language",
    title: "Reading gold finish like a jeweller",
    excerpt:
      "Warm polish, satin glow, and filigree shadow — the details that change how gold feels on skin and photographs in daylight.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80",
    date: "March 2026",
    datePublished: "2026-03-12",
    category: "Gold",
    body: [
      "Gold jewellery is not only about karat. Finish changes how light moves across a surface — high polish for mirror sparkle, satin for soft glow, and textured filigree for shadow depth that reads beautifully in person.",
      "When you visit MB Jewellers in Sikar, ask to see the same silhouette in different finishes under salon lighting and near a window. The piece you love under showcase spots may feel different in natural daylight.",
      "Hallmark documentation and clear weight notes help you compare options without guesswork. Use this website to shortlist styles, then confirm purity and finish in studio before purchase.",
    ],
    relatedLinks: [
      { href: "/collections/gold", label: "Gold jewellery collection" },
      { href: "/collections/gold/bangles", label: "Gold bangles" },
      { href: "/faq", label: "Purity and hallmark FAQ" },
    ],
  },
  {
    slug: "diamond-fire-in-daylight",
    title: "Why diamond fire matters beyond the showcase",
    excerpt:
      "Selecting diamond jewellery for movement, daylight, and the emotional rhythm of real celebrations — not only showcase brilliance.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
    date: "February 2026",
    datePublished: "2026-02-18",
    category: "Diamond",
    body: [
      "Diamond fire is the play of colour and sparkle you notice when a stone moves. Showcase lighting can exaggerate it; daylight and evening venues tell a more honest story.",
      "For engagement rings and reception pieces, we look at how settings protect the stone, how the piece sits on the hand, and whether sparkle remains balanced when you gesture or dance.",
      "Browse diamond sets, rings, and earrings on this site, then book a private viewing in Sikar to compare certified options side by side.",
    ],
    relatedLinks: [
      { href: "/collections/diamond", label: "Diamond jewellery in Sikar" },
      { href: "/collections/diamond/rings", label: "Diamond rings" },
      { href: "/contact", label: "Request a private viewing" },
    ],
  },
  {
    slug: "choosing-gold-jewellery-in-sikar",
    title: "How to choose gold jewellery in Sikar",
    excerpt:
      "A practical guide for families shopping for gold jewellery in Sikar — occasion, purity, comfort, and what to bring to a showroom appointment.",
    image: "/pics/signature-worlds/gold-cinematic-lighting.png",
    date: "August 2026",
    datePublished: "2026-08-07",
    category: "Gold",
    body: [
      "Choosing gold jewellery starts with the occasion: daily wear, festive gifting, or bridal ceremonies each need different weight, length, and finishing. Write down who will wear the piece and for how many hours — comfort matters as much as design.",
      "In Sikar, ask for hallmark confirmation and a clear explanation of purity, making charges, and exchange policies before you decide. A calm private viewing helps you compare options without rush.",
      "At MB Jewellers, you can explore gold sets, Ranihaar, Rajputi profiles, bangles, chains, and rings online, then visit our Ghantaghar or Ramlila Maidan showroom to feel the pieces in person.",
      "If you are coming from another Shekhawati town, book ahead so consultants can prepare a shortlist aligned with your budget range and ceremony calendar.",
    ],
    relatedLinks: [
      { href: "/collections/gold", label: "Gold jewellery in Sikar" },
      { href: "/collections/gold/sets", label: "Gold sets" },
      { href: "/contact", label: "Visit our Sikar showrooms" },
    ],
  },
  {
    slug: "trusted-jewellery-shop-in-sikar",
    title: "How to choose a trusted jewellery shop in Sikar",
    excerpt:
      "What to check before you buy gold, diamond, or bridal jewellery in Sikar — and how Shekhawati families evaluate a showroom visit.",
    image: "/pics/signature-worlds/diamond-cinematic-lighting.png",
    date: "September 2026",
    datePublished: "2026-09-05",
    category: "Guide",
    body: [
      "Searching for the best jewellery store in Sikar usually means looking for trust signals: hallmarked gold, certified diamonds, transparent documentation, and consultants who understand bridal and family occasions — not only showcase sparkle.",
      "Visit more than one counter if you can, and compare how clearly each team explains purity, making charges, exchange policies, and after-care. A calm private viewing is often more useful than a crowded rush purchase.",
      "MB Jewellers is a jewellery showroom with two Sikar locations — Ghantaghar and Ramlila Maidan — serving families from across the Shekhawati region, including Fatehpur, Laxmangarh, Neem Ka Thana, Jhunjhunu, and Churu. We showcase gold, diamond, silver, and bridal jewellery online; purchases happen in person.",
      "Bring your occasion list, outfit references, and any heirloom pieces you want to match. Book ahead so the team can prepare a shortlist before you travel.",
    ],
    relatedLinks: [
      { href: "/faq", label: "Jewellery shop FAQ" },
      { href: "/about", label: "About MB Jewellers" },
      { href: "/contact", label: "Book a private viewing" },
    ],
  },
  {
    slug: "bridal-jewellery-buying-guide",
    title: "Bridal jewellery buying guide for Shekhawati weddings",
    excerpt:
      "How to plan bridal and wedding jewellery around multiple functions — with practical tips for families shopping in Sikar.",
    image: "/pics/Bridal/b2.jpg",
    date: "August 2026",
    datePublished: "2026-08-07",
    category: "Bridal",
    body: [
      "Shekhawati weddings often span engagement, wedding day, reception, and family rituals. Map jewellery to each chapter so the heaviest suite appears where photographs and ceremony lighting matter most.",
      "Bring outfit colours, neckline references, and any heirloom pieces you want to mix. Mixing family gold with new designs is common — and works best when proportions are planned together.",
      "MB Jewellers offers bridal consultations in Sikar for full suites or individual statement pieces. Use the bridal page to understand our process, then book an appointment with your dates ready.",
    ],
    relatedLinks: [
      { href: "/bridal", label: "Bridal jewellery in Sikar" },
      { href: "/collections/diamond/sets", label: "Diamond bridal sets" },
      { href: "/faq", label: "Bridal appointment FAQ" },
    ],
  },
  {
    slug: "22k-vs-18k-gold-jewellery",
    title: "22K vs 18K gold jewellery — what to choose in Sikar",
    excerpt:
      "A clear comparison of 22K and 18K gold for daily wear, gifting, and bridal jewellery — with practical tips for showroom visits in Sikar.",
    image: "/pics/signature-worlds/gold-cinematic-lighting.png",
    date: "September 2026",
    datePublished: "2026-09-05",
    category: "Gold",
    body: [
      "Families shopping for gold jewellery in Sikar often ask whether 22K or 18K is “better.” The useful answer depends on occasion, comfort, and how the piece will be worn — not a single rule for everyone.",
      "22K gold (around 91.6% pure) is widely preferred for traditional Indian bridal and festive jewellery because of its warm colour and cultural familiarity. It is softer than lower-karat alloys, so heavy daily wear designs need thoughtful making and care.",
      "18K gold (75% pure) is harder and often chosen for intricate contemporary settings, especially where durability and fine detailing matter. Colour is slightly lighter; many clients still love it for rings and modern silhouettes.",
      "At MB Jewellers in Sikar, ask to see hallmark confirmation, weight notes, and finishing side by side under salon light. Shortlist online from our gold collection, then confirm karat, comfort, and making details in person at Ghantaghar or Ramlila Maidan before you buy.",
    ],
    relatedLinks: [
      { href: "/collections/gold", label: "Gold jewellery in Sikar" },
      { href: "/blog/choosing-gold-jewellery-in-sikar", label: "How to choose gold jewellery" },
      { href: "/contact", label: "Book a private viewing" },
    ],
  },
  {
    slug: "how-to-check-gold-purity-hallmark",
    title: "How to check gold purity and hallmark in Sikar",
    excerpt:
      "What hallmark marks mean, which questions to ask at a jewellery showroom, and how Shekhawati families can shop with more confidence.",
    image: "/pics/signature-worlds/gold-cinematic-lighting.png",
    date: "September 2026",
    datePublished: "2026-09-12",
    category: "Guide",
    body: [
      "When you visit a jewellery shop in Sikar, purity documentation should be part of the conversation — not an afterthought. Hallmarking helps confirm that gold content matches the karat claimed on the piece.",
      "Ask to see the hallmark marks and a clear explanation of karat, weight, and making charges. A trustworthy jeweller will walk you through the paperwork calmly and answer exchange or buyback questions without pressure.",
      "Bring a written list of what you need (bridal suite, daily bangles, gifting) so purity choices stay tied to use. Heavier ceremonial pieces and lighter daily wear may follow different comfort priorities even at the same karat.",
      "MB Jewellers follows hallmarked gold standards and welcomes private viewings at our two Sikar showrooms. Explore styles on this website, then verify purity and finish in person — especially if you are travelling from Fatehpur, Laxmangarh, Jhunjhunu, or other Shekhawati towns.",
    ],
    relatedLinks: [
      { href: "/faq", label: "Purity and hallmark FAQ" },
      { href: "/collections/gold", label: "Gold jewellery collection" },
      { href: "/blog/trusted-jewellery-shop-in-sikar", label: "Choosing a trusted jeweller" },
    ],
  },
  {
    slug: "jewellery-care-guide",
    title: "Jewellery care guide for daily wear and bridal suites",
    excerpt:
      "Simple care habits that protect gold, diamond, and silver jewellery between celebrations — written for families who shop in Sikar.",
    image: "/pics/Bridal/b1.jpg",
    date: "September 2026",
    datePublished: "2026-09-19",
    category: "Care",
    body: [
      "Good jewellery care starts with storage and chemistry. Keep pieces dry, separate chains from stones to avoid tangling and scratches, and remove jewellery before swimming, heavy cleaning, or applying perfume and lotions.",
      "Bridal and festive suites need a little extra planning: pack soft pouches for travel between functions, check clasps before ceremonies, and schedule a gentle clean after the wedding week so filigree and settings stay bright.",
      "Silver can tarnish with air and moisture — a soft cloth and dry storage help between wears. Diamonds look their best when the setting is free of lotion film; a professional clean before major events makes a visible difference.",
      "MB Jewellers offers cleaning guidance and after-care conversations for pieces purchased at our Sikar showrooms. If a clasp loosens or an heirloom needs assessment, book a private visit rather than forcing a repair at home.",
    ],
    relatedLinks: [
      { href: "/services", label: "Atelier and after-care" },
      { href: "/bridal", label: "Bridal jewellery in Sikar" },
      { href: "/contact", label: "Visit MB Jewellers" },
    ],
  },
] as const;

export { galleryItems };

const showroomPhoneChannels = siteConfig.showrooms.flatMap((showroom) =>
  showroom.landlines.map((line, index) => ({
    label: index === 0 ? showroom.name : `${showroom.name} (line ${index + 1})`,
    value: line.display,
    href: `tel:${line.e164}`,
  })),
);

const whatsappChannel = (() => {
  const href = getWhatsAppUrl("Hello MB Jewellers, I would like to book an appointment.");
  return href ? [{ label: "WhatsApp", value: "Start chat", href }] : [];
})();

export const contactChannels = [
  { label: "Studio email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  ...showroomPhoneChannels,
  ...whatsappChannel,
  { label: "Visiting hours", value: siteConfig.openingHours.display },
  { label: "Instagram", value: "@mbjewellerssikar", href: socialLinks.instagram },
];

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
