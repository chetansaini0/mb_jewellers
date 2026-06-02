"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTiltCard } from "@/app/components/premium/PremiumTiltCard";
import { blogPosts } from "@/app/lib/premiumPages";

export function PremiumBlogPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Journal"
        title="Notes from the MB atelier"
        lede="Editorial stories on bridal curation, gold language, and the quiet drama of stones in daylight."
      />
      <section className="premium-section">
        <div className="site-max site-px">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <li key={post.slug} data-reveal>
                <PremiumTiltCard className="premium-product-card premium-glass-card h-full">
                  <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                    <div className="premium-product-card__media">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 90vw"
                        className="object-cover"
                      />
                      <div className="premium-product-card__shine" aria-hidden />
                    </div>
                    <div className="premium-product-card__body flex flex-1 flex-col">
                      <p className="premium-product-card__meta">
                        {post.date} · {post.category}
                      </p>
                      <h2 className="premium-title text-[clamp(1.05rem,0.95rem+0.45vw,1.25rem)]">{post.title}</h2>
                      <p className="premium-section__lede mt-1 max-w-none text-sm">{post.excerpt}</p>
                      <span className="premium-inline-link mt-auto">Read article</span>
                    </div>
                  </Link>
                </PremiumTiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
