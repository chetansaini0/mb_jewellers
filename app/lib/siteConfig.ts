function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isHostedProduction = process.env.NODE_ENV === "production" && process.env.VERCEL === "1";
  if (isHostedProduction && !configured) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required in production.");
  }
  return configured ?? "http://localhost:3000";
}

export const siteConfig = {
  name: "MB Jewellers",
  legalName: "MB Jewellers",
  description:
    "Explore MB Jewellers — luxury gold, diamond, silver, and bridal collections in Sikar. Book a private studio viewing; purchases are in person, not online.",
  url: resolveSiteUrl(),
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mbjeweller21@gmail.com",
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? "+91 98292 31637",
    phoneE164: process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? "+919829231637",
    whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "919829231637",
  },
  location: {
    city: "Sikar",
    region: "Rajasthan",
    country: "India",
    address: "Ramlila Maidan, Mahamandir Rd, Chandpol, Sikar, Rajasthan 332001",
  },
} as const;

export function getWhatsAppUrl(prefillMessage?: string) {
  const message = prefillMessage ? `?text=${encodeURIComponent(prefillMessage)}` : "";
  return `https://wa.me/${siteConfig.contact.whatsappE164}${message}`;
}
