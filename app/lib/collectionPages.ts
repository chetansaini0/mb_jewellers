import type { CategoryShowcaseItem } from "@/app/lib/siteData";

/**
 * Collection subsection pages: same card grid as `/collections`.
 * Update `coverImage` per section when you have photography; gallery blocks below are for your images.
 */
export const SECTION_COVER_PLACEHOLDER = "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80";

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
  title: "Diamond Collection",
  description:
    "Explore diamond sets, necklaces, rings, earrings, and bracelets—open a section below to add your gallery.",
  sections: [
    {
      id: "sets",
      title: "Sets",
      description: "Coordinated diamond suites for engagements, receptions, and milestones.",
      coverImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
      coverAlt: "Diamond jewellery set",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Pendants and collar styles from minimal halos to statement drops.",
      coverImage: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=800&q=80",
      coverAlt: "Diamond necklace",
    },
    {
      id: "rings",
      title: "Rings",
      description: "Solitaires, bands, and halo stacks with elevated finishing.",
      coverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      coverAlt: "Diamond ring",
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Studs, drops, and chandeliers engineered for balanced sparkle.",
      coverImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80",
      coverAlt: "Diamond earrings",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      description: "Tennis lines and flexible cuffs that move with you.",
      coverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      coverAlt: "Diamond bracelet",
    },
  ],
};

/** Gold — 9 sections */
export const goldCollectionPage: CollectionPageConfig = {
  eyebrow: "Gold",
  title: "Gold Collection",
  description:
    "Traditional and contemporary gold—from sets and Ranihaar to Rajputi silhouettes, chains, bangles, and rings.",
  sections: [
    {
      id: "sets",
      title: "Sets",
      description: "Complete necklace and earring suites for weddings and festive calendars.",
      coverImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
      coverAlt: "Gold bridal set",
    },
    {
      id: "ranihaar",
      title: "Ranihaar",
      description: "Long ceremonial necklaces with regal drape and intricate detailing.",
      coverImage: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=800&q=80",
      coverAlt: "Gold Ranihaar",
    },
    {
      id: "rajputi",
      title: "Rajputi",
      description: "Signature Rajputi profiles with bold geometry and heritage relief.",
      coverImage: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      coverAlt: "Rajputi gold jewellery",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Chokars, collars, and layered chains in warm gold tones.",
      coverImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
      coverAlt: "Gold necklace",
    },
    {
      id: "bangles",
      title: "Bangles",
      description: "Classic rounds, kada profiles, and stacked bridal pairs.",
      coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      coverAlt: "Gold bangles",
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Jhumkas, chandbalis, and studs finished for ceremony light.",
      coverImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80",
      coverAlt: "Gold earrings",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      description: "Slim cuffs, kada bracelets, and bridal pairs.",
      coverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      coverAlt: "Gold bracelet",
    },
    {
      id: "chains",
      title: "Chains",
      description: "Mango malas, rope chains, and layering essentials.",
      coverImage: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=800&q=80",
      coverAlt: "Gold chain",
    },
    {
      id: "rings",
      title: "Rings",
      description: "Bands, signets, and cocktail silhouettes in rich yellow gold.",
      coverImage: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=800&q=80",
      coverAlt: "Gold ring",
    },
  ],
};

/** Silver — 7 sections */
export const silverCollectionPage: CollectionPageConfig = {
  eyebrow: "Silver",
  title: "Silver Collection",
  description: "Sterling finishes across sets, necklaces, bangles, earrings, bracelets, chains, and rings.",
  sections: [
    {
      id: "sets",
      title: "Sets",
      description: "Matched silver suites for gifting and coordinated styling.",
      coverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      coverAlt: "Silver jewellery set",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Minimal chains to ornate collars in polished sterling.",
      coverImage: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=800&q=80",
      coverAlt: "Silver necklace",
    },
    {
      id: "bangles",
      title: "Bangles",
      description: "Slim stacks, engraved rounds, and kada profiles.",
      coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      coverAlt: "Silver bangles",
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Hoops, studs, and drops with lightweight profiles.",
      coverImage: "https://images.unsplash.com/photo-1612177343582-665b6b11d2b8?w=800&q=80",
      coverAlt: "Silver earrings",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      description: "Cuffs, charm bars, and polished silver lines.",
      coverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      coverAlt: "Silver bracelet",
    },
    {
      id: "chains",
      title: "Chains",
      description: "Cable, figaro, and ball chains for layering or solo wear.",
      coverImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
      coverAlt: "Silver chain",
    },
    {
      id: "rings",
      title: "Rings",
      description: "Bands and signets with bright sterling polish.",
      coverImage: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=800&q=80",
      coverAlt: "Silver ring",
    },
  ],
};

/** Accessories — 2 sections */
export const accessoriesCollectionPage: CollectionPageConfig = {
  eyebrow: "Accessories",
  title: "Accessories Collection",
  description: "Decorative silver artefacts and serveware for home and hosting.",
  sections: [
    {
      id: "statues",
      title: "Statues",
      description: "Sculptural pieces and devotional accents for curated interiors.",
      coverImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      coverAlt: "Decorative statue",
    },
    {
      id: "utensils",
      title: "Utensils",
      description: "Trays, bowls, and serving pieces for rituals and celebrations.",
      coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      coverAlt: "Silver serveware",
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
