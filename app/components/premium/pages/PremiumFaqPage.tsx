"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
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

      <PremiumPageSection
        eyebrow="FAQ"
        title="Clear answers for studio visits"
        subtitle="MB Jewellers is a showcase site. Purchases, valuations, and final selections always happen in person."
        warm
      >
        <ul className="premium-faq-stack premium-faq-stack--page">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const headerId = `${baseId}-header-${index}`;
            return (
              <li
                key={item.question}
                className="premium-faq-stack__item premium-faq-stack__item--accordion"
                data-reveal
              >
                <h2>
                  <button
                    type="button"
                    id={headerId}
                    className="premium-faq-stack__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden>{isOpen ? "−" : "+"}</span>
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
                      <p className="premium-faq-stack__answer">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </PremiumPageSection>

      <PremiumPageCtaBand
        title="Still have a question?"
        copy="Our studio team can answer material, appointment, and bridal questions directly before your visit."
        primaryHref="/contact"
        primaryLabel="Contact the atelier"
      />
    </PremiumPageFrame>
  );
}
