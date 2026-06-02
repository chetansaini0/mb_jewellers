"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumStudioMap } from "@/app/components/premium/PremiumStudioMap";
import { appointmentTimeSlots, appointmentTypes } from "@/app/lib/appointments";
import { contactChannels } from "@/app/lib/premiumPages";
import { flagshipStudio, socialLinks } from "@/app/lib/siteData";

export function PremiumContactPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Contact"
        title="A private appointment begins with a conversation"
        lede="This site is for discovery only — tell us what caught your eye and we will arrange a private studio viewing. Purchases are completed in person, not online."
      />
      <section className="premium-section">
        <div className="site-max site-px premium-contact__grid">
          <div className="premium-contact__cards">
            {contactChannels.map((channel) => (
              <article key={channel.label} className="premium-contact-card premium-glass-card" data-reveal>
                <p className="premium-eyebrow">{channel.label}</p>
                {"href" in channel && channel.href ? (
                  <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {channel.value}
                  </a>
                ) : (
                  <p>{channel.value}</p>
                )}
              </article>
            ))}
          </div>
          <Suspense fallback={<div className="premium-glass-card p-6 text-sm text-[var(--premium-muted)]">Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
      <section className="premium-section">
        <div className="site-max site-px premium-map premium-glass-card" data-reveal>
          <p className="premium-eyebrow">Studio map</p>
          <h2 className="premium-title">
            Visit {flagshipStudio.name}, {flagshipStudio.city}
          </h2>
          <p className="premium-section__lede">{flagshipStudio.address}</p>
          <PremiumStudioMap />
          <div className="premium-contact__social">
            <Link href={flagshipStudio.directionsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </Link>
            <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
            <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </Link>
          </div>
        </div>
      </section>
    </PremiumPageFrame>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const productInterest = searchParams.get("interest")?.trim() ?? "";
  const [mode, setMode] = useState<"INQUIRY" | "APPOINTMENT">(() =>
    productInterest ? "INQUIRY" : "APPOINTMENT",
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
    category: "Diamond",
    message: productInterest ? `I would like a private viewing for: ${productInterest}.` : "",
    appointmentType: "CONSULTATION",
    preferredDate: "",
    preferredTimeSlot: appointmentTimeSlots[2],
    occasion: "",
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
    <form className="premium-contact-form premium-glass-card" data-reveal onSubmit={submit}>
      <div className="premium-filter-row">
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
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-contact-form__success"
            role="status"
            aria-live="polite"
          >
            {mode === "APPOINTMENT"
              ? "Appointment request received. Our concierge team will confirm your slot shortly."
              : "Thank you. Our studio team will reach out shortly with curated options."}
          </motion.p>
        ) : (
          <motion.div key="fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="premium-contact-form__fields">
            <label htmlFor="contact-full-name">
              Name
              <input
                id="contact-full-name"
                className="premium-field"
                required
                value={form.fullName}
                onChange={(event) => update("fullName", event.target.value)}
              />
            </label>
            <label htmlFor="contact-email">
              Email
              <input
                id="contact-email"
                type="email"
                className="premium-field"
                required
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </label>
            <label htmlFor="contact-phone">
              Phone
              <input
                id="contact-phone"
                type="tel"
                className="premium-field"
                required={mode === "APPOINTMENT"}
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
              />
            </label>
            <label htmlFor="contact-category">
              Jewellery category
              <select
                id="contact-category"
                className="premium-field"
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
                <label htmlFor="contact-appointment-type">
                  Consultation type
                  <select
                    id="contact-appointment-type"
                    className="premium-field"
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
                <label htmlFor="contact-preferred-date">
                  Preferred date
                  <input
                    id="contact-preferred-date"
                    type="date"
                    min={todayIso}
                    className="premium-field"
                    required
                    value={form.preferredDate}
                    onChange={(event) => update("preferredDate", event.target.value)}
                  />
                </label>
                <label htmlFor="contact-preferred-time-slot">
                  Preferred time slot
                  <select
                    id="contact-preferred-time-slot"
                    className="premium-field"
                    value={form.preferredTimeSlot}
                    onChange={(event) => update("preferredTimeSlot", event.target.value)}
                  >
                    {appointmentTimeSlots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="contact-occasion">
                  Occasion
                  <input
                    id="contact-occasion"
                    className="premium-field"
                    placeholder="Wedding, anniversary, gifting..."
                    value={form.occasion}
                    onChange={(event) => update("occasion", event.target.value)}
                  />
                </label>
                <label htmlFor="contact-notes">
                  Notes
                  <textarea
                    id="contact-notes"
                    rows={4}
                    className="premium-field"
                    placeholder="Tell us your requirements and jewellery preferences."
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                  />
                </label>
              </>
            ) : (
              <label htmlFor="contact-message">
                Message
                <textarea
                  id="contact-message"
                  rows={4}
                  className="premium-field"
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
            <button type="submit" className="premium-button premium-button--primary">
              {status === "loading" ? "Submitting..." : mode === "APPOINTMENT" ? "Book appointment" : "Submit inquiry"}
            </button>
            {status === "error" ? (
              <p id={errorMessageId} className="premium-contact-form__error" role="alert" aria-live="assertive">
                {error}
              </p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
