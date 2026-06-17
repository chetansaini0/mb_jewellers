"use client";

import Link from "next/link";
import { PremiumFeaturedPieceCard } from "@/app/components/premium/PremiumFeaturedPieceCard";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";
import { featuredPieces } from "@/app/lib/siteData";

export function PremiumFeaturedPiecesSection() {
  const pieces = featuredPieces.slice(0, 6);

  return (
    <section className="premium-section premium-section--warm site-max site-px">
      <PremiumSectionTitle
        eyebrow="Signature pieces"
        title="Curated highlights from the atelier"
        subtitle="Explore standout gold, diamond, and silver silhouettes — each available for a private studio viewing in Sikar."
      />

      <div className="premium-featured-grid">
        {pieces.map((piece, index) => (
          <PremiumFeaturedPieceCard key={piece.name} piece={piece} index={index} />
        ))}
      </div>

      <div className="premium-section__cta-row">
        <Link href="/collections" className="premium-section__text-link">
          Explore all collections &rarr;
        </Link>
      </div>
    </section>
  );
}
