"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PremiumFeaturedPieceCard } from "@/app/components/premium/PremiumFeaturedPieceCard";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { slugifyProductName } from "@/app/lib/premiumPages";
import { getWhatsAppUrl } from "@/app/lib/siteConfig";
import type { ProductItem } from "@/app/lib/siteData";
import { featuredPieces } from "@/app/lib/siteData";

const GALLERY_AUTOPLAY_MS = 3000;

const productGalleryBySlug: Record<string, string[]> = {
  "rajwada-bridal-silver-ensemble": [
    "/pics/new-arrivals/silver8-main.png",
    "/pics/new-arrivals/silver8-1-scroll.png",
    "/pics/new-arrivals/silver8-2-scroll.png",
    "/pics/new-arrivals/silver8-3-scroll.png",
    "/pics/new-arrivals/silver8-4-scroll.png",
  ],
  "rajwada-pearl-silver-suite": [
    "/pics/new-arrivals/silver6-main.png",
    "/pics/new-arrivals/silver6-1-scroll.png",
    "/pics/new-arrivals/silver6-2-scroll.png",
    "/pics/new-arrivals/silver6-3-scroll.png",
    "/pics/new-arrivals/silver6-4-scroll.png",
  ],
  "emerald-diamond-set": [
    "/pics/new-arrivals/diamond1-main.png",
    "/pics/new-arrivals/diamond1-1-scroll.png",
    "/pics/new-arrivals/diamond1-2-scroll.png",
    "/pics/new-arrivals/diamond1-4-scroll.png",
    "/pics/new-arrivals/diamond1-5-scroll.png",
  ],
  "crown-star-solitaire": [
    "/pics/new-arrivals/diamond1-main.png",
    "/pics/new-arrivals/diamond1-1-scroll.png",
    "/pics/new-arrivals/diamond1-2-scroll.png",
    "/pics/new-arrivals/diamond1-4-scroll.png",
    "/pics/new-arrivals/diamond1-5-scroll.png",
  ],
  "aurora-halo-drops": [
    "/pics/new-arrivals/diamond2-main.png",
    "/pics/new-arrivals/diamond2-1-scroll.png",
    "/pics/new-arrivals/diamond2-2-scroll.png",
    "/pics/new-arrivals/diamond2-4-scroll.png",
    "/pics/new-arrivals/diamond2-5-scroll.png",
  ],
  "heritage-filigree-chokar": [
    "/pics/new-arrivals/heritage-filigree-main.png",
    "/pics/new-arrivals/gold-1-scroll.png",
    "/pics/new-arrivals/gold-2-scroll.png",
    "/pics/new-arrivals/gold-3-scroll.png",
    "/pics/new-arrivals/gold-4-scroll.png",
  ],
  "kundan-bloom-set": [
    "/pics/new-arrivals/gold5-main.png",
    "/pics/new-arrivals/gold5-1-scroll.png",
    "/pics/new-arrivals/gold5-3-scroll.png",
    "/pics/new-arrivals/gold5-4-scroll.png",
    "/pics/new-arrivals/gold5-5-scroll.png",
  ],
  "royal-gold-chokar-set": [
    "/pics/new-arrivals/gold5-main.png",
    "/pics/new-arrivals/gold5-1-scroll.png",
    "/pics/new-arrivals/gold5-3-scroll.png",
    "/pics/new-arrivals/gold5-4-scroll.png",
    "/pics/new-arrivals/gold5-5-scroll.png",
  ],
  "regal-coin-chokar": [
    "/pics/new-arrivals/gold6-main.png",
    "/pics/new-arrivals/gold6-1-scroll.png",
    "/pics/new-arrivals/gold6-3-scroll.png",
    "/pics/new-arrivals/gold6-4-scroll.png",
    "/pics/new-arrivals/gold6-5-scroll.png",
  ],
};

export function PremiumProductPage({ product }: { product: ProductItem }) {
  const related = featuredPieces.filter((p) => p.name !== product.name).slice(0, 6);

  const slug = slugifyProductName(product.name);
  const enquiryHref = `/contact?interest=${encodeURIComponent(product.name)}`;
  const whatsappHref = getWhatsAppUrl(
    `Hello MB Jewellers, I would like a private viewing for: ${product.name} (${slug}).`,
  );
  const showWhatsApp = Boolean(whatsappHref);
  const galleryImages = productGalleryBySlug[slug] ?? [product.image, product.image, product.image, product.image];
  const hasCustomGallery = Boolean(productGalleryBySlug[slug]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex] ?? product.image;

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, GALLERY_AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [galleryImages.length]);

  return (
    <PremiumPageFrame>
      <section className="premium-section premium-section--warm">
        <div className="site-max site-px">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4" data-reveal>
              <div
                className={`premium-product-hero-card${hasCustomGallery ? " premium-product-hero-card--showcase" : ""}`}
              >
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={`${activeImage}-${activeIndex}`}
                    className="premium-product-hero-card__frame"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.35, ease: "easeInOut" }}
                  >
                    <Image
                      src={activeImage}
                      alt={product.alt}
                      fill
                      className={hasCustomGallery ? "premium-product-hero-card__image" : "object-cover"}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      priority={activeIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="premium-product-hero-card__overlay" aria-hidden />
                <span className="premium-featured-card__badge">{product.material ?? "Studio piece"}</span>
              </div>
              <div className="premium-reels__rail px-0.5">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className="premium-reel-card relative w-[88px] shrink-0"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                  >
                    <div
                      className="premium-glass-card relative aspect-square overflow-hidden rounded-xl"
                      style={{
                        outline: activeIndex === index ? "2px solid var(--premium-gold)" : "none",
                        outlineOffset: "2px",
                      }}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        className={hasCustomGallery ? "object-contain p-1" : "object-cover"}
                        style={hasCustomGallery ? undefined : { objectPosition: `${25 + index * 15}% center` }}
                        sizes="88px"
                        aria-hidden
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="premium-product-copy" data-reveal>
              <p className="premium-section-title__eyebrow">Signature piece</p>
              <h1 className="premium-section-title__heading">{product.name}</h1>
              <p className="premium-section-title__subtitle">{product.detail}</p>
              <div className="premium-dark-cta__actions premium-product-copy__actions">
                <Link href={enquiryHref} className="premium-button premium-button--primary">
                  Request private viewing
                </Link>
                {showWhatsApp && whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button premium-button--ghost"
                  >
                    WhatsApp enquiry
                  </a>
                ) : (
                  <Link href={enquiryHref} className="premium-button premium-button--ghost">
                    Send enquiry
                  </Link>
                )}
              </div>
              <p className="premium-product-copy__note">
                This website is a showcase only — we do not sell online. Pricing and availability are confirmed in
                studio. Reference: <span>{slug}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PremiumTrustSection compact />

      <PremiumPageSection
        eyebrow="Curated with this piece"
        title="You may also love"
        subtitle="Related silhouettes from the same material families — ideal to compare side by side during your studio visit."
      >
        <div className="premium-featured-grid">
          {related.map((piece, index) => (
            <PremiumFeaturedPieceCard key={piece.name} piece={piece} index={index} />
          ))}
        </div>
      </PremiumPageSection>

      <PremiumPageCtaBand
        title={`View ${product.name} in the studio`}
        copy="Experience weight, movement, and finish under real light with a consultant who understands your occasion and metal preference."
        primaryHref={enquiryHref}
        primaryLabel="Request private viewing"
      />
    </PremiumPageFrame>
  );
}
