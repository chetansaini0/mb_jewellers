"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  copy: string;
  step?: string;
  meta?: string;
  icon?: LucideIcon;
  index?: number;
  dark?: boolean;
};

export function PremiumInfoCard({ title, copy, step, meta, icon: Icon, index = 0, dark = false }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.3 } }}
      className={`premium-info-card ${dark ? "is-dark" : ""}`}
    >
      {step ? <span className="premium-info-card__step">{step}</span> : null}
      {Icon ? (
        <div className="premium-info-card__icon">
          <Icon aria-hidden />
        </div>
      ) : null}
      <h3>{title}</h3>
      <p>{copy}</p>
      {meta ? <p className="premium-info-card__meta">{meta}</p> : null}
    </motion.article>
  );
}
