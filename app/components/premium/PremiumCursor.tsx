"use client";

import { useEffect, useRef } from "react";

export function PremiumCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const animate = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => ring.classList.add("is-active");
    const onLeave = () => ring.classList.remove("is-active");

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="premium-cursor" aria-hidden>
      <div ref={ringRef} className="premium-cursor__ring" />
      <div ref={dotRef} className="premium-cursor__dot" />
    </div>
  );
}
