"use client";

import { useEffect, useRef, useState } from "react";
import { showrooms } from "@/app/lib/siteData";
import {
  getCombinedMapEmbedUrl,
  getShowroomsMapCenter,
  loadGoogleMapsScript,
  showroomsMapStyles,
} from "@/app/lib/showroomsMap";

type Props = {
  variant?: "contact" | "home";
};

export function PremiumShowroomsMap({ variant = "contact" }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "fallback">(() =>
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "loading" : "fallback",
  );

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return;
    }

    let mounted = true;
    loadGoogleMapsScript(apiKey)
      .then(() => {
        const googleMaps = (
          window as Window & {
            google?: {
              maps?: {
                Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
                Marker: new (options: Record<string, unknown>) => unknown;
              };
            };
          }
        ).google?.maps;
        if (!mounted || !mapRef.current || !googleMaps) return;

        const center = getShowroomsMapCenter();
        const map = new googleMaps.Map(mapRef.current, {
          center: { lat: center.lat, lng: center.lng },
          zoom: center.zoom,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: showroomsMapStyles,
        });

        for (const showroom of showrooms) {
          new googleMaps.Marker({
            position: showroom.coordinates,
            map,
            title: showroom.name,
          });
        }

        setStatus("ready");
      })
      .catch(() => {
        if (mounted) {
          setStatus("error");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "fallback" || status === "error") {
    return (
      <div className="premium-map__frame">
        <iframe
          title="MB Jewellers showrooms in Sikar"
          src={getCombinedMapEmbedUrl()}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className={variant === "home" ? "premium-map__embed" : "premium-map__embed premium-map__embed--contact"}
        />
      </div>
    );
  }

  return (
    <div className={variant === "home" ? "premium-home-map__canvas-wrap" : "premium-showrooms-map__canvas-wrap"}>
      <div
        ref={mapRef}
        className={variant === "home" ? "premium-home-map__canvas" : "premium-showrooms-map__canvas"}
        role="img"
        aria-label="MB Jewellers showroom locations in Sikar"
      />
    </div>
  );
}
