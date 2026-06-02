"use client";

import { useEffect, useId } from "react";
import { googleTranslateIncludedLanguages, translationLanguages } from "@/app/lib/siteData";

const ELEMENT_ID = "google_translate_element";

interface GoogleTranslateCtor {
  new (
    options: {
      pageLanguage: string;
      includedLanguages: string;
      layout: number;
      autoDisplay: boolean;
    },
    elementId: string,
  ): unknown;
  InlineLayout?: { SIMPLE: number };
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: GoogleTranslateCtor;
      };
    };
  }
}

function getGoogtransCookie(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;)\s*googtrans=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

function getSelectedLanguageFromCookie(): string {
  const raw = getGoogtransCookie();
  if (!raw) return "en";
  const parts = raw.split("/").filter(Boolean);
  const target = parts[parts.length - 1];
  if (!target || target === "en") return "en";
  const known = translationLanguages.some((l) => l.code === target);
  return known ? target : "en";
}

function clearGoogtransCookies(): void {
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  document.cookie = `googtrans=;expires=${expires};path=/`;
  document.cookie = `googtrans=;expires=${expires};path=/;domain=${host}`;
  document.cookie = `googtrans=;expires=${expires};path=/;domain=.${host}`;
}

function applyLanguage(code: string): void {
  if (code === "en") {
    clearGoogtransCookies();
  } else {
    document.cookie = `googtrans=/en/${code};path=/`;
  }
  window.location.reload();
}

function translateGadgetMounted(): boolean {
  return !!document.querySelector(`#${ELEMENT_ID} .goog-te-gadget`);
}

export function FooterLanguageSwitcher() {
  const selectId = useId();
  const selected =
    typeof window !== "undefined" ? getSelectedLanguageFromCookie() : "en";

  useEffect(() => {
    const init = () => {
      if (typeof window === "undefined" || translateGadgetMounted()) return;
      const translate = window.google?.translate;
      if (!translate?.TranslateElement) return;

      const ctor = translate.TranslateElement;
      const layout = ctor.InlineLayout?.SIMPLE ?? 2;

      try {
        new ctor(
          {
            pageLanguage: "en",
            includedLanguages: googleTranslateIncludedLanguages,
            layout,
            autoDisplay: false,
          },
          ELEMENT_ID,
        );
      } catch {
        /* duplicate init / hot reload */
      }
    };

    window.googleTranslateElementInit = init;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="translate.google.com/translate_a/element.js"]',
    );

    if (existingScript) {
      if (window.google?.translate) init();
      return () => {
        delete window.googleTranslateElementInit;
      };
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="relative sm:col-span-2 lg:col-span-1">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-rose)]">
        Languages
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Choose a language from the list below to translate this site.{" "}
        <span className="text-[var(--color-ink)]">English</span> is the default. Translation is
        powered by <span className="text-[var(--color-ink)]">Google Translate</span> and may be
        imperfect.
      </p>

      <div className="notranslate mt-4">
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rose)]"
        >
          Choose language
        </label>
        <select
          id={selectId}
          className="mt-2 w-full max-w-xs rounded-sm border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-rose)] focus:ring-1 focus:ring-[var(--color-rose)]"
          value={selected}
          suppressHydrationWarning
          onChange={(e) => {
            applyLanguage(e.target.value);
          }}
        >
          {translationLanguages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <p className="sr-only" id={`${ELEMENT_ID}-label`}>
        Google Translate
      </p>
      <div
        id={ELEMENT_ID}
        aria-hidden
        className="google-translate-root pointer-events-none fixed left-0 top-0 -z-[100] h-px w-px overflow-hidden opacity-0"
        aria-labelledby={`${ELEMENT_ID}-label`}
      />
    </div>
  );
}
