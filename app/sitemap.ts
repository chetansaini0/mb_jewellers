import type { MetadataRoute } from "next";
import { buildCollectionSectionParams } from "@/app/lib/collectionPages";
import { blogPosts, premiumProductsBySlug } from "@/app/lib/premiumPages";
import { categoryShowcase } from "@/app/lib/siteData";
import { siteConfig } from "@/app/lib/siteConfig";

const baseUrl = siteConfig.url.replace(/\/$/, "");

// `/review` is intentionally excluded: it redirects to a third-party review tool and is not a page.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collections",
    "/bridal",
    "/wedding",
    "/rings",
    "/earrings",
    "/necklaces",
    "/bangles",
    "/daily-wear",
    "/new-arrivals",
    "/showrooms",
    "/about",
    "/heritage",
    "/gallery",
    "/services",
    "/faq",
    "/testimonials",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
    "/shipping-policy",
    "/cancellation-policy",
    "/cookie-policy",
    "/disclaimer",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.75,
  }));

  const collectionRoutes = categoryShowcase.map((collection) => ({
    url: `${baseUrl}${collection.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Real publish/update dates only. A build-time timestamp on every URL tells crawlers
    // nothing and erodes trust in lastmod, so other routes omit it.
    lastModified: "dateModified" in post ? post.dateModified : post.datePublished,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productRoutes = Object.keys(premiumProductsBySlug).map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const subsectionRoutes = buildCollectionSectionParams().map(({ collection, section }) => ({
    url: `${baseUrl}/collections/${collection}/${section}`,
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }));

  return [...staticRoutes, ...collectionRoutes, ...subsectionRoutes, ...productRoutes, ...blogRoutes];
}
