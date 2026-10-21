export type SeoHubCard = {
  href: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type SeoHubPage = {
  path: string;
  eyebrow: string;
  h1: string;
  lede: string;
  paragraphs: readonly string[];
  sectionTitle: string;
  sectionSubtitle: string;
  cards: readonly SeoHubCard[];
  faqs: readonly { question: string; answer: string }[];
  related: readonly { href: string; label: string }[];
  ctaTitle: string;
  ctaCopy: string;
};

export const weddingHub: SeoHubPage = {
  path: "/wedding",
  eyebrow: "Wedding collection",
  h1: "Wedding jewellery in Sikar",
  lede:
    "Gold, diamond and silver jewellery for wedding ceremonies, family gifting and reception styling — selected in private appointments at MB Jewellers in Sikar.",
  paragraphs: [
    "Wedding jewellery in Sikar is rarely a single necklace. Most families plan across functions: engagement, pheras, reception and vidai. MB Jewellers helps you map weight and sparkle to each chapter so the suite photographs well and still feels comfortable through long rituals.",
    "Browse gold sets, diamond highlights and silver ornaments on this site, then visit our jewellery showroom to compare finishing, hallmark notes and how pieces sit with your outfits. Purchases are completed in person — not online.",
    "If you are travelling from another Shekhawati town, share dates and outfit references when you book so consultants can prepare a wedding jewellery shortlist before you arrive.",
  ],
  sectionTitle: "Start with the pieces your wedding will actually wear",
  sectionSubtitle: "Open gold, diamond, silver or bridal collections, then book a viewing at our Sikar showrooms.",
  cards: [
    {
      href: "/bridal",
      title: "Bridal jewellery studio",
      description: "Full-suite consultations for engagement, wedding day and reception.",
      image: "/pics/Bridal/b1.jpg",
      alt: "Bridal jewellery styling at MB Jewellers in Sikar",
    },
    {
      href: "/collections/gold",
      title: "Gold wedding jewellery",
      description: "Sets, Ranihaar, chokars, bangles and ceremonial gold profiles.",
      image: "/pics/studio/gold-bridal-pendant-set.jpg",
      alt: "Gold bridal pendant set at MB Jewellers, Sikar",
    },
    {
      href: "/collections/diamond",
      title: "Diamond wedding jewellery",
      description: "Diamond sets, rings and drops for reception and evening light.",
      image: "/pics/studio/diamond-floral-necklace-set.jpg",
      alt: "Diamond necklace set at MB Jewellers, Sikar",
    },
    {
      href: "/new-arrivals",
      title: "Latest jewellery designs",
      description: "New gold, diamond and silver silhouettes currently in the atelier.",
      image: "/pics/new-arrivals/gold5-main.png",
      alt: "Latest gold jewellery design at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "Do you sell wedding jewellery online?",
      answer:
        "No. This website is a showcase. Wedding jewellery at MB Jewellers is selected and purchased in person at our Sikar showrooms after a private consultation.",
    },
    {
      question: "How is wedding jewellery different from bridal jewellery here?",
      answer:
        "Bridal jewellery focuses on the bride’s suite and ceremony styling. Wedding jewellery also covers family gifting, groomside pieces, reception diamonds and shared gold that relatives may wear across functions.",
    },
  ],
  related: [
    { href: "/bridal", label: "Bridal jewellery in Sikar" },
    { href: "/collections/gold", label: "Gold jewellery shop" },
    { href: "/blog/how-to-choose-bridal-jewellery-in-sikar", label: "Bridal jewellery guide" },
    { href: "/contact", label: "Book a wedding viewing" },
  ],
  ctaTitle: "Plan your wedding jewellery visit",
  ctaCopy:
    "Share your ceremony dates and metal preferences. Our Sikar team will prepare wedding jewellery options for a calm, appointment-led viewing.",
};

export const ringsHub: SeoHubPage = {
  path: "/rings",
  eyebrow: "Rings",
  h1: "Gold and diamond rings in Sikar",
  lede:
    "Engagement rings, daily-wear bands and statement gold rings — viewed in person at MB Jewellers, a jewellery showroom in Sikar.",
  paragraphs: [
    "Rings are among the most personal pieces we show. Gold rings in Sikar are often chosen for tradition and daily comfort; diamond rings are chosen for sparkle, setting security and how the stone reads in daylight — not only under showcase lights.",
    "MB Jewellers does not list live prices online. Compare profiles on this page, then visit our showroom so you can try size, weight and finish before you decide.",
  ],
  sectionTitle: "Open ring collections by metal",
  sectionSubtitle: "Each gallery leads into gold, diamond or silver rings available for private viewing in Sikar.",
  cards: [
    {
      href: "/collections/gold/rings",
      title: "Gold rings in Sikar",
      description: "Bands, signets and cocktail silhouettes in warm yellow gold.",
      image: "/pics/studio/gold-coin-ranihaar.jpg",
      alt: "Heritage gold jewellery at MB Jewellers, Sikar",
    },
    {
      href: "/collections/diamond/rings",
      title: "Diamond rings in Sikar",
      description: "Solitaires, halos and stackable diamond rings for studio comparison.",
      image: "/pics/studio/diamond-emerald-leaf-set.jpg",
      alt: "Emerald and diamond jewellery at MB Jewellers, Sikar",
    },
    {
      href: "/collections/silver/rings",
      title: "Silver rings",
      description: "Bright sterling bands and signets for gifting and everyday wear.",
      image: "/pics/new-arrivals/silver8-main.png",
      alt: "Silver jewellery at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "Can I get a ring resized after purchase?",
      answer:
        "Resizing depends on the design and metal. Discuss fit during your Sikar viewing so the team can advise before you buy. After-care conversations are part of studio service for MB pieces.",
    },
  ],
  related: [
    { href: "/bridal", label: "Bridal jewellery" },
    { href: "/daily-wear", label: "Daily wear jewellery" },
    { href: "/blog/diamond-jewellery-buying-guide", label: "Diamond buying guide" },
    { href: "/contact", label: "Book a ring viewing" },
  ],
  ctaTitle: "Try rings in salon light",
  ctaCopy: "A short appointment in Sikar is the clearest way to compare gold rings and diamond rings side by side.",
};

export const earringsHub: SeoHubPage = {
  path: "/earrings",
  eyebrow: "Earrings",
  h1: "Earrings in Sikar — gold, diamond and silver",
  lede:
    "Jhumkas, drops, studs and hoops from MB Jewellers. Shortlist earrings online, then confirm weight and movement at our Sikar jewellery shop.",
  paragraphs: [
    "Earring comfort matters as much as design. Heavy bridal jhumkas, lightweight daily studs and diamond drops each sit differently on the ear. In our Sikar showrooms we check balance, clasp security and how the pair frames your face and hairstyle.",
    "Gold, diamond and silver earring galleries below are showcase selections. Availability is confirmed in person.",
  ],
  sectionTitle: "Earring galleries by metal",
  sectionSubtitle: "Open a metal world, then book a private viewing to try pairs in person.",
  cards: [
    {
      href: "/collections/gold/earrings",
      title: "Gold earrings",
      description: "Jhumkas, chandbalis and studs finished for ceremony light.",
      image: "/pics/studio/gold-temple-choker-set.jpg",
      alt: "Gold jhumka set at MB Jewellers, Sikar",
    },
    {
      href: "/collections/diamond/earrings",
      title: "Diamond earrings",
      description: "Studs, drops and chandeliers selected for balanced sparkle.",
      image: "/pics/studio/diamond-emerald-drop-set.jpg",
      alt: "Diamond drop earrings at MB Jewellers, Sikar",
    },
    {
      href: "/collections/silver/earrings",
      title: "Silver earrings",
      description: "Hoops, studs and drops with lightweight silver profiles.",
      image: "/pics/new-arrivals/silver6-main.png",
      alt: "Silver jhumka earrings at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "Are earrings sold as pairs only?",
      answer:
        "Showcased earrings are presented as pairs. Matching or mixing with a necklace or bridal suite is something we plan during your Sikar appointment.",
    },
  ],
  related: [
    { href: "/bridal", label: "Bridal jewellery" },
    { href: "/necklaces", label: "Necklaces in Sikar" },
    { href: "/contact", label: "Book an earring viewing" },
  ],
  ctaTitle: "See earrings move in person",
  ctaCopy: "Book a private viewing in Sikar to check weight, clasp type and how each pair photographs.",
};

export const necklacesHub: SeoHubPage = {
  path: "/necklaces",
  eyebrow: "Necklaces",
  h1: "Necklaces in Sikar — gold, diamond and silver",
  lede:
    "Chokars, Ranihaar, pendants and collars at MB Jewellers. Necklace shopping in Sikar works best when you can try length against your neckline in the showroom.",
  paragraphs: [
    "Necklace proportion is the foundation of most bridal and festive looks. A gold chokar, a long Ranihaar and a diamond pendant solve different outfit problems. We help you match length, density and clasp comfort to the functions you will actually attend.",
    "Explore the galleries below, then visit our jewellery showroom in Sikar to see how each necklace sits — purchases remain in person.",
  ],
  sectionTitle: "Necklace collections",
  sectionSubtitle: "Gold, diamond and silver necklace sections from the MB Jewellers Sikar catalogue.",
  cards: [
    {
      href: "/collections/gold/necklaces",
      title: "Gold necklaces",
      description: "Chokars, collars and layered chains in warm gold tones.",
      image: "/pics/studio/gold-kundan-choker-set.jpg",
      alt: "Gold kundan choker set at MB Jewellers, Sikar",
    },
    {
      href: "/collections/gold/ranihaar",
      title: "Ranihaar",
      description: "Long ceremonial gold necklaces with regal drape.",
      image: "/pics/studio/gold-ranihaar-cinematic.jpg",
      alt: "Gold ranihaar at MB Jewellers, Sikar",
    },
    {
      href: "/collections/diamond/necklaces",
      title: "Diamond necklaces",
      description: "Pendants and collar styles from minimal halos to statement drops.",
      image: "/pics/signature-worlds/diamond-cinematic-lighting.png",
      alt: "Diamond necklace at MB Jewellers, Sikar",
    },
    {
      href: "/collections/silver/necklaces",
      title: "Silver necklaces",
      description: "Minimal chains to ornate collars in polished sterling.",
      image: "/pics/signature-worlds/silver-cinematic-lighting.png",
      alt: "Silver necklace at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "Can necklaces be shortened or layered?",
      answer:
        "Many clients layer a chokar with a longer haar. Length adjustments depend on the design. Bring outfit necklines to your Sikar appointment so we can plan proportion together.",
    },
  ],
  related: [
    { href: "/bridal", label: "Bridal jewellery" },
    { href: "/earrings", label: "Earrings" },
    { href: "/contact", label: "Book a necklace viewing" },
  ],
  ctaTitle: "Try necklace length in studio",
  ctaCopy: "A private viewing in Sikar is the surest way to match necklace drape to your outfits.",
};

export const banglesHub: SeoHubPage = {
  path: "/bangles",
  eyebrow: "Bangles",
  h1: "Gold and silver bangles in Sikar",
  lede:
    "Bridal stacks, kada profiles and daily-wear rounds at MB Jewellers. Bangles are chosen for fit, sound and how they sit with your other jewellery.",
  paragraphs: [
    "Bangle shopping in Sikar is easier in person: size, stacking height and comfort through a full ceremony cannot be judged from photographs alone. MB Jewellers shows gold bangles and silver bangles in the showroom so you can test fit before purchase.",
    "Bridal pairs are often planned with matching necklaces and earrings. Daily-wear rounds are kept lighter. Tell us how many hours you will wear them.",
  ],
  sectionTitle: "Bangle galleries",
  sectionSubtitle: "Open gold or silver bangle sections, then visit our Sikar jewellery showroom to confirm size.",
  cards: [
    {
      href: "/collections/gold/bangles",
      title: "Gold bangles in Sikar",
      description: "Classic rounds, kada profiles and stacked bridal pairs.",
      image: "/pics/studio/gold-bead-necklace.jpg",
      alt: "Gold jewellery at MB Jewellers, Sikar",
    },
    {
      href: "/collections/silver/bangles",
      title: "Silver bangles",
      description: "Slim stacks, engraved rounds and kada profiles in sterling.",
      image: "/pics/new-arrivals/silver6-main.png",
      alt: "Silver jewellery suite at MB Jewellers, Sikar",
    },
    {
      href: "/bridal",
      title: "Bridal bangle styling",
      description: "Bangles planned as part of a full bridal or wedding suite.",
      image: "/pics/Bridal/b4.jpg",
      alt: "Bridal bangles and hand jewellery at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "How do I know my bangle size?",
      answer:
        "The most reliable method is a showroom fitting. If you already wear a comfortable pair, bring them to MB Jewellers in Sikar so we can match inner diameter and stacking height.",
    },
  ],
  related: [
    { href: "/collections/gold", label: "Gold jewellery" },
    { href: "/daily-wear", label: "Daily wear jewellery" },
    { href: "/contact", label: "Book a bangle fitting" },
  ],
  ctaTitle: "Fit bangles in the showroom",
  ctaCopy: "Book a Sikar appointment to check size, stack height and how bangles sit with your suite.",
};

export const dailyWearHub: SeoHubPage = {
  path: "/daily-wear",
  eyebrow: "Daily wear",
  h1: "Daily wear jewellery in Sikar",
  lede:
    "Lighter gold, diamond and silver jewellery for work, gifting and everyday styling — selected at MB Jewellers in Sikar with comfort as the first filter.",
  paragraphs: [
    "Daily wear jewellery in Sikar should survive office hours, errands and the occasional function without feeling heavy. We typically start with lighter chains, modest earrings, slim bangles and simple rings, then step up only if you want more presence.",
    "Hallmarked gold and well-finished silver both work for everyday wear; diamond pieces for daily use are chosen for setting security as much as sparkle. Confirm comfort in our jewellery showroom before you buy.",
  ],
  sectionTitle: "Everyday starting points",
  sectionSubtitle: "Open lighter collections, then visit MB Jewellers to compare wearability in person.",
  cards: [
    {
      href: "/collections/gold/chains",
      title: "Gold chains",
      description: "Layering chains and everyday gold lines for simple styling.",
      image: "/pics/studio/gold-layered-chain.jpg",
      alt: "Layered gold chain at MB Jewellers, Sikar",
    },
    {
      href: "/collections/gold/rings",
      title: "Gold rings",
      description: "Bands and everyday gold rings shaped for regular wear.",
      image: "/pics/studio/gold-coin-ranihaar.jpg",
      alt: "Gold jewellery at MB Jewellers, Sikar",
    },
    {
      href: "/collections/silver",
      title: "Silver jewellery",
      description: "Polished silver ornaments and lightweight daily silver pieces.",
      image: "/pics/signature-worlds/silver-cinematic-lighting.png",
      alt: "Silver necklace at MB Jewellers, Sikar",
    },
    {
      href: "/collections/diamond/earrings",
      title: "Diamond studs and drops",
      description: "Smaller diamond earrings for evening-to-everyday rotation.",
      image: "/pics/studio/diamond-emerald-drop-set.jpg",
      alt: "Diamond earrings at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "Is daily-wear gold always 22K?",
      answer:
        "Not always. Many families still prefer 22K for colour; others choose 18K for durability on rings. Compare hallmark, comfort and occasion during a private viewing at MB Jewellers in Sikar.",
    },
  ],
  related: [
    { href: "/blog/daily-wear-jewellery-trends-in-sikar", label: "Daily-wear trends" },
    { href: "/blog/22k-vs-18k-gold-jewellery", label: "22K vs 18K gold" },
    { href: "/contact", label: "Book a daily-wear viewing" },
  ],
  ctaTitle: "Shortlist daily-wear pieces",
  ctaCopy: "Tell us your routine and metal preference. We will prepare lighter jewellery options for your Sikar visit.",
};

export const newArrivalsHub: SeoHubPage = {
  path: "/new-arrivals",
  eyebrow: "New arrivals",
  h1: "Latest jewellery designs in Sikar",
  lede:
    "A current edit of gold, diamond and silver silhouettes at MB Jewellers. New arrivals are shown for private studio viewing — availability is confirmed in person.",
  paragraphs: [
    "The latest jewellery designs in Sikar at MB Jewellers mix heritage filigree with cleaner contemporary lines. Use this page as a shortlist, then see movement and finish under salon lighting at our jewellery showroom.",
    "Pieces rotate. If a silhouette has moved, consultants will offer close alternatives during your appointment rather than promising stock from a photograph.",
  ],
  sectionTitle: "Currently featured in the atelier",
  sectionSubtitle: "Open a piece to read more, then request a private viewing in Sikar.",
  cards: [
    {
      href: "/products/emerald-diamond-set",
      title: "Emerald Diamond Set",
      description: "Diamond set with emerald accents and matching earrings.",
      image: "/pics/new-arrivals/diamond1-main.png",
      alt: "Emerald diamond necklace set at MB Jewellers, Sikar",
    },
    {
      href: "/products/heritage-filigree-chokar",
      title: "Heritage Filigree Chokar",
      description: "Heritage-inspired gold chokar with floral filigree work.",
      image: "/pics/new-arrivals/heritage-filigree-main.png",
      alt: "Gold filigree chokar at MB Jewellers, Sikar",
    },
    {
      href: "/products/royal-gold-chokar-set",
      title: "Royal Gold Chokar Set",
      description: "Layered gold chokar for bridal and festive styling.",
      image: "/pics/new-arrivals/gold5-main.png",
      alt: "Royal gold chokar set at MB Jewellers, Sikar",
    },
    {
      href: "/products/rajwada-pearl-silver-suite",
      title: "Rajwada Pearl Silver Suite",
      description: "Oxidised silver suite with pearl strands and jhumkas.",
      image: "/pics/new-arrivals/silver6-main.png",
      alt: "Silver jewellery suite at MB Jewellers, Sikar",
    },
  ],
  faqs: [
    {
      question: "Are new arrivals available to buy online?",
      answer:
        "No. MB Jewellers is a showcase website. Latest jewellery designs are reserved and purchased during an in-person visit to our Sikar showrooms.",
    },
  ],
  related: [
    { href: "/collections", label: "All collections" },
    { href: "/wedding", label: "Wedding jewellery" },
    { href: "/contact", label: "Request a viewing" },
  ],
  ctaTitle: "See new arrivals in person",
  ctaCopy: "Book a private appointment in Sikar to view the latest gold, diamond and silver designs under salon light.",
};

export const seoHubPages = {
  wedding: weddingHub,
  rings: ringsHub,
  earrings: earringsHub,
  necklaces: necklacesHub,
  bangles: banglesHub,
  dailyWear: dailyWearHub,
  newArrivals: newArrivalsHub,
} as const;
