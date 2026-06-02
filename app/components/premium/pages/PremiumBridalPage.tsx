"use client";

import Image from "next/image";
import Link from "next/link";
import { BridalShowcase } from "@/app/components/BridalShowcase";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import {
  bridalCeremonyMoments,
  bridalConsultationSteps,
  bridalFaqs,
  bridalFeaturedQuote,
  bridalStudioPillars,
  bridalSuiteCategories,
} from "@/app/lib/premiumPages";

export function PremiumBridalPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Bridal studio"
        title="Bespoke bridal suites shaped for ceremony, light, and legacy"
        lede="Collaborate with our consultants to build complete bridal sets for engagement, wedding, reception, and gifting ceremonies — curated in private salon appointments at our Sikar studio."
      />

      <section className="premium-section">
        <div className="site-max site-px premium-bridal__grid">
          <div className="premium-bridal__copy" data-reveal>
            <p className="premium-eyebrow">Private salon</p>
            <h2 className="premium-title">Jewellery composed for every chapter of your wedding</h2>
            <p className="premium-section__lede">
              MB bridal consultations are unhurried and appointment-only. We listen to your ceremony timeline, outfit
              palette, and family traditions — then curate gold and diamond pieces that balance heritage craft with modern
              restraint.
            </p>
            <p className="premium-section__lede">
              We do not display prices online. Share your preferences and we will present options with full material
              notes during your visit.
            </p>
            <Link href="/contact" className="premium-button premium-button--primary">
              Schedule bridal consultation
            </Link>
          </div>
          <div data-reveal>
            <BridalShowcase />
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Ceremony chapters
            </p>
            <h2 className="premium-title" data-reveal>
              Styled for every function
            </h2>
            <p className="premium-section__lede" data-reveal>
              From the first ring to the final blessing — each moment deserves its own light, weight, and presence.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {bridalCeremonyMoments.map((moment) => (
              <article key={moment.title} className="premium-glass-card flex flex-col gap-3 p-5 md:p-6" data-reveal>
                <h3 className="premium-title text-[clamp(1.1rem,0.9rem+0.5vw,1.35rem)]">{moment.title}</h3>
                <p className="premium-section__lede max-w-none text-sm">{moment.copy}</p>
                <p className="premium-product-card__meta">{moment.pieces}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              The suite
            </p>
            <h2 className="premium-title" data-reveal>
              Categories we curate together
            </h2>
            <p className="premium-section__lede" data-reveal>
              Necklace, earrings, bangles, and finishing pieces — composed as one story rather than separate purchases.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {bridalSuiteCategories.map((category) => (
              <article
                key={category.title}
                className="premium-glass-card premium-bridal__category overflow-hidden"
                data-reveal
              >
                <div className="premium-bridal__category-media relative min-h-[14rem]">
                  <Image src={category.image} alt={category.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="premium-bridal__category-shade" aria-hidden />
                </div>
                <div className="premium-bridal__category-body">
                  <h3 className="premium-title text-[clamp(1.1rem,0.9rem+0.5vw,1.35rem)]">{category.title}</h3>
                  <p className="premium-section__lede max-w-none text-sm">{category.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Consultation
            </p>
            <h2 className="premium-title" data-reveal>
              How your bridal visit unfolds
            </h2>
            <p className="premium-section__lede" data-reveal>
              Four calm studio milestones — from first conversation to the pieces you walk away wearing.
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2">
            {bridalConsultationSteps.map((item) => (
              <li key={item.step} className="premium-glass-card flex flex-col gap-3 p-5 md:p-6" data-reveal>
                <span className="premium-product-card__meta">{item.step}</span>
                <h3 className="premium-title text-[clamp(1.1rem,0.9rem+0.5vw,1.35rem)]">{item.title}</h3>
                <p className="premium-section__lede max-w-none text-sm">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Studio philosophy
            </p>
            <h2 className="premium-title" data-reveal>
              What defines an MB bridal suite
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bridalStudioPillars.map((pillar) => (
              <article key={pillar.title} className="premium-glass-card flex flex-col gap-3 p-5" data-reveal>
                <h3 className="premium-title text-[clamp(1rem,0.9rem+0.4vw,1.2rem)]">{pillar.title}</h3>
                <p className="premium-section__lede max-w-none text-sm">{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px premium-testimonials__stage premium-glass-card" data-reveal>
          <p className="premium-eyebrow">Client note</p>
          <blockquote className="premium-testimonials__quote premium-title text-[clamp(1.35rem,1rem+1vw,2rem)] leading-snug">
            &ldquo;{bridalFeaturedQuote.quote}&rdquo;
          </blockquote>
          <p className="premium-product-card__meta mt-4">{bridalFeaturedQuote.meta}</p>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Bridal FAQ
            </p>
            <h2 className="premium-title" data-reveal>
              Questions families ask us
            </h2>
          </div>
          <div className="grid gap-3">
            {bridalFaqs.map((item) => (
              <details key={item.question} className="premium-glass-card premium-faq__item p-5 md:p-6" data-reveal>
                <summary className="cursor-pointer list-none font-[family-name:var(--font-display-luxury)] text-[clamp(1rem,0.9rem+0.4vw,1.2rem)] [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="premium-section__lede mt-3 max-w-none text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="site-max site-px premium-cta-panel premium-glass-card" data-reveal>
          <h2 className="premium-title">Begin your bridal shortlist</h2>
          <p className="premium-section__lede">
            Share your ceremony dates, preferred metals, and inspiration references. Our bridal studio will respond with
            curated options and appointment times in Sikar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button--primary">
              Book bridal appointment
            </Link>
            <Link href="/gallery" className="premium-button premium-button--ghost">
              View gallery
            </Link>
          </div>
        </div>
      </section>

      <PremiumTrustSection compact />
    </PremiumPageFrame>
  );
}
