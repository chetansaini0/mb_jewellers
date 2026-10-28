import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JsonLd } from "@/app/components/seo/JsonLd";
import { blogPosts, premiumProductsBySlug } from "@/app/lib/premiumPages";
import { createPageMetadata, createProductSchema, jewelryStoreSchema } from "@/app/lib/seo";
import {
  clampDescription,
  isProductSchemaEligible,
  localSeoContent,
  pageSeo,
  productsPendingPhotoReview,
} from "@/app/lib/seoContent";
import { siteConfig } from "@/app/lib/siteConfig";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

type StoreNode = Record<string, unknown> & {
  "@id": string;
  address: { postalCode: string; streetAddress: string };
  geo: { latitude: number; longitude: number };
  telephone: string;
};

const storeNodes = (jewelryStoreSchema as unknown as { "@graph": StoreNode[] })["@graph"];

test("one JewelryStore node per showroom, built only from siteConfig data", () => {
  assert.equal(storeNodes.length, siteConfig.showrooms.length);
  assert.equal(new Set(storeNodes.map((node) => node["@id"])).size, storeNodes.length);

  siteConfig.showrooms.forEach((showroom, index) => {
    const node = storeNodes[index];
    assert.equal(node["@type"], "JewelryStore");
    assert.equal(node.address.postalCode, showroom.postalCode);
    assert.equal(node.telephone, showroom.landlines[0]?.e164);
    assert.equal(node.geo.latitude, showroom.coordinates.lat);
    assert.equal(node.geo.longitude, showroom.coordinates.lng);
    assert.equal(node.hasMap, showroom.googleMapsUrl);
  });
});

test("JewelryStore schema carries no unverified or self-serving fields", () => {
  for (const node of storeNodes) {
    for (const field of ["priceRange", "paymentAccepted", "aggregateRating", "review", "branchOf", "award"]) {
      assert.equal(field in node, false, `${node["@id"]} should not declare ${field}`);
    }
  }
});

test("product schema has no commercial claims and skips pieces with mismatched photos", () => {
  const schema = createProductSchema({
    name: "Test ring",
    description: "A ring.",
    image: "/x.jpg",
    urlPath: "/products/test-ring",
    material: "Gold",
  }) as Record<string, unknown>;
  for (const field of ["offers", "aggregateRating", "review", "isRelatedTo", "price"]) {
    assert.equal(field in schema, false, `product schema should not include ${field}`);
  }
  for (const slug of productsPendingPhotoReview) {
    assert.ok(premiumProductsBySlug[slug], `${slug} should still exist as a page`);
    assert.equal(isProductSchemaEligible(slug), false);
  }
  assert.equal(isProductSchemaEligible("emerald-diamond-set"), true);
});

test("JSON-LD renders as a server-side script and escapes closing tags", () => {
  const html = renderToStaticMarkup(createElement(JsonLd, { id: "x", data: { name: "</script><b>" } }));
  assert.match(html, /^<script id="x" type="application\/ld\+json">/);
  assert.equal(html.includes("</script><b>"), false);
  assert.deepEqual(JSON.parse(html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "")), {
    name: "</script><b>",
  });
});

test("sitemap lists only real, unique pages with honest lastmod values", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length, "duplicate sitemap URLs");
  assert.equal(
    urls.some((url) => url.endsWith("/review")),
    false,
    "/review is a redirect and must not be in the sitemap",
  );
  const host = new URL(siteConfig.url).host;
  for (const entry of entries) {
    assert.equal(new URL(entry.url).host, host);
    if (entry.url.includes("/blog/")) {
      assert.match(String(entry.lastModified), /^\d{4}-\d{2}-\d{2}$/);
    } else {
      assert.equal(entry.lastModified, undefined, `${entry.url} should not claim a build-time lastmod`);
    }
  }
  assert.ok(urls.some((url) => url.endsWith("/blog/traditional-rajasthani-jewellery-guide")));
});

test("robots keeps content crawlable and points at the sitemap", () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const all = rules.find((rule) => rule.userAgent === "*");
  assert.ok(all);
  assert.equal(all.allow, "/");
  const disallow = ([] as string[]).concat(all.disallow ?? []);
  for (const path of ["/", "/collections", "/blog", "/products", "/showrooms"]) {
    assert.equal(disallow.includes(path), false, `${path} must not be disallowed`);
  }
  assert.equal(config.sitemap, `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`);
});

test("noindex is opt-in only", () => {
  assert.equal(createPageMetadata({ title: "t", description: "d", path: "/x" }).robots, undefined);
  assert.deepEqual(createPageMetadata({ title: "t", description: "d", path: "/x", noIndex: true }).robots, {
    index: false,
    follow: true,
  });
});

test("meta descriptions fit search snippets", () => {
  for (const [key, page] of Object.entries(pageSeo)) {
    assert.ok(page.description.length <= 160, `${key} description is ${page.description.length} chars`);
    assert.ok(page.description.length >= 70, `${key} description is too thin`);
  }
  const long = "word ".repeat(80);
  const clamped = clampDescription(long);
  assert.ok(clamped.length <= 155);
  assert.ok(clamped.endsWith("…"));
  assert.equal(clampDescription("Short and complete."), "Short and complete.");
  for (const post of blogPosts) {
    assert.ok(clampDescription(post.excerpt, 160).length <= 160, `${post.slug} meta description too long`);
  }
});

test("local copy reads naturally instead of repeating search phrases", () => {
  const text = [localSeoContent.lead, ...localSeoContent.paragraphs].join(" ").toLowerCase();
  assert.equal(text.includes("if you searched"), false);
  assert.equal(text.includes("near me"), false);
  const repeats = text.split("best jewellery shop in sikar").length - 1;
  assert.ok(repeats <= 1, "local copy repeats the head term");
});

test("guides use real headings and link to existing pages", () => {
  const knownPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/"));
  for (const post of blogPosts) {
    for (const link of post.relatedLinks) {
      const path = link.href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
      assert.ok(knownPaths.has(path), `${post.slug} links to unknown page ${link.href}`);
    }
  }

  const guides = ["how-to-check-gold-purity-hallmark", "traditional-rajasthani-jewellery-guide"];
  for (const slug of guides) {
    const post = blogPosts.find((entry) => entry.slug === slug);
    assert.ok(post && "sections" in post, `${slug} should have H2 sections`);
    assert.ok(post.sections.length >= 2);
    for (const section of post.sections) {
      assert.ok(section.heading.length > 8);
      assert.ok(section.paragraphs.length >= 1);
    }
  }

  const hallmark = blogPosts.find((entry) => entry.slug === "how-to-check-gold-purity-hallmark");
  const hallmarkText = JSON.stringify(hallmark);
  assert.match(hallmarkText, /HUID/);
  assert.match(hallmarkText, /BIS CARE/);
  assert.equal(/follows hallmarked gold standards/i.test(hallmarkText), false, "unverified claim must stay removed");
});
