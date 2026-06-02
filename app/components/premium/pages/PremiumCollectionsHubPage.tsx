"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTiltCard } from "@/app/components/premium/PremiumTiltCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { categoryShowcase } from "@/app/lib/siteData";

const filters = ["All", "Diamond", "Gold", "Silver", "Accessories"] as const;

export function PremiumCollectionsHubPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const items = useMemo(
    () => categoryShowcase.filter((item) => activeFilter === "All" || item.title === activeFilter),
    [activeFilter],
  );

  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Collections"
        title="Immersive worlds of diamond, gold, silver, and finishing pieces"
        lede="Browse cinematic category showcases with smooth filtering, hover depth, and private-viewing guidance for every collection."
      />
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`premium-filter-chip ${activeFilter === filter ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter)}
                data-reveal
              >
                {filter}
              </button>
            ))}
          </div>
          <AnimatePresence mode="popLayout">
            <motion.ul layout className="premium-collections-grid premium-collections-grid--hub">
              {items.map((item) => (
                <motion.li
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PremiumTiltCard className="premium-collection-card premium-glass-card">
                    <Link href={item.href} className="premium-collection-card__link">
                      <div className="premium-collection-card__media">
                        <Image
                          src={item.coverImage}
                          alt={item.coverAlt}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover"
                        />
                        <div className="premium-collection-card__shade" aria-hidden />
                      </div>
                      <div className="premium-collection-card__body">
                        <p className="premium-collection-card__meta">{activeFilter === "All" ? "Collection" : activeFilter}</p>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <span className="premium-inline-link">Explore collection</span>
                      </div>
                    </Link>
                  </PremiumTiltCard>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>
      <PremiumTrustSection compact />
    </PremiumPageFrame>
  );
}