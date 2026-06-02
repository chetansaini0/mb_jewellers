import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cinzel, Playfair_Display, Poppins } from "next/font/google";
import { PremiumSite } from "@/app/components/premium/PremiumSite";
import { GoogleAnalytics } from "@/app/components/analytics/GoogleAnalytics";
import { jewelryStoreSchema, websiteSchema } from "@/app/lib/seo";
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
    { media: "(prefers-color-scheme: light)", color: "#faf7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#faf7f0" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "MB Jewellers | Luxury Gold, Diamond and Bridal Jewellery",
    template: "%s | MB Jewellers",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  applicationName: "MB Jewellers",
  keywords: [
    "MB Jewellers",
    "jewellery in Sikar",
    "bridal jewellery",
    "gold jewellery",
    "diamond jewellery",
    "silver jewellery",
    "custom jewellery",
  ],
  appleWebApp: {
    capable: true,
    title: "MB Jewellers",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "MB Jewellers | Luxury Jewellery in Sikar",
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
    images: [{ url: "/mb-jewellers-logo.png", alt: "MB Jewellers luxury logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MB Jewellers",
    description: siteConfig.description,
    images: ["/mb-jewellers-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/mb-jewellers-logo.png", type: "image/png" },
    ],
    apple: "/mb-jewellers-logo.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${accent.variable} premium-theme h-full antialiased`}
    >
      <body suppressHydrationWarning className="premium-body flex min-h-dvh flex-col overflow-x-clip">
        <Script
          id="jewelry-store-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jewelryStoreSchema) }}
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
