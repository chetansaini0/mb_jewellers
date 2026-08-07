# MB Jewellers SEO Audit & Implementation Report

**Date:** 7 August 2026  
**Site:** https://mbjewellers.in (also www)  
**Business:** M.B. JEWELLERS (SIKAR) PVT. LTD. — Sikar, Rajasthan

This report summarises problems found, changes implemented, and what still requires human/business action. Rankings are never guaranteed; this work improves technical quality, local relevance, and crawlability.

---

## 1. Problems found (pre-implementation)

| Area | Issue |
|------|--------|
| Titles | Root template `%s \| MB Jewellers` doubled titles that already included the brand |
| Local keywords | Weak Sikar modifiers on collection/bridal titles; **Shekhawati absent** |
| Homepage | Hero subtitle not location-led; no dedicated local SEO section |
| Schema | Display phones in JSON-LD (not E.164); streetAddress duplicated city/state; no Organization; no BreadcrumbList; BlogPosting missing `datePublished` |
| NAP | No postal PIN in code (not invented); Maps links are query-based, not verified GBP Place URLs |
| Images | Empty `alt=""` on collection section galleries |
| Internal links | Footer lacked gold/diamond/silver deep links; no breadcrumbs |
| Content | Thin blog bodies; few local informational guides |
| FAQ | Missing location, hours, regional service questions |
| Docs drift | Some docs still mentioned outdated addresses — code uses Ghantaghar + Ramlila |

---

## 2. Changes made

### Technical SEO
- Absolute page titles via `createPageMetadata` (no doubled brand)
- Canonical URLs retained on all key pages
- Organization + improved JewelryStore JSON-LD (E.164 phones, `areaServed`, `hasMap`)
- Breadcrumb UI + `BreadcrumbList` schema on collections, sections, blog articles
- FAQ expanded with factual local Q&A + `FAQPage` schema
- Blog posts expanded with body copy, ISO `datePublished`, related internal links
- Sitemap already covered marketing/collection/product/blog routes; robots still blocks `/admin`, `/api`, `/unsubscribe`

### Local SEO
- Central copy in `app/lib/seoContent.ts` and NAP/service area in `app/lib/siteConfig.ts`
- Homepage local section: Sikar + Shekhawati relevance, NAP, Google Maps CTA
- Hero kicker/subtitle updated for Sikar / Shekhawati without keyword stuffing
- Footer: category links, Maps CTA, consistent hours
- Map section: clearer local lede + “Find on Google Maps”

### On-page SEO
- Unique titles/descriptions for home, collections, gold/silver/diamond/accessories, bridal, about, heritage, gallery, services, FAQ, testimonials, blog, contact, products, subsections
- Collection H1s renamed to “Gold/Silver/Diamond Jewellery in Sikar”
- Gallery image alts filled with descriptive fallbacks

### Content
- New journal guides: choosing gold in Sikar; bridal buying for Shekhawati weddings
- Existing posts given fuller bodies and internal links

---

## 3. Technical SEO improvements

- Metadata helper: `app/lib/seo.ts`
- Central page SEO: `app/lib/seoContent.ts`
- Site NAP / service area: `app/lib/siteConfig.ts`
- robots: `app/robots.ts` (unchanged policy; still valid)
- sitemap: `app/sitemap.ts` (includes new blog slugs automatically)

---

## 4. Local SEO improvements

- Consistent business name, two Sikar showroom addresses, phones, email, Mon–Sat hours
- Service-area towns listed truthfully as places customers visit from (not fake branch pages)
- Google Maps directions CTAs on homepage local section, map section, and footer
- **TODO:** Confirm official PIN codes and official Google Business Profile Place URLs with the business owner

---

## 5. Keyword strategy

See **SEO_KEYWORDS.md**. Primary focus: jewellery shop / jeweller / showroom intents in **Sikar** and **Shekhawati**, plus gold/diamond/silver/bridal modifiers. Brand queries: MB Jewellers Sikar / Rajasthan.

---

## 6. Content strategy

