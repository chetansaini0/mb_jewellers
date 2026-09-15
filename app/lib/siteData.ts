import { showrooms } from "@/app/lib/siteConfig";

export type ProductItem = {
  name: string;
  image: string;
  alt: string;
  detail: string;
  material?: "Diamond" | "Gold" | "Silver";
  /** When true, piece appears in new arrivals but not the homepage signature grid. */
  newArrivalOnly?: boolean;
};

/** Footer dropdown + Google Translate widget (English is default). */
export const translationLanguages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "gu", label: "Gujarati" },
  { code: "pa", label: "Punjabi" },
  { code: "mr", label: "Marathi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "bn", label: "Bengali" },
  { code: "ur", label: "Urdu" },
  { code: "kn", label: "Kannada" },
  { code: "ml", label: "Malayalam" },
  { code: "or", label: "Odia" },
  { code: "as", label: "Assamese" },
  { code: "ne", label: "Nepali" },
  { code: "ar", label: "Arabic" },
  { code: "fa", label: "Persian (Farsi)" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "es", label: "Spanish" },
  { code: "pt", label: "Portuguese" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ru", label: "Russian" },
] as const;

export type TranslationLanguage = (typeof translationLanguages)[number];

/** ISO 639-1 codes passed to Google Translate (comma-separated). */
export const googleTranslateIncludedLanguages = translationLanguages.map((l) => l.code).join(",");

/** Replace with your real Instagram and Facebook page URLs */
export const socialLinks = {
  instagram: "https://www.instagram.com/mbjewellerssikar/",
  facebook: "https://www.facebook.com/mbjewellerssikar",
} as const;

const ramlilaShowroom = showrooms.find((showroom) => showroom.id === "ramlila") ?? showrooms[1];

export { showrooms };

export const flagshipStudio = {
  name: "MB Jewellers",
  city: "Sikar",
  region: "Rajasthan",
  address: ramlilaShowroom.address,
  coordinates: ramlilaShowroom.coordinates,
  mapEmbedUrl: ramlilaShowroom.mapEmbedUrl,
  directionsUrl: ramlilaShowroom.directionsUrl,
} as const;

export type CategoryShowcaseItem = {
  title: string;
  description: string;
  href: string;
  coverImage: string;
  coverAlt: string;
};

export const categoryShowcase: CategoryShowcaseItem[] = [
  {
    title: "Diamond",
    description: "Brilliant-cut pieces designed for luminous statement styling.",
    href: "/collections/diamond",
    coverImage: "/pics/studio/diamond-floral-necklace-set.jpg",
    coverAlt: "Diamond necklace and earring set at MB Jewellers, Sikar",
  },
  {
    title: "Gold",
    description: "Classic warm-toned sets with handcrafted premium detailing.",
    href: "/collections/gold",
    coverImage: "/pics/studio/gold-temple-choker-set.jpg",
    coverAlt: "Temple gold choker and jhumka set at MB Jewellers, Sikar",
  },
  {
    title: "Silver",
    description: "Contemporary polished silver jewellery for modern elegance.",
    href: "/collections/silver",
    coverImage: "/pics/signature-worlds/silver-cinematic-lighting.png",
    coverAlt: "Silver necklace and jhumka earrings at MB Jewellers, Sikar",
  },
  {
    title: "Accessories",
    description: "Rings, chains, and finishing pieces that complete every look.",
    href: "/collections/accessories",
    coverImage: "/pics/signature-worlds/accessories-cinematic-lighting.png",
    coverAlt: "Silver artefacts and gift pieces at MB Jewellers, Sikar",
  },
];

export const homeSlideshow: ProductItem[] = [
  {
    name: "Emerald Diamond Set",
    image: "/pics/studio/diamond-emerald-drop-set.jpg",
    alt: "Emerald and diamond necklace set at MB Jewellers, Sikar",
    detail: "Diamond",
  },
  {
    name: "Aurora Halo Drops",
    image: "/pics/studio/diamond-floral-necklace-set.jpg",
    alt: "Diamond necklace and drop earrings at MB Jewellers, Sikar",
    detail: "Diamond",
  },
  {
    name: "Luna Cluster Pendant",
    image: "/pics/studio/diamond-tennis-necklace.jpg",
    alt: "Diamond necklace at MB Jewellers, Sikar",
    detail: "Diamond",
  },
  {
    name: "Heritage Filigree Chokar",
    image: "/pics/studio/gold-temple-choker-set.jpg",
    alt: "Temple gold choker set at MB Jewellers, Sikar",
    detail: "Gold",
  },
  {
    name: "Royal Gold Chokar Set",
    image: "/pics/studio/gold-kundan-choker-set.jpg",
    alt: "Gold choker and earring set at MB Jewellers, Sikar",
    detail: "Gold",
  },
  {
    name: "Regal Coin Chokar",
    image: "/pics/studio/gold-coin-ranihaar.jpg",
    alt: "Gold coin haar at MB Jewellers, Sikar",
    detail: "Gold",
  },
  {
    name: "Moonlight Silver Hoops",
    image: "/pics/new-arrivals/silver6-main.png",
    alt: "Silver jewellery suite at MB Jewellers, Sikar",
    detail: "Silver",
  },
  {
    name: "Arctic Line Pendant",
    image: "/pics/signature-worlds/silver-cinematic-lighting.png",
    alt: "Silver necklace at MB Jewellers, Sikar",
    detail: "Silver",
  },
  {
    name: "Silver Dew Bracelet",
    image: "/pics/new-arrivals/silver8-main.png",
    alt: "Bridal silver ensemble at MB Jewellers, Sikar",
    detail: "Silver",
  },
];

export const featuredPieces: ProductItem[] = [
  {
    name: "Emerald Diamond Set",
    image: "/pics/new-arrivals/diamond1-main.png",
    alt: "Emerald diamond necklace set with matching earrings on black display bust",
    detail: "Elegant diamond set with emerald accents and matching earrings.",
    material: "Diamond",
  },
  {
    name: "Aurora Halo Drops",
    image: "/pics/new-arrivals/diamond2-main.png",
    alt: "Diamond necklace set with drop motifs on black display bust",
    detail: "Refined halo drops balanced for ceremony and evening wear.",
    material: "Diamond",
  },
  {
    name: "Luna Cluster Pendant",
    image: "/pics/studio/diamond-drop-necklace-set.jpg",
    alt: "Diamond necklace and earrings at MB Jewellers, Sikar",
    detail: "Light-catching cluster pendant with contemporary minimal chain.",
    material: "Diamond",
  },
  {
    name: "Heritage Filigree Chokar",
    image: "/pics/new-arrivals/heritage-filigree-main.png",
    alt: "Gold chokar necklace",
    detail: "Heritage-inspired chokar featuring artisanal floral filigree work.",
    material: "Gold",
  },
  {
    name: "Royal Gold Chokar Set",
    image: "/pics/new-arrivals/gold5-main.png",
    alt: "Layered heritage gold chokar necklace with pendant on teal display bust",
    detail: "Statement gold chokar set with layered profile for bridal and festive styling.",
    material: "Gold",
  },
  {
    name: "Regal Coin Chokar",
    image: "/pics/new-arrivals/gold6-main.png",
    alt: "Traditional gold chokar necklace with coin motifs on teal display bust",
    detail: "Coin-motif gold chokar with sculpted heritage detailing.",
    material: "Gold",
  },
  {
    name: "Rajwada Pearl Silver Suite",
    image: "/pics/new-arrivals/silver6-main.png",
    alt: "Rajwada oxidised silver necklace and earring set with pearl strands and magenta stone accents",
    detail:
      "Traditional six-part silver suite with layered pearl strands, oxidised filigree, and matching jhumka earrings.",
    material: "Silver",
    newArrivalOnly: true,
  },
  {
    name: "Rajwada Bridal Silver Ensemble",
    image: "/pics/new-arrivals/silver8-main.png",
    alt: "Rajwada bridal oxidised silver set with maang tikka, choker, haar, and jhumka earrings",
    detail:
      "Grand bridal silver ensemble with maang tikka, choker, layered haar, and matching jhumkas in oxidised filigree.",
    material: "Silver",
    newArrivalOnly: true,
  },
  {
    name: "Moonlight Silver Hoops",
    image: "/pics/new-arrivals/silver6-main.png",
    alt: "Silver jewellery suite at MB Jewellers, Sikar",
    detail: "Polished silver hoops shaped for lightweight all-day wear.",
    material: "Silver",
  },
  {
    name: "Arctic Line Pendant",
    image: "/pics/signature-worlds/silver-cinematic-lighting.png",
    alt: "Silver necklace at MB Jewellers, Sikar",
    detail: "Clean geometric pendant crafted in bright sterling silver finish.",
    material: "Silver",
  },
  {
    name: "Silver Dew Bracelet",
    image: "/pics/new-arrivals/silver8-main.png",
    alt: "Bridal silver ensemble at MB Jewellers, Sikar",
    detail: "Slim bracelet profile with high-polish reflective detailing.",
    material: "Silver",
  },
];
