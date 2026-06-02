"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumTiltCard } from "@/app/components/premium/PremiumTiltCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { slugifyProductName } from "@/app/lib/premiumPages";
import { getWhatsAppUrl } from "@/app/lib/siteConfig";
import type { ProductItem } from "@/app/lib/siteData";
import { featuredPieces } from "@/app/lib/siteData";

function productHref(piece: ProductItem) {
  return `/products/${slugifyProductName(piece.name)}`;
}

const productGalleryBySlug: Record<string, string[]> = {
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
  const related = featuredPieces.filter((p) => p.name !== product.name);

  const slug = slugifyProductName(product.name);
  const enquiryHref = `/contact?interest=${encodeURIComponent(product.name)}`;
  const whatsappHref = getWhatsAppUrl(`Hello MB Jewellers, I would like a private viewing for: ${product.name} (${slug}).`);
  const galleryImages = productGalleryBySlug[slug] ?? [product.image, product.image, product.image, product.image];
  const hasCustomGallery = Boolean(productGalleryBySlug[slug]);
  const [activeImage, setActiveImage] = useState(() => galleryImages[0] ?? product.image);

  return (
    <PremiumPageFrame>
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4" data-reveal>
              <motion.div
                className="premium-glass-card relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={activeImage} alt={product.alt} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" priority />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(15,13,10,0.35)] via-transparent to-transparent" aria-hidden />
                <div className="premium-product-card__shine" aria-hidden />
              </motion.div>
              <div className="premium-reels__rail px-0.5">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className="premium-reel-card relative w-[88px] shrink-0"
                    onClick={() => setActiveImage(image)}
                    aria-label={`Show product image ${index + 1}`}
                  >
                    <div
                      className="premium-glass-card relative aspect-square overflow-hidden rounded-xl"
                      style={{
                        outline: activeImage === image ? "2px solid var(--premium-gold)" : "none",
                        outlineOffset: "2px",
                      }}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover"
                        style={hasCustomGallery ? undefined : { objectPosition: `${25 + index * 15}% center` }}
                        sizes="88px"
                        aria-hidden
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div data-reveal>
              <p className="premium-eyebrow">{product.material ?? product.detail}</p>
              <h1 className="premium-title mt-3">{product.name}</h1>
              <p className="premium-section__lede mt-4">{product.detail}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={enquiryHref} className="premium-button premium-button--primary">
                  Request private viewing
                </Link>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="premium-button premium-button--ghost">
                  WhatsApp enquiry
                </a>
              </div>
              <p className="mt-6 text-sm text-[var(--premium-muted)]">
                This website is a showcase only — we do not sell online. Pricing and availability are confirmed in studio.
                Reference: <span className="text-[var(--premium-ink)]">{slug}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <PremiumTrustSection compact />
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Curated with this piece
            </p>
            <h2 className="premium-title" data-reveal>
              You may also love
            </h2>
          </div>
          <div className="premium-reels__rail pb-2">
            {related.map((piece) => (
              <div key={piece.name} className="premium-reel-card w-[min(260px,72vw)] shrink-0" data-reveal>
                <PremiumTiltCard className="premium-product-card premium-glass-card">
                  <Link href={productHref(piece)} className="block">
                    <div className="premium-product-card__media">
                      <Image src={piece.image} alt={piece.alt} fill sizes="260px" className="object-cover" />
                      <div className="premium-product-card__shine" aria-hidden />
                    </div>
                    <div className="premium-product-card__body">
                      <p className="premium-product-card__meta">{piece.material ?? piece.detail}</p>
                      <h3 className="premium-title text-[clamp(1rem,0.92rem+0.35vw,1.15rem)]">{piece.name}</h3>
                      <span className="premium-inline-link">View piece</span>
                    </div>
                  </Link>
                </PremiumTiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
