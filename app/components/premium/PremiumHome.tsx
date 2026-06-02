"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useClientMounted } from "@/app/hooks/useClientMounted";
import { usePremiumReveal } from "@/app/components/premium/motion/premiumMotion";
import { PremiumTiltCard } from "@/app/components/premium/PremiumTiltCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import {
  premiumCollage,
  premiumCollections,
  premiumHero,
  premiumPromises,
  premiumTestimonials,
} from "@/app/lib/premiumContent";

function MagneticLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex">
      <Link href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </Link>
    </motion.div>
  );
}

function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="premium-section site-max site-px" aria-busy="true" aria-live="polite">
      <div className="premium-glass-card premium-skeleton-card">
        <p className="premium-eyebrow">{title}</p>
        <div className="premium-skeleton-line" />
        <div className="premium-skeleton-line short" />
      </div>
    </section>
  );
}

const PremiumNewArrivalsSection = dynamic(
  () => import("@/app/components/premium/PremiumNewArrivalsSection").then((mod) => mod.PremiumNewArrivalsSection),
  { loading: () => <SectionSkeleton title="New arrivals" /> },
);
const InstagramReelsSection = dynamic(
  () => import("@/app/components/premium/InstagramReelsSection").then((mod) => mod.InstagramReelsSection),
  { loading: () => <SectionSkeleton title="Studio reels" /> },
);
const PremiumHomeStudioMapSection = dynamic(
  () => import("@/app/components/premium/PremiumHomeStudioMapSection").then((mod) => mod.PremiumHomeStudioMapSection),
  { loading: () => <SectionSkeleton title="Studio location" /> },
);

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    video.play().catch(() => undefined);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".premium-hero__line",
        { y: 48, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.35,
        },
      );
      gsap.fromTo(
        ".premium-hero__copy",
        { y: 24, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, delay: 0.7, ease: "power3.out" },
      );
      gsap.fromTo(
        ".premium-hero__actions",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.95, ease: "power3.out" },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onHeroMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section ref={sectionRef} className="premium-hero" onMouseMove={onHeroMove}>
      <div className="premium-hero__backdrop" aria-hidden />
      <div className="premium-hero__particles" aria-hidden />
      <motion.div ref={mediaRef} className="premium-hero__media" style={{ x: parallaxX, y: parallaxY }}>
        <video
          ref={videoRef}
          className="premium-hero__video"
          playsInline
          loop
          muted
          autoPlay
          preload="metadata"
          poster="/pics/signature-worlds/gold-cinematic-lighting.png"
          aria-label={premiumHero.alt}
        >
          <source src={premiumHero.video} type="video/mp4" />
        </video>
        <motion.div className="premium-hero__shine" aria-hidden />
      </motion.div>
      <div className="premium-hero__content site-max site-px">
        <p className="premium-hero__kicker premium-hero__line">{premiumHero.kicker}</p>
        <h1 className="premium-hero__title">
          {premiumHero.title.map((line) => (
            <span key={line} className="premium-hero__line block">
              {line}
            </span>
          ))}
        </h1>
        <p className="premium-hero__copy">{premiumHero.subtitle}</p>
        <div className="premium-hero__actions">
          <MagneticLink href={premiumHero.primaryCta.href} className="premium-button premium-button--primary">
            {premiumHero.primaryCta.label}
          </MagneticLink>
          <MagneticLink href={premiumHero.secondaryCta.href} className="premium-button premium-button--ghost">
            {premiumHero.secondaryCta.label}
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
function CollectionsSection() {
  return (
    <section className="premium-section premium-section--collections site-max site-px">
      <div className="premium-section__head" data-reveal>
        <p className="premium-eyebrow">Signature worlds</p>
        <h2 className="premium-title">Collections curated for every chapter</h2>
      </div>
      <div className="premium-collections-grid">
        {premiumCollections.map((item) => (
          <div key={item.title} data-reveal>
            <PremiumTiltCard className="premium-glass-card">
              <Link href={item.href} className="premium-collection-card">
                <div className="premium-collection-card__media">
                  <Image
                    src={item.coverImage}
                    alt={item.coverAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <span className="premium-collection-card__shine" aria-hidden />
                </div>
                <div className="premium-collection-card__body">
                  <p className="premium-collection-card__meta">Curated selection</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            </PremiumTiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollageSection() {
  return (
    <section className="premium-section premium-collage site-max site-px">
      <div className="premium-section__head" data-reveal>
        <p className="premium-eyebrow">Editorial gallery</p>
        <h2 className="premium-title">A collage of brilliance</h2>
      </div>
      <div className="premium-collage__grid" data-reveal>
        {premiumCollage.map((item) => (
          <motion.div
            key={item.src}
            className={`premium-collage__item ${item.className}`}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              className="premium-collage__image object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="premium-collage__shine" aria-hidden />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PromisesSection() {
  return (
    <section className="premium-section premium-promises site-max site-px">
      <div className="premium-section__head" data-reveal>
        <p className="premium-eyebrow">The MB promise</p>
        <h2 className="premium-title">Luxury you can trust</h2>
      </div>
      <div className="premium-promises__grid">
        {premiumPromises.map((item) => (
          <article key={item.title} className="premium-glass-card premium-promise-card" data-reveal>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const mounted = useClientMounted();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % premiumTestimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = premiumTestimonials[index];

  return (
    <section className="premium-section premium-testimonials site-max site-px">
      <p className="premium-eyebrow">Testimonials</p>
      <h2 className="premium-title">Voices from the salon</h2>
      <motion.blockquote
        key={testimonial.name}
        className="premium-testimonial"
        aria-live="polite"
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>“{testimonial.quote}”</p>
        <footer>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.meta}</span>
        </footer>
      </motion.blockquote>
      {mounted ? (
        <div className="premium-testimonials__dots" role="tablist" aria-label="Testimonials">
          {premiumTestimonials.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Show testimonial from ${item.name}`}
              className={`premium-testimonials__dot ${itemIndex === index ? "is-active" : ""}`}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      ) : (
        <div className="premium-testimonials__dots" aria-hidden>
          {premiumTestimonials.map((item) => (
            <span key={item.name} className="premium-testimonials__dot" />
          ))}
        </div>
      )}
    </section>
  );
}

function AppointmentSection() {
  return (
    <section className="premium-section premium-appointment site-max site-px">
      <div className="premium-appointment__panel premium-glass-card" data-reveal>
        <p className="premium-eyebrow">Private appointments</p>
        <h2 className="premium-title">Step into the atelier</h2>
        <p>
          Share your occasion, timeline, and style. Our consultants will curate a private shortlist and arrange your
          studio visit in Sikar or Jaipur.
        </p>
        <div className="premium-hero__actions">
          <MagneticLink href="/contact" className="premium-button premium-button--primary">
            Request appointment
          </MagneticLink>
          <MagneticLink href="/bridal" className="premium-button premium-button--ghost">
            Explore bridal
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
export function PremiumHome() {
  const revealRef = useRef<HTMLDivElement>(null);
  usePremiumReveal(revealRef);

  return (
    <div ref={revealRef}>
      <HeroSection />
      <CollectionsSection />
      <PremiumNewArrivalsSection />
      <CollageSection />
      <InstagramReelsSection />
      <PremiumTrustSection />
      <PromisesSection />
      <PremiumHomeStudioMapSection />
      <TestimonialsSection />
      <AppointmentSection />
    </div>
  );
}
