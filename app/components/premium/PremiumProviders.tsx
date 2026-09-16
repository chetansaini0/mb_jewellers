"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PremiumProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.35,
      allowNestedScroll: true,
    });
    lenisRef.current = lenis;

    const root = document.documentElement;

    lenis.on("scroll", ScrollTrigger.update);

    const onTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    document.documentElement.classList.add("lenis-active");
    ScrollTrigger.refresh();

    return () => {
      document.documentElement.classList.remove("lenis-active");
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(onTicker);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refreshId);
  }, [pathname]);

  return children;
}
