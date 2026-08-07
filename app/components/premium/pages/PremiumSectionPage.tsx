"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumBreadcrumbs } from "@/app/components/premium/PremiumBreadcrumbs";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { mosaicItemClass } from "@/app/lib/galleryLayout";

export function PremiumSectionPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  galleryImages,
  galleryAlts,
  breadcrumbs,
  productHref: productHrefProp,
}: {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  galleryImages: string[];
  galleryAlts?: string[];
  breadcrumbs?: { name: string; path: string }[];
  productHref?: string;
}) {
  return (
    <PremiumPageFrame>
      {breadcrumbs ? <PremiumBreadcrumbs items={breadcrumbs} /> : null}
      <div className="site-max site-px pt-6">
        <Link href={backHref} className="premium-inline-link inline-block" data-reveal>
          ← {backLabel}
        </Link>
      </div>

      <PremiumPageHero eyebrow={eyebrow} title={title} lede={description} />

      <PremiumPageSection
        eyebrow="Gallery highlights"
        title="Pieces and silhouettes from this section"
        subtitle="Tap through the gallery, then book a private viewing in Sikar to see finishing, weight, and movement in person."
        warm
      >
        <div className="premium-gallery-mosaic">
          {galleryImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`premium-gallery-mosaic__item ${mosaicItemClass(index, galleryImages.length)}`}
              data-reveal
            >
              <div className="premium-gallery-mosaic__media">
                <Image
                  src={src}
                  alt={galleryAlts?.[index] || `${title} jewellery highlight from MB Jewellers ${eyebrow} collection`}
                  fill
                  className="premium-gallery-mosaic__image"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <span className="premium-gallery-mosaic__shine" aria-hidden />
            </div>
          ))}
        </div>

        {productHrefProp ? (
          <div className="premium-section__cta-row">
            <Link href={productHrefProp} className="premium-button premium-button--primary">
              View signature piece
            </Link>
          </div>
        ) : null}
      </PremiumPageSection>

      <PremiumPageCtaBand
        title={`Discuss this ${eyebrow.toLowerCase()} selection`}
        copy="Our consultants can shortlist pieces from this section for your occasion and arrange a studio appointment in Sikar."
        primaryHref="/contact"
        primaryLabel="Request private viewing"
      />
    </PremiumPageFrame>
  );
}
