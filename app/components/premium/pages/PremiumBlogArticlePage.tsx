"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { blogPosts } from "@/app/lib/premiumPages";

const articleSupplement = [
  "The studio photographs each suite in natural daylight so you can anticipate how metal, stone, and skin tone respond in real celebrations — not only under showcase spots.",
  "When you visit MB Jewellers, you are not browsing a catalogue; you are entering a conversation about proportion, ritual, and the small engineering decisions that make jewellery feel inevitable.",
];

export function PremiumBlogArticlePage({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PremiumPageFrame>
        <PremiumPageHero eyebrow="Journal" title="Article not found" lede="This story may have moved — return to the journal for the latest essays from the atelier." />
        <section className="premium-section">
          <div className="site-max site-px" data-reveal>
            <Link href="/blog" className="premium-button premium-button--primary">
              Back to journal
            </Link>
          </div>
        </section>
      </PremiumPageFrame>
    );
  }

  return (
    <PremiumPageFrame>
      <article>
        <PremiumPageHero eyebrow={`${post.category} · ${post.date}`} title={post.title} lede={post.excerpt} />
        <section className="premium-section">
          <div className="site-max site-px">
            <div className="premium-glass-card mx-auto max-w-3xl overflow-hidden rounded-2xl" data-reveal>
              <div className="relative aspect-[21/9] min-h-[220px] w-full md:aspect-[2/1]">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(min-width: 1024px) 48rem, 100vw" priority />
              </div>
            </div>
            <div className="prose-premium mx-auto mt-10 max-w-2xl">
              <p className="premium-section__lede text-base" data-reveal>
                {post.excerpt}
              </p>
              {articleSupplement.map((para, i) => (
                <p key={i} className="mt-6 text-base leading-relaxed text-[var(--premium-muted)]" data-reveal>
                  {para}
                </p>
              ))}
            </div>
            <div className="mx-auto mt-12 max-w-2xl" data-reveal>
              <Link href="/blog" className="premium-button premium-button--ghost">
                ← All journal stories
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PremiumPageFrame>
  );
}
