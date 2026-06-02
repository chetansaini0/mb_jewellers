"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { premiumTestimonialItems } from "@/app/lib/premiumPages";

export function PremiumTestimonialsPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % premiumTestimonialItems.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const active = premiumTestimonialItems[index];

  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Testimonials"
        title="Voices from families, collectors, and bridal clients"
        lede="A rotating salon of glowing quotes, cinematic transitions, and the trust built piece by piece."
      />
      <section className="premium-section">
        <div className="site-max site-px premium-testimonials__stage premium-glass-card" data-reveal>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.name}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="premium-testimonials__quote"
              aria-live="polite"
            >
              <p>“{active.quote}”</p>
              <footer>
                <strong>{active.name}</strong>
                <span>{active.meta}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="premium-testimonials__dots">
            {premiumTestimonialItems.map((item, itemIndex) => (
              <button
                key={item.name}
                type="button"
                className={`premium-testimonials__dot ${itemIndex === index ? "is-active" : ""}`}
                onClick={() => setIndex(itemIndex)}
                aria-label={`Show testimonial from ${item.name}`}
              />
            ))}
          </div>
        </div>
      </section>
      <PremiumTrustSection compact />
    </PremiumPageFrame>
  );
}