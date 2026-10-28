"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useClientMounted } from "@/app/hooks/useClientMounted";
import { legalFooterLinks } from "@/app/lib/legalContent";
import { getWhatsAppUrl, hasWhatsApp, openingHours, siteConfig } from "@/app/lib/siteConfig";
import { socialLinks } from "@/app/lib/siteData";

function PremiumNewsletterForm() {
  const mounted = useClientMounted();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  if (!mounted) {
    return (
      <div className="premium-footer__newsletter" aria-hidden>
        <div className="premium-field" style={{ minHeight: "2.75rem", opacity: 0.4 }} />
        <button type="button" className="premium-button premium-button--primary" disabled tabIndex={-1}>
          Subscribe
        </button>
      </div>
    );
  }

  return (
    <form
      className="premium-footer__newsletter"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("loading");
        setError("");
        try {
          const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, website }),
          });

          if (!response.ok) {
            throw new Error("Unable to subscribe right now.");
          }

          setStatus("success");
          setEmail("");
        } catch {
          setStatus("error");
          setError("Please try again in a moment.");
        }
      }}
    >
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        className="premium-field"
        aria-label="Email address"
        required
      />
      <label className="sr-only" htmlFor="newsletter-website">
        Leave this field empty
      </label>
      <input
        id="newsletter-website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <button type="submit" className="premium-button premium-button--primary">
        {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed" : "Subscribe"}
      </button>
      {status === "error" ? <p className="premium-footer__copy">{error}</p> : null}
      {status === "success" ? <p className="premium-footer__copy">You are on our private updates list.</p> : null}
    </form>
  );
}

export function PremiumFooter() {
  return (
    <footer className="premium-footer">
      <div className="site-max site-px premium-footer__intro" data-reveal>
        <span className="premium-ornament" aria-hidden />
        <Image src="/mb-jewellers-logo.png" alt="MB Jewellers" width={896} height={768} className="premium-footer__logo" />
        <p className="premium-footer__tagline">
          Trusted jewellery showroom in Sikar, Rajasthan — gold, diamond, silver, and bridal collections for families
          across Shekhawati. Showcase site — visit our studio to purchase.
        </p>
      </div>
      <div className="site-max site-px premium-footer__grid">
        <nav aria-label="Footer navigation">
          <p className="premium-footer__label">Explore</p>
          <div className="premium-footer__links premium-footer__links--explore">
            <Link href="/collections">Collections</Link>
            <Link href="/collections/gold">Gold jewellery</Link>
            <Link href="/collections/diamond">Diamond jewellery</Link>
            <Link href="/collections/silver">Silver jewellery</Link>
            <Link href="/bridal">Bridal jewellery</Link>
            <Link href="/wedding">Wedding jewellery</Link>
            <Link href="/rings">Rings</Link>
            <Link href="/earrings">Earrings</Link>
            <Link href="/necklaces">Necklaces</Link>
            <Link href="/bangles">Bangles</Link>
            <Link href="/daily-wear">Daily wear</Link>
            <Link href="/new-arrivals">New arrivals</Link>
            <Link href="/heritage">Heritage</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/services">Custom jewellery</Link>
            <Link href="/blog">Journal</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/about">About us</Link>
            <Link href="/#local-seo-heading">Best jewellery shop in Sikar</Link>
            <Link href="/showrooms">Sikar showrooms</Link>
            <Link href="/contact">Visit our store</Link>
          </div>
        </nav>
        <nav aria-label="Legal policies">
          <p className="premium-footer__label">Policies</p>
          <div className="premium-footer__links">
            {legalFooterLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="premium-footer__contact">
          <p className="premium-footer__label">Visit &amp; contact</p>
          {siteConfig.showrooms.map((showroom) => (
            <div key={showroom.id} className="premium-footer__showroom">
              <p className="premium-footer__showroom-name">{showroom.name}</p>
              <p>{showroom.address}</p>
              <p className="premium-footer__showroom-phones">
                {showroom.landlines.map((line, index) => (
                  <span key={line.e164}>
                    {index > 0 ? " · " : null}
                    <a href={`tel:${line.e164}`}>{line.display}</a>
                  </span>
                ))}
              </p>
              <p>
                <a href={showroom.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  {showroom.name} on Google
                </a>
              </p>
            </div>
          ))}
          <p className="premium-footer__hours">{openingHours.display}</p>
          <p>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
          {hasWhatsApp() ? (
            <p>
              <a
                href={getWhatsAppUrl("Hello MB Jewellers, I need assistance with jewellery selection.") ?? "/contact"}
                target="_blank"
                rel="noreferrer"
                className="premium-footer__whatsapp"
              >
                WhatsApp concierge
              </a>
            </p>
          ) : null}
        </div>
        <div>
          <p className="premium-footer__label">Social</p>
          <div className="premium-footer__links premium-footer__social">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
        <div>
          <p className="premium-footer__label">Newsletter</p>
          <p className="premium-footer__copy">Receive curated edits, bridal notes, and private viewing invitations.</p>
          <PremiumNewsletterForm />
          <p className="premium-footer__copy mt-3">
            <Link href="/unsubscribe">Unsubscribe from emails</Link>
          </p>
        </div>
      </div>
      <div className="premium-footer__bar site-px">
        <p suppressHydrationWarning>© {new Date().getFullYear()} MB Jewellers. Crafted for the extraordinary.</p>
      </div>
    </footer>
  );
}
