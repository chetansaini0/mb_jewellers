# GBP, Search Console and tracking: actions that need Chetan's access

**Companion to `docs/LOCAL-SEO-PLAN.md`.** None of these steps were done by the agent:

- No Google Business Profile (GBP), Search Console (GSC), GA4, Bing or Vercel changes were made.
- No env vars were touched.

The step-by-step claim and verify flow is in `GBP-CHECKLIST.md`; this file covers what is new or corrected.

---

## 1. GBP fixes, both listings (priority order)

Do these in business.google.com, one listing at a time. Edits can trigger re-verification, so change one field, wait for "Approved", then do the next.

| # | Field | What to do | Why |
|---|---|---|---|
| 1 | **Business name** | Make it exactly the signage / legal name. Use "MB Jewellers", or "M.B. Jewellers (Sikar) Pvt. Ltd." if that is on the board.<br><br>**Remove** "Sikar Best jewellery Shop GOLD, DIAMOND, SILVER" and any area or keyword text. | Keyword stuffing breaks Google's name guidelines and is a common suspension trigger. |
| 2 | **Primary phone** | Pick one number per showroom and use the same one on the site:<br>- Ghantaghar: 01572 491103<br>- Ramlila Maidan: 01572 409431<br><br>Add the mobile as a secondary number if wanted. | The listings appear to show 098292 31637, but the site shows the landlines. |
| 3 | **Hours** | Confirm the real hours. The site says Mon–Sat 10:00–19:00 and closed Sunday, but Ramlila's listing appears to show 10–8 and Sunday 10–6.<br><br>Fix whichever is wrong, and tell me if the site needs to change. Add special hours before Diwali, Akshaya Tritiya and wedding season. | Wrong hours are the fastest way to lose trust (and get "closed" reviews). |
| 4 | **Address line** | Use the same words on both. The Ghantaghar listing says "Old Dujod Gate"; the site says "Purana Dujod Gate". | NAP consistency. |
| 5 | **Primary category** | "Jewelry store".<br><br>Optional secondary categories, only if true: "Gold dealer", "Silver jewelry store", "Diamond dealer". | The category is the strongest relevance signal in the map pack. |
| 6 | **Website link** | Ghantaghar: `https://www.mbjewellers.in/showrooms?utm_source=google&utm_medium=organic&utm_campaign=gbp_ghantaghar#ghantaghar`<br><br>Ramlila: `https://www.mbjewellers.in/showrooms?utm_source=google&utm_medium=organic&utm_campaign=gbp_ramlila#ramlila` | Uses **www**, which is canonical (`GBP-CHECKLIST.md` links were updated to www too). Per-listing campaigns separate the two showrooms in GA4. |
| 7 | **Appointment link** | `https://www.mbjewellers.in/contact?mode=APPOINTMENT&utm_source=google&utm_medium=organic&utm_campaign=gbp_appointment` | |
| 8 | **Opening date** | Set only after the founding year is settled (1998 vs 1950). | |
| 9 | **Description** | Use the paste-ready text in `GBP-CHECKLIST.md`. "Gold is hallmarked and diamonds are certified" was removed from it until verified. | |
| 10 | **Photos** | Add real storefront photos (helps people find the door), interior photos and team photos. Add product photos only of pieces actually in stock. | |
| 11 | **Duplicates** | Search Maps for "MB Jewellers Sikar" and request removal or merge of any duplicate or unclaimed listings. | |

**Q&A:** Google retired the GBP Q&A feature in Nov 2025; no new questions can be created. Skip the old checklist item.

---

## 2. Search Console (GSC)

1. **Add the property.** A domain property (`mbjewellers.in`, DNS TXT) is best because it covers apex and www together. Alternatively, a URL-prefix property for `https://www.mbjewellers.in/`, using the `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var (the code already supports it) and a redeploy.
2. **After `feat/local-seo` is deployed, submit** `https://www.mbjewellers.in/sitemap.xml`. It should list 79 URLs, without `/review`.
3. **URL Inspection → Request indexing** for:
   - `/`
   - `/showrooms`
   - `/blog/how-to-check-gold-purity-hallmark`
   - `/blog/traditional-rajasthani-jewellery-guide`
