"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  image: string;
  alt: string;
  badge?: string;
  title: string;
  description: string;
  meta?: string;
  linkLabel?: string;
  index?: number;
};

export function PremiumShowcaseCard({
  href,
  image,
  alt,
  badge,
  title,
  description,
  meta,
  linkLabel = "Explore",
  index = 0,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="premium-showcase-card"
    >
      <Link href={href} className="premium-showcase-card__media">
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="premium-showcase-card__media-overlay" aria-hidden />
        {badge ? <span className="premium-showcase-card__badge">{badge}</span> : null}
      </Link>
      <div className="premium-showcase-card__body">
        <div className="premium-showcase-card__head">
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          {meta ? (
            <div className="premium-showcase-card__meta">
              <span>{meta}</span>
            </div>
          ) : null}
        </div>
        <div className="premium-showcase-card__footer">
          <span className="premium-showcase-card__chip">Studio curation</span>
          <Link href={href} className="premium-showcase-card__link">
            {linkLabel} <ArrowUpRight className="premium-showcase-card__link-icon" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
