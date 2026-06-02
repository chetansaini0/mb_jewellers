import { CategoryCollectionCard } from "@/app/components/CategoryCollectionCard";
import type { CategoryShowcaseItem } from "@/app/lib/siteData";
import {
  SECTION_COVER_PLACEHOLDER,
  type CollectionPageConfig,
  type CollectionSlug,
} from "@/app/lib/collectionPages";

type ProductCollectionSectionsProps = CollectionPageConfig & {
  collectionSlug: CollectionSlug;
};

function subsectionToCardItem(
  s: CollectionPageConfig["sections"][number],
  collectionSlug: CollectionSlug,
): CategoryShowcaseItem {
  return {
    title: s.title,
    description: s.description,
    href: `/collections/${collectionSlug}/${s.id}`,
    coverImage: s.coverImage ?? SECTION_COVER_PLACEHOLDER,
    coverAlt: s.coverAlt,
  };
}

export function ProductCollectionSections({
  eyebrow,
  title,
  description,
  sections,
  collectionSlug,
}: ProductCollectionSectionsProps) {
  return (
    <section className="luxe-section site-max site-px py-16 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-rose)]">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium sm:text-5xl">
        {title}
      </h1>
      <div className="luxe-divider mt-5" />
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
        {description}
      </p>

      <ul className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <li key={s.id}>
            <CategoryCollectionCard
              item={subsectionToCardItem(s, collectionSlug)}
              ctaLabel="Open section →"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
