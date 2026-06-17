"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getWhatsAppUrl, hasWhatsApp, siteConfig } from "@/app/lib/siteConfig";

type Props = {
  eyebrow?: string;
  title: string;
  copy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  useWhatsAppSecondary?: boolean;
};

export function PremiumPageCtaBand({
  eyebrow = "Ready to experience",
  title,
  copy,
  primaryHref = `tel:${siteConfig.contact.phoneE164}`,
  primaryLabel = `Call ${siteConfig.contact.phoneDisplay}`,
  secondaryHref,
  secondaryLabel,
  useWhatsAppSecondary = true,
}: Props) {
  const reduce = useReducedMotion();
  const whatsappHref = getWhatsAppUrl("Hello MB Jewellers, I would like to plan a private studio viewing.");
  const showWhatsApp = useWhatsAppSecondary && hasWhatsApp() && whatsappHref;
  const secondaryLink = secondaryHref ?? (showWhatsApp ? whatsappHref : "/contact");
  const resolvedSecondaryLabel = secondaryLabel ?? (showWhatsApp ? "WhatsApp concierge" : "Book appointment");
  const secondaryIsExternal = secondaryLink.startsWith("http") || secondaryLink.startsWith("https");

  return (
    <section className="premium-dark-cta">
      <div className="site-max site-px">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="premium-dark-cta__inner"
        >
          <p className="premium-dark-cta__eyebrow">{eyebrow}</p>
          <h2 className="premium-dark-cta__title">{title}</h2>
          <p className="premium-dark-cta__copy">{copy}</p>
          <div className="premium-dark-cta__actions">
            <Link href={primaryHref} className="premium-button premium-button--primary">
              {primaryLabel}
            </Link>
            <Link
              href={secondaryLink}
              target={secondaryIsExternal ? "_blank" : undefined}
              rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
              className="premium-button premium-button--ghost premium-dark-cta__ghost"
            >
              {resolvedSecondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
