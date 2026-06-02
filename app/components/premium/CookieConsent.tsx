"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useClientMounted } from "@/app/hooks/useClientMounted";
import { readCookieConsent, subscribeCookieConsent, writeCookieConsent } from "@/app/lib/cookieConsent";

export function CookieConsent() {
  const mounted = useClientMounted();
  const consent = useSyncExternalStore(subscribeCookieConsent, readCookieConsent, () => null);

  if (!mounted || consent !== null) {
    return null;
  }

  return (
    <div className="premium-cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-live="polite">
      <div className="premium-cookie-banner__inner premium-glass-card">
        <p id="cookie-banner-title" className="premium-cookie-banner__title">
          We value your privacy
        </p>
        <p className="premium-cookie-banner__copy">
          We use essential cookies for security. With your consent, we also use analytics to improve the experience.{" "}
          <Link href="/cookie-policy" className="premium-inline-link">
            Cookie policy
          </Link>
        </p>
        <div className="premium-cookie-banner__actions">
          <button type="button" className="premium-button premium-button--ghost" onClick={() => writeCookieConsent("declined")}>
            Decline
          </button>
          <button type="button" className="premium-button premium-button--primary" onClick={() => writeCookieConsent("accepted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
