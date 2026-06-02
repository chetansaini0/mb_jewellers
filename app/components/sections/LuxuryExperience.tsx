"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { featuredPieces, socialLinks } from "@/app/lib/siteData";

const collectionCards = [
  {
    title: "Diamond Collection",
    href: "/collections/diamond",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
    copy: "Light-sculpted brilliance for statement elegance.",
  },
  {
    title: "Gold Collection",
    href: "/collections/gold",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80",
    copy: "Royal silhouettes in warm, radiant craftsmanship.",
  },
  {
    title: "Silver Collection",
    href: "/collections/silver",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80",
    copy: "Contemporary luxury in cool, polished tones.",
  },
  {
    title: "Accessories",
    href: "/collections/accessories",
    image: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=1200&q=80",
    copy: "Rings, studs, and chains that complete every ensemble.",
  },
];

const stats = [
  { label: "Design Variations", value: 3200, suffix: "+" },
  { label: "Custom Orders Delivered", value: 980, suffix: "+" },
  { label: "Craft Expertise", value: 25, suffix: " Years" },
  { label: "Premium Clients", value: 12000, suffix: "+" },
];

const testimonials = [
  {
    quote:
      "The bridal set looked cinematic in person. Every detail felt handcrafted and premium.",
    name: "Priyanka S.",
    meta: "Bride, Jaipur",
  },
  {
    quote:
      "Their diamond consultation was world-class. The finish quality is truly international.",
    name: "Aarav M.",
    meta: "Private Client",
  },
  {
    quote:
      "From packaging to presentation, everything felt luxurious and trust-inspiring.",
    name: "Kriti R.",
    meta: "Collector",
  },
];

const instagramReels = [
  { src: "/instareel/Video-281.mp4", title: "MB Reel 281" },
  { src: "/instareel/Video-408.mp4", title: "MB Reel 408" },
  { src: "/instareel/Video-750.mp4", title: "MB Reel 750" },
];

function InstagramReelCard({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const syncPlaying = () => setPlaying(!v.paused);
    const syncMuted = () => setMuted(v.muted);
    syncPlaying();
    syncMuted();
    v.addEventListener("play", syncPlaying);
    v.addEventListener("pause", syncPlaying);
    v.addEventListener("volumechange", syncMuted);
    return () => {
      v.removeEventListener("play", syncPlaying);
      v.removeEventListener("pause", syncPlaying);
      v.removeEventListener("volumechange", syncMuted);
    };
  }, [src]);

  const togglePlayback = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) await v.play().catch(() => setPlaying(false));
    else v.pause();
  };

  const toggleSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      try {
        await v.play();
      } catch {
        /* autoplay blocked — user can press play again */
      }
    } else {
      v.muted = true;
    }
    setMuted(v.muted);
  };

  return (
    <article className="flex w-full max-w-[min(280px,calc((100vw-3rem)/2))] shrink-0 flex-col sm:max-w-[320px]">
      <div
        className="relative w-full overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--color-accent-gold)_55%,transparent)] bg-black shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        style={{ aspectRatio: "9 / 16" }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover [-webkit-touch-callout:none]"
          playsInline
          loop
          muted
          autoPlay
          preload="metadata"
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 p-3">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause reel" : "Play reel"}
            className="pointer-events-auto flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/35 bg-black/55 text-[var(--color-accent-gold)] backdrop-blur-md [-webkit-tap-highlight-color:transparent] transition hover:border-[var(--color-accent-gold)] hover:bg-black/65"
          >
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute reel audio" : "Mute reel audio"}
            className="pointer-events-auto flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/35 bg-black/55 text-[var(--color-accent-gold)] backdrop-blur-md [-webkit-tap-highlight-color:transparent] transition hover:border-[var(--color-accent-gold)] hover:bg-black/65"
          >
            {muted ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M11 5L6 9H3v6h3l5 4V5z M23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M11 5L6 9H3v6h3l5 4V5z M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/65 underline-offset-4 transition hover:text-[var(--color-accent-gold)] hover:underline [-webkit-tap-highlight-color:transparent]"
      >
        View on Instagram
      </a>
    </article>
  );
}

