"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BRIDAL_IMAGES = [
  { src: "/pics/Bridal/b1.jpg", alt: "Bridal jewellery collection moment" },
  { src: "/pics/Bridal/b2.jpg", alt: "Bridal styling and ceremony elegance" },
  { src: "/pics/Bridal/b3.jpg", alt: "Bridal ensemble detail" },
  { src: "/pics/Bridal/b4.jpg", alt: "Bridal celebration portrait" },
] as const;

export function BridalShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  /** Start true so images are never stuck invisible (SSR + observer quirks). */
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="bridal-showcase relative w-full" data-visible={visible ? "true" : "false"}>
      <div
        className="pointer-events-none absolute -left-6 -right-6 -top-8 bottom-0 z-0 rounded-[2rem] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-accent-gold)_22%,transparent)] via-transparent to-[color-mix(in_srgb,var(--color-rose)_18%,transparent)] opacity-90 blur-3xl sm:-left-10 sm:-right-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
        {BRIDAL_IMAGES.map((img, index) => (
          <figure
            key={img.src}
            className="bridal-photo-cell group relative min-h-0 overflow-hidden rounded-sm border border-[color-mix(in_srgb,var(--color-border)_85%,var(--color-accent-gold))] bg-[var(--color-ink)] shadow-[0_16px_48px_rgba(33,18,18,0.14)]"
          >
            <div className="bridal-photo-float shine-on-hover relative aspect-[3/4] w-full min-h-[140px] overflow-hidden sm:min-h-[180px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:brightness-[1.05]"
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 38vw, 320px"
                priority={index < 2}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-[var(--color-ink)]/10 opacity-80 transition-opacity duration-500 group-hover:opacity-60"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" aria-hidden />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
