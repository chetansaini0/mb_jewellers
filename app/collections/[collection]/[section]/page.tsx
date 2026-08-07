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
  const metalLabel = parent.eyebrow;
  return createPageMetadata({
    title: `${subsection.title} ${metalLabel} Jewellery in Sikar | MB Jewellers`,
    description: `${subsection.description} Explore ${subsection.title.toLowerCase()} from MB Jewellers in Sikar — view online, then visit our showrooms.`,
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
  const relatedPieces = featuredPieces.filter((piece) => piece.material?.toLowerCase() === collectionSlug);
  const galleryImages = Array.from(new Set([cover, ...relatedPieces.map((piece) => piece.image)])).slice(0, 4);
  while (galleryImages.length < 4) {
    galleryImages.push(cover);
  }
  const galleryAlts = galleryImages.map((src, index) => {
    const match = relatedPieces.find((piece) => piece.image === src);
    if (match) return match.alt;
    if (index === 0) return subsection.coverAlt;
    return `${subsection.title} ${parent.eyebrow.toLowerCase()} jewellery from MB Jewellers in Sikar`;
  });
  const relatedProduct = relatedPieces[0] ?? featuredPieces[0];

  return (
    <PremiumSectionPage
      backHref={`/collections/${collectionSlug}`}
      backLabel={`Back to ${backLabel}`}
      eyebrow={parent.eyebrow}
      title={subsection.title}
      description={subsection.description}
      galleryImages={galleryImages}
      galleryAlts={galleryAlts}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Collections", path: "/collections" },
        { name: parent.title, path: `/collections/${collectionSlug}` },
        { name: subsection.title, path: `/collections/${collectionSlug}/${sectionParam}` },
      ]}
      productHref={`/products/${slugifyProductName(relatedProduct.name)}`}
    />
  );
}
