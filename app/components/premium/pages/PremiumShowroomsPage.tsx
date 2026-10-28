"use client";

import Link from "next/link";
import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";
import { PremiumBreadcrumbs } from "@/app/components/premium/PremiumBreadcrumbs";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumShowroomsMap } from "@/app/components/premium/PremiumShowroomsMap";
import { formatShowroomPhones, getWhatsAppUrl, hasWhatsApp, siteConfig, visitorNotes } from "@/app/lib/siteConfig";
import { showroomVisitFaqs } from "@/app/lib/premiumPages";
import { socialLinks } from "@/app/lib/siteData";

export function PremiumShowroomsPage() {
  const whatsappUrl = getWhatsAppUrl("Hello MB Jewellers, I would like to visit a Sikar showroom.");
  const primaryPhone = siteConfig.showrooms[0].landlines[0];

  return (
    <PremiumPageFrame>
      <PremiumBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Showrooms", path: "/showrooms" },
        ]}
      />
      <PremiumPageHero
        eyebrow="Visit us in Sikar"
        title="MB Jewellers showrooms in Sikar"
        lede="Two jewellery showrooms in Sikar — Ghantaghar and Ramlila Maidan — each with its own Google Business Profile. Gold, diamond, silver, bridal and daily-wear jewellery. Showcase online; purchases in person."
      />

      <PremiumPageSection
        eyebrow="Studio locations"
        title="Two Sikar showrooms, one standard of care"
        subtitle={`${siteConfig.legalName} · ${siteConfig.openingHours.display}`}
        warm
      >
        <div className="premium-glass-card mx-auto mb-10 max-w-3xl space-y-4 p-6 md:p-8" data-reveal>
          <p className="text-base leading-relaxed text-[var(--premium-muted)]">
            Both MB Jewellers showrooms are in Sikar city: one by Ghantaghar (the clock tower) at Purana Dujod Gate, the
            other on Mahamandir Road near Ramlila Maidan. Shortlist pieces on this website, then check weight, hallmark
            and finish in person, or book a private viewing for bridal and family occasions.
          </p>
          <div className="premium-dark-cta__actions flex flex-wrap gap-3">
            <a href={`tel:${primaryPhone.e164}`} className="premium-button premium-button--primary">
              <Phone aria-hidden className="size-4" />
              Call {primaryPhone.display}
            </a>
            {hasWhatsApp() && whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button premium-button--ghost"
              >
                <MessageCircle aria-hidden className="size-4" />
                WhatsApp enquiry
              </a>
            ) : null}
            <Link href="/contact?mode=APPOINTMENT" className="premium-button premium-button--ghost">
              <CalendarDays aria-hidden className="size-4" />
              Book appointment
            </Link>
          </div>
        </div>

        <div className="premium-contact__map-showrooms">
          {siteConfig.showrooms.map((showroom) => {
            const landmark =
              showroom.id === "ghantaghar" ? visitorNotes.landmarks.ghantaghar : visitorNotes.landmarks.ramlila;
            return (
              <article
                key={showroom.id}
                id={showroom.id}
                className="premium-contact__map-showroom premium-glass-card p-6"
                data-reveal
              >
                <h2 className="premium-contact__map-showroom-name">{showroom.name}</h2>
                <p className="premium-contact__map-address">
                  <strong>{siteConfig.name}</strong>
                  <br />
                  {showroom.address}
                </p>
                <p className="mt-2 text-sm text-[var(--premium-muted)]">{landmark}</p>
                <p className="premium-contact__map-phones mt-3">
                  {showroom.landlines.map((line) => (
                    <a key={line.e164} href={`tel:${line.e164}`}>
                      {line.display}
                    </a>
                  ))}
                </p>
                <p className="mt-2 text-sm">{siteConfig.openingHours.display}</p>
                <p className="mt-1 text-sm text-[var(--premium-muted)]">{siteConfig.openingHours.sundayNote}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={showroom.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-inline-link"
                  >
                    <MapPin aria-hidden className="mr-1 inline size-4" />
                    Directions
                  </Link>
                  <Link
                    href={showroom.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-inline-link"
                  >
                    Open in Google Maps
                  </Link>
                  <Link href="/contact?mode=APPOINTMENT" className="premium-inline-link">
                    Visit this showroom
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="premium-contact__map mt-10" data-reveal>
          <div className="premium-contact__map-head">
            <h2 className="premium-contact__map-title">Showroom map</h2>
            <p className="premium-contact__map-tagline">Embedded map of MB Jewellers locations in Sikar.</p>
          </div>
          <PremiumShowroomsMap />
        </div>
      </PremiumPageSection>

      <PremiumPageSection eyebrow={visitorNotes.parking.label} title="Getting here">
        <div className="premium-glass-card mx-auto max-w-3xl space-y-4 p-6 md:p-8" data-reveal>
          <p className="text-base leading-relaxed text-[var(--premium-muted)]">{visitorNotes.parking.text}</p>
          <p className="text-base leading-relaxed text-[var(--premium-muted)]">
            Email {siteConfig.contact.email} or call {formatShowroomPhones(siteConfig.showrooms[0])} before you travel
            if you need help choosing a showroom.
          </p>
          <p className="text-sm">
            Instagram:{" "}
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              @mbjewellerssikar
            </a>
            {" · "}
            Facebook:{" "}
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              MB Jewellers Sikar
            </a>
          </p>
        </div>
      </PremiumPageSection>

      <PremiumPageSection eyebrow="FAQ" title="Showroom visit questions" warm>
        <ul className="premium-faq-stack premium-faq-stack--page">
          {showroomVisitFaqs.map((item) => (
            <li key={item.question} className="premium-faq-stack__item" data-reveal>
              <h2 className="premium-faq-stack__trigger" style={{ cursor: "default" }}>
                <span>{item.question}</span>
              </h2>
              <p className="premium-faq-stack__answer">{item.answer}</p>
            </li>
          ))}
        </ul>
      </PremiumPageSection>

      <PremiumPageCtaBand
        title="Ready to visit the atelier?"
        copy="Request a private viewing for gold, diamond, silver, bridal or daily-wear jewellery at either Sikar showroom."
        primaryHref="/contact?mode=APPOINTMENT"
        primaryLabel="Book appointment"
      />
    </PremiumPageFrame>
  );
}
