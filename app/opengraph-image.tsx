import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/lib/siteConfig";

export const alt = `${siteConfig.name} — Luxury Jewellery in Sikar`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(145deg, #120c06 0%, #2a1f10 38%, #4a3a1c 72%, #1a1208 100%)",
        color: "#f5ecd7",
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: "56px 64px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <p
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.8,
            margin: 0,
          }}
        >
          Since 1998
        </p>
        <p style={{ fontSize: 20, opacity: 0.7, margin: 0 }}>Sikar · Rajasthan</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 980 }}>
        <h1
          style={{
            fontSize: 76,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
        </h1>
        <p style={{ fontSize: 30, marginTop: 18, marginBottom: 0, opacity: 0.92, maxWidth: 860 }}>
          Gold · Diamond · Bridal · Bespoke atelier
        </p>
        <p style={{ fontSize: 22, marginTop: 16, marginBottom: 0, opacity: 0.72, maxWidth: 820 }}>
          Private studio viewings — purchases in person, not online
        </p>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          borderTop: "1px solid rgba(245, 236, 215, 0.28)",
          paddingTop: 22,
          fontSize: 20,
          opacity: 0.78,
        }}
      >
        Ghantaghar · Ramlila Maidan · Sikar
      </div>
    </div>,
    { ...size },
  );
}
