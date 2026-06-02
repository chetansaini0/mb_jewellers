import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "MB Jewellers",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: "#faf7f0",
    lang: "en-IN",
    orientation: "portrait-primary",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/mb-jewellers-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/mb-jewellers-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
