# MB Jewellers: local SEO plan for Sikar and Shekhawati (Module 14)

Branch `feat/local-seo` (from `feat/premium-enhancement` @ `722ebe4`). Audit date: 28 Oct 2026 (IST).

This plan builds on the existing docs and does not repeat them:

- `SEO_AUDIT.md`: the September pass (hub pages, titles, conversion events).
- `SEO_KEYWORDS.md`: the keyword-to-page table.
- `GBP-CHECKLIST.md`: claim, verify and complete the listings.
- `LOCAL-SEO-30-DAY.md`: posting and content cadence.

The work that needs Chetan's Google access is in `docs/GBP-AND-GSC-ACTIONS.md`.

> **No rankings are guaranteed.** Local pack position depends mostly on:
> - relevance and distance, which we cannot change;
> - prominence: reviews, citations and links, which take months.
>
> The website work below removes technical blockers and makes the site the clearest, most consistent source of facts about the two showrooms.

---

## 1. Audit findings (live site, 28 Oct 2026)

I crawled all 79 sitemap URLs on https://www.mbjewellers.in.

### Healthy

- Every URL returns 200 and is indexable (no stray `noindex`).
- Each page has exactly one H1.
- No titles or descriptions are duplicated.
- No `<img>` is missing alt text.
- Canonicals are self-referencing.
- The robots file allows everything except `/api/`, `/admin/` and `/unsubscribe`.

### Problems found

Severity runs from H (high) to L (low).

