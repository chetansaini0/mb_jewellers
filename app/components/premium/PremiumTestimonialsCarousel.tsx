"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";
import { premiumTestimonials } from "@/app/lib/premiumContent";

export function PremiumTestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const review = premiumTestimonials[active];

  const next = useCallback(() => setActive((index) => (index + 1) % premiumTestimonials.length), []);
  const prev = useCallback(
    () => setActive((index) => (index - 1 + premiumTestimonials.length) % premiumTestimonials.length),
    [],
  );

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) next();
    }, 6000);
    return () => window.clearInterval(timer);
  }, [next, reduce]);

  return (
    <section className="premium-section premium-testimonials-carousel site-max site-px">
      <PremiumSectionTitle
        eyebrow="Client stories"
        title="Voices from the salon"
        subtitle="Trusted by bridal clients, collectors, and families who return for milestone moments."
      />

      <div className="premium-testimonials-carousel__panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={review.name}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="premium-testimonials-carousel__content"
          >
            <Quote className="premium-testimonials-carousel__quote-icon" aria-hidden />
            <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
            <footer>
              <strong>{review.name}</strong>
              <span>{review.meta}</span>
            </footer>
          </motion.div>
        </AnimatePresence>

        <div className="premium-testimonials-carousel__controls">
          <button
            type="button"
            onClick={prev}
            className="premium-testimonials-carousel__nav"
            aria-label="Previous testimonial"
          >
            <ChevronLeft aria-hidden />
          </button>

          <div className="premium-testimonials-carousel__dots" role="tablist" aria-label="Testimonials">
            {premiumTestimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show testimonial from ${item.name}`}
                className={`premium-testimonials-carousel__dot ${index === active ? "is-active" : ""}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="premium-testimonials-carousel__nav"
            aria-label="Next testimonial"
          >
            <ChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
