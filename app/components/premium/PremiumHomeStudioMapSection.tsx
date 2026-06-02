"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { flagshipStudio } from "@/app/lib/siteData";

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5efe3" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5f554a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fff8ea" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eadcc2" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8dcc7" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#d9e5ec" }] },
];

function loadGoogleMapsScript(apiKey: string) {
  return new Promise<void>((resolve, reject) => {
    const googleMaps = (window as Window & { google?: { maps?: unknown } }).google?.maps;
    if (googleMaps) {
      resolve();
      return;
    }

    const existing = document.getElementById("google-maps-js");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Google Maps failed to load.")), { once: true });
    document.head.appendChild(script);
  });
}

export function PremiumHomeStudioMapSection() {
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
        const googleMaps = (window as Window & { google?: { maps?: { Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown; Marker: new (options: Record<string, unknown>) => unknown } } }).google?.maps;
        if (!mounted || !mapRef.current || !googleMaps) return;
        const center = {
          lat: flagshipStudio.coordinates.lat,
          lng: flagshipStudio.coordinates.lng,
        };
        const map = new googleMaps.Map(mapRef.current, {
          center,
          zoom: 16,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: mapStyles,
        });
        new googleMaps.Marker({
          position: center,
          map,
          title: flagshipStudio.name,
        });
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

  return (
    <section className="premium-section site-max site-px premium-home-map">
      <div className="premium-section__head">
        <p className="premium-eyebrow">Studio location</p>
        <h2 className="premium-title">Visit MB Jewellers in Sikar</h2>
        <p className="premium-section__lede">{flagshipStudio.address}</p>
      </div>

      <div className="premium-map premium-glass-card">
        {status === "fallback" || status === "error" ? (
          <div className="premium-map__frame">
            <iframe
              title={`${flagshipStudio.name} on Google Maps`}
              src={flagshipStudio.mapEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="premium-map__embed"
            />
          </div>
        ) : (
          <div className="premium-home-map__canvas-wrap">
            <div ref={mapRef} className="premium-home-map__canvas" role="img" aria-label={`${flagshipStudio.name} location map`} />
          </div>
        )}
        <div className="premium-contact__social">
          <Link href={flagshipStudio.directionsUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </Link>
        </div>
      </div>
    </section>
  );
}
