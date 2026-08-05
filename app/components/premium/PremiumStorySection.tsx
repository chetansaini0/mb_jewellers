"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";
import { premiumStory } from "@/app/lib/premiumContent";
import { siteConfig } from "@/app/lib/siteConfig";

const stats = [
  { value: "30+", label: "Years of craft" },
  { value: "5 Lakh+", label: "Happy families" },
  { value: "100%", label: "Hallmarked trust" },
];

export function PremiumStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="premium-story-section site-max site-px">
      <PremiumSectionTitle
        eyebrow="Our story"
        title="Heritage filigree, finished for today"
        subtitle="A family atelier in Sikar where gold, diamonds, and bridal suites are shaped with patience, proportion, and ceremony in mind."
      />

      <div className="premium-story-section__grid">
        <motion.div style={{ y: reduce ? 0 : imageY }} className="premium-story-section__visual">
          <div className="premium-story-section__image-wrap">
            <Image
              src={premiumStory.heroImage}
              alt="Pearl and emerald bridal jewellery set from MB Jewellers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="premium-story-section__image-overlay" aria-hidden />
          </div>
          <div className="premium-story-section__badge">
            <p className="premium-story-section__badge-value">30+</p>
            <p className="premium-story-section__badge-label">Years in Sikar</p>
          </div>
        </motion.div>

        <div className="premium-story-section__copy">
          <p>{siteConfig.description}</p>
          <p>
            From the first sketch to the final polish, every MB silhouette balances heritage filigree with contemporary
            restraint — curated for private studio viewings, not online checkout.
          </p>

          <div className="premium-story-section__stats">
            {stats.map((item) => (
              <div key={item.label}>
                <p className="premium-story-section__stat-value">{item.value}</p>
                <p className="premium-story-section__stat-label">{item.label}</p>
              </div>
            ))}
          </div>

          <Link href="/heritage" className="premium-story-section__link">
            Discover our heritage <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="premium-story-section__highlights">
        {premiumStory.chapters.map((chapter) => (
          <article key={chapter.title} className="premium-story-section__highlight">
            <Image
              src={chapter.image}
              alt={chapter.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
            <div className="premium-story-section__highlight-overlay">
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
