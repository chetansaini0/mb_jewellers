import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/app/lib/siteData";

type ProductGridProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: ProductItem[];
};

export function ProductCard({
  product,
  headingLevel = "h2",
}: {
  product: ProductItem;
  headingLevel?: "h2" | "h3";
}) {
  const Title = headingLevel === "h3" ? "h3" : "h2";
  return (
    <article className="group premium-card luxe-panel h-full p-3 transition duration-300 hover:-translate-y-1 sm:p-4">
      <div className="shine-on-hover relative mx-auto h-[210px] max-w-[300px] overflow-hidden bg-[var(--color-rose-soft)] sm:h-[230px] lg:mx-0 lg:h-[240px] lg:max-w-none">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
        />
      </div>
      <Title className="mt-4 font-[family-name:var(--font-display)] text-xl sm:text-2xl">{product.name}</Title>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{product.detail}</p>
      {product.material ? (
        <span className="mt-3 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-rose-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-rose-dark)]">
          {product.material}
        </span>
      ) : null}
      <Link
        href="/contact"
        className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-rose-dark)] transition hover:text-[var(--color-ink)]"
      >
        Request details &rarr;
      </Link>
    </article>
  );
}

export function ProductGrid({ eyebrow, title, description, products }: ProductGridProps) {
  return (
    <section className="luxe-section site-max site-px py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-rose)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium sm:text-5xl">
          {title}
        </h1>
        <div className="luxe-divider mt-5" />
        <p className="mt-5 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
          {description}
        </p>
      </div>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {products.map((product) => (
          <li key={product.name}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
