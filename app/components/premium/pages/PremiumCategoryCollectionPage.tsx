"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTiltCard } from "@/app/components/premium/PremiumTiltCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import type { CategoryShowcaseItem } from "@/app/lib/siteData";

type PremiumCategoryCollectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: CategoryShowcaseItem[];
};

export function PremiumCategoryCollectionPage({
  eyebrow,
  title,
  description,
  items,
}: PremiumCategoryCollectionPageProps) {
  return (
    <PremiumPageFrame>
      <PremiumPageHero eyebrow={eyebrow} title={title} lede={description} />
      <section className="premium-section">
        <div className="site-max site-px">
          <ul className="premium-collections-grid premium-collections-grid--hub">
            {items.map((item) => (
              <li key={item.href} data-reveal>
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
                      <p className="premium-collection-card__meta">Section</p>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <span className="premium-inline-link">View highlights</span>
                    </div>
                  </Link>
                </PremiumTiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PremiumTrustSection compact />
    </PremiumPageFrame>
  );
}
