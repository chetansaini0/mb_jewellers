"use client";

import Link from "next/link";
import { PremiumBreadcrumbs } from "@/app/components/premium/PremiumBreadcrumbs";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumShowcaseCard } from "@/app/components/premium/PremiumShowcaseCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import type { SeoHubPage } from "@/app/lib/seoHubPages";

export function PremiumSeoHubPage({ page }: { page: SeoHubPage }) {
  return (
    <PremiumPageFrame>
      <PremiumBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.eyebrow, path: page.path },
        ]}
      />
      <PremiumPageHero eyebrow={page.eyebrow} title={page.h1} lede={page.lede} />

      <PremiumPageSection
        eyebrow="In the showroom"
        title="How we help you choose"
        subtitle="MB Jewellers is a jewellery showroom in Sikar. Explore online, then confirm finishing, weight and comfort in person."
        warm
      >
        <div className="premium-glass-card mx-auto max-w-3xl space-y-5 p-6 md:p-8" data-reveal>
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-[var(--premium-muted)]">
              {paragraph}
            </p>
          ))}
          {page.related.length ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {page.related.map((link) => (
                <Link key={link.href} href={link.href} className="premium-button premium-button--ghost">
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </PremiumPageSection>

      <PremiumPageSection eyebrow="Explore" title={page.sectionTitle} subtitle={page.sectionSubtitle}>
        <div className="premium-showcase-grid">
          {page.cards.map((card, index) => (
            <PremiumShowcaseCard
              key={card.href}
              href={card.href}
              image={card.image}
              alt={card.alt}
              badge="Guide"
              title={card.title}
              description={card.description}
              meta="Sikar showroom"
              linkLabel="View"
              index={index}
            />
          ))}
        </div>
      </PremiumPageSection>

      {page.faqs.length ? (
        <PremiumPageSection eyebrow="Questions" title="Before you visit" warm>
          <ul className="premium-faq-stack premium-faq-stack--page">
            {page.faqs.map((item) => (
              <li key={item.question} className="premium-faq-stack__item" data-reveal>
                <h2 className="premium-faq-stack__trigger" style={{ cursor: "default" }}>
                  <span>{item.question}</span>
                </h2>
                <p className="premium-faq-stack__answer">{item.answer}</p>
              </li>
            ))}
          </ul>
        </PremiumPageSection>
      ) : null}

      <PremiumTrustSection compact />
      <PremiumPageCtaBand title={page.ctaTitle} copy={page.ctaCopy} primaryHref="/contact" primaryLabel="Book private viewing" />
    </PremiumPageFrame>
  );
}
