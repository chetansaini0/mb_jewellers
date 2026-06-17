"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { slugifyProductName } from "@/app/lib/premiumPages";
import type { ProductItem } from "@/app/lib/siteData";

export function PremiumFeaturedPieceCard({ piece, index = 0 }: { piece: ProductItem; index?: number }) {
  const reduce = useReducedMotion();
  const slug = slugifyProductName(piece.name);

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="premium-featured-card"
    >
      <Link href={`/products/${slug}`} className="premium-featured-card__media">
        <Image
          src={piece.image}
          alt={piece.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index < 2}
          className="object-cover"
        />
        <div className="premium-featured-card__media-overlay" aria-hidden />
        {piece.material ? <span className="premium-featured-card__badge">{piece.material}</span> : null}
      </Link>

      <div className="premium-featured-card__body">
        <div className="premium-featured-card__head">
          <div>
            <h3>{piece.name}</h3>
            <p>{piece.detail}</p>
          </div>
          <div className="premium-featured-card__meta">
            <span>Studio piece</span>
            <strong>By appointment</strong>
          </div>
        </div>

        <div className="premium-featured-card__footer">
          <span className="premium-featured-card__chip">Private viewing</span>
          <Link href={`/products/${slug}`} className="premium-featured-card__link">
            View <ArrowUpRight className="premium-featured-card__link-icon" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
