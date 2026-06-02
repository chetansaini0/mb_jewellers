import type { NextConfig } from "next";

const allowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "gsap"],
  },
  images: {
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com https://www.google.com https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https: wss: https://www.google-analytics.com https://region1.google-analytics.com; frame-src https://www.google.com https://maps.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