| # | Severity | Problem | Status on this branch |
|---|---|---|---|
| 1 | **H** | **The site-wide JewelryStore, Organization and WebSite JSON-LD, plus the home and FAQ page FAQPage, were not in the server HTML.**<br><br>They were rendered with `next/script`, which only injects them on the client. Google's renderer usually runs JS, but other crawlers and validators saw no LocalBusiness data. | **Fixed.** `JsonLd` server component; verified in the built HTML. |
| 2 | **H** | **`/review` was in the sitemap.** It 307-redirects to a third-party "AI-Assisted Google Reviews" tool (ReviewFlow AI). | **Fixed.** Removed from the sitemap and marked `noindex`.<br><br>**Policy risk, Chetan to decide:** see `GBP-AND-GSC-ACTIONS.md` §3. |
| 3 | **H** | **Apex and www both serve 200 with no redirect.** `https://mbjewellers.in` and `https://www.mbjewellers.in` both return 200, so two hosts are crawlable. The canonical tags point at www, which limits the damage. | **Needs Vercel access.** Add a 308 from apex to www in Vercel → Domains. Not coded, to avoid redirect loops. |
| 4 | M | **The JewelryStore schema contained unverified fields:** `priceRange "₹₹₹"` and `paymentAccepted "Cash, UPI, Card"`. It also had `branchOf` (deprecated) and a redundant `["JewelryStore","LocalBusiness"]` type. | **Fixed.** Removed. Add price range and payment methods back once confirmed. |
| 5 | M | **Product JSON-LD problems:**<br>- `isRelatedTo: JewelryStore` is invalid; schema.org expects a Product or Service there.<br>- Four products show a photo that is not the named piece. | **Fixed.**<br>- `isRelatedTo` removed.<br>- Product schema is suppressed for `luna-cluster-pendant`, `moonlight-silver-hoops`, `arctic-line-pendant` and `silver-dew-bracelet` until real photos exist.<br>- There are no offers, prices, ratings or reviews anywhere, and that is correct. |
| 6 | M | **Sitemap `lastmod` was the build time on every URL.** Google ignores `lastmod` values that are always "now". | **Fixed.** Only blog posts carry real publish or update dates; other URLs omit `lastmod`. |
| 7 | M | **Awkward subsection titles and H1s.** Examples: "Sets Diamond Jewellery in Sikar", "Accessories Statues in Sikar", "Gold Rajputi in Sikar". | **Fixed.** Now "Diamond Sets in Sikar", "Silver Statues in Sikar" and "Gold Rajputi Jewellery in Sikar". |
| 8 | M | **Product meta descriptions ran 169–216 characters,** and product titles were clunky. | **Fixed.** Descriptions are clamped to 155 or fewer. Titles now read "Name – Diamond Jewellery in Sikar \| MB Jewellers". |
| 9 | M | **Home meta description was 176 characters** and included "certified diamonds", which is unverified. | **Fixed.** 152 characters; still names Ghantaghar and Ramlila Maidan. |
| 10 | M | **Keyword-stuffed copy.**<br>- The home local section said: "If you searched for the best jewellery shop in Sikar or the best jewellers in Sikar…"<br>- The showrooms page said: "…jewellery store near me…" | **Fixed.** Rewritten as natural, factual copy. |
| 11 | M | **Blog articles had no H2s,** just walls of paragraphs. | **Fixed for the two guides.** The renderer now supports H2 sections. The other 13 posts are listed in §4. |
| 12 | L | **Home H1 read as "Best jewellersin Sikar".** The two spans had no space between them in the text. | **Fixed.** |
| 13 | L | **Gallery H1 "Studio gallery"** gave no local or topic signal. | **Fixed.** Now "Jewellery gallery — MB Jewellers, Sikar". |
| 14 | L | **Lighthouse `label-content-name-mismatch`:**<br>- The header brand link's `aria-label` did not match its visible text.<br>- The reel buttons were labelled "Unmute reel audio" but showed "Sound off". | **Fixed.** Accessibility score is 100 on the local build. |
| 15 | L | **`robots.txt` had a non-standard `Host:` line.** | **Removed.** |
| 16 | L | **Blog titles carried a " \| MB Jewellers Journal" suffix,** pushing several titles past 65 characters. | **Fixed.** Suffix is now " \| MB Jewellers", dropped when the full title would exceed 62 characters. |
| 17 | L | **Schema `addressCountry` was "India".** | **Fixed.** Now ISO "IN". |
| 18 | **H** | **GA4 is not configured in production.** The live JS bundle reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` as undefined, so `phone_click`, `whatsapp_click` and the other conversion events go nowhere. No Google or Bing verification meta tag is present either; GSC may be verified by DNS instead. | **Needs env and access** (not touched). See `GBP-AND-GSC-ACTIONS.md` §5. |

### Core Web Vitals baseline

- The PageSpeed Insights API quota was exhausted, so I ran Lighthouse 12 locally.
- Settings: mobile emulation, simulated throttling.
- "Live" means the production site, before the premium branch.
- "Branch" means the `next start` local build. It has no CDN, so its LCP is not comparable to live.

| Page | Live perf | Live LCP | Live CLS | Live TBT | Branch perf | Branch CLS | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|
| `/` | 59 | 3.9 s (hero video poster) | **0.575** | 100 ms | 72 | **0** | 100 / 100 / 100 |
| `/collections/gold` | 94 | 2.9 s | 0 | — | — | — | 100 / 100 / 100 |
| `/showrooms` | 67 | 3.4 s | **0.584** | — | 87 | **0** | 100 / 100 / 100 |

- **CLS:** live shows a large CLS attributed to `footer.premium-footer`. It is gone on the branch after the premium-enhancement pass (no loader, no hydration reflow), and the improvement lands when that branch ships.
- **Home page weight:** about 8.4 MB, mostly the hero and reel videos, with a 6.4 s Speed Index.
  - Next step: serve a smaller poster or AVIF hero.
  - Lazy-load the reels and use `preload="none"` until they are in view.
  - This is not done here; it is a design-affecting change.

---

## 2. Verified business facts (source: `siteConfig` and the live Maps links)

| Field | Ghantaghar | Ramlila Maidan |
|---|---|---|
| Name on site | MB Jewellers (legal: M.B. JEWELLERS (SIKAR) PVT. LTD.) | same |
| Address | Purana Dujod Gate, Clock Tower Road, Ghantaghar, Sikar, Rajasthan 332001 | Ramlila Maidan, Mahamandir Road, Sikar, Rajasthan 332001 |
| Phone (site) | 01572 491103 | 01572 409431 · 01572 250061 |
| Coordinates | 27.6125, 75.1392 | 27.603889, 75.136667 |
| Place ID | `ChIJ7Rdec8ekbDkRIdR8r8qMf_U` | `ChIJY-lKJm2lbDkRA6ZmhGYDD7I` |
| Hours (site) | Mon–Sat 10:00–19:00; Sunday closed (by appointment) | same |

Shared: WhatsApp +91 98292 31637 · mbjeweller21@gmail.com

### ⚠ Inconsistencies for Chetan to resolve

The listing details below come from third-party aggregators that copy Google's data. **Confirm each one inside GBP.**

1. **Founding year.** The header says "Since 1998", the About timeline starts in 1950, and the trust stats say "30+ years". Pick one documented fact and use it everywhere: site, GBP "opening date", and social bios.
2. **GBP business names look keyword-stuffed.**
   - The Ramlila listing appears as "M B JEWELLERS (SIKAR) PVT. LTD. – Ramlila Maidan, Sikar Best jewellery Shop GOLD, DIAMOND, SILVER".
   - That breaks Google's naming guidelines and risks suspension.
   - The name should be the real-world signage name, e.g. "MB Jewellers" or "M.B. Jewellers (Sikar) Pvt. Ltd.".
3. **Phone.** The listings appear to show the mobile 098292 31637, while the site shows the landlines. Pick a primary number per showroom and match the site and GBP.
4. **Hours.**
   - Ramlila's listing appears to show Mon–Sat 10–8 and Sun 10–6.
   - The site says Mon–Sat 10–7 and closed Sunday.
   - One of them is wrong. Fix whichever is wrong, then I can update `siteConfig.openingHours`.
5. **Ghantaghar address wording.** The listing says "Old Dujod Gate"; the site says "Purana Dujod Gate". Both mean the same place, but pick one and use it on both.
6. **Unverifiable trust claims still on the site.** They were left in place, not removed, but I did not add any new ones:
   - "5 Lakh+ customers"
   - "100% Trust"
   - "certified diamonds" (home hero)
   - "Lifetime care"
   - the testimonials "Ananya R." and "Rahul M."

   Keep each only if there is evidence: records, certificates, or real customer consent.
7. **Service-area towns.** The JewelryStore and Organization `areaServed` lists, and the home copy, name Fatehpur, Laxmangarh, Neem Ka Thana, Jhunjhunu, Churu, Khandela, Ringas and Danta Ramgarh. Keep these only if customers genuinely come from those towns. No town landing pages were created; they would be thin doorway pages.

---

## 3. Query research → page map

**Sources (28 Oct 2026):**
- Google autocomplete (suggestqueries).
- Live Google SERPs viewed through search tools.
- Competitor GBP data on public aggregators.

Search volumes are not available without Google Ads or GSC access. Use GSC impressions once verified.

| Query group (real autocomplete / SERP) | Intent | Best page | Notes |
|---|---|---|---|
| best jewellery shop in sikar · best jewellers in sikar · top / famous jewellers in sikar · jewellery showroom in sikar | Local, choosing a store | `/` (+ `/showrooms`) | The site already ranks here. The map pack is decided by GBP prominence, so reviews matter more than more on-page "best". |
| gold shop in sikar · gold jewellery shop in sikar | Local, transactional | `/collections/gold` | Ranks. The H1 is "Gold Jewellery in Sikar". |
| bridal jewellery sikar · bridal jewellery on rent in sikar | Local, transactional | `/bridal` | MB does not rent jewellery, so do **not** target "on rent". |
| rajputi jewellery sikar · rajputi / rajasthani bridal set names | Informational → local | `/collections/gold/rajputi` + **new** `/blog/traditional-rajasthani-jewellery-guide` | Geetanjali Rajputi ranks today. The new guide answers the "what is borla / aad" questions and links to the Rajputi section. |
| gold jewellery price today sikar | Price lookup | — | **Not targeted.** The site publishes no rates, and inventing them is off-limits. Option for Chetan: a daily rate board only if staff update it every day. |
| how to check hallmark / HUID | Informational | **expanded** `/blog/how-to-check-gold-purity-hallmark` | Factual BIS / HUID / BIS CARE steps with H2s. The unverifiable "MB follows hallmarked gold standards" line was removed. |
| mb jewellers sikar | Brand | `/`, GBP | Fix the GBP name and NAP (§2) so brand searches show one consistent entity. |
| sikar jewellery market | Informational / navigation | `/showrooms` | Showroom landmarks (Ghantaghar clock tower, Ramlila Maidan) already covered. |
| artificial jewellery shop in sikar | Different product | — | Not relevant; ignore. |

**Competitors in the Sikar map pack** (aggregator data, unverified):

| Business | Rating | Reviews |
|---|---|---|
| L.S. & Sons | 5.0 | ~320 |
| Tanishq, Silver Jubli Rd | 4.9 | ~2,500 |
| Ganpati Jewellers | 4.8 | ~750 |

Also present: Shekhawati Jewellers, Anurag, Shree Jewellers, J.P & Sons.

**MB's listings:**

| Listing | Rating | Reviews |
|---|---|---|
| Ramlila | ~4.6–4.7 | ~262 |
| Ghantaghar | ~4.0 | ~418 |

**Ghantaghar's lower rating and the review velocity gap are the biggest local-pack levers.** They are fixed off-site through an honest review process, not on the website.

---

## 4. Prioritised plan

### P0: this branch (done, needs merge and deploy by Chetan)

1. Server-rendered LocalBusiness / Organization / WebSite / FAQ JSON-LD.
2. Clean the JewelryStore and Product schemas: verified data only.
3. Remove `/review` from the sitemap; `noindex` it. Honest `lastmod`.
4. Clean titles, descriptions and H1s on subsections, products, blog, home and gallery.
5. De-stuff the local copy; fix the H1 text and the a11y label mismatches.
6. Two useful guides with H2 structure and internal links:
   - Hallmark/HUID (expanded).
   - Traditional Rajasthani bridal jewellery (new).
7. SEO regression tests: `tests/local-seo.test.ts`.

### P1: needs Chetan's access (see `GBP-AND-GSC-ACTIONS.md`)

1. **GBP name and NAP fixes on both listings:** name, phone, hours (§2).
2. Decide on the ReviewFlow AI `/review` door; switch to the plain Google review link.
3. Vercel: redirect the apex domain to www (308).
4. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and the GSC / Bing verification env vars, then redeploy.
5. GSC: submit the sitemap; request indexing of the two guides and the home page after deploy.

### P2: next website passes (safe, no access needed)

1. Add H2 sections to the other 13 journal posts, worst first. These have the most search potential:
   - `bridal-jewellery-buying-guide`
   - `22k-vs-18k-gold-jewellery`
   - `diamond-jewellery-buying-guide`
2. Link the new Rajasthani guide from `/bridal` and from the Rajputi section page body. Today it is reached via the journal and its own related links.
3. Home performance: a lighter hero poster, reels with `preload="none"`, and an LCP image under 200 KB.
4. Replace the 4 mismatched product photos, then their Product schema turns back on automatically.
5. **Home title (decision for Chetan).**
   - The current title "Best Jewellery Shop in Sikar | Best Jewellers in Sikar – MB Jewellers" is 69 characters and gets truncated.
   - The option from the brief is "MB Jewellers | Jewellery Shop in Sikar, Rajasthan".
   - The current title ranks and is locked by an existing test, so it was **not** changed.
   - Recommendation: test the shorter brand-first title for 4–6 weeks and compare GSC CTR.

### P3: ongoing

Run the monthly cadence in `LOCAL-SEO-30-DAY.md`, with these additions:

- Review velocity: a steady trickle, never bursts.
- One factual guide per month, for example: making charges explained; old-gold exchange questions; ring sizing.
- Real showroom photos on GBP.

**Do not:**
- create town or "near me" doorway pages;
- add self-awarded "best" or "#1" claims to schema;
- add rating markup for your own business.
