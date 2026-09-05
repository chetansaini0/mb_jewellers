import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PremiumProductPage } from "@/app/components/premium/pages/PremiumProductPage";
import { premiumProductsBySlug } from "@/app/lib/premiumPages";
import { createPageMetadata, createProductSchema } from "@/app/lib/seo";

export function generateStaticParams() {
  return Object.keys(premiumProductsBySlug).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = premiumProductsBySlug[slug];
  if (!product) return {};

  return createPageMetadata({
    title: `${product.name} | MB Jewellers, Sikar`,
    description: `${product.detail} Available for private viewing at MB Jewellers jewellery showrooms in Sikar.`,
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

  const productSchema = createProductSchema({
    name: product.name,
    description: product.detail,
    image: product.image,
    urlPath: `/products/${slug}`,
    material: product.material,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productSchema) }} />
      <PremiumProductPage product={product} />
    </>
  );
}