4. **Rich results.** Run `/` and one product URL through https://search.google.com/test/rich-results. The JewelryStore graph should now appear in the raw HTML. FAQ rich results are limited to government and health sites, so FAQPage markup will not show stars or dropdowns; it is harmless.
5. **Pages report.** Expect the apex-host URLs to show as "Alternate page with proper canonical" until the Vercel redirect exists. That is fine.
6. **Bing Webmaster Tools.** Import from GSC (one click), or set `NEXT_PUBLIC_BING_SITE_VERIFICATION`. Then submit the same sitemap.

### Vercel (domain)

In Project → Settings → Domains:

- Set `www.mbjewellers.in` as primary.
- Set `mbjewellers.in` to **Redirect to www.mbjewellers.in (308)**.

This ends the duplicate-host issue (both hosts return 200 today).

---

## 3. Reviews: an honest request process (no incentives, no gating)

### Decision needed: `/review` → ReviewFlow AI

`/review` currently redirects to a third-party "AI-Assisted Google Reviews" page. **Before using it, check three things:**

- **(a)** Does it ask "were you happy?" first and send only happy customers to Google? That is review gating, which Google prohibits.
- **(b)** Does it generate or pre-write review text? A review must be the customer's own words.
- **(c)** Is anything offered in return? Google prohibits incentives of any kind for reviews.

If any of these is yes, point `/review` at the plain Google review link instead. That is a `REVIEWFLOW_LANDING_URL` env change, or a small code change I can make on request.

### The process

1. **Who to ask.** Every customer who completes a purchase or consultation. Ask everyone, not just the happy ones.
2. **When to ask.** The same day, at billing or on delivery. Staff hand over a card with a QR code for that showroom's review link, or send it on WhatsApp.
3. **Links.** Get each showroom's short review link from GBP → "Ask for reviews". The fallback format is:
   - Ghantaghar: `https://search.google.com/local/writereview?placeid=ChIJ7Rdec8ekbDkRIdR8r8qMf_U`
   - Ramlila Maidan: `https://search.google.com/local/writereview?placeid=ChIJY-lKJm2lbDkRA6ZmhGYDD7I`

   **Send each customer the link for the showroom they actually visited.**
4. **Message.** Use the corrected template in `GBP-CHECKLIST.md`. It says "honest review", with no "if you were happy", no gifts or discounts, and no draft text.
5. **Pace.** Aim for a steady few per week per showroom, not a burst. Sudden spikes get filtered.
6. **Replies.** Reply to every review within 48 hours, negative ones included:
   - Be factual and polite.
   - Never share customer details.
   - Offer to continue offline.
7. **Ghantaghar's ~4.0 average** (≈418 reviews, unverified) needs the most attention:
   - Read the recent negatives for recurring themes (wait times, pricing clarity, staff) and fix those first.
   - Do not ask anyone to edit or delete their review.

---

## 4. Legitimate citations (keep NAP identical to `docs/LOCAL-SEO-PLAN.md` §2)

Fix the GBP NAP first, then these, in order:

