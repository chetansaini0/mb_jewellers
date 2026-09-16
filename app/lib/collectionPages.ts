import type { CategoryShowcaseItem } from "@/app/lib/siteData";

/**
 * Collection subsection pages: same card grid as `/collections`.
 * Covers use owned MB Jewellers photography (studio stills and signature worlds).
 */
export const SECTION_COVER_PLACEHOLDER = "/pics/studio/gold-temple-choker-set.jpg";

export type CollectionSubsection = {
  id: string;
  title: string;
  description: string;
  /** Hero image on the section card — defaults to SECTION_COVER_PLACEHOLDER if omitted */
  coverImage?: string;
  coverAlt: string;
};

export type CollectionPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  sections: CollectionSubsection[];
};

/** Diamond — 5 sections */
export const diamondCollectionPage: CollectionPageConfig = {
  eyebrow: "Diamond",
  title: "Diamond Jewellery in Sikar",
  description:
    "Explore diamond sets, necklaces, rings, earrings, and bracelets at MB Jewellers in Sikar — open a section below, then view finishing in a private studio appointment.",
  sections: [
    {
      id: "sets",
      title: "Sets",
      description: "Coordinated diamond suites for engagements, receptions, and milestones.",
      coverImage: "/pics/studio/diamond-floral-necklace-set.jpg",
      coverAlt: "Diamond necklace and earring set at MB Jewellers, Sikar",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Pendants and collar styles from minimal halos to statement drops.",
      coverImage: "/pics/signature-worlds/diamond-cinematic-lighting.png",
      coverAlt: "Diamond necklace at MB Jewellers, Sikar",
    },
    {
      id: "rings",
      title: "Rings",
      description: "Solitaires, bands, and halo stacks with elevated finishing.",
      coverImage: "/pics/studio/diamond-emerald-leaf-set.jpg",
      coverAlt: "Emerald and diamond jewellery at MB Jewellers, Sikar",
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Studs, drops, and chandeliers engineered for balanced sparkle.",
      coverImage: "/pics/studio/diamond-emerald-drop-set.jpg",
      coverAlt: "Diamond drop earrings at MB Jewellers, Sikar",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      description: "Tennis lines and flexible cuffs that move with you.",
      coverImage: "/pics/studio/diamond-tennis-necklace.jpg",
      coverAlt: "Diamond line jewellery at MB Jewellers, Sikar",
    },
  ],
};

/** Gold — 9 sections */
export const goldCollectionPage: CollectionPageConfig = {
  eyebrow: "Gold",
  title: "Gold Jewellery in Sikar",
  description:
    "Traditional and contemporary gold jewellery for Sikar and Shekhawati families — bridal sets, Ranihaar, Rajputi silhouettes, bangles, chains, and rings.",
  sections: [
    {
      id: "sets",
      title: "Sets",
      description: "Complete necklace and earring suites for weddings and festive calendars.",
      coverImage: "/pics/studio/gold-bridal-pendant-set.jpg",
      coverAlt: "Gold bridal pendant set at MB Jewellers, Sikar",
    },
    {
      id: "ranihaar",
      title: "Ranihaar",
      description: "Long ceremonial necklaces with regal drape and intricate detailing.",
      coverImage: "/pics/studio/gold-ranihaar-cinematic.jpg",
      coverAlt: "Gold ranihaar at MB Jewellers, Sikar",
    },
    {
      id: "rajputi",
      title: "Rajputi",
      description: "Signature Rajputi profiles with bold geometry and heritage relief.",
      coverImage: "/pics/studio/gold-temple-choker-set.jpg",
      coverAlt: "Temple gold choker set at MB Jewellers, Sikar",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Chokars, collars, and layered chains in warm gold tones.",
      coverImage: "/pics/studio/gold-kundan-choker-set.jpg",
      coverAlt: "Gold kundan choker set at MB Jewellers, Sikar",
    },
    {
      id: "bangles",
      title: "Bangles",
      description: "Classic rounds, kada profiles, and stacked bridal pairs.",
      coverImage: "/pics/studio/gold-bead-necklace.jpg",
      coverAlt: "Gold jewellery at MB Jewellers, Sikar",
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Jhumkas, chandbalis, and studs finished for ceremony light.",
      coverImage: "/pics/studio/gold-temple-choker-set.jpg",
      coverAlt: "Gold jhumka set at MB Jewellers, Sikar",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      description: "Slim cuffs, kada bracelets, and bridal pairs.",
      coverImage: "/pics/studio/gold-layered-chain.jpg",
      coverAlt: "Gold chain jewellery at MB Jewellers, Sikar",
    },
    {
      id: "chains",
      title: "Chains",
      description: "Mango malas, rope chains, and layering essentials.",
      coverImage: "/pics/studio/gold-layered-chain.jpg",
      coverAlt: "Layered gold chain at MB Jewellers, Sikar",
    },
    {
      id: "rings",
      title: "Rings",
      description: "Bands, signets, and cocktail silhouettes in rich yellow gold.",
      coverImage: "/pics/studio/gold-coin-ranihaar.jpg",
      coverAlt: "Heritage gold jewellery at MB Jewellers, Sikar",
    },
  ],
};

