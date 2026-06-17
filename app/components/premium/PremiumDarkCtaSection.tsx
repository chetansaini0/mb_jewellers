"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getWhatsAppUrl, hasWhatsApp, siteConfig } from "@/app/lib/siteConfig";

export function PremiumDarkCtaSection() {
  const reduce = useReducedMotion();
  const whatsappHref = getWhatsAppUrl("Hello MB Jewellers, I would like to plan a private studio viewing.");
  const showWhatsApp = hasWhatsApp() && whatsappHref;

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
          <p className="premium-dark-cta__eyebrow">Ready to experience</p>
          <h2 className="premium-dark-cta__title">Plan your private studio visit</h2>
          <p className="premium-dark-cta__copy">
            More than a catalogue — a calm, appointment-led experience rooted in trust, craft, and Rajasthani warmth in
            the heart of Sikar.
          </p>
          <div className="premium-dark-cta__actions">
            <Link href={`tel:${siteConfig.contact.phoneE164}`} className="premium-button premium-button--primary">
              Call {siteConfig.contact.phoneDisplay}
            </Link>
            {showWhatsApp ? (
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button premium-button--ghost premium-dark-cta__ghost"
              >
                WhatsApp concierge
              </Link>
            ) : (
              <Link href="/contact" className="premium-button premium-button--ghost premium-dark-cta__ghost">
                Book an appointment
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
