"use client";

import { BridalShowcase } from "@/app/components/BridalShowcase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { categoryShowcase, featuredPieces } from "@/app/lib/siteData";

const trustItems = [
  "Quality craftsmanship",
  "The purity guarantee",
  "100% transparency & trust",
  "Heritage craftsmanship",
  "Certified diamond jewellery",
];

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1800&q=80",
    alt: "Gold jewellery styling",
    caption: "Trust",
  },
  {
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1800&q=80",
    alt: "Diamond ring close-up",
    caption: "Brilliance",
  },
  {
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1800&q=80",
    alt: "Bridal jewellery set",
    caption: "Legacy",
  },
];

const curatedCollections = [
  {
    title: "A Floral Dream",
    href: "/collections/diamond",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=900&q=80",
  },
  {
    title: "Everyday Treasures",
    href: "/collections/gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
  },
  {
    title: "Beyond Eternity",
    href: "/collections/diamond/rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
  },
  {
    title: "Symbols of Love",
    href: "/bridal",
    image: "/pics/Bridal/b1.jpg",
  },
];

const promoTiles = categoryShowcase.slice(0, 3);

const appointmentHighlights = [
  {
    title: "Private consultation",
    detail: "Share your occasion, timeline, and style with a dedicated consultant.",
  },
  {
    title: "Curated shortlist",
    detail: "Receive handpicked options across gold, diamond, and bridal collections.",
  },
  {
    title: "In-store experience",
    detail: "Visit our studio for fittings, finishing details, and final selection.",
  },
];

const stores = [
  {
    city: "Sikar",
    address: "MB Jewellers Studio, Heritage Bazaar District",
    href: "/contact",
  },
  {
    city: "Jaipur",
    address: "Private appointment consultations available on request",
    href: "/contact",
  },
];

function useAutoAdvance(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, length]);

  return { index, setIndex };
}

function SlidingRail({
  children,
  className = "",
  intervalMs = 4500,
}: {
  children: ReactNode;
  className?: string;
  intervalMs?: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = Math.max(280, Math.floor(rail.clientWidth * 0.82));
    rail.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const advance = () => {
      const amount = Math.max(280, Math.floor(rail.clientWidth * 0.82));
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 0) return;
      if (rail.scrollLeft >= maxScroll - 8) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      rail.scrollBy({ left: amount, behavior: "smooth" });
    };

    const timer = window.setInterval(advance, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, children]);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Previous"
        className="dp-circle-arrow absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
        onClick={() => scrollBy(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        className="dp-circle-arrow absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
        onClick={() => scrollBy(1)}
      >
        ›
      </button>
      <div ref={railRef} className="dp-rail flex gap-4 overflow-x-auto px-1 pb-2 md:px-12">
        {children}
      </div>
    </div>
  );
}

