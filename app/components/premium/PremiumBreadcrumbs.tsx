import Link from "next/link";
import { createBreadcrumbSchema } from "@/app/lib/seo";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type Props = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

export function PremiumBreadcrumbs({ items, className = "" }: Props) {
  if (items.length < 2) return null;

  const schema = createBreadcrumbSchema(items);

  return (
    <nav aria-label="Breadcrumb" className={`premium-breadcrumbs site-max site-px ${className}`.trim()}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <ol className="premium-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="premium-breadcrumbs__item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
              {!isLast ? <span className="premium-breadcrumbs__sep" aria-hidden>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
