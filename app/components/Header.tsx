"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState, type Dispatch, type SetStateAction } from "react";
import { SocialIconFacebook, SocialIconInstagram } from "@/app/components/SocialIcons";
import { socialLinks } from "@/app/lib/siteData";

const navLinks = [
  { href: "/collections/gold", label: "Gold Jewellery" },
  { href: "/collections/diamond", label: "Diamond Jewellery" },
  { href: "/collections", label: "All Jewellery" },
  { href: "/collections/diamond/earrings", label: "Earrings" },
  { href: "/collections/gold/rings", label: "Rings" },
  { href: "/bridal", label: "Gifting" },
  { href: "/collections", label: "Collection" },
];

const menuTop =
  "top-[calc(env(safe-area-inset-top,0px)+9.5rem)] sm:top-[calc(env(safe-area-inset-top,0px)+10.5rem)]";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-white)] pt-[env(safe-area-inset-top)] shadow-[0_6px_24px_rgba(45,36,38,0.05)]">
      <div className="dp-utility-bar">
        <div className="site-max site-px flex items-center justify-between gap-3 py-2">
          <Link href="tel:+0000000000" className="inline-flex items-center gap-2 transition hover:text-[var(--color-rose)]">
            <span aria-hidden>☎</span>
            <span>+00 000 000 0000</span>
          </Link>
          <p className="hidden text-center font-[family-name:var(--font-display)] text-[0.72rem] tracking-[0.24em] text-[var(--color-rose)] sm:block">
            MB JEWELLERS
          </p>
          <button type="button" className="inline-flex items-center gap-2 uppercase transition hover:text-[var(--color-rose)]">
            <span>Gold 24KT/1g</span>
            <span className="text-[var(--color-ink)]">₹ —</span>
            <span aria-hidden>▾</span>
          </button>
        </div>
      </div>

      <div className="site-max site-px border-b border-[var(--color-border)] bg-white py-4">
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,220px)_1fr_minmax(0,220px)]">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="MB Jewellers Home">
            <Image
              src="/mb-jewellers-logo.png"
              alt="MB Jewellers logo"
              width={896}
              height={768}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <span className="min-w-0 sm:hidden">
              <span className="block font-[family-name:var(--font-display)] text-xl text-[var(--color-rose)]">MB Jewellers</span>
              <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
                A bond of trust
              </span>
            </span>
          </Link>

          <label className="dp-search mx-auto flex w-full max-w-2xl items-center gap-3 rounded-sm px-4 py-3">
            <span aria-hidden className="text-[var(--color-ink-muted)]">
              ⌕
            </span>
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-muted)]"
            />
          </label>

          <HeaderActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} panelId={panelId} />
        </div>
      </div>

      <nav className="site-max site-px hidden items-center justify-center gap-6 py-3 md:flex lg:gap-8" aria-label="Main">
        {navLinks.map((link) => (
          <Link key={`${link.href}-${link.label}`} href={link.href} className="dp-nav-link text-sm tracking-[0.06em]">
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Dismiss menu"
        className={`fixed inset-x-0 bottom-0 z-40 bg-[var(--color-ink)]/25 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${menuTop} ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
        className={`fixed inset-x-0 bottom-0 z-[45] flex flex-col border-t border-[var(--color-border)] bg-white shadow-lg transition-[opacity,visibility] duration-200 ease-out md:hidden ${menuTop} ${
          menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <nav className="site-px flex max-h-[min(70dvh,560px)] flex-col gap-1 overflow-y-auto overscroll-contain py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {navLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="rounded-sm px-3 py-3.5 text-base text-[var(--color-ink)] transition hover:bg-[var(--color-rose-soft)] hover:text-[var(--color-rose)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HeaderActions({
  menuOpen,
  setMenuOpen,
  panelId,
}: {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  panelId: string;
}) {
  return (
    <div className="flex items-center justify-end gap-2 sm:gap-3">
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)]"
        aria-label="Instagram"
      >
        <SocialIconInstagram className="h-5 w-5" />
      </a>
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)]"
        aria-label="Facebook"
      >
        <SocialIconFacebook className="h-5 w-5" />
      </a>
      <Link
        href="/contact"
        className="hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)] sm:inline-flex"
        aria-label="Contact"
      >
        <span aria-hidden>◎</span>
      </Link>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-ink)] md:hidden"
        aria-expanded={menuOpen}
        aria-controls={panelId}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </div>
  );
}
