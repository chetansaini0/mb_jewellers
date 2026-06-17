"use client";

import type { ReactNode } from "react";

type PremiumPageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  dark?: boolean;
};

export function PremiumPageHero({ eyebrow, title, lede, children, dark = false }: PremiumPageHeroProps) {
  return (
    <section className={`premium-page-hero ${dark ? "is-dark" : ""}`}>
      <HeroBackdrop />
      <div className="site-max site-px premium-page-hero__inner">
        <div className="premium-page-hero__kicker-row" data-reveal>
          <span className="premium-page-hero__kicker-line" aria-hidden />
          <p className="premium-eyebrow">{eyebrow}</p>
        </div>
        <h1 className="premium-title premium-page-hero__title" data-reveal>
          {title}
        </h1>
        {lede ? (
          <p className="premium-section__lede premium-page-hero__lede" data-reveal>
            {lede}
          </p>
        ) : null}
        {children ? <div className="premium-page-hero__actions">{children}</div> : null}
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <>
      <div className="premium-page-hero__glow" aria-hidden />
      <div className="premium-page-hero__particles" aria-hidden />
    </>
  );
}
