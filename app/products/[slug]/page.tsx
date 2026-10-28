import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PremiumProductPage } from "@/app/components/premium/pages/PremiumProductPage";
import { premiumProductsBySlug } from "@/app/lib/premiumPages";
import { createPageMetadata, createProductSchema } from "@/app/lib/seo";
import { clampDescription, isProductSchemaEligible } from "@/app/lib/seoContent";

export function generateStaticParams() {
  return Object.keys(premiumProductsBySlug).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = premiumProductsBySlug[slug];
  if (!product) return {};

  return createPageMetadata({
    title: `${product.name} – ${product.material ? `${product.material} Jewellery` : "Jewellery"} in Sikar | MB Jewellers`,
    description: clampDescription(
      `${product.detail} See it at MB Jewellers' Sikar showrooms; price and availability confirmed in person.`,
    ),
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

  const productSchema = isProductSchemaEligible(slug)
    ? createProductSchema({
        name: product.name,
        description: product.detail,
        image: product.image,
        urlPath: `/products/${slug}`,
        material: product.material,
      })
    : null;

  return (
    <>
      {productSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productSchema) }} />
      ) : null}
      <PremiumProductPage product={product} />
    </>
  );
}
