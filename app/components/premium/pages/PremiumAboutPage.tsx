"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { aboutJourney } from "@/app/lib/premiumPages";

export function PremiumAboutPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="About MB Jewellers"
        title="A legacy shaped in light, trust, and ceremony"
        lede="From a family bench in Sikar to a cinematic atelier experience, MB Jewellers has spent decades translating emotion into gold, diamond, and bridal artistry."
      />
      <section className="premium-section">
        <div className="site-max site-px premium-about__story">
          <article className="premium-glass-card premium-about__founder" data-reveal>
            <div className="premium-about__founder-media">
              <Image
                src="/pics/Bridal/b2.jpg"
                alt="Founder portrait in warm studio light"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="premium-about__founder-shine" aria-hidden />
            </div>
            <div className="premium-about__founder-copy">
              <p className="premium-eyebrow">Founder story</p>
              <h2 className="premium-title">Patience before spectacle</h2>
              <p>
                The house was built on the belief that jewellery should feel inevitable on the skin — balanced,
                luminous, and honest in material. Every consultation still begins with listening.
              </p>
              <p>
                Today the studio welcomes families, collectors, and bridal clients into a private world of sketches,
                stone layouts, and finishing rituals that honour both heritage and modern restraint.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="premium-section premium-about__timeline">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Journey
            </p>
            <h2 className="premium-title" data-reveal>
              Milestones in motion
            </h2>
          </div>
          <ol className="premium-timeline">
            {aboutJourney.map((chapter) => (
              <li key={chapter.year} className="premium-timeline__item premium-glass-card" data-reveal>
                <span className="premium-timeline__year">{chapter.year}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="premium-section">
        <div className="site-max site-px premium-stats">
          {[
            { label: "Years of mastery", value: 30, suffix: "+" },
            { label: "Happy customers", value: 5, suffix: " Lakh+" },
            { label: "Bridal suites styled", value: 1200, suffix: "+" },
          ].map((stat) => (
            <article key={stat.label} className="premium-stats__card premium-glass-card" data-reveal>
              <p className="premium-stats__value">
                <span data-counter={stat.value} data-suffix={stat.suffix}>
                  0{stat.suffix}
                </span>
              </p>
              <p className="premium-stats__label">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="premium-section">
        <div className="site-max site-px premium-cta-panel premium-glass-card" data-reveal>
          <h2 className="premium-title">Visit the atelier in person</h2>
          <p className="premium-section__lede">
            Experience the collections, bridal studio, and finishing details in a private appointment.
          </p>
          <Link href="/contact" className="premium-button premium-button--primary">
            Book a private viewing
          </Link>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