1. **Bing Places for Business.** Can import from GBP.
2. **Apple Business Connect.** Covers Apple Maps and Siri. Add both showrooms.
3. **Mappls (MapmyIndia).** Widely used in Indian navigation apps.
4. **Justdial.** Claim the existing listings and correct the name, phone and hours. Decline paid upsells unless Chetan approves the cost.
5. **Sulekha.** Claim or correct the listing if one exists.
6. **Facebook page and Instagram bio.** Same name, both addresses, the website link, and the same hours.
7. **Foursquare / Swarm.** Feeds several other apps; claim it if the listing exists.
8. **BIS registration.** If MB Jewellers is a BIS-registered jeweller, that registration appears when customers verify a HUID. Keep the legal name on it consistent; it is a strong trust signal. **Do not claim it on the site unless the registration exists.**
9. **Local press or associations.** Examples: a Sikar sarafa (jewellers') association listing, or Rajasthan Patrika or Dainik Bhaskar local coverage. Use these only if there is a genuine story or membership.

**Avoid:**
- paid "submit to 100 directories" services;
- link farms;
- listings that cannot be edited later.

---

## 5. Tracking checklist (GA4 events)

The code already sends these events (`app/lib/analytics.ts`, `ConversionTracker.tsx`, contact form):

| Event | Fires when |
|---|---|
| `phone_click` | Any `tel:` link is clicked |
| `whatsapp_click` | A `wa.me` / WhatsApp link is clicked |
| `directions_click` | A Google Maps / directions link is clicked (including "Google Business Profile" links) |
| `product_enquiry` | An enquiry link with `interest=` is clicked |
| `appointment_submit` / `contact_form_submit` | A successful form submission on `/contact` |

### Problem

**GA4 is not configured in production.** The live bundle reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` as undefined, so none of these events reach GA4 today.

### Steps

1. Create or confirm the GA4 property and web data stream for `https://www.mbjewellers.in`.
2. In Vercel, set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…` for Production, then redeploy. This is an env change that needs Chetan; I did not touch it.
3. In GA4 → Admin → Events, mark these as **key events**:
   - `phone_click`
   - `whatsapp_click`
   - `directions_click`
   - `appointment_submit`
   - `contact_form_submit`
   - `product_enquiry`
4. **Verify with GA4 DebugView.** Accept cookies on the site, tap a phone link, and confirm `phone_click` arrives.
5. **Expect undercounting.** GA4 loads only after cookie consent is accepted, by design. Treat GA4 as a trend line. Cross-check with:
   - GBP Performance (calls, direction requests, website clicks per listing);
   - showroom footfall and sales records.
6. **Link GSC to GA4** (Admin → Search Console links) so queries sit next to conversions.

---

## 6. Measurement baseline (28 Oct 2026) and monthly tracking

### Baseline

| Metric | Baseline | Source |
|---|---|---|
| Indexable sitemap URLs | 79 (all 200) | Crawl |
| Lighthouse mobile, home | Perf 59 · LCP 3.9 s · CLS 0.575 | Lighthouse 12, live |
| Lighthouse mobile, `/showrooms` | Perf 67 · LCP 3.4 s · CLS 0.584 | Lighthouse 12, live |
| Lighthouse mobile, `/collections/gold` | Perf 94 · LCP 2.9 s · CLS 0 | Lighthouse 12, live |
| GBP Ramlila Maidan | ~4.6–4.7★ · ~262 reviews | Aggregator, unverified; **re-read in GBP** |
| GBP Ghantaghar | ~4.0★ · ~418 reviews | Aggregator, unverified; **re-read in GBP** |
| Organic SERP spot checks | mbjewellers.in visible for "best jewellery shop in Sikar", "gold jewellery shop in Sikar", "bridal jewellery Sikar" | Web search, not location-pinned |
| GSC clicks / impressions | Unknown, needs access | Record the first 28 days after verification |
| GA4 key events | None recorded (GA4 not configured) | Record from go-live |

### Monthly checks (first Monday)

- [ ] GSC: clicks, impressions, CTR and average position for these query groups:
  - "jewellery shop in sikar"
  - "gold … sikar"
  - "bridal … sikar"
  - "rajputi"
  - "hallmark / huid"
  - brand
- [ ] GSC Pages report: no new "Excluded" content pages; the sitemap was read recently.
- [ ] GBP Performance per listing: calls, direction requests, website clicks, and search terms.
- [ ] Reviews: new reviews this month per listing, average rating, and the share replied to within 48 hours.
- [ ] GA4 key events by source/medium, separating `gbp_ghantaghar` and `gbp_ramlila`.
- [ ] Map-pack spot check. Use an incognito window from a Sikar location, or ask staff to check on their phones. Record the position for "jewellery shop in Sikar" and "gold jewellery shop Sikar" without treating it as a guarantee.
- [ ] Lighthouse mobile on `/` and `/showrooms` after each deploy.
- [ ] NAP spot check on GBP, Justdial, Bing, Apple and Facebook.
