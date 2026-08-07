"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { usePremiumReveal } from "@/app/components/premium/motion/premiumMotion";
import { PremiumAtelierStrip } from "@/app/components/premium/PremiumAtelierStrip";
import { PremiumDarkCtaSection } from "@/app/components/premium/PremiumDarkCtaSection";
import { PremiumFeaturedPiecesSection } from "@/app/components/premium/PremiumFeaturedPiecesSection";
import { PremiumQuickEnquiryWidget } from "@/app/components/premium/PremiumQuickEnquiryWidget";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";
import { PremiumStorySection } from "@/app/components/premium/PremiumStorySection";
import { PremiumTestimonialsCarousel } from "@/app/components/premium/PremiumTestimonialsCarousel";
import { PremiumTiltCard } from "@/app/components/premium/PremiumTiltCard";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { PremiumLocalSeoSection } from "@/app/components/premium/PremiumLocalSeoSection";
import { premiumCollections, premiumHero } from "@/app/lib/premiumContent";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
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
    <section ref={sectionRef} className="premium-hero premium-hero--cinematic" onMouseMove={onHeroMove}>
      <div className="premium-hero__backdrop" aria-hidden />
      <div className="premium-hero__particles" aria-hidden />
      <div className="premium-hero__cinematic-overlay" aria-hidden />
      <motion.div
        className="premium-hero__media"
        style={{
          x: parallaxX,
          y: parallaxY,
          backgroundImage: videoFailed ? "url(/pics/signature-worlds/gold-cinematic-lighting.png)" : undefined,
          backgroundSize: videoFailed ? "cover" : undefined,
          backgroundPosition: videoFailed ? "center" : undefined,
        }}
      >
        {!videoFailed ? (
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
            onError={() => setVideoFailed(true)}
          >
            <source src={premiumHero.video} type="video/mp4" />
          </video>
        ) : null}
        <motion.div className="premium-hero__shine" aria-hidden />
      </motion.div>

      <div className="premium-hero__content site-max site-px">
        <div className="premium-hero__kicker-row premium-hero__line">
          <span className="premium-hero__kicker-line" aria-hidden />
          <p className="premium-hero__kicker">{premiumHero.kicker}</p>
        </div>
        <h1 className="premium-hero__title">
          {premiumHero.title.map((line) => (
            <span key={line} className="premium-hero__line block">
              {line}
            </span>
          ))}
        </h1>
        <p className="premium-hero__copy premium-hero__line">{premiumHero.subtitle}</p>
        <div className="premium-hero__actions premium-hero__line">
          <MagneticLink href={premiumHero.primaryCta.href} className="premium-button premium-button--primary">
            {premiumHero.primaryCta.label}
          </MagneticLink>
          <MagneticLink href={premiumHero.secondaryCta.href} className="premium-button premium-button--ghost">
            {premiumHero.secondaryCta.label}
          </MagneticLink>
        </div>
      </div>

      <div className="premium-hero__widget site-max site-px">
        <PremiumQuickEnquiryWidget />
      </div>

      <div className="premium-hero__scroll-hint" aria-hidden>
        <ChevronDown />
      </div>
    </section>
  );
}

function CollectionsSection() {
  return (
    <section className="premium-section premium-section--collections site-max site-px">
      <PremiumSectionTitle
        eyebrow="Signature worlds"
        title="Collections curated for every chapter"
        subtitle="Diamond brilliance, warm gold heritage, polished silver, and finishing accessories — each world opens into private studio curation."
        align="left"
      />
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

export function PremiumHome() {
  const revealRef = useRef<HTMLDivElement>(null);
  usePremiumReveal(revealRef);

  return (
    <div ref={revealRef}>
      <HeroSection />
      <PremiumStorySection />
      <CollectionsSection />
      <PremiumFeaturedPiecesSection />
      <PremiumNewArrivalsSection />
      <PremiumAtelierStrip />
      <PremiumTrustSection />
      <PremiumLocalSeoSection />
      <InstagramReelsSection />
      <PremiumHomeStudioMapSection />
      <PremiumTestimonialsCarousel />
      <PremiumDarkCtaSection />
    </div>
  );
}
