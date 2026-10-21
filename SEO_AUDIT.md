# MB Jewellers SEO Audit & Implementation Report

**Date:** 19 September 2026  
**Site:** https://mbjewellers.in  
**Business:** M.B. JEWELLERS (SIKAR) PVT. LTD. — Sikar, Rajasthan  

Rankings are never guaranteed. This work improves technical quality, local relevance and crawlability. Existing URLs were not changed.

---

## 1. Audit findings (before this pass)

| Area | Finding |
|------|---------|
| Stack | Next.js 16 App Router, metadata via `createPageMetadata`, sitemap + robots already present |
| NAP | Verified in `app/lib/siteConfig.ts` — two Sikar showrooms, hours Mon–Sat 10:00–19:00, email, WhatsApp |
| Gaps | No dedicated pages for wedding, rings, earrings, necklaces, bangles, daily-wear, new arrivals, or a location-first showroom URL |
| Metadata | Homepage title did not target “Best jewellers in Sikar”; several H1s were poetic rather than descriptive |
| Products | No PDP breadcrumbs; product titles were thin |
| Tracking | GA4 loaded after consent, but phone / WhatsApp / maps / form conversions were not events |
| Images | JPG/PNG sources; production Next Image can serve AVIF/WebP (formats now explicit) |
| Schema | JewelryStore + Organization + WebSite + FAQ + Product (no Offers — correct). Organization/`@id` links were incomplete |
| Unverified | Ramlila Place ID; parking; GSC/Bing/GA IDs; www vs non-www canonical host |
| Parking | Not in the project — shown as a labelled unverified note on `/showrooms` |

---

## 2. Technical changes completed

- Unique titles/descriptions for all major marketing pages (`app/lib/seoContent.ts`)
- New indexable hubs: `/wedding`, `/rings`, `/earrings`, `/necklaces`, `/bangles`, `/daily-wear`, `/new-arrivals`, `/showrooms`
- Homepage metadata aligned to the requested Sikar jeweller intent (title used as a search phrase, not a ranking claim in body copy)
- Descriptive H1s on collections, bridal, about, contact, services, FAQ, journal and collection subsections (`Gold Rings in Sikar`, etc.)
- Product breadcrumbs + unique product titles; still **no Offer/price/rating schema**
- Showroom page with verified NAP, maps, call, WhatsApp, directions, appointment CTA, landmarks, parking placeholder, FAQ + `FAQPage` JSON-LD
- Conversion tracker: `phone_click`, `whatsapp_click`, `directions_click`, `appointment_submit`, `contact_form_submit`, `product_enquiry`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` placeholder
- `images.formats`: AVIF + WebP
- Organization `@id` linked from JewelryStore + WebSite
- Sitemap includes the new canonical routes
- Footer: verified NAP plus new category/showroom links
- Six local journal drafts (care guide expanded in place)

---

## 3. Remaining information needed

- Ramlila Maidan **Google Place ID**
- **Parking / accessibility** facts if they should be stated as verified
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- Confirm canonical host: live currently resolves as `https://mbjewellers.in` (apex). `.env.example` still shows `www` — do not change production URL without your approval
- Confirm GBP hours for Sunday and any festival exceptions

Do not invent awards, prices, reviews or extra locations.
