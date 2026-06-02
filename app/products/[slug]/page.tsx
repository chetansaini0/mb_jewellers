import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PremiumProductPage } from "@/app/components/premium/pages/PremiumProductPage";
import { premiumProductsBySlug } from "@/app/lib/premiumPages";
import { createCanonicalUrl, createPageMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";

export function generateStaticParams() {
  return Object.keys(premiumProductsBySlug).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = premiumProductsBySlug[slug];
  if (!product) return {};

  return createPageMetadata({
    title: `${product.name} | MB Jewellers`,
    description: product.detail,
    path: `/products/${slug}`,
    image: product.image,
  });
}

function stringifyJsonLd(schema: object) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = premiumProductsBySlug[slug];
  if (!product) notFound();

  const canonical = createCanonicalUrl(`/products/${slug}`);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.detail,
    image: [product.image],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.material ?? "Jewellery",
    url: canonical,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productSchema) }} />
      <PremiumProductPage product={product} />
    </>
  );
}