function HeroCarousel({
  slides,
  index,
  onSelect,
}: {
  slides: typeof heroSlides;
  index: number;
  onSelect: (nextIndex: number) => void;
}) {
  const go = (direction: -1 | 1) => {
    onSelect((index + direction + slides.length) % slides.length);
  };

  return (
    <section className="dp-hero relative overflow-hidden bg-white">
      <div className="relative min-h-[min(72vh,760px)] overflow-hidden">
        <div className="dp-hero-track flex h-full" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
          {slides.map((slide, slideIndex) => (
            <div key={slide.caption} className="relative h-[min(72vh,760px)] min-w-full shrink-0">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                className="object-cover"
                sizes="100vw"
              />
              <HeroOverlay caption={slide.caption} />
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous slide"
          className="dp-circle-arrow absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="dp-circle-arrow absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
          onClick={() => go(1)}
        >
          ›
        </button>
        <div className="dp-hero-dots absolute inset-x-0 bottom-4 z-20">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.caption}
              type="button"
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={index === slideIndex}
              className={`dp-hero-dot ${index === slideIndex ? "is-active" : ""}`}
              onClick={() => onSelect(slideIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoMarquee({ tiles }: { tiles: typeof promoTiles }) {
  const loop = [...tiles, ...tiles];

  return (
    <section className="bg-white py-10">
      <div className="site-max site-px">
        <div className="dp-marquee-shell">
          <div className="dp-marquee-track">
            {loop.map((tile, tileIndex) => (
              <Link
                key={`${tile.title}-${tileIndex}`}
                href={tile.href}
                className="dp-rail-card w-[min(88vw,360px)] shrink-0 overflow-hidden rounded-sm"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={tile.coverImage} alt={tile.coverAlt} fill className="object-cover" sizes="360px" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroOverlay({ caption }: { caption: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,36,38,0.55)] via-transparent to-[rgba(45,36,38,0.12)]" />
      <p className="dp-hero-caption absolute inset-x-0 bottom-10 text-center font-[family-name:var(--font-display)] text-4xl uppercase tracking-[0.35em] text-white sm:text-5xl">
        {caption}
      </p>
    </>
  );
}

function NewArrivalsSection({ products }: { products: typeof featuredPieces }) {
  const carousel = useAutoAdvance(products.length, 5000);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const go = (direction: -1 | 1) => {
    carousel.setIndex((current) => (current + direction + products.length) % products.length);
  };

  useLayoutEffect(() => {
    const updateOffset = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const card = track.querySelector<HTMLElement>("[data-carousel-card]");
      if (!card) return;

      const gap = 16;
      const cardWidth = card.offsetWidth;
      const center = (viewport.clientWidth - cardWidth) / 2;
      setOffset(carousel.index * (cardWidth + gap) - center);
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [carousel.index, products.length]);

  return (
    <section className="dp-new-arrivals bg-white py-12 sm:py-16">
      <div className="site-max site-px">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="dp-section-title">New Arrivals</h2>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rose)] transition hover:text-[var(--color-rose-dark)]"
          >
            View all
            <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous slide"
            className="dp-circle-arrow absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="dp-circle-arrow absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
            onClick={() => go(1)}
          >
            ›
          </button>

          <div ref={viewportRef} className="dp-new-arrivals-viewport md:px-12">
            <div
              ref={trackRef}
              className="dp-new-arrivals-track"
              style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
            >
              {products.map((product, productIndex) => {
                const distance = Math.abs(productIndex - carousel.index);
                const stateClass = distance === 0 ? "is-center" : distance === 1 ? "is-side" : "is-away";

                return (
                  <article
                    key={product.name}
                    data-carousel-card
                    className={`dp-new-arrivals-card dp-product-card overflow-hidden rounded-sm ${stateClass}`}
                  >
                    <div className="relative">
                      <ProductImage product={product} />
                      <button
                        type="button"
                        aria-label={`Save ${product.name} to favorites`}
                        className="dp-favorite-button absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full"
                      >
                        ♡
                      </button>
                    </div>
                    <div className="space-y-2 px-4 py-4">
                      <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)]">{product.detail}</p>
                      <Link
                        href="/contact"
                        className="inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rose)]"
                      >
                        Request details
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dp-new-arrivals-dots mt-8">
          {products.map((product, productIndex) => (
            <button
              key={product.name}
              type="button"
              aria-label={`Go to slide ${productIndex + 1}`}
              aria-current={carousel.index === productIndex}
              className={`dp-new-arrivals-dot ${carousel.index === productIndex ? "is-active" : ""}`}
              onClick={() => carousel.setIndex(productIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection({
  title,
  ctaHref,
  products,
}: {
  title: string;
  ctaHref: string;
  products: typeof featuredPieces;
}) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="site-max site-px">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="dp-section-title">{title}</h2>
          <Link
            href={ctaHref}
            className="dp-pill-button rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            View all
          </Link>
        </div>
        <SlidingRail>
          {products.map((product) => (
            <article
              key={`${title}-${product.name}`}
              className="dp-product-card min-w-[220px] max-w-[260px] shrink-0 overflow-hidden rounded-sm"
            >
              <ProductImage product={product} />
              <div className="space-y-2 px-4 py-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                  {product.name}
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)]">{product.detail}</p>
                <Link
                  href="/contact"
                  className="inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rose)]"
                >
                  Request details
                </Link>
              </div>
            </article>
          ))}
        </SlidingRail>
      </div>
    </section>
  );
}

function ProductImage({ product }: { product: (typeof featuredPieces)[number] }) {
  return (
    <div className="relative aspect-square bg-[var(--color-rose-soft)]">
      <Image src={product.image} alt={product.alt} fill className="object-cover" sizes="260px" />
    </div>
  );
}

function BridalHomeSection() {
  return (
    <section className="dp-bridal bg-[var(--color-white)] py-12 sm:py-16">
      <div className="site-max site-px grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
            Bridal Studio
          </p>
          <h2 className="dp-section-title mt-3">Bespoke Bridal Jewellery</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Collaborate with our design consultants to build complete bridal sets for engagement, wedding, reception,
            and gifting ceremonies tailored to your outfit and traditions.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Explore signature bridal styling, then schedule a private consultation to curate your final look.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/bridal"
              className="dp-pill-button rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Explore bridal
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--color-border)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)]"
            >
              Book consultation
            </Link>
          </div>
        </div>
        <div className="min-w-0">
          <BridalShowcase />
        </div>
      </div>
    </section>
  );
}

function AppointmentHomeSection() {
  return (
    <section className="dp-appointment bg-white py-12 sm:py-16">
      <div className="site-max site-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
            Private Appointments
          </p>
          <h2 className="dp-section-title mt-3">Book a Studio Visit</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Share your requirements and preferred date. Our consultants respond with curated options and appointment
            details for Sikar and Jaipur.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {appointmentHighlights.map((item) => (
            <article key={item.title} className="dp-appointment-card rounded-sm p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-rose)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="dp-pill-button rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Request appointment
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-border)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)]"
          >
            Contact studio
          </Link>
        </div>
      </div>
    </section>
  );
}

function CookieActions({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="dp-pill-button rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]"
        onClick={onAccept}
      >
        Accept cookies
      </button>
      <button
        type="button"
        className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]"
        onClick={onDecline}
      >
        Decline
      </button>
    </div>
  );
}

export function DPHomePage() {
  const hero = useAutoAdvance(heroSlides.length, 5200);
  const [cookieVisible, setCookieVisible] = useState(true);

  return (
    <>
      <HeroCarousel slides={heroSlides} index={hero.index} onSelect={hero.setIndex} />

      <section className="dp-trust-strip">
        <div className="site-max site-px flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-center uppercase">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-white)] py-12 sm:py-16">
        <div className="site-max site-px">
          <CuratedHeader />
          <SlidingRail>
            {curatedCollections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="dp-rail-card min-w-[220px] max-w-[260px] shrink-0 overflow-hidden rounded-sm"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="260px" />
                </div>
                <p className="px-4 py-4 text-center font-[family-name:var(--font-display)] text-lg text-[var(--color-rose)]">
                  {item.title}
                </p>
              </Link>
            ))}
          </SlidingRail>
        </div>
      </section>

      <PromoMarquee tiles={promoTiles} />

      <NewArrivalsSection products={featuredPieces.slice(0, 6)} />
      <ProductSection title="Bestsellers" ctaHref="/collections" products={[...featuredPieces].reverse().slice(0, 6)} />

      <BridalHomeSection />
      <AppointmentHomeSection />

      <section className="bg-[var(--color-white)] py-12 sm:py-16">
        <div className="site-max site-px">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="dp-section-title">About Stores</h2>
          </div>
          <SlidingRail>
            {stores.map((store) => (
              <article key={store.city} className="dp-store-card min-w-[280px] max-w-[360px] shrink-0 rounded-sm p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-rose)]">
                  {store.city}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{store.address}</p>
                <Link
                  href={store.href}
                  className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rose)]"
                >
                  View store info
                </Link>
              </article>
            ))}
          </SlidingRail>
        </div>
      </section>

      <a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="dp-whatsapp-fab fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.12em]"
        aria-label="Chat on WhatsApp"
      >
        WA
      </a>

      {cookieVisible ? (
        <CookieBanner onAccept={() => setCookieVisible(false)} onDecline={() => setCookieVisible(false)} />
      ) : null}
    </>
  );
}

function CuratedHeader() {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 className="dp-section-title">Curated For You</h2>
      <Link
        href="/collections"
        className="dp-pill-button rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]"
      >
        Collections
      </Link>
    </div>
  );
}

function CookieBanner({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="dp-cookie-banner fixed inset-x-0 bottom-0 z-40">
      <div className="site-max flex flex-col gap-4 site-px py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm text-[var(--color-ink-muted)]">
          Our website uses cookies. By continuing, you agree to our{" "}
          <Link href="/contact" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
        <CookieActions onAccept={onAccept} onDecline={onDecline} />
      </div>
    </div>
  );
}
