"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
};

export function PremiumSectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  as = "h2",
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const centered = align === "center";
  const Heading = as;

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`premium-section-title ${centered ? "is-centered" : ""} ${dark ? "is-dark" : ""} ${className}`}
    >
      {eyebrow ? (
        <>
          <div className={`premium-section-title__line ${centered ? "is-centered" : ""}`} aria-hidden />
          <p className="premium-section-title__eyebrow">{eyebrow}</p>
        </>
      ) : null}
      <Heading className="premium-section-title__heading">{title}</Heading>
      {subtitle ? <p className="premium-section-title__subtitle">{subtitle}</p> : null}
    </motion.div>
  );
}
