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
import { clampDescription } from "@/app/lib/seoContent";
import { featuredPieces } from "@/app/lib/siteData";

/** "Gold Ranihaar in Sikar", "Silver Statues in Sikar", "Gold Rajputi Jewellery in Sikar". */
function sectionHeading(eyebrow: string, sectionTitle: string) {
  const metal = eyebrow === "Accessories" ? "Silver" : eyebrow;
  const noun = /^rajputi$/i.test(sectionTitle) ? `${sectionTitle} Jewellery` : sectionTitle;
  return `${metal} ${noun} in Sikar`;
}

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
  const heading = sectionHeading(parent.eyebrow, subsection.title);
  return createPageMetadata({
    title: `${heading} | MB Jewellers`,
    description: clampDescription(
      `${subsection.description} Shortlist ${heading.replace(/ in Sikar$/, "").toLowerCase()} online, then see them at our Sikar showrooms.`,
    ),
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
      title={sectionHeading(parent.eyebrow, subsection.title)}
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
