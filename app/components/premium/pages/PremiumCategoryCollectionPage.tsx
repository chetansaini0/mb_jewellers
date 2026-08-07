"use client";

import Link from "next/link";
import { PremiumBreadcrumbs } from "@/app/components/premium/PremiumBreadcrumbs";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumShowcaseCard } from "@/app/components/premium/PremiumShowcaseCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import type { CategoryShowcaseItem } from "@/app/lib/siteData";

type PremiumCategoryCollectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: CategoryShowcaseItem[];
  collectionPath: string;
};

export function PremiumCategoryCollectionPage({
  eyebrow,
  title,
  description,
  items,
  collectionPath,
}: PremiumCategoryCollectionPageProps) {
  return (
    <PremiumPageFrame>
      <PremiumBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: title, path: collectionPath },
        ]}
      />
      <PremiumPageHero eyebrow={eyebrow} title={title} lede={description} />

      <PremiumPageSection
        eyebrow={`${eyebrow} sections`}
        title="Open a chapter below"
        subtitle="Each section is a curated gallery of silhouettes you can discuss during a private studio appointment in Sikar."
        warm
      >
        <div className="premium-showcase-grid">
          {items.map((item, index) => (
            <PremiumShowcaseCard
              key={item.href}
              href={item.href}
              image={item.coverImage}
              alt={item.coverAlt}
              badge="Section"
              title={item.title}
              description={item.description}
              meta={eyebrow}
              linkLabel="View highlights"
              index={index}
            />
          ))}
        </div>

        <div className="premium-section__cta-row">
          <Link href="/collections" className="premium-section__text-link">
            Back to all collections &rarr;
          </Link>
        </div>
      </PremiumPageSection>

      <PremiumTrustSection compact />
      <PremiumPageCtaBand
        title={`Discuss your ${eyebrow.toLowerCase()} shortlist`}
        copy="Share your occasion and preferred silhouettes. Our consultants will prepare pieces for a calm, appointment-only viewing in Sikar."
        primaryHref="/contact"
        primaryLabel="Book private viewing"
      />
    </PremiumPageFrame>
  );
}
