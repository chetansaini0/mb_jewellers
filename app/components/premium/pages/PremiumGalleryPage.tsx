"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { galleryItems } from "@/app/lib/premiumPages";

function spanClass(span: (typeof galleryItems)[number]["span"]) {
  switch (span) {
    case "tall":
      return "col-span-1 row-span-3";
    case "wide":
      return "col-span-2 row-span-2";
    default:
      return "col-span-1 row-span-2";
  }
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
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Portfolio
            </p>
            <h1 className="premium-title" data-reveal>
              Studio gallery
            </h1>
            <p className="premium-section__lede" data-reveal>
              Bridal, gold, and diamond studies photographed in natural light — tap any frame to open the lightbox.
            </p>
          </div>
          <div className="grid grid-cols-2 auto-rows-[140px] gap-4 md:grid-cols-4 md:auto-rows-[120px]">
            {galleryItems.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                className={`group relative overflow-hidden rounded-2xl border border-[var(--premium-line)] bg-[var(--premium-surface)] p-0 ${spanClass(
                  item.span,
                )}`}
                data-reveal
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image: ${item.alt}`}
              >
                <span className="relative block h-full min-h-[120px] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 45vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
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
              <div className="relative aspect-[4/5] w-full max-h-[min(86vh,920px)] overflow-hidden rounded-2xl border border-[var(--premium-line)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                <button
                  type="button"
                  className="absolute right-4 top-4 z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,253,248,0.35)] bg-[rgba(15,13,10,0.55)] text-lg leading-none text-[var(--premium-champagne)]"
                  onClick={close}
                  aria-label="Close lightbox"
                >
                  ×
                </button>
                <Image src={active.src} alt={active.alt} fill className="object-cover" sizes="920px" priority />
              </div>
              <p className="mt-4 max-w-xl text-center text-sm text-[var(--premium-champagne)]">{active.alt}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PremiumPageFrame>
  );
}
