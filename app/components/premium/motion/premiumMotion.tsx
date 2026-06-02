"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePremiumReveal(scopeRef: RefObject<HTMLElement | null>, selector = "[data-reveal]") {
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            delay: (index % 4) * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef, selector]);
}

export function usePremiumCounter(
  scopeRef: RefObject<HTMLElement | null>,
  selector = "[data-counter]",
  duration = 1.6,
) {
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
        const target = Number(element.dataset.counter ?? "0");
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
          },
          onUpdate: () => {
            element.textContent = `${Math.round(state.value)}${element.dataset.suffix ?? ""}`;
          },
        });
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef, selector, duration]);
}

export function TrustIcon({ name }: { name: string }) {
  switch (name) {
    case "craft":
      return (
        <svg viewBox="0 0 48 48" aria-hidden className="premium-trust__icon-svg">
          <path d="M10 34 18 8l6 10 6-10 8 26" />
          <path d="M14 28h20" />
        </svg>
      );
    case "purity":
      return (
        <svg viewBox="0 0 48 48" aria-hidden className="premium-trust__icon-svg">
          <path d="M24 6 40 16v16L24 42 8 32V16Z" />
          <path d="m16 24 6 6 10-12" />
        </svg>
      );
    case "trust":
      return (
        <svg viewBox="0 0 48 48" aria-hidden className="premium-trust__icon-svg">
          <path d="M24 8c6 6 14 8 18 8-1 14-8 22-18 26C14 38 7 30 6 16c4 0 12-2 18-8Z" />
        </svg>
      );
    case "experience":
      return (
        <svg viewBox="0 0 48 48" aria-hidden className="premium-trust__icon-svg">
          <path d="M8 12h32v24H8z" />
          <path d="M16 8v8M32 8v8M8 20h32" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" aria-hidden className="premium-trust__icon-svg">
          <path d="M10 18c0-6 5-10 14-10s14 4 14 10-6 12-14 22C16 30 10 24 10 18Z" />
        </svg>
      );
  }
}
