import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PremiumBlogArticlePage } from "@/app/components/premium/pages/PremiumBlogArticlePage";
import { blogPosts } from "@/app/lib/premiumPages";
import { createCanonicalUrl, createPageMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) return {};

  return createPageMetadata({
    title: `${post.title} | MB Jewellers Journal`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

function stringifyJsonLd(schema: object) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const canonical = createCanonicalUrl(`/blog/${slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    url: canonical,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: createCanonicalUrl("/mb-jewellers-logo.png"),
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(articleSchema) }} />
      <PremiumBlogArticlePage slug={slug} />
    </>
  );
}
