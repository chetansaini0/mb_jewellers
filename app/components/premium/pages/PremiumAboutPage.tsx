"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";
import { aboutJourney } from "@/app/lib/premiumPages";

type Props = {
  variant?: "about" | "heritage";
};

export function PremiumAboutPage({ variant = "about" }: Props) {
  const isHeritage = variant === "heritage";

  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow={isHeritage ? "Heritage" : "About MB Jewellers"}
        title={
          isHeritage
            ? "Three decades of trust, filigree, and family-led craft"
            : "A legacy shaped in light, trust, and ceremony"
        }
        lede={
          isHeritage
            ? "Explore the milestones, values, and studio rituals that turned a family bench in Sikar into a cinematic atelier experience."
            : "From a family bench in Sikar to a cinematic atelier experience, MB Jewellers has spent decades translating emotion into gold, diamond, and bridal artistry."
        }
      />

      <section className="premium-section premium-story-section site-max site-px">
        <PremiumSectionTitle
          eyebrow="Founder story"
          title="Patience before spectacle"
          subtitle="The house was built on the belief that jewellery should feel inevitable on the skin — balanced, luminous, and honest in material."
          align="left"
        />

        <div className="premium-story-section__grid">
          <div className="premium-story-section__visual">
            <div className="premium-story-section__image-wrap">
              <Image
                src="/pics/Bridal/b2.jpg"
                alt="Founder portrait in warm studio light"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="premium-story-section__image-overlay" aria-hidden />
            </div>
            <div className="premium-story-section__badge">
              <p className="premium-story-section__badge-value">1998</p>
              <p className="premium-story-section__badge-label">Studio founded</p>
            </div>
          </div>

          <div className="premium-story-section__copy">
            <p>
              Every consultation still begins with listening. Today the studio welcomes families, collectors, and bridal
              clients into a private world of sketches, stone layouts, and finishing rituals that honour both heritage
              and modern restraint.
            </p>
            <p>
              MB is not an online shop. The website exists to help you discover our worlds, understand our values, and
              book the right studio conversation before you visit Sikar.
            </p>
            <div className="premium-story-section__stats">
              <div>
                <p className="premium-story-section__stat-value">30+</p>
                <p className="premium-story-section__stat-label">Years of mastery</p>
              </div>
              <div>
                <p className="premium-story-section__stat-value">5 Lakh+</p>
                <p className="premium-story-section__stat-label">Happy families</p>
              </div>
              <div>
                <p className="premium-story-section__stat-value">1200+</p>
                <p className="premium-story-section__stat-label">Bridal suites styled</p>
              </div>
            </div>
            <Link href="/contact" className="premium-story-section__link">
              Visit the atelier <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <PremiumPageSection
        eyebrow="Journey"
        title="Milestones in motion"
        subtitle="A quiet evolution from family bench to bridal atelier — still rooted in Sikar, still led by trust."
        warm
      >
        <ol className="premium-timeline premium-timeline--rich">
          {aboutJourney.map((chapter) => (
            <li key={chapter.year} className="premium-timeline__item premium-info-card" data-reveal>
              <span className="premium-info-card__step">{chapter.year}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
            </li>
          ))}
        </ol>
      </PremiumPageSection>

      <PremiumPageCtaBand
        title="Experience the legacy in person"
        copy="Walk through collections, bridal suites, and finishing details in a private appointment at our Sikar studio."
        primaryHref="/contact"
        primaryLabel="Book a private viewing"
        secondaryHref="/collections"
        secondaryLabel="Explore collections"
        useWhatsAppSecondary={false}
      />
    </PremiumPageFrame>
  );
}
