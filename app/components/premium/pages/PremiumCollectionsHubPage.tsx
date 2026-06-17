"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumAtelierStrip } from "@/app/components/premium/PremiumAtelierStrip";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumShowcaseCard } from "@/app/components/premium/PremiumShowcaseCard";
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
        lede="Browse cinematic category showcases with calm filtering, depth-rich cards, and private-viewing guidance for every collection."
      />

      <PremiumPageSection
        eyebrow="Browse by world"
        title="Choose your signature material"
        subtitle="Each collection opens into subsection galleries and studio-led curation — purchases are completed in person at our Sikar atelier."
      >
        <div className="premium-filter-row">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`premium-filter-chip ${activeFilter === filter ? "is-active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="premium-showcase-grid">
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PremiumShowcaseCard
                  href={item.href}
                  image={item.coverImage}
                  alt={item.coverAlt}
                  badge={item.title}
                  title={item.title}
                  description={item.description}
                  meta="Curated selection"
                  linkLabel="Explore collection"
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="premium-section__cta-row">
          <Link href="/contact" className="premium-section__text-link">
            Book a private viewing &rarr;
          </Link>
        </div>
      </PremiumPageSection>

      <PremiumAtelierStrip />
      <PremiumTrustSection compact />
      <PremiumPageCtaBand
        title="Plan your collection visit"
        copy="Walk through diamond, gold, silver, and bridal worlds with a consultant who understands your occasion, metal preference, and ceremony timeline."
        primaryHref="/contact"
        primaryLabel="Request appointment"
        secondaryHref="/bridal"
        secondaryLabel="Explore bridal"
        useWhatsAppSecondary={false}
      />
    </PremiumPageFrame>
  );
}
