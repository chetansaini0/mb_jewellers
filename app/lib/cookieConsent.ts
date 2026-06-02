export const COOKIE_CONSENT_KEY = "mb_cookie_consent";

export type CookieConsentStatus = "accepted" | "declined" | null;

export function readCookieConsent(): CookieConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "declined") return value;
    return null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(status: "accepted" | "declined") {
  localStorage.setItem(COOKIE_CONSENT_KEY, status);
  window.dispatchEvent(new CustomEvent("mb-cookie-consent", { detail: { status } }));
}

export function subscribeCookieConsent(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("mb-cookie-consent", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("mb-cookie-consent", handler);
    window.removeEventListener("storage", handler);
  };
}
