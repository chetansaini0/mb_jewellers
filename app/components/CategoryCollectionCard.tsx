import Image from "next/image";
import Link from "next/link";
import type { CategoryShowcaseItem } from "@/app/lib/siteData";

type Props = {
  item: CategoryShowcaseItem;
  ctaLabel?: string;
};

export function CategoryCollectionCard({ item, ctaLabel = "Explore →" }: Props) {
  return (
    <Link
      href={item.href}
      className="group premium-card relative flex min-h-[220px] overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-ink)] shadow-[0_12px_36px_rgba(33,18,18,0.12)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-rose)] hover:shadow-[0_18px_44px_rgba(33,18,18,0.18)] sm:min-h-[240px] lg:min-h-[260px]"
    >
      <Image
        src={item.coverImage}
        alt={item.coverAlt}
        fill
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-[var(--color-ink)]/15"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[220px] flex-1 flex-col justify-end p-5 sm:min-h-[240px] sm:p-6 lg:min-h-[260px]">
        <span className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-3xl">
          {item.title}
        </span>
        <span className="mt-2 max-w-prose text-sm leading-relaxed text-[color-mix(in_srgb,var(--color-cream)_92%,transparent)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
          {item.description}
        </span>
        <span className="mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)] transition group-hover:text-[var(--color-cream)]">
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}
