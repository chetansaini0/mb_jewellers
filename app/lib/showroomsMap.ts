import { showrooms } from "@/app/lib/siteConfig";

export const showroomsMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5efe3" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5f554a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fff8ea" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eadcc2" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8dcc7" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#d9e5ec" }] },
] as const;

export function getShowroomsMapCenter() {
  const lat = showrooms.reduce((sum, showroom) => sum + showroom.coordinates.lat, 0) / showrooms.length;
  const lng = showrooms.reduce((sum, showroom) => sum + showroom.coordinates.lng, 0) / showrooms.length;
  return { lat, lng, zoom: 14 };
}

export function getCombinedMapEmbedUrl() {
  const { lat, lng, zoom } = getShowroomsMapCenter();
  return `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`;
}

export function loadGoogleMapsScript(apiKey: string) {
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
