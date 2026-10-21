import assert from "node:assert/strict";
import { test } from "node:test";
import { blogPosts } from "@/app/lib/premiumPages";
import { createProductSchema } from "@/app/lib/seo";
import { pageSeo } from "@/app/lib/seoContent";
import { seoHubPages } from "@/app/lib/seoHubPages";
import sitemap from "@/app/sitemap";

test("homepage targets Sikar jeweller searches without invented rankings", () => {
  assert.match(pageSeo.home.title, /best jewellery shop in sikar/i);
  assert.match(pageSeo.home.title, /best jewellers in sikar/i);
  assert.match(pageSeo.home.description, /Ghantaghar/);
  assert.match(pageSeo.home.description, /Ramlila Maidan/);
  assert.equal(pageSeo.home.title.toLowerCase().includes("#1"), false);
  assert.equal(pageSeo.home.description.toLowerCase().includes("ranked"), false);
});

test("major page titles and descriptions are unique", () => {
  const titles = Object.values(pageSeo).map((page) => page.title);
  const descriptions = Object.values(pageSeo).map((page) => page.description);
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(new Set(descriptions).size, descriptions.length);
});

test("sitemap includes new local SEO landing pages", async () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);
  for (const path of [
    "/wedding",
    "/rings",
    "/earrings",
    "/necklaces",
    "/bangles",
    "/daily-wear",
    "/new-arrivals",
    "/showrooms",
  ]) {
    assert.ok(
      urls.some((url) => url.endsWith(path)),
      `sitemap missing ${path}`,
    );
  }
});

test("product schema does not invent offers, prices or ratings", () => {
  const schema = createProductSchema({
    name: "Heritage Filigree Chokar",
    description: "Heritage-inspired chokar featuring artisanal floral filigree work.",
    image: "/pics/new-arrivals/heritage-filigree-main.png",
    urlPath: "/products/heritage-filigree-chokar",
    material: "Gold",
  });
  assert.equal(schema["@type"], "Product");
  assert.equal("offers" in schema, false);
  assert.equal("aggregateRating" in schema, false);
  assert.equal("review" in schema, false);
});

test("requested local journal drafts are present", () => {
  const slugs: string[] = blogPosts.map((post) => post.slug);
  for (const slug of [
    "how-to-choose-bridal-jewellery-in-sikar",
    "latest-gold-jewellery-designs-for-weddings",
    "diamond-jewellery-buying-guide",
    "gold-diamond-or-silver-choosing-jewellery",
    "daily-wear-jewellery-trends-in-sikar",
    "jewellery-care-guide",
  ]) {
    assert.ok(slugs.includes(slug), `missing blog draft ${slug}`);
  }
});

test("SEO hub pages have unique H1s and visible FAQs", () => {
  const hubs = Object.values(seoHubPages);
  const h1s = hubs.map((page) => page.h1);
  assert.equal(new Set(h1s).size, h1s.length);
  for (const page of hubs) {
    assert.ok(page.paragraphs.length >= 2);
    assert.ok(page.faqs.length >= 1);
  }
});
