import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cinzel, Playfair_Display, Poppins } from "next/font/google";
import { PremiumSite } from "@/app/components/premium/PremiumSite";
import { GoogleAnalytics } from "@/app/components/analytics/GoogleAnalytics";
import { ConversionTracker } from "@/app/components/analytics/ConversionTracker";
import { jewelryStoreSchema, organizationSchema, websiteSchema } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";
import "./globals.css";
import "./premium-enhancement.css";

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
    { media: "(prefers-color-scheme: light)", color: "#faf7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#faf7f0" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Best Jewellery Shop in Sikar | Best Jewellers in Sikar – MB Jewellers",
    template: "%s | MB Jewellers",
  },
  metadataBase: new URL(siteConfig.url),
  description:
    "MB Jewellers is a jewellery shop in Sikar with two showrooms — Ghantaghar and Ramlila Maidan. Hallmarked gold, certified diamonds, silver and bridal jewellery. Visit in person.",
  applicationName: "MB Jewellers",
  keywords: [
    "MB Jewellers",
    "best jewellery shop in Sikar",
    "best jewellers in Sikar",
    "best jewellery in Sikar",
    "jewellery shop in Sikar",
    "diamond jewellery in Sikar",
    "gold jewellery in Sikar",
    "silver jewellery in Sikar",
    "bridal jewellery in Sikar",
    "wedding jewellery in Sikar",
    "gold jewellery shop in Sikar",
    "diamond jewellery shop in Sikar",
    "silver jewellery shop in Sikar",
    "latest jewellery designs in Sikar",
    "jewellery showroom in Sikar",
    "daily wear jewellery in Sikar",
    "custom jewellery in Sikar",
    "trusted jeweller in Sikar",
    "hallmarked gold jewellery in Sikar",
  ],
  appleWebApp: {
    capable: true,
    title: "MB Jewellers",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Best Jewellery Shop in Sikar | Best Jewellers in Sikar – MB Jewellers",
    description:
      "MB Jewellers is a jewellery shop in Sikar with showrooms at Ghantaghar and Ramlila Maidan. Gold, diamond, silver and bridal jewellery.",
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Jewellery Shop in Sikar | MB Jewellers",
    description:
      "Best jewellers in Sikar — MB Jewellers showrooms at Ghantaghar and Ramlila Maidan. Gold, diamond, silver and bridal jewellery.",
  },
  icons: {
    icon: [
      { url: "/icons/icon-32.png?v=whitelogo2", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png?v=whitelogo2", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png?v=whitelogo2", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=whitelogo2", sizes: "any" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png?v=whitelogo2", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico?v=whitelogo2",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
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
        <ConversionTracker />
        <PremiumSite>{children}</PremiumSite>
      </body>
    </html>
  );
}
