"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, CalendarDays, MessageCircle, Phone } from "lucide-react";
import { getWhatsAppUrl, hasWhatsApp, siteConfig } from "@/app/lib/siteConfig";

export function PremiumFloatingCtas() {
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 600;
        setShowTop((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = getWhatsAppUrl("Hello MB Jewellers, I would like to book a private appointment.");
  const showWhatsApp = hasWhatsApp() && whatsappUrl;

  return (
    <div className="premium-floating-actions" aria-label="Quick actions">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            className="premium-floating-actions__top"
            aria-label="Back to top"
          >
            <ArrowUp aria-hidden />
          </motion.button>
        ) : null}
      </AnimatePresence>

      {showWhatsApp ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-floating-actions__whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle aria-hidden />
        </a>
      ) : null}

      <a
        href={`tel:${siteConfig.contact.phoneE164}`}
        className="premium-floating-actions__call"
        aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
      >
        <Phone aria-hidden />
      </a>

      <Link
        href="/contact?mode=APPOINTMENT"
        className="premium-floating-actions__book premium-btn-shimmer"
        aria-label="Book appointment"
      >
        <CalendarDays aria-hidden />
        <span className="premium-floating-actions__book-label">Book</span>
      </Link>
    </div>
  );
}
