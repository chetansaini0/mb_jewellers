import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cinzel, Playfair_Display, Poppins } from "next/font/google";
import { PremiumSite } from "@/app/components/premium/PremiumSite";
import { GoogleAnalytics } from "@/app/components/analytics/GoogleAnalytics";
import { jewelryStoreSchema, organizationSchema, websiteSchema } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display-luxury",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const sans = Poppins({
  variable: "--font-sans-luxury",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const accent = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f0d0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "MB Jewellers | Jewellery Shop in Sikar & Shekhawati, Rajasthan",
    template: "%s | MB Jewellers",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  applicationName: "MB Jewellers",
  keywords: [
    "MB Jewellers",
    "MB Jewellers Sikar",
    "jewellery shop in Sikar",
    "jewellery store in Sikar",
    "jewellers in Sikar",
    "best jewellery shop in Sikar",
    "best jeweller in Sikar",
    "gold jewellery Sikar",
    "diamond jewellery Sikar",
    "silver jewellery Sikar",
    "bridal jewellery Sikar",
    "wedding jewellery Shekhawati",
    "jewellery showroom Shekhawati",
    "jewellery shop in Shekhawati",
    "trusted jeweller in Sikar",
    "custom jewellery Sikar",
    "hallmarked gold Sikar",
  ],
  appleWebApp: {
    capable: true,
    title: "MB Jewellers",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "MB Jewellers | Jewellery Shop in Sikar & Shekhawati, Rajasthan",
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "MB Jewellers | Jewellery Store in Sikar",
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/icons/icon-32.png?v=goldlogo", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png?v=goldlogo", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png?v=goldlogo", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=goldlogo", sizes: "any" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png?v=goldlogo", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico?v=goldlogo",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${accent.variable} premium-theme antialiased`}>
      <body suppressHydrationWarning className="premium-body flex min-h-dvh flex-col overflow-x-clip">
        <Script
          id="jewelry-store-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jewelryStoreSchema) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <GoogleAnalytics />
        <PremiumSite>{children}</PremiumSite>
      </body>
    </html>
  );
}
