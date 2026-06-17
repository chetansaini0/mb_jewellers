import type { Metadata } from "next";
import { siteConfig } from "@/app/lib/siteConfig";

const siteUrl = siteConfig.url.replace(/\/$/, "");

export function createPageMetadata(input: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const canonicalPath = input.path ?? "/";
  const canonical = `${siteUrl}${canonicalPath}`;
  const image = input.image ?? "/opengraph-image";

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, alt: `${siteConfig.name} jewellery showcase` }],
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
  url: siteUrl,
  description: siteConfig.description,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteUrl,
  },
} as const;

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
] as const;

export const jewelryStoreSchema = {
  "@context": "https://schema.org",
  "@graph": siteConfig.showrooms.map((showroom) => ({
    "@type": "JewelryStore",
    name: `${siteConfig.name} — ${showroom.name}`,
    description: siteConfig.description,
    url: siteUrl,
    image: `${siteUrl}/mb-jewellers-logo.png`,
    telephone: showroom.landlines.map((line) => line.display).join(", "),
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: showroom.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: showroom.coordinates.lat,
      longitude: showroom.coordinates.lng,
    },
    sameAs: ["https://www.instagram.com/mbjewellerssikar/", "https://www.facebook.com/mbjewellerssikar"],
    openingHoursSpecification,
    priceRange: "₹₹₹",
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

export function createCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
