"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { faqItems } from "@/app/lib/premiumPages";

export function PremiumFaqPage() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Questions"
        title="Everything worth knowing before your visit"
        lede="Pricing, appointments, custom work, and care — answered with the same transparency you will experience in the atelier."
      />
      <section className="premium-section">
        <div className="site-max site-px">
          <ul className="mx-auto flex max-w-3xl flex-col gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const headerId = `${baseId}-header-${index}`;
              return (
                <li key={item.question} className="premium-glass-card overflow-hidden rounded-2xl" data-reveal>
                  <h2>
                    <button
                      type="button"
                      id={headerId}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[var(--premium-ink)]"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="premium-title block text-left text-[clamp(1.02rem,0.92rem+0.35vw,1.2rem)] leading-snug">
                        {item.question}
                      </span>
                      <span className="text-[var(--premium-gold)]" aria-hidden>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h2>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[var(--premium-line)] px-5 pb-5 pt-4 text-sm leading-relaxed text-[var(--premium-muted)]">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
