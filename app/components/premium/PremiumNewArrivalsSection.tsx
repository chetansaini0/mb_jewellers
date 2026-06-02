"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useSpring, type PanInfo } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { premiumProducts } from "@/app/lib/premiumContent";
import { slugifyProductName } from "@/app/lib/premiumPages";

const AUTOPLAY_MS = 5200;
const DRAG_THRESHOLD = 48;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function NewArrivalCard({
  product,
  active,
  dragging,
  onSelect,
}: {
  product: (typeof premiumProducts)[number];
  active: boolean;
  dragging: boolean;
  onSelect: () => void;
}) {
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!active || dragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -8);
    rotateY.set(px * 10);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const href = `/products/${slugifyProductName(product.name)}`;

  return (
    <motion.article
      layout
      className={`premium-new-arrivals__card premium-glass-card ${active ? "is-active" : ""}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onSelect}
      animate={{
        scale: active ? 1.06 : 0.9,
        y: active ? -14 : 0,
        opacity: active ? 1 : 0.72,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <div className="premium-new-arrivals__spotlight" aria-hidden />
      <Link href={href} className="premium-new-arrivals__card-link" draggable={false}>
        <div className="premium-new-arrivals__media">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className="premium-new-arrivals__image object-cover"
            sizes="(max-width: 768px) 78vw, 320px"
            draggable={false}
          />
          <div className="premium-new-arrivals__shine" aria-hidden />
        </div>
        <div className="premium-new-arrivals__copy">
          <motion.p
            className="premium-new-arrivals__meta"
            initial={false}
            animate={{
              opacity: active ? 1 : 0.55,
              y: active ? 0 : 8,
              filter: active ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.55, delay: active ? 0.05 : 0 }}
          >
            {product.material ?? "Atelier piece"}
          </motion.p>
          <motion.h3
            className="premium-new-arrivals__name"
            initial={false}
            animate={{
              opacity: active ? 1 : 0.65,
              y: active ? 0 : 10,
              filter: active ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: 0.6, delay: active ? 0.12 : 0 }}
          >
            {product.name}
          </motion.h3>
          <motion.p
            className="premium-new-arrivals__detail"
            initial={false}
            animate={{
              opacity: active ? 1 : 0.5,
              y: active ? 0 : 12,
              filter: active ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: 0.65, delay: active ? 0.2 : 0 }}
          >
            {product.detail}
          </motion.p>
          <motion.span
            className="premium-inline-link premium-new-arrivals__cta"
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
            transition={{ duration: 0.5, delay: active ? 0.28 : 0 }}
          >
            View piece
          </motion.span>
        </div>
      </Link>
    </motion.article>
  );
}

export function PremiumNewArrivalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const items = premiumProducts;
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [stride, setStride] = useState(320);
  const [viewportWidth, setViewportWidth] = useState(0);
  const trackX = useSpring(0, { stiffness: 180, damping: 26, mass: 0.85 });

  const centerOffset = viewportWidth > 0 ? viewportWidth / 2 - stride / 2 : 0;
  const baseX = -(active * stride) + centerOffset;

  useEffect(() => {
    trackX.set(baseX);
  }, [baseX, trackX]);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const card = viewport.querySelector<HTMLElement>(".premium-new-arrivals__card");
    const track = viewport.querySelector<HTMLElement>(".premium-new-arrivals__track");
    if (!card || !track) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    setStride(card.offsetWidth + gap);
    setViewportWidth(viewport.clientWidth);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".premium-new-arrivals__head > *",
        { y: 36, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );
      gsap.fromTo(
        ".premium-new-arrivals__viewport",
        { y: 48, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        },
      );
      gsap.to(".premium-new-arrivals__content", {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || dragging) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [dragging, items.length, reducedMotion]);

  const onDragStart = () => {
    setDragging(true);
    trackX.stop();
  };

  const onDrag = (_: unknown, info: PanInfo) => {
    trackX.set(baseX + info.offset.x);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const delta = info.offset.x;
    let next = active;
    if (delta < -DRAG_THRESHOLD) next = (active + 1) % items.length;
    if (delta > DRAG_THRESHOLD) next = (active - 1 + items.length) % items.length;
    setActive(next);
    setDragging(false);
    animate(trackX, -(next * stride) + centerOffset, { type: "spring", stiffness: 220, damping: 28 });
  };

  return (
    <section ref={sectionRef} className="premium-section premium-new-arrivals">
      <div className="premium-new-arrivals__backdrop" aria-hidden />
      <div className="premium-new-arrivals__particles" aria-hidden />
      <div className="premium-new-arrivals__content site-max site-px">
        <div className="premium-new-arrivals__head premium-section__head">
          <p className="premium-eyebrow">New arrivals</p>
          <h2 className="premium-title">Pieces that move like light</h2>
          <p className="premium-section__lede">
            A cinematic edit of the atelier&apos;s latest silhouettes — glide, pause, and explore each piece in motion.
          </p>
        </div>
        <div ref={viewportRef} className={`premium-new-arrivals__viewport ${dragging ? "is-dragging" : ""}`}>
          <motion.div
            className="premium-new-arrivals__track"
            drag={reducedMotion ? false : "x"}
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            style={{ x: trackX }}
          >
            {items.map((product, index) => (
              <NewArrivalCard
                key={product.name}
                product={product}
                active={index === active}
                dragging={dragging}
                onSelect={() => setActive(index)}
              />
            ))}
          </motion.div>
        </div>
        <div className="premium-new-arrivals__progress" role="tablist" aria-label="New arrivals carousel dots">
          {items.map((product, index) => (
            <button
              key={product.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`premium-new-arrivals__progress-dot ${index === active ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`Show ${product.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
