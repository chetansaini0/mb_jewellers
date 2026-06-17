"use client";

import Link from "next/link";
import { CalendarDays, Gem, Heart, Sparkles } from "lucide-react";
import { BridalShowcase } from "@/app/components/BridalShowcase";
import { PremiumInfoCard } from "@/app/components/premium/PremiumInfoCard";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumShowcaseCard } from "@/app/components/premium/PremiumShowcaseCard";
import { PremiumTestimonialsCarousel } from "@/app/components/premium/PremiumTestimonialsCarousel";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import {
  bridalCeremonyMoments,
  bridalConsultationSteps,
  bridalFaqs,
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

      <section className="premium-section premium-story-section site-max site-px">
        <div className="premium-story-section__grid">
          <div className="premium-story-section__copy" data-reveal>
            <p className="premium-section-title__eyebrow">Private salon</p>
            <h2 className="premium-section-title__heading">Jewellery composed for every chapter of your wedding</h2>
            <p>
              MB bridal consultations are unhurried and appointment-only. We listen to your ceremony timeline, outfit
              palette, and family traditions — then curate gold and diamond pieces that balance heritage craft with
              modern restraint.
            </p>
            <p>
              We do not display prices online. Share your preferences and we will present options with full material
              notes during your visit.
            </p>
            <Link href="/contact?mode=APPOINTMENT&occasion=bridal" className="premium-button premium-button--primary">
              Schedule bridal consultation
            </Link>
          </div>
          <div data-reveal>
            <BridalShowcase />
          </div>
        </div>
      </section>

      <PremiumPageSection
        eyebrow="Ceremony chapters"
        title="Styled for every function"
        subtitle="From the first ring to the final blessing — each moment deserves its own light, weight, and presence."
        warm
      >
        <div className="premium-info-grid">
          {bridalCeremonyMoments.map((moment, index) => (
            <PremiumInfoCard
              key={moment.title}
              title={moment.title}
              copy={moment.copy}
              meta={moment.pieces}
              icon={[Sparkles, Heart, Gem, CalendarDays][index % 4]}
              index={index}
            />
          ))}
        </div>
      </PremiumPageSection>

      <PremiumPageSection
        eyebrow="The suite"
        title="Categories we curate together"
        subtitle="Necklace, earrings, bangles, and finishing pieces — composed as one story rather than separate purchases."
      >
        <div className="premium-showcase-grid premium-showcase-grid--two">
          {bridalSuiteCategories.map((category, index) => (
            <PremiumShowcaseCard
              key={category.title}
              href="/contact?mode=APPOINTMENT&occasion=bridal&category=bridal"
              image={category.image}
              alt={category.alt}
              badge="Bridal"
              title={category.title}
              description={category.copy}
              meta="Suite category"
              linkLabel="Discuss in studio"
              index={index}
            />
          ))}
        </div>
      </PremiumPageSection>

      <PremiumPageSection
        eyebrow="Consultation"
        title="How your bridal visit unfolds"
        subtitle="Four calm studio milestones — from first conversation to the pieces you walk away wearing."
        dark
        className="premium-section--dark"
      >
        <div className="premium-info-grid">
          {bridalConsultationSteps.map((item, index) => (
            <PremiumInfoCard key={item.step} step={item.step} title={item.title} copy={item.copy} index={index} dark />
          ))}
        </div>
      </PremiumPageSection>

      <PremiumPageSection
        eyebrow="Studio philosophy"
        title="What defines an MB bridal suite"
        subtitle="Purity, proportion, and presence — the details families notice across decades, not just one evening."
      >
        <div className="premium-info-grid premium-info-grid--four">
          {bridalStudioPillars.map((pillar, index) => (
            <PremiumInfoCard key={pillar.title} title={pillar.title} copy={pillar.detail} index={index} />
          ))}
        </div>
      </PremiumPageSection>

      <PremiumTestimonialsCarousel />

      <PremiumPageSection eyebrow="Bridal FAQ" title="Questions families ask us">
        <div className="premium-faq-stack">
          {bridalFaqs.map((item) => (
            <details key={item.question} className="premium-faq-stack__item" data-reveal>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </PremiumPageSection>

      <PremiumTrustSection compact />
      <PremiumPageCtaBand
        title="Begin your bridal shortlist"
        copy="Share your ceremony dates, preferred metals, and inspiration references. Our bridal studio will respond with curated options and appointment times in Sikar."
        primaryHref="/contact?mode=APPOINTMENT&occasion=bridal"
        primaryLabel="Book bridal appointment"
        secondaryHref="/gallery"
        secondaryLabel="View gallery"
        useWhatsAppSecondary={false}
      />
    </PremiumPageFrame>
  );
}
