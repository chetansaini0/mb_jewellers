import type { Metadata } from "next";
import { siteConfig, socialProfiles, openingHours } from "@/app/lib/siteConfig";

const siteUrl = siteConfig.url.replace(/\/$/, "");

export function createPageMetadata(input: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  /** When true (default), title is absolute and not doubled by the root `| MB Jewellers` template. */
  absoluteTitle?: boolean;
}): Metadata {
  const canonicalPath = input.path ?? "/";
  const canonical = `${siteUrl}${canonicalPath}`;
  const image = input.image ?? "/opengraph-image";
  const useAbsolute = input.absoluteTitle !== false;

  return {
    title: useAbsolute ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, alt: `${siteConfig.name} jewellery showcase in Sikar` }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  url: siteUrl,
  description: siteConfig.description,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteUrl,
    logo: `${siteUrl}/mb-jewellers-logo.png`,
  },
} as const;

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: openingHours.opens,
    closes: openingHours.closes,
  },
] as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: [siteConfig.name, "MB Jewellers Sikar", "MB Jewellers Shekhawati"],
  url: siteUrl,
  logo: `${siteUrl}/mb-jewellers-logo.png`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phoneE164,
  sameAs: socialProfiles,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.showrooms[0].streetAddress,
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.region,
    postalCode: siteConfig.location.postalCode,
    addressCountry: siteConfig.location.country,
  },
  areaServed: siteConfig.serviceArea.map((place) => ({
    "@type": "AdministrativeArea",
    name: place,
  })),
  knowsAbout: [
    "Jewellery shop in Sikar",
    "Gold jewellery",
    "Diamond jewellery",
    "Bridal jewellery",
    "Shekhawati jewellery showrooms",
  ],
} as const;

export const jewelryStoreSchema = {
  "@context": "https://schema.org",
  "@graph": siteConfig.showrooms.map((showroom) => ({
    "@type": "JewelryStore",
    "@id": `${siteUrl}/#store-${showroom.id}`,
    name: `${siteConfig.name} — ${showroom.name}`,
    legalName: siteConfig.legalName,
    alternateName: ["MB Jewellers Sikar", "MB Jewellers Shekhawati"],
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteUrl,
    image: [`${siteUrl}/mb-jewellers-logo.png`, `${siteUrl}/icons/icon-512.png`],
    telephone: showroom.landlines.map((line) => line.e164).join(", "),
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: showroom.streetAddress,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      postalCode: showroom.postalCode,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: showroom.coordinates.lat,
      longitude: showroom.coordinates.lng,
    },
    hasMap: showroom.googleMapsUrl,
    sameAs: socialProfiles,
    openingHoursSpecification,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card",
    knowsAbout: [
      "Gold jewellery",
      "Diamond jewellery",
      "Silver jewellery",
      "Bridal jewellery",
      "Wedding jewellery",
      "Hallmarked gold",
      "Custom jewellery",
      "Shekhawati bridal jewellery",
    ],
    areaServed: siteConfig.serviceArea.map((place) => ({
      "@type": "City",
      name: place,
    })),
  })),
} as const;

export function createFaqPageSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

export function createProductSchema(input: {
  name: string;
  description: string;
  image: string | readonly string[];
  urlPath: string;
  category?: string;
  material?: string;
}) {
  const images = (Array.isArray(input.image) ? [...input.image] : [input.image]).map((src) =>
    src.startsWith("http") ? src : createCanonicalUrl(src),
  );
  const canonical = createCanonicalUrl(input.urlPath);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: images,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: input.category ?? input.material ?? "Jewellery",
    material: input.material,
    url: canonical,
    isRelatedTo: {
      "@type": "JewelryStore",
      name: siteConfig.name,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.country,
      },
    },
  } as const;
}

export function createBreadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: createCanonicalUrl(item.path),
    })),
  } as const;
}

export function createCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}