| Priority | Topic | Status |
|----------|--------|--------|
| High | Local homepage section | Done |
| High | FAQ location/hours | Done |
| High | Gold buying guide (Sikar) | Done |
| High | Bridal guide (Shekhawati) | Done |
| Next | Jewellery care guide | Planned |
| Next | 22K vs 18K explainer (factual) | Planned |
| Next | More real showroom photography | Planned |

Do **not** create dozens of near-duplicate town landing pages.

---

## 7. Google Search Console setup

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property:
   - Prefer **Domain** property for `mbjewellers.in` (DNS TXT verification), **or**
   - URL-prefix `https://mbjewellers.in` and `https://www.mbjewellers.in`
3. Verify ownership (DNS / HTML tag / Google Analytics — use one method)
4. Submit sitemap: `https://mbjewellers.in/sitemap.xml`
5. Use **URL Inspection** to request indexing for the homepage and key collection/bridal/contact URLs
6. Monitor **Coverage/Pages**, **Performance** (queries/CTR), and **Core Web Vitals**

Indexing and rankings are not guaranteed and can take days to weeks.

---

## 8. Google Business Profile recommendations

Optimize the **real** GBP listing (do not create fake reviews):

- Exact business name matching the storefront / legal trading name
- Primary category: Jeweler (plus relevant secondary categories)
- Both showroom addresses if GBP supports multiple locations — otherwise create/verify each location correctly
- Phone numbers matching the website
- Website: `https://mbjewellers.in`
- Hours: Mon–Sat 10:00–19:00; mark Sunday accurately
- High-quality store and product photos
- Regular posts about collections / bridal season
- Respond to genuine customer reviews

Website CTA copy: **Find MB Jewellers on Google Maps** (uses current directions URLs until Place IDs are confirmed).

---

## 9. Remaining TODOs

- [x] Confirm and add **postal PIN / postalCode** for both showrooms (`332001` from public listings + domain registrant)
- [x] Add **Google Maps Place URL** for Ghantaghar (`place_id=ChIJ7Rdec8ekbDkRIdR8r8qMf_U`)
- [ ] Confirm **Ramlila Maidan Place ID** in Google Business Profile and replace search URL
- [x] Set WhatsApp via `NEXT_PUBLIC_WHATSAPP_E164` (`919829231637` from public listings)
- [ ] Complete **Google Search Console** domain verification (GoDaddy OAuth or DNS TXT) under `chetansaini0702@gmail.com`
- [ ] Submit sitemap `https://mbjewellers.in/sitemap.xml` after verification
- [ ] Request indexing for `/`, `/collections/gold`, `/bridal`, `/contact`
- [ ] Replace Unsplash stock images on collection sections with real MB photography
- [ ] Align any outdated “Chandpol / Jaipur studio” mentions in older docs/legal copy with the two Sikar showrooms
- [ ] Claim/verify Google Business Profile hours against website Mon–Sat 10:00–19:00
---

## 10. Recommended next steps

1. Complete GSC + GBP verification and NAP alignment  
2. Collect genuine reviews on Google (never buy/fake reviews)  
3. Publish 1–2 helpful journal posts per month  
4. Improve LCP with more local hero imagery and fewer remote Unsplash dependencies  
5. Build citations only on real directories (justdial, IndiaMART, etc.) with identical NAP  
6. Monitor Search Console queries and refine titles/descriptions based on real impressions  

---

## Key files touched

- `app/lib/seo.ts`, `app/lib/siteConfig.ts`, `app/lib/seoContent.ts`, `app/lib/premiumPages.ts`, `app/lib/premiumContent.ts`, `app/lib/collectionPages.ts`
- `app/layout.tsx`, `app/page.tsx`, collection/bridal/about/contact/faq/blog/product pages
- `app/components/premium/PremiumLocalSeoSection.tsx`, `PremiumBreadcrumbs.tsx`, homepage/footer/map/section/category/blog components
- `app/globals.css` (breadcrumb styles)
- `SEO_AUDIT.md`, `SEO_KEYWORDS.md`
