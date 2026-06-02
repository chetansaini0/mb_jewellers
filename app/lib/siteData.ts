export type ProductItem = {
  name: string;
  image: string;
  alt: string;
  detail: string;
  material?: "Diamond" | "Gold" | "Silver";
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

export const flagshipStudio = {
  name: "MB Jewellers",
  city: "Sikar",
  region: "Rajasthan",
  address: "Ramlila Maidan, Mahamandir Rd, Chandpol, Sikar, Rajasthan 332001",
  coordinates: {
    lat: 27.603889,
    lng: 75.136667,
  },
  mapEmbedUrl: "https://www.google.com/maps?q=27.603889,75.136667&hl=en&z=17&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Ramlila+Maidan%2C+Mahamandir+Rd%2C+Chandpol%2C+Sikar%2C+Rajasthan+332001",
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
    coverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    coverAlt: "Diamond ring and fine diamond jewellery",
  },
  {
    title: "Gold",
    description: "Classic warm-toned sets with handcrafted premium detailing.",
    href: "/collections/gold",
    coverImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
    coverAlt: "Gold necklace and traditional gold jewellery",
  },
  {
    title: "Silver",
    description: "Contemporary polished silver jewellery for modern elegance.",
    href: "/collections/silver",
    coverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    coverAlt: "Sterling silver pendant jewellery",
  },
  {
    title: "Accessories",
    description: "Rings, chains, and finishing pieces that complete every look.",
    href: "/collections/accessories",
    coverImage: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=800&q=80",
    coverAlt: "Fine jewellery rings and accessories",
  },
];

export const homeSlideshow: ProductItem[] = [
  {
    name: "Emerald Diamond Set",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
    alt: "Emerald diamond necklace set",
    detail: "Diamond",
  },
  {
    name: "Aurora Halo Drops",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=900&q=80",
    alt: "Diamond drops",
    detail: "Diamond",
  },
  {
    name: "Luna Cluster Pendant",
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=900&q=80",
    alt: "Diamond pendant",
    detail: "Diamond",
  },
  {
    name: "Heritage Filigree Chokar",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80",
    alt: "Gold chokar",
    detail: "Gold",
  },
  {
    name: "Royal Gold Chokar Set",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80",
    alt: "Royal gold chokar set",
    detail: "Gold",
  },
  {
    name: "Regal Coin Chokar",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
    alt: "Gold coin chokar necklace",
    detail: "Gold",
  },
  {
    name: "Moonlight Silver Hoops",
    image: "https://images.unsplash.com/photo-1612177343582-665b6b11d2b8?w=900&q=80",
    alt: "Silver hoops",
    detail: "Silver",
  },
  {
    name: "Arctic Line Pendant",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
    alt: "Silver pendant",
    detail: "Silver",
  },
  {
    name: "Silver Dew Bracelet",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
    alt: "Silver bracelet",
    detail: "Silver",
  },
];

export const featuredPieces: ProductItem[] = [
  {
    name: "Emerald Diamond Set",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
    alt: "Emerald diamond necklace set with matching earrings",
    detail: "Elegant diamond set with emerald accents and matching earrings.",
    material: "Diamond",
  },
  {
    name: "Aurora Halo Drops",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=900&q=80",
    alt: "Diamond drop earrings",
    detail: "Refined halo drops balanced for ceremony and evening wear.",
    material: "Diamond",
  },
  {
    name: "Luna Cluster Pendant",
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=900&q=80",
    alt: "Diamond pendant necklace",
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
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80",
    alt: "Royal gold bridal chokar set",
    detail: "Statement gold chokar set with layered profile for bridal and festive styling.",
    material: "Gold",
  },
  {
    name: "Regal Coin Chokar",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
    alt: "Regal coin-motif gold chokar",
    detail: "Coin-motif gold chokar with sculpted heritage detailing.",
    material: "Gold",
  },
  {
    name: "Moonlight Silver Hoops",
    image: "https://images.unsplash.com/photo-1612177343582-665b6b11d2b8?w=900&q=80",
    alt: "Silver hoop earrings",
    detail: "Polished silver hoops shaped for lightweight all-day wear.",
    material: "Silver",
  },
  {
    name: "Arctic Line Pendant",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
    alt: "Silver pendant necklace",
    detail: "Clean geometric pendant crafted in bright sterling silver finish.",
    material: "Silver",
  },
  {
    name: "Silver Dew Bracelet",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
    alt: "Silver bracelet",
    detail: "Slim bracelet profile with high-polish reflective detailing.",
    material: "Silver",
  },
];
