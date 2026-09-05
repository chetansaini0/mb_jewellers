"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SocialIconFacebook, SocialIconInstagram } from "@/app/components/SocialIcons";
import { socialLinks } from "@/app/lib/siteData";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/bridal", label: "Bridal" },
  { href: "/heritage", label: "Heritage" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Atelier" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Appointments" },
];

export function PremiumHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 24;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!menuOpen || !headerRef.current) return;
    setHeaderHeight(headerRef.current.offsetHeight);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.documentElement.classList.add("premium-menu-open");
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.documentElement.classList.remove("premium-menu-open");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("keydown", handleEscape);
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const isHomePage = pathname === "/";

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          className="premium-header__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      {menuOpen ? <div className="premium-header__spacer" style={{ height: headerHeight }} aria-hidden /> : null}
      <header
        ref={headerRef}
        className={`premium-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-menu-open" : ""}`}
      >
        <div className="premium-header__inner site-max site-px">
          <Link href="/" className="premium-header__brand" aria-label="MB Jewellers Home">
            <Image
              src="/mb-jewellers-logo.png"
              alt="MB Jewellers logo"
              width={896}
              height={768}
              sizes="(max-width: 768px) 120px, 160px"
              priority={isHomePage}
              loading={isHomePage ? "eager" : undefined}
              fetchPriority={isHomePage ? "high" : "auto"}
              className="premium-header__logo"
            />
            <span className="premium-header__brand-copy">
              <span>MB Jewellers</span>
              <small>Since 1998</small>
            </span>
          </Link>

          <button
            type="button"
            className="premium-header__menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <nav
            id="mobile-nav"
            className={`premium-header__nav ${menuOpen ? "is-open" : ""}`}
            aria-label="Primary"
            {...(menuOpen ? { "aria-modal": true as const } : {})}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="premium-header__link"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <HeaderActions closeMenu={() => setMenuOpen(false)} />
        </div>
      </header>
    </>
  );
}

function HeaderActions({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="premium-header__actions">
      <div className="premium-header__social" aria-label="Social media">
        <Link
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-header__social-link"
          aria-label="MB Jewellers on Instagram"
        >
          <SocialIconInstagram className="premium-header__social-icon" />
        </Link>
        <Link
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-header__social-link"
          aria-label="MB Jewellers on Facebook"
        >
          <SocialIconFacebook className="premium-header__social-icon" />
        </Link>
      </div>

      <Link href="/contact" className="premium-button premium-button--ghost premium-header__cta" onClick={closeMenu}>
        Private viewing
      </Link>
    </div>
  );
}
