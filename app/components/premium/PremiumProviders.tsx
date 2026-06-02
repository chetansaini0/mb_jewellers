"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PremiumProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    lenis.on("scroll", ScrollTrigger.update);

    document.documentElement.classList.add("lenis-active");

    let rafId = 0;
    const onRaf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(onRaf);
    };

    rafId = requestAnimationFrame(onRaf);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("lenis-active");
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return children;
}
