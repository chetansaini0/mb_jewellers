"use client";

import { useEffect } from "react";
import { trackConversion } from "@/app/lib/analytics";

export function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackConversion("phone_click", { link_url: href });
        return;
      }
      if (href.includes("wa.me") || href.toLowerCase().includes("whatsapp")) {
        trackConversion("whatsapp_click", { link_url: href });
        return;
      }
      if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl") || href.includes("maps/dir")) {
        trackConversion("directions_click", { link_url: href });
        return;
      }
      if (href.includes("interest=")) {
        trackConversion("product_enquiry", { link_url: href });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
