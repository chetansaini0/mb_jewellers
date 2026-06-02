"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { useClientMounted } from "@/app/hooks/useClientMounted";
import { socialLinks } from "@/app/lib/siteData";

const instagramReels = [
  { src: "/instareel/Video-750.mp4", title: "MB Reel 750" },
  { src: "/instareel/Video-281.mp4", title: "MB Reel 281" },
  { src: "/instareel/Video-408.mp4", title: "MB Reel 408" },
] as const;

const InstagramReelCard = memo(function InstagramReelCard({
  src,
  title,
  soundOn,
  onSoundToggle,
}: {
  src: string;
  title: string;
  soundOn: boolean;
  onSoundToggle: (nextOn: boolean) => void;
}) {
  const mounted = useClientMounted();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlaying = () => setPlaying(!video.paused);
    syncPlaying();
    video.addEventListener("play", syncPlaying);
    video.addEventListener("pause", syncPlaying);
    return () => {
      video.removeEventListener("play", syncPlaying);
      video.removeEventListener("pause", syncPlaying);
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundOn;
  }, [soundOn]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.45;
        setInView(isVisible);
      },
      { threshold: [0, 0.45, 0.8] },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!inView) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      setPlaying(false);
    });
  }, [inView]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (soundOn) {
      onSoundToggle(false);
      return;
    }

    onSoundToggle(true);
    try {
      await video.play();
    } catch {
      onSoundToggle(false);
    }
  };

  return (
    <article className="premium-reel-card">
      <div className="premium-reel-card__frame">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          loop
          muted={!soundOn}
          autoPlay={inView}
          preload="none"
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="premium-reel-card__shade" aria-hidden />
        {mounted ? (
          <div className="premium-reel-card__controls">
            <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause reel" : "Play reel"}>
              {playing ? "Pause" : "Play"}
            </button>
            <button type="button" onClick={toggleSound} aria-label={soundOn ? "Mute reel audio" : "Unmute reel audio"}>
              {soundOn ? "Sound on" : "Sound off"}
            </button>
          </div>
        ) : null}
      </div>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="premium-reel-card__link">
        View on Instagram
      </a>
    </article>
  );
});

export function InstagramReelsSection() {
  const [audibleSrc, setAudibleSrc] = useState<string | null>(null);

  return (
    <section className="premium-section premium-reels site-max site-px">
      <div className="premium-section__head">
        <p className="premium-eyebrow">Instagram</p>
        <h2 className="premium-title">Studio reels in motion</h2>
        <p className="premium-section__lede">
          Follow the atelier on Instagram for new arrivals, bridal styling, and behind-the-scenes craftsmanship.
        </p>
      </div>
      <div className="premium-reels__rail">
        {instagramReels.map((reel) => (
          <InstagramReelCard
            key={reel.src}
            src={reel.src}
            title={reel.title}
            soundOn={audibleSrc === reel.src}
            onSoundToggle={(nextOn) => setAudibleSrc(nextOn ? reel.src : null)}
          />
        ))}
      </div>
      <div className="premium-reels__cta">
        <Link
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-button premium-button--ghost"
        >
          Follow MB Jewellers
        </Link>
      </div>
    </section>
  );
}
