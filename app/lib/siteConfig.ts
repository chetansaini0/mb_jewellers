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
  address: string;
  landlines: readonly ShowroomLandline[];
  coordinates: { lat: number; lng: number };
  mapEmbedUrl: string;
  directionsUrl: string;
};

export const showrooms: readonly Showroom[] = [
  {
    id: "ghantaghar",
    name: "Ghantaghar Showroom",
    address: "Purana Dujod Gate, Ghantaghar, Sikar, Rajasthan",
    landlines: [{ display: "01572 491103", e164: "+911572491103" }],
    coordinates: { lat: 27.6125, lng: 75.1392 },
    mapEmbedUrl:
      "https://www.google.com/maps?q=Purana+Dujod+Gate,+Ghantaghar,+Sikar,+Rajasthan&hl=en&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Purana+Dujod+Gate,+Ghantaghar,+Sikar,+Rajasthan",
  },
  {
    id: "ramlila",
    name: "Ramlila Maidan Showroom",
    address: "Ramlila Maidan, Sikar, Rajasthan",
    landlines: [
      { display: "01572 409431", e164: "+911572409431" },
      { display: "01572 250061", e164: "+911572250061" },
    ],
    coordinates: { lat: 27.603889, lng: 75.136667 },
    mapEmbedUrl: "https://www.google.com/maps?q=Ramlila+Maidan,+Sikar,+Rajasthan&hl=en&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ramlila+Maidan,+Sikar,+Rajasthan",
  },
] as const;

const primaryLandline = showrooms[0].landlines[0];

export const siteConfig = {
  name: "MB Jewellers",
  legalName: "M.B. JEWELLERS (SIKAR) PVT. LTD.",
  tagline: "Two showrooms, one trust",
  description:
    "Explore MB Jewellers — luxury gold, diamond, silver, and bridal collections in Sikar. Book a private studio viewing; purchases are in person, not online.",
  url: resolveSiteUrl(),
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mbjeweller21@gmail.com",
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? primaryLandline.display,
    phoneE164: process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? primaryLandline.e164,
    whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164?.trim() || null,
  },
  location: {
    city: "Sikar",
    region: "Rajasthan",
    country: "India",
    address: showrooms.map((showroom) => showroom.address).join(" · "),
  },
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
