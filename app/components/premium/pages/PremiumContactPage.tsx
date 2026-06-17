"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import { PremiumContactAside } from "@/app/components/premium/PremiumContactAside";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumShowroomsMap } from "@/app/components/premium/PremiumShowroomsMap";
import { appointmentTimeSlots, appointmentTypes } from "@/app/lib/appointments";
import { formatShowroomPhones, siteConfig } from "@/app/lib/siteConfig";
import { showrooms, socialLinks } from "@/app/lib/siteData";

export function PremiumContactPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Contact"
        title="A private appointment begins with a conversation"
        lede="This site is for discovery only — tell us what caught your eye and we will arrange a private studio viewing. Purchases are completed in person, not online."
      />
      <PremiumPageSection
        eyebrow="Get in Touch"
        title="We are here for every detail"
        subtitle="Private viewings, bridal consultations, custom design, and gifting — reach us instantly or send a structured appointment request."
        warm
      >
        <div className="premium-contact__grid">
          <PremiumContactAside />
          <Suspense
            fallback={
              <div className="premium-contact-form premium-contact-form--krishan">
                <p className="premium-contact-form__loading">Loading form…</p>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>

        <div className="premium-contact__map" data-reveal>
          <div className="premium-contact__map-head">
            <h3 className="premium-contact__map-title">Our showrooms in Sikar</h3>
            <p className="premium-contact__map-tagline">{siteConfig.tagline}</p>
            <div className="premium-contact__map-showrooms">
              {showrooms.map((showroom) => (
                <div key={showroom.id} className="premium-contact__map-showroom">
                  <p className="premium-contact__map-showroom-name">{showroom.name}</p>
                  <p className="premium-contact__map-address">{showroom.address}</p>
                  <p className="premium-contact__map-phones">{formatShowroomPhones(showroom)}</p>
                  <Link href={showroom.directionsUrl} target="_blank" rel="noopener noreferrer">
                    Directions
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <PremiumShowroomsMap />
          <div className="premium-contact__social">
            <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
            <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </Link>
          </div>
        </div>
      </PremiumPageSection>
    </PremiumPageFrame>
  );
}

function mapQuickCategory(value: string | null) {
  const normalized = value?.trim().toLowerCase() ?? "";
  if (normalized === "diamond") return "Diamond";
  if (normalized === "gold") return "Gold";
  if (normalized === "silver") return "Silver";
  if (normalized === "bridal") return "Bridal";
  return "Diamond";
}

function mapQuickOccasion(value: string | null) {
  const normalized = value?.trim().toLowerCase() ?? "";
  if (normalized === "bridal") return "Bridal consultation";
  if (normalized === "engagement") return "Engagement styling";
  if (normalized === "gifting") return "Gifting";
  if (normalized === "custom") return "Custom design";
  return "Private viewing";
}

function ContactForm() {
  const reduce = useReducedMotion();
  const searchParams = useSearchParams();
  const productInterest = searchParams.get("interest")?.trim() ?? "";
  const quickMode = searchParams.get("mode")?.trim().toUpperCase();
  const quickDate = searchParams.get("date")?.trim() ?? "";
  const quickOccasion = searchParams.get("occasion");
  const quickCategory = searchParams.get("category");
  const [mode, setMode] = useState<"INQUIRY" | "APPOINTMENT">(() => {
    if (quickMode === "APPOINTMENT") return "APPOINTMENT";
    if (quickMode === "INQUIRY") return "INQUIRY";
    return productInterest ? "INQUIRY" : "APPOINTMENT";
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
    category: mapQuickCategory(quickCategory),
    message: productInterest ? `I would like a private viewing for: ${productInterest}.` : "",
    appointmentType: "CONSULTATION",
    preferredDate: quickDate,
    preferredTimeSlot: appointmentTimeSlots[2],
    occasion: mapQuickOccasion(quickOccasion),
    notes: "",
    website: "",
  }));

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const endpoint = mode === "APPOINTMENT" ? "/api/appointments" : "/api/contact";
    const payload =
      mode === "APPOINTMENT"
        ? {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            category: form.category,
            appointmentType: form.appointmentType,
            preferredDate: form.preferredDate,
            preferredTimeSlot: form.preferredTimeSlot,
            occasion: form.occasion,
            notes: form.notes,
            website: form.website,
          }
        : {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            category: form.category,
            message: form.message,
            website: form.website,
          };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Unable to submit right now.");
      }

      setStatus("success");
      setForm((prev) => ({
        ...prev,
        message: "",
        preferredDate: "",
        occasion: "",
        notes: "",
      }));
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit right now.");
    }
  };

  const errorMessageId = "contact-form-error";

  return (
    <form className="premium-contact-form premium-contact-form--krishan" data-reveal onSubmit={submit}>
      <div className="premium-contact-form__header">
        <h3 className="premium-contact-form__title">
          {mode === "APPOINTMENT" ? "Book a private appointment" : "Send us a message"}
        </h3>
        <p className="premium-contact-form__lede">
          {mode === "APPOINTMENT"
            ? "Share your preferred date and occasion. We confirm studio timings within 24 hours."
            : "Tell us what you are looking for. We respond within 24 hours."}
        </p>
      </div>

      <div className="premium-filter-row premium-contact-form__modes">
        <button
          type="button"
          className={`premium-filter-chip ${mode === "APPOINTMENT" ? "is-active" : ""}`}
          onClick={() => setMode("APPOINTMENT")}
        >
          Book appointment
        </button>
        <button
          type="button"
          className={`premium-filter-chip ${mode === "INQUIRY" ? "is-active" : ""}`}
          onClick={() => setMode("INQUIRY")}
        >
          General inquiry
        </button>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="thanks"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-contact-form__success-banner"
            role="status"
            aria-live="polite"
          >
            <CheckCircle aria-hidden />
            <p>
              {mode === "APPOINTMENT"
                ? "Appointment request received. Our concierge team will confirm your slot shortly."
                : "Thank you. Our studio team will reach out shortly with curated options."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="fields"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="premium-contact-form__fields"
          >
            <div className="premium-contact-form__row">
              <label htmlFor="contact-full-name" className="premium-contact-form__label">
                <span className="premium-contact-form__label-text">Name</span>
                <input
                  id="contact-full-name"
                  className="premium-contact-form__input"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.fullName}
                  onChange={(event) => update("fullName", event.target.value)}
                />
              </label>
              <label htmlFor="contact-phone" className="premium-contact-form__label">
                <span className="premium-contact-form__label-text">Phone</span>
                <input
                  id="contact-phone"
                  type="tel"
                  className="premium-contact-form__input"
                  required={mode === "APPOINTMENT"}
                  autoComplete="tel"
                  placeholder={siteConfig.contact.phoneDisplay}
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                />
              </label>
            </div>

            <label htmlFor="contact-email" className="premium-contact-form__label">
              <span className="premium-contact-form__label-text">Email</span>
              <input
                id="contact-email"
                type="email"
                className="premium-contact-form__input"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </label>

            <label htmlFor="contact-category" className="premium-contact-form__label">
              <span className="premium-contact-form__label-text">Jewellery category</span>
              <select
                id="contact-category"
                className="premium-contact-form__input"
                value={form.category}
                onChange={(event) => update("category", event.target.value)}
              >
                <option>Diamond</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Accessories</option>
                <option>Bridal</option>
                <option>Other</option>
              </select>
            </label>

            {mode === "APPOINTMENT" ? (
              <>
                <div className="premium-contact-form__row">
                  <label htmlFor="contact-appointment-type" className="premium-contact-form__label">
                    <span className="premium-contact-form__label-text">Consultation type</span>
                    <select
                      id="contact-appointment-type"
                      className="premium-contact-form__input"
                      value={form.appointmentType}
                      onChange={(event) => update("appointmentType", event.target.value)}
                    >
                      {appointmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="contact-preferred-date" className="premium-contact-form__label">
                    <span className="premium-contact-form__label-text">Preferred date</span>
                    <input
                      id="contact-preferred-date"
                      type="date"
                      min={todayIso}
                      className="premium-contact-form__input"
                      required
                      value={form.preferredDate}
                      onChange={(event) => update("preferredDate", event.target.value)}
                    />
                  </label>
                </div>
                <div className="premium-contact-form__row">
                  <label htmlFor="contact-preferred-time-slot" className="premium-contact-form__label">
                    <span className="premium-contact-form__label-text">Preferred time slot</span>
                    <select
                      id="contact-preferred-time-slot"
                      className="premium-contact-form__input"
                      value={form.preferredTimeSlot}
                      onChange={(event) => update("preferredTimeSlot", event.target.value)}
                    >
                      {appointmentTimeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="contact-occasion" className="premium-contact-form__label">
                    <span className="premium-contact-form__label-text">Occasion</span>
                    <input
                      id="contact-occasion"
                      className="premium-contact-form__input"
                      placeholder="Wedding, anniversary, gifting..."
                      value={form.occasion}
                      onChange={(event) => update("occasion", event.target.value)}
                    />
                  </label>
                </div>
                <label htmlFor="contact-notes" className="premium-contact-form__label">
                  <span className="premium-contact-form__label-text">Notes</span>
                  <textarea
                    id="contact-notes"
                    rows={5}
                    className="premium-contact-form__input premium-contact-form__textarea"
                    placeholder="Tell us your requirements and jewellery preferences."
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                  />
                </label>
              </>
            ) : (
              <label htmlFor="contact-message" className="premium-contact-form__label">
                <span className="premium-contact-form__label-text">Message</span>
                <textarea
                  id="contact-message"
                  rows={5}
                  className="premium-contact-form__input premium-contact-form__textarea"
                  placeholder="Tell us your requirements."
                  required
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                />
              </label>
            )}

            <label className="sr-only" htmlFor="contact-website">
              Leave this field empty
            </label>
            <input
              id="contact-website"
              name="website"
              value={form.website}
              onChange={(event) => update("website", event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            {status === "error" ? (
              <p id={errorMessageId} className="premium-contact-form__error" role="alert" aria-live="assertive">
                {error}
              </p>
            ) : null}

            <button type="submit" className="premium-contact-form__submit" disabled={status === "loading"}>
              <Send aria-hidden />
              {status === "loading" ? "Submitting..." : mode === "APPOINTMENT" ? "Book appointment" : "Send message"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
