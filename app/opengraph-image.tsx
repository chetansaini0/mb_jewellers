import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/lib/siteConfig";

export const alt = `${siteConfig.name} — Luxury Jewellery in Sikar`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1a1208 0%, #3d2e14 45%, #1a1208 100%)",
          color: "#f5ecd7",
          fontFamily: "Georgia, serif",
          padding: 64,
        }}
      >
        <p style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", opacity: 0.85, margin: 0 }}>
          Since 1998
        </p>
        <h1 style={{ fontSize: 72, fontWeight: 600, margin: "16px 0 0", textAlign: "center" }}>
          {siteConfig.name}
        </h1>
        <p style={{ fontSize: 30, marginTop: 20, textAlign: "center", maxWidth: 900, opacity: 0.92 }}>
          Gold · Diamond · Bridal · Bespoke Atelier
        </p>
        <p style={{ fontSize: 22, marginTop: 28, opacity: 0.75 }}>Sikar, Rajasthan</p>
      </div>
    ),
    { ...size },
  );
}
