export type ConversionEvent =
  | "phone_click"
  | "whatsapp_click"
  | "directions_click"
  | "appointment_submit"
  | "contact_form_submit"
  | "product_enquiry";

type ConversionParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackConversion(event: ConversionEvent, params: ConversionParams = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event_category: "conversion",
    event_label: event,
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
