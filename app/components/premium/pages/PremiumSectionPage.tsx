"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";

export function PremiumSectionPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  galleryImages,
  productHref: productHrefProp,
}: {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  galleryImages: string[];
  productHref?: string;
}) {
  return (
    <PremiumPageFrame>
      <div className="site-max site-px pt-6">
        <Link href={backHref} className="premium-inline-link inline-block" data-reveal>
          ← {backLabel}
        </Link>
      </div>
      <PremiumPageHero eyebrow={eyebrow} title={title} lede={description} />
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-collage__grid">
            {galleryImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={`premium-collage__item premium-glass-card col-span-12 ${
                  i % 5 === 0 ? "md:col-span-7" : "md:col-span-5"
                }`}
                data-reveal
              >
                <Image src={src} alt="" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            ))}
          </div>
          {productHrefProp ? (
            <div className="mt-12 flex justify-center" data-reveal>
              <Link href={productHrefProp} className="premium-button premium-button--primary">
                View signature piece
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </PremiumPageFrame>
  );
}
