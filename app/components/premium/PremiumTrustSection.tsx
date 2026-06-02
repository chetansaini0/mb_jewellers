"use client";

import { useRef } from "react";
import { TrustIcon, usePremiumCounter, usePremiumReveal } from "@/app/components/premium/motion/premiumMotion";
import { trustValues } from "@/app/lib/premiumPages";

export function PremiumTrustSection({ compact = false }: { compact?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  usePremiumReveal(rootRef);
  usePremiumCounter(rootRef);

  return (
    <section ref={rootRef} className={`premium-section premium-trust ${compact ? "is-compact" : ""}`}>
      <div className="site-max site-px">
        <div className="premium-section__head">
          <p className="premium-eyebrow" data-reveal>
            Brand promise
          </p>
          <h2 className="premium-title" data-reveal>
            Crafted with trust, finished with light
          </h2>
          <p className="premium-section__lede" data-reveal>
            Every MB consultation is guided by purity, craftsmanship, and decades of family expertise.
          </p>
        </div>
        <div className="premium-trust__grid">
          {trustValues.map((item) => (
            <article key={item.id} className="premium-trust__card premium-glass-card" data-reveal>
              <div className="premium-trust__icon">
                <TrustIcon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              {"counter" in item && item.counter ? (
                <p className="premium-trust__counter">
                  <span data-counter={item.counter.value} data-suffix={item.counter.suffix}>
                    0{item.counter.suffix}
                  </span>
                  <small>{item.counter.label}</small>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
