"use client";

import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { customJewellerySteps } from "@/app/lib/premiumPages";

export function PremiumServicesPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Atelier services"
        title="Custom jewellery, composed like a ceremony"
        lede="From the first sketch to the final polish, each bespoke piece moves through a quiet, appointment-only process designed around your story."
      />
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="premium-section__head">
            <p className="premium-eyebrow" data-reveal>
              Process
            </p>
            <h2 className="premium-title" data-reveal>
              How we build custom work
            </h2>
            <p className="premium-section__lede" data-reveal>
              Four studio milestones keep design decisions clear, timelines honest, and finishing at the level MB
              clients expect.
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2">
            {customJewellerySteps.map((item) => (
              <li key={item.step} className="premium-glass-card flex flex-col gap-3 p-5 md:p-6" data-reveal>
                <span className="premium-product-card__meta">{item.step}</span>
                <h3 className="premium-title text-[clamp(1.1rem,0.9rem+0.5vw,1.35rem)]">{item.title}</h3>
                <p className="premium-section__lede max-w-none text-sm">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <PremiumTrustSection compact />
    </PremiumPageFrame>
  );
}