export function LuxuryExperience() {
  const [quickView, setQuickView] = useState<(typeof featuredPieces)[number] | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [countValues, setCountValues] = useState(() => stats.map(() => 0));
  const statsRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const videoPoster = useMemo(
    () => "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1400&q=80",
    [],
  );

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    let raf = 0;
    const started = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const t = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCountValues(stats.map((item) => Math.floor(item.value * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [statsVisible]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty("--mx", `${x}px`);
    glowRef.current.style.setProperty("--my", `${y}px`);
  };

  return (
    <section className="relative" onMouseMove={handleMove}>
      <div ref={glowRef} className="pointer-events-none absolute inset-0 hidden md:block luxury-cursor-glow" />

      <section className="site-max site-px py-16 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="luxury-kicker">Featured Collections</p>
          <h2 className="luxury-title mt-4">Curated luxury for every milestone</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collectionCards.map((item) => (
            <Link key={item.title} href={item.href} className="luxury-collection-card group">
              <div className="luxury-image-wrap">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="luxury-collection-meta">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="luxury-dark-panel border-y border-white/10 py-16 sm:py-24">
        <div className="site-max site-px">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="luxury-kicker">Premium Product Showcase</p>
              <h2 className="luxury-title mt-4 text-[var(--color-diamond-white)]">Signature pieces in cinematic detail</h2>
            </div>
            <Link href="/collections" className="luxury-mini-link">Explore full catalogue</Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPieces.map((piece) => (
              <li key={piece.name}>
                <article className="luxury-product-card group">
                  <button type="button" className="luxury-image-wrap h-[270px] w-full text-left sm:h-[300px]" onClick={() => setQuickView(piece)} aria-label={`Quick view ${piece.name}`}>
                    <Image src={piece.image} alt={piece.alt} fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  </button>
                  <div className="mt-4">
                    <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-diamond-white)]">{piece.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{piece.detail}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <button type="button" className="luxe-button px-4 py-2 text-xs uppercase tracking-[0.2em]" onClick={() => setQuickView(piece)}>
                        Quick view
                      </button>
                      <Link href="/contact" className="luxury-mini-link">Enquire now</Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-max grid items-center gap-12 site-px py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="luxury-kicker">Craftsmanship Story</p>
          <h2 className="luxury-title mt-4">Designed with emotion, finished with precision</h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            MB Jewellers blends heritage craftsmanship with a contemporary international design language. Every masterpiece is shaped through stone curation, hand detailing, and premium finishing for memorable life moments.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="luxury-glass-card">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-emerald-accent)]">Bespoke design</p>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">Concept-to-creation consultation for unique pieces.</p>
            </div>
            <div className="luxury-glass-card">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-emerald-accent)]">Certified quality</p>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">Premium materials and trusted authenticity support.</p>
            </div>
          </div>
        </div>
        <div className="luxury-video-shell">
          <video autoPlay muted loop playsInline poster={videoPoster} className="h-full w-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-showing-her-earrings-in-close-up-40145-large.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section ref={statsRef} className="luxury-dark-panel py-16">
        <div className="site-max grid gap-4 site-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <article key={item.label} className="luxury-glass-card border-white/20 bg-white/5 text-center">
              <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-royal-gold)]">
                {countValues[index]}
                <span className="text-lg">{item.suffix}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/75">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-max site-px py-16 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="luxury-kicker">Client Voice</p>
          <h2 className="luxury-title mt-4">Trusted by premium jewellery buyers</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="luxury-glass-card">
              <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">{item.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="luxury-dark-panel py-16 sm:py-20">
        <div className="site-max site-px">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="luxury-kicker">Instagram Reel Gallery</p>
              <h2 className="luxury-title mt-4 text-[var(--color-diamond-white)]">Social proof in motion</h2>
            </div>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="luxury-mini-link">
              @mbjewellerssikar
            </a>
          </div>
          <p className="mb-4 text-center text-xs text-white/60 sm:text-left">
            Reels autoplay muted (browser requirement). Tap the speaker icon to hear audio.
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:justify-between lg:gap-6">
            {instagramReels.map((reel) => (
              <InstagramReelCard key={reel.src} src={reel.src} title={reel.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-max site-px py-16 sm:py-20">
        <div className="luxury-membership-banner">
          <div>
            <p className="luxury-kicker text-[var(--color-ink)]">Luxury Membership</p>
            <h2 className="luxury-title mt-3">Join the MB Privilege Circle</h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-muted)] sm:text-base">
              Unlock first access to bridal launches, bespoke previews, and private events with premium concierge support.
            </p>
          </div>
          <Link href="/contact" className="luxe-button mt-6 inline-flex rounded-sm px-7 py-3 text-sm sm:mt-0">
            Request invitation
          </Link>
        </div>
      </section>

      <div className="luxury-float-actions">
        <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="luxury-fab">
          WA
        </a>
        <a href="tel:+0000000000" aria-label="Call MB Jewellers" className="luxury-fab">
          Call
        </a>
      </div>

      {quickView ? (
        <div className="luxury-modal-backdrop" role="dialog" aria-modal="true" aria-label="Quick product view">
          <div className="luxury-modal">
            <button type="button" className="luxury-close" onClick={() => setQuickView(null)} aria-label="Close quick view">
              ×
            </button>
            <div className="relative h-64 overflow-hidden rounded-sm sm:h-80">
              <Image src={quickView.image} alt={quickView.alt} fill sizes="(max-width: 640px) 90vw, 600px" className="object-cover" />
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl">{quickView.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{quickView.detail}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="luxe-button rounded-sm px-6 py-2.5 text-sm">
                Book consultation
              </Link>
              <button type="button" className="luxe-button-ghost rounded-sm px-6 py-2.5 text-sm text-[var(--color-ink)]" onClick={() => setQuickView(null)}>
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
