"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { readCookieConsent, subscribeCookieConsent } from "@/app/lib/cookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export function GoogleAnalytics() {
  const enabled = useSyncExternalStore(
    subscribeCookieConsent,
    () => readCookieConsent() === "accepted",
    () => false,
  );

  if (!GA_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="mb-ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
