import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PremiumSectionPage } from "@/app/components/premium/pages/PremiumSectionPage";
import { slugifyProductName } from "@/app/lib/premiumPages";
import {
  buildCollectionSectionParams,
  collectionPagesBySlug,
  getCollectionSlug,
  resolveCollectionSection,
  SECTION_COVER_PLACEHOLDER,
} from "@/app/lib/collectionPages";
import { createPageMetadata } from "@/app/lib/seo";
import { featuredPieces } from "@/app/lib/siteData";

export function generateStaticParams() {
  return buildCollectionSectionParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection: collectionParam, section: sectionParam } = await params;
  const collectionSlug = getCollectionSlug(collectionParam);
  if (!collectionSlug) return {};

  const subsection = resolveCollectionSection(collectionSlug, sectionParam);
  if (!subsection) return {};

  const parent = collectionPagesBySlug[collectionSlug];
  return createPageMetadata({
    title: `${subsection.title} | ${parent.title} | MB Jewellers`,
    description: subsection.description,
    path: `/collections/${collectionSlug}/${sectionParam}`,
    image: subsection.coverImage ?? SECTION_COVER_PLACEHOLDER,
  });
}

type PageProps = {
  params: Promise<{ collection: string; section: string }>;
};

export default async function CollectionSubsectionPage({ params }: PageProps) {
  const { collection: collectionParam, section: sectionParam } = await params;
  const collectionSlug = getCollectionSlug(collectionParam);
  if (!collectionSlug) notFound();

  const subsection = resolveCollectionSection(collectionSlug, sectionParam);
  if (!subsection) notFound();

  const parent = collectionPagesBySlug[collectionSlug];
  const backLabel = parent.title.replace(/\s+Collection\s*$/i, "").trim() || parent.eyebrow;
  const cover = subsection.coverImage ?? SECTION_COVER_PLACEHOLDER;
  const galleryImages = [cover, cover, cover, cover];
  const relatedProduct =
    featuredPieces.find((piece) => piece.material?.toLowerCase() === collectionSlug) ?? featuredPieces[0];

  return (
    <PremiumSectionPage
      backHref={`/collections/${collectionSlug}`}
      backLabel={`Back to ${backLabel}`}
      eyebrow={parent.eyebrow}
      title={subsection.title}
      description={subsection.description}
      galleryImages={galleryImages}
      productHref={`/products/${slugifyProductName(relatedProduct.name)}`}
    />
  );
}