/** Silver — 7 sections */
export const silverCollectionPage: CollectionPageConfig = {
  eyebrow: "Silver",
  title: "Silver Jewellery in Sikar",
  description:
    "Sterling silver jewellery at MB Jewellers, Sikar — sets, necklaces, bangles, earrings, bracelets, chains, and rings for everyday wear and gifting.",
  sections: [
    {
      id: "sets",
      title: "Sets",
      description: "Matched silver suites for gifting and coordinated styling.",
      coverImage: "/pics/new-arrivals/silver8-main.png",
      coverAlt: "Bridal silver ensemble at MB Jewellers, Sikar",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Minimal chains to ornate collars in polished sterling.",
      coverImage: "/pics/signature-worlds/silver-cinematic-lighting.png",
      coverAlt: "Silver necklace at MB Jewellers, Sikar",
    },
    {
      id: "bangles",
      title: "Bangles",
      description: "Slim stacks, engraved rounds, and kada profiles.",
      coverImage: "/pics/new-arrivals/silver6-main.png",
      coverAlt: "Silver jewellery suite at MB Jewellers, Sikar",
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Hoops, studs, and drops with lightweight profiles.",
      coverImage: "/pics/new-arrivals/silver6-main.png",
      coverAlt: "Silver jhumka earrings at MB Jewellers, Sikar",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      description: "Cuffs, charm bars, and polished silver lines.",
      coverImage: "/pics/new-arrivals/silver8-1-scroll.png",
      coverAlt: "Silver jewellery detail at MB Jewellers, Sikar",
    },
    {
      id: "chains",
      title: "Chains",
      description: "Cable, figaro, and ball chains for layering or solo wear.",
      coverImage: "/pics/signature-worlds/silver-cinematic-lighting.png",
      coverAlt: "Silver necklace chain at MB Jewellers, Sikar",
    },
    {
      id: "rings",
      title: "Rings",
      description: "Bands and signets with bright sterling polish.",
      coverImage: "/pics/new-arrivals/silver8-main.png",
      coverAlt: "Silver jewellery at MB Jewellers, Sikar",
    },
  ],
};

/** Accessories — 2 sections */
export const accessoriesCollectionPage: CollectionPageConfig = {
  eyebrow: "Accessories",
  title: "Silver Accessories in Sikar",
  description: "Decorative silver artefacts and serveware from MB Jewellers in Sikar — for home, hosting, and thoughtful gifting.",
  sections: [
    {
      id: "statues",
      title: "Statues",
      description: "Sculptural pieces and devotional accents for curated interiors.",
      coverImage: "/pics/signature-worlds/accessories-cinematic-lighting.png",
      coverAlt: "Silver artefacts at MB Jewellers, Sikar",
    },
    {
      id: "utensils",
      title: "Utensils",
      description: "Trays, bowls, and serving pieces for rituals and celebrations.",
      coverImage: "/pics/signature-worlds/accessories-cinematic-lighting.png",
      coverAlt: "Silver serveware at MB Jewellers, Sikar",
    },
  ],
};

export const COLLECTION_SLUGS = ["diamond", "gold", "silver", "accessories"] as const;
export type CollectionSlug = (typeof COLLECTION_SLUGS)[number];

export const collectionPagesBySlug: Record<CollectionSlug, CollectionPageConfig> = {
  diamond: diamondCollectionPage,
  gold: goldCollectionPage,
  silver: silverCollectionPage,
  accessories: accessoriesCollectionPage,
};

export function getCollectionSlug(slug: string): CollectionSlug | null {
  return COLLECTION_SLUGS.includes(slug as CollectionSlug) ? (slug as CollectionSlug) : null;
}

export function collectionSectionsToCards(
  collectionSlug: CollectionSlug,
  config: CollectionPageConfig,
): CategoryShowcaseItem[] {
  return config.sections.map((section) => ({
    title: section.title,
    description: section.description,
    href: `/collections/${collectionSlug}/${section.id}`,
    coverImage: section.coverImage ?? SECTION_COVER_PLACEHOLDER,
    coverAlt: section.coverAlt,
  }));
}

export function resolveCollectionSection(
  collectionSlug: CollectionSlug,
  sectionId: string,
): CollectionSubsection | null {
  return collectionPagesBySlug[collectionSlug].sections.find((s) => s.id === sectionId) ?? null;
}

export function buildCollectionSectionParams(): { collection: string; section: string }[] {
  const out: { collection: string; section: string }[] = [];
  for (const slug of COLLECTION_SLUGS) {
    for (const s of collectionPagesBySlug[slug].sections) {
      out.push({ collection: slug, section: s.id });
    }
  }
  return out;
}
