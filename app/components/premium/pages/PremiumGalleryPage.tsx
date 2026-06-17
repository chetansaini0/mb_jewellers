"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { galleryItems } from "@/app/lib/premiumPages";

function galleryTileTone(src: string) {
  if (src.includes("gold") || src.includes("heritage")) return "is-teal";
  return "is-dark";
}

function galleryTileIsLandscape(src: string) {
  return src.includes("silver-cinematic") || src.includes("accessories-cinematic");
}

export function PremiumGalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close]);

  const active = activeIndex !== null ? galleryItems[activeIndex] : null;

  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Portfolio"
        title="Studio gallery"
        lede="Bridal, gold, and diamond studies photographed in natural light — tap any frame to open the lightbox."
      />

      <PremiumPageSection
        eyebrow="Editorial frames"
        title="A collage of brilliance"
        subtitle="Each image reflects how MB pieces are styled, finished, and presented during private salon appointments."
        warm
      >
        <div className="premium-gallery-mosaic">
          {galleryItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              className={`premium-gallery-mosaic__item premium-gallery-tile group ${galleryTileTone(item.src)} ${galleryTileIsLandscape(item.src) ? "is-landscape" : "is-portrait"}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image: ${item.alt}`}
            >
              <div className="premium-gallery-mosaic__media">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 33vw"
                  className="premium-gallery-mosaic__image"
                />
              </div>
              <span className="premium-gallery-tile__overlay" aria-hidden />
              <span className="premium-gallery-mosaic__shine" aria-hidden />
            </button>
          ))}
        </div>

        <div className="premium-section__cta-row">
          <Link href="/contact" className="premium-section__text-link">
            Request a private viewing &rarr;
          </Link>
        </div>
      </PremiumPageSection>

      <PremiumPageCtaBand
        title="See the pieces in person"
        copy="Photography is only the beginning. Visit our Sikar studio to experience weight, movement, and finish under real light."
        primaryHref="/contact"
        primaryLabel="Book appointment"
        secondaryHref="/bridal"
        secondaryLabel="Explore bridal"
        useWhatsAppSecondary={false}
      />

      <AnimatePresence>
        {active && activeIndex !== null ? (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(15,13,10,0.72)] p-5 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              className="flex w-full max-w-[920px] flex-col items-center"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div
                className={`premium-gallery-lightbox__frame ${galleryTileTone(active.src)} ${galleryTileIsLandscape(active.src) ? "is-landscape" : "is-portrait"} relative aspect-[3/4] w-full max-h-[min(86vh,920px)] overflow-hidden rounded-2xl border border-[var(--premium-line)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]`}
              >
                <button
                  type="button"
                  className="absolute right-4 top-4 z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,253,248,0.35)] bg-[rgba(15,13,10,0.55)] text-lg leading-none text-[var(--premium-champagne)]"
                  onClick={close}
                  aria-label="Close lightbox"
                >
                  ×
                </button>
                <div className="premium-gallery-mosaic__media">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    className="premium-gallery-mosaic__image"
                    sizes="920px"
                    priority
                  />
                </div>
              </div>
              <p className="mt-4 max-w-xl text-center text-sm text-[var(--premium-champagne)]">{active.alt}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PremiumPageFrame>
  );
}
