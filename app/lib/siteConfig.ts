function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isHostedProduction = process.env.NODE_ENV === "production" && process.env.VERCEL === "1";
  if (isHostedProduction && !configured) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required in production.");
  }
  return configured ?? "http://localhost:3000";
}

export type ShowroomLandline = {
  display: string;
  e164: string;
};

export type Showroom = {
  id: string;
  name: string;
  /** Full display address used in UI */
  address: string;
  /** Street/locality portion for PostalAddress.streetAddress (without city/state duplication) */
  streetAddress: string;
  /** Confirmed from public business listings and domain registrant address */
  postalCode: string;
  landlines: readonly ShowroomLandline[];
  coordinates: { lat: number; lng: number };
  /** Google Maps Place ID when known (from public Maps/Waze listings) */
  placeId?: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  googleMapsUrl: string;
};

/**
 * Place IDs and PIN sourced from public Google/Waze/directory listings for
 * M.B. JEWELLERS (SIKAR) PVT. LTD. PIN 332001 is consistent across listings.
 */
export const showrooms: readonly Showroom[] = [
  {
    id: "ghantaghar",
    name: "Ghantaghar Showroom",
    address: "Purana Dujod Gate, Ghantaghar, Sikar, Rajasthan 332001",
    streetAddress: "Purana Dujod Gate, Clock Tower Road, Ghantaghar",
    postalCode: "332001",
    landlines: [{ display: "01572 491103", e164: "+911572491103" }],
    coordinates: { lat: 27.6125, lng: 75.1392 },
    placeId: "ChIJ7Rdec8ekbDkRIdR8r8qMf_U",
    mapEmbedUrl:
      "https://www.google.com/maps?q=place_id:ChIJ7Rdec8ekbDkRIdR8r8qMf_U&hl=en&z=16&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ7Rdec8ekbDkRIdR8r8qMf_U&destination=MB+Jewellers+Ghantaghar+Sikar",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=MB+Jewellers&query_place_id=ChIJ7Rdec8ekbDkRIdR8r8qMf_U",
  },
  {
    id: "ramlila",
    name: "Ramlila Maidan Showroom",
    address: "Ramlila Maidan, Mahamandir Road, Sikar, Rajasthan 332001",
    streetAddress: "Ramlila Maidan, Mahamandir Road",
    postalCode: "332001",
    landlines: [
      { display: "01572 409431", e164: "+911572409431" },
      { display: "01572 250061", e164: "+911572250061" },
    ],
    coordinates: { lat: 27.603889, lng: 75.136667 },
    // Public listings reference Plus Code J43P+FW Sikar; Place ID TBD once confirmed in GBP.
    mapEmbedUrl:
      "https://www.google.com/maps?q=Ramlila+Maidan,+Mahamandir+Road,+Sikar,+Rajasthan+332001&hl=en&z=16&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Ramlila+Maidan,+Mahamandir+Road,+Sikar,+Rajasthan+332001",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=MB+Jewellers+Ramlila+Maidan+Sikar+332001",
  },
] as const;

const primaryLandline = showrooms[0].landlines[0];

/** Public mobile/WhatsApp listed across directories for MB Jewellers Sikar. Override via env if needed. */
const PUBLIC_WHATSAPP_E164 = "919829231637";

/** Genuine service-area towns/region for local SEO — business is based in Sikar and serves Shekhawati. */
export const serviceAreaPlaces = [
  "Sikar",
  "Fatehpur",
  "Laxmangarh",
  "Neem Ka Thana",
  "Jhunjhunu",
  "Churu",
  "Khandela",
  "Ringas",
  "Danta Ramgarh",
  "Shekhawati",
] as const;

export const openingHours = {
  opens: "10:00",
  closes: "19:00",
  display: "Mon–Sat, 10:00 AM – 7:00 PM",
  displayShort: "Mon–Sat: 10:00 – 19:00",
  sundayNote: "Closed on Sundays unless a private appointment is confirmed in advance.",
} as const;

export const socialProfiles = [
  "https://www.instagram.com/mbjewellerssikar/",
  "https://www.facebook.com/mbjewellerssikar",
] as const;

export const siteConfig = {
  name: "MB Jewellers",
  legalName: "M.B. JEWELLERS (SIKAR) PVT. LTD.",
  tagline: "Two showrooms, one trust",
  description:
    "MB Jewellers is a trusted jewellery showroom in Sikar, Rajasthan — gold, diamond, silver, and bridal jewellery for families across the Shekhawati region. Showcase online; purchases are in person.",
  url: resolveSiteUrl(),
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mbjeweller21@gmail.com",
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? primaryLandline.display,
    phoneE164: process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? primaryLandline.e164,
    whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164?.trim() || PUBLIC_WHATSAPP_E164,
  },
  location: {
    city: "Sikar",
    region: "Rajasthan",
    country: "India",
    area: "Shekhawati",
    postalCode: "332001",
    address: showrooms.map((showroom) => showroom.address).join(" · "),
  },
  serviceArea: serviceAreaPlaces,
  openingHours,
  showrooms,
} as const;

export function hasWhatsApp() {
  return Boolean(siteConfig.contact.whatsappE164);
}

export function getWhatsAppUrl(prefillMessage?: string) {
  const whatsappId = siteConfig.contact.whatsappE164;
  if (!whatsappId) {
    return null;
  }
  const message = prefillMessage ? `?text=${encodeURIComponent(prefillMessage)}` : "";
  return `https://wa.me/${whatsappId}${message}`;
}

export function formatShowroomPhones(showroom: Showroom) {
  return showroom.landlines.map((line) => line.display).join(" · ");
}

/** Primary Google Maps / GBP find-us link (Ghantaghar Place ID). */
export function getGoogleMapsFindUsUrl() {
  return showrooms[0].googleMapsUrl;
}
