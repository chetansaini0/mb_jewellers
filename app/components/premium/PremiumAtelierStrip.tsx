"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Gem, HeartHandshake, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";

const services = [
  {
    icon: ShieldCheck,
    title: "Certified purity",
    detail: "Hallmarked gold and certified diamonds with transparent sourcing notes.",
  },
  {
    icon: Gem,
    title: "Bespoke atelier",
    detail: "Bridal suites, heirloom resets, and private consultations tailored to your ceremony.",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime care",
    detail: "Cleaning, resizing guidance, and restoration support from our studio team.",
  },
  {
    icon: Scale,
    title: "Exchange clarity",
    detail: "Fair exchange conversations with documented valuations and no hidden surprises.",
  },
  {
    icon: CalendarDays,
    title: "Private viewings",
    detail: "Appointment-only studio visits in Sikar with unhurried, consultant-led curation.",
  },
  {
    icon: Sparkles,
    title: "Bridal curation",
    detail: "Engagement through reception styling with coordinated sets and finishing advice.",
  },
];

export function PremiumAtelierStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="premium-atelier-strip">
      <div className="premium-atelier-strip__backdrop" aria-hidden />
      <div className="site-max site-px premium-atelier-strip__inner">
        <PremiumSectionTitle
          eyebrow="Atelier services"
          title="Exceptional care at every touchpoint"
          subtitle="From first consultation to lifetime maintenance — everything designed around trust, craft, and calm studio hospitality."
          dark
        />

        <div className="premium-atelier-strip__grid">
          {services.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.3 } }}
              className="premium-atelier-strip__card"
            >
              <div className="premium-atelier-strip__icon">
                <item.icon aria-hidden />
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
