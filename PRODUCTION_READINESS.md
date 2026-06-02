# MB Jewellers — Production Readiness Audit

**Audit date:** 28 May 2026  
**Stack:** Next.js 16.2.4 · React 19 · Prisma 7 · Tailwind v4  
**Build status:** `npm run build` — **PASS** (71 static/SSG routes)

---

## Executive summary

The MB Jewellers site is a **premium marketing + lead-capture** application (not full e-commerce checkout). Core architecture, SEO foundations, API security, and Vercel deployment readiness are **strong**. This audit **implemented** critical gaps (legal pages, manifest, cookie consent, GA4 hook, CI hardening, 404 page, OG image generation).

**Launch readiness:** ~**85%** — ready for Vercel preview/production after env vars and domain DNS are configured. Remaining items are mostly **content/assets** (dedicated 1200×630 OG photo), **Postgres migrations in production**, and **operational setup** (Search Console, GA property).

---

## 1. Full audit report (by area)

### 1. Frontend architecture — **Good**

| Item                                         | Status                           |
| -------------------------------------------- | -------------------------------- |
| App Router (`app/`)                          | ✅                               |
| Premium shell (`PremiumSite`, header/footer) | ✅                               |
| Legacy `DPHomePage` / old Header             | ⚠️ Unused — safe to remove later |
| Client/server boundaries                     | ✅ Mostly correct                |
| Dynamic imports on home (reels, map)         | ✅                               |

### 2. Folder structure — **Good**

| Item                         | Status                |
| ---------------------------- | --------------------- |
| `app/`, `public/`, `prisma/` | ✅                    |
| `app/lib/` shared config     | ✅                    |
| `app/hooks/`                 | ✅ `useClientMounted` |
| `tests/`                     | ❌ Not present        |

### 3. Components — **Good**

| Item                        | Status       |
| --------------------------- | ------------ |
| Premium component library   | ✅           |
| Reusable `PremiumLegalPage` | ✅           |
| Admin dashboard             | ✅           |
| Cookie consent + GA         | ✅ **Added** |

### 4. Responsiveness — **Good** (manual QA recommended)

| Item                                  | Status                  |
| ------------------------------------- | ----------------------- |
| Mobile-first CSS (`clamp`, `site-px`) | ✅                      |
| Footer 5-column grid (xl)             | ✅ **Updated**          |
| Touch targets on CTAs                 | ✅                      |
| Ultra-wide testing                    | ⚠️ Manual check advised |

### 5. UI consistency — **Good**

| Item                              | Status     |
| --------------------------------- | ---------- |
| Design tokens / premium theme     | ✅         |
| Glass cards, typography           | ✅         |
| Luxury motion (GSAP, Framer)      | ✅         |
| `prefers-reduced-motion` handling | ✅ Partial |

### 6. Accessibility — **Strong**

| Item                                            | Status                       |
| ----------------------------------------------- | ---------------------------- |
| Semantic landmarks (`main`, `nav`, `footer`)    | ✅                           |
| Skip to main content link                       | ✅                           |
| `#main-content` focus target                    | ✅                           |
| `:focus-visible` on buttons, links, fields      | ✅                           |
| `aria-current="page"` on nav                    | ✅                           |
| FAQ accordion `aria-expanded` / `aria-controls` | ✅                           |
| Form labels / aria on newsletter                | ✅                           |
| Full keyboard audit                             | ⚠️ Manual once before launch |
| WCAG contrast audit                             | ⚠️ Manual (gold on cream)    |

### 7. SEO — **Strong** (post-fixes)

| Item                              | Status                       |
| --------------------------------- | ---------------------------- |
| Per-page `createPageMetadata()`   | ✅                           |
| `metadataBase` + canonicals       | ✅                           |
| `robots.ts`                       | ✅ Blocks `/admin`, `/api`   |
| `sitemap.ts`                      | ✅ Dynamic, all legal routes |
| JSON-LD JewelryStore + WebSite    | ✅                           |
| Open Graph / Twitter              | ✅                           |
| `opengraph-image.tsx` (generated) | ✅ **Added**                 |
| Dedicated OG photo asset          | ⚠️ Use brand photo later     |
| Google Search Console             | ⚠️ Post-deploy setup         |

### 8. Performance — **Strong**

| Item                                             | Status                          |
| ------------------------------------------------ | ------------------------------- |
| Dynamic imports (reels, map, loader, cursor)     | ✅                              |
| `optimizePackageImports` (framer, gsap, lucide)  | ✅                              |
| Font `display: swap`                             | ✅                              |
| LCP: logo `priority` + `fetchPriority` + `sizes` | ✅                              |
| Hero video poster + `preload="metadata"`         | ✅                              |
| Collage images `loading="lazy"`                  | ✅                              |
| Image optimization (prod)                        | ✅ `next/image`                 |
| Video reels (3 MP4s)                             | ⚠️ Monitor on mobile data       |
| Lighthouse 95+                                   | ⚠️ Run on Vercel production URL |
| Hydration (extension-safe forms)                 | ✅                              |

### 9. Security — **Strong**

| Item                                          | Status                        |
| --------------------------------------------- | ----------------------------- |
| Production security headers (CSP, HSTS, etc.) | ✅                            |
| Admin proxy auth (`proxy.ts`)                 | ✅                            |
| Rate limiting (Upstash / memory)              | ✅                            |
| Honeypot on forms                             | ✅                            |
| Origin checks on APIs                         | ✅                            |
| Env secrets not in repo                       | ✅ `.env*` gitignored         |
| `.env.example` committed                      | ✅ **Fixed**                  |
| Admin password in env (plain compare)         | ⚠️ Use strong secret + rotate |
| CSP `unsafe-inline`                           | ⚠️ Required for maps/inline   |

### 10. Hosting readiness (Vercel) — **Ready**

| Item                                      | Status                     |
| ----------------------------------------- | -------------------------- |
| `next build` succeeds                     | ✅                         |
| `NEXT_PUBLIC_SITE_URL` enforced on Vercel | ✅                         |
| Image CDN                                 | ✅ Vercel default          |
| `vercel.json`                             | ❌ Optional — not required |

### 11. CI/CD — **Strong**

| Item                                          | Status                     |
| --------------------------------------------- | -------------------------- |
| Parallel jobs: quality, security audit, build | ✅                         |
| Concurrency cancel on new pushes              | ✅                         |
| Lint + format + typecheck + build             | ✅                         |
| `prisma generate` in CI                       | ✅                         |
| `npm audit --audit-level=high`                | ✅                         |
| Post-build `verify:build` script              | ✅                         |
| Deploy workflow                               | Use Vercel Git integration |
| E2E browser tests                             | Optional later             |

### 12. Domain readiness — **Pending ops**

| Item                                              | Status            |
| ------------------------------------------------- | ----------------- |
| `NEXT_PUBLIC_SITE_URL=https://www.mbjewellers.in` | ⚠️ Set in Vercel  |
| DNS A/CNAME to Vercel                             | ⚠️ User action    |
| SSL                                               | ✅ Auto on Vercel |

### 13. Analytics — **Ready (opt-in)**

| Item                            | Status               |
| ------------------------------- | -------------------- |
| GA4 component                   | ✅ **Added**         |
| Consent-gated loading           | ✅                   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ⚠️ Set in production |

### 14. Legal compliance — **Complete** (jewellery studio scope)

| Document              | Route                   | Status       |
| --------------------- | ----------------------- | ------------ |
| Privacy Policy        | `/privacy-policy`       | ✅           |
| Terms & Conditions    | `/terms-and-conditions` | ✅           |
| Refund Policy         | `/refund-policy`        | ✅ **Added** |
| Shipping Policy       | `/shipping-policy`      | ✅ **Added** |
| Cancellation Policy   | `/cancellation-policy`  | ✅ **Added** |
| Cookie Policy         | `/cookie-policy`        | ✅ **Added** |
| Disclaimer            | `/disclaimer`           | ✅ **Added** |
| Cookie consent banner | Site-wide               | ✅ **Added** |
| About Us              | `/about`                | ✅           |
| FAQ                   | `/faq`                  | ✅           |
| Contact               | `/contact`              | ✅           |

### 15. Error handling — **Good**

| Item                | Status       |
| ------------------- | ------------ |
| `app/error.tsx`     | ✅           |
| `app/not-found.tsx` | ✅ **Added** |
| API JSON errors     | ✅           |

### 16. Production optimization — **Good**

| Item                         | Status |
| ---------------------------- | ------ |
| `compress: true`             | ✅     |
| `poweredByHeader: false`     | ✅     |
| Static generation (71 pages) | ✅     |

### 17. Image optimization — **Moderate**

| Item                                   | Status                            |
| -------------------------------------- | --------------------------------- |
| Local PNG/JPG in `public/`             | ✅                                |
| Unsplash remote images                 | ✅ Allowed                        |
| WebP/AVIF conversion                   | ⚠️ Optional pipeline              |
| `loading="eager"` on header logo (LCP) | ⚠️ Next.js warning — consider fix |

### 18. Animation performance — **Moderate**

| Item                      | Status            |
| ------------------------- | ----------------- |
| Reduced motion support    | ✅ Partial        |
| ScrollTrigger cleanup     | ✅ `ctx.revert()` |
| Cursor / loader on mobile | ⚠️ Review UX      |

### 19. Metadata setup — **Strong**

| Item                 | Status                                   |
| -------------------- | ---------------------------------------- |
| Root + page metadata | ✅                                       |
| Manifest             | ✅ **Added**                             |
| Icons (logo as icon) | ⚠️ Add `favicon.ico` / sized icons later |

### 20. Cross-browser — **Assumed good**

Test Safari iOS, Chrome Android, Firefox, Edge before launch.

---

## 2. Missing items checklist

| Item                                                         | Priority | Status                      |
| ------------------------------------------------------------ | -------- | --------------------------- |
| Refund / shipping / cancellation / cookie / disclaimer pages | P0       | ✅ Done                     |
| Cookie consent                                               | P0       | ✅ Done                     |
| `manifest.webmanifest`                                       | P1       | ✅ Done                     |
| Custom 404                                                   | P1       | ✅ Done                     |
| OG image (generated)                                         | P1       | ✅ Done                     |
| GA4 integration                                              | P1       | ✅ Done (needs ID)          |
| `.env.example` in git                                        | P1       | ✅ Done                     |
| CI typecheck + prisma                                        | P1       | ✅ Done                     |
| Dedicated favicon.ico / icon sizes                           | P2       | ⬜                          |
| Brand photography OG (1200×630 JPG)                          | P2       | ⬜                          |
| Prisma migrations committed                                  | P1       | ⬜ Run `prisma migrate dev` |
| E2E / unit tests                                             | P2       | ⬜                          |
| Skip navigation link                                         | P2       | ⬜                          |
| Remove legacy `DPHomePage`                                   | P3       | ⬜                          |
| Deploy workflow / Vercel project link                        | P1       | ⬜ Ops                      |
| Upstash + Postgres + Resend in prod                          | P0       | ⬜ Ops                      |

---

## 3. Critical issues list

| #   | Issue                                    | Severity | Status                    |
| --- | ---------------------------------------- | -------- | ------------------------- |
| 1   | Missing legal pages for trust/compliance | High     | ✅ Fixed                  |
| 2   | No cookie consent before analytics       | High     | ✅ Fixed                  |
| 3   | Build/typecheck not in CI                | Medium   | ✅ Fixed                  |
| 4   | No custom 404                            | Medium   | ✅ Fixed                  |
| 5   | Production env vars not set on host      | High     | ⬜ **You must configure** |
| 6   | Default admin password in `.env.example` | High     | ⬜ Change before launch   |
| 7   | No Prisma migrations in repo             | Medium   | ⬜ If using Postgres      |
| 8   | Large hero/reel videos impact mobile LCP | Medium   | ⬜ Monitor Lighthouse     |

---

## 4. SEO improvements list

**Implemented**

- Legal URLs in sitemap
- WebSite + JewelryStore schema (hours, price range)
- Generated `/opengraph-image`
- Robots + canonical strategy
- Footer internal links (about, contact, policies)

**Recommended next**

1. Submit `https://www.mbjewellers.in/sitemap.xml` in Google Search Console
2. Add real `G-XXXXXXXXXX` to `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Replace generated OG with hero product photo (1200×630, &lt;200KB WebP)
4. Add `FAQPage` schema on `/faq`
5. Add `BreadcrumbList` on collection/product pages
6. Audit all `<Image alt="...">` for descriptive alt text
7. Add `hreflang` only if multi-language launches

---

## 5. Security improvements list

**Implemented**

- CSP updated for Google Analytics domains
- Admin `robots: noindex` layout
- Cookie consent before GA

**Recommended**

1. Set `ADMIN_SESSION_SECRET` ≥ 32 random chars
2. Use strong unique `ADMIN_PASSWORD`; never commit `.env`
3. Enable **Upstash Redis** for distributed rate limits
4. Use **Postgres** (`LEAD_STORAGE_MODE=postgres`) in production
5. Configure **Resend** with verified domain
6. Rotate secrets if defaults were ever deployed
7. Consider bcrypt for admin (future)
8. Add `report-uri` to CSP when monitoring available

---

## 6. Performance improvements list

| Action                                                      | Impact      |
| ----------------------------------------------------------- | ----------- |
| Add `priority` + `loading="eager"` to header logo           | LCP         |
| Convert hero video to shorter loop / poster image           | LCP         |
| Serve reels only on `prefers-reduced-motion: no-preference` | A11y + perf |
| Run `next build` + Lighthouse on Vercel preview             | Validation  |
| Tree-shake unused legacy components                         | Bundle      |
| Enable Vercel Analytics / Speed Insights                    | Monitoring  |

---

## 7. Deployment checklist (Vercel)

- [ ] Push repo to GitHub
- [ ] Import project in Vercel
- [ ] Set production branch (`main` / `master`)
- [ ] Add all variables from `.env.example`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Set `ADMIN_*` secrets (strong values)
- [ ] Configure `DATABASE_URL` + run migrations
- [ ] Configure Upstash + Resend
- [ ] Deploy preview → smoke test
- [ ] Promote to production
- [ ] Verify HTTPS and www redirect

---

## 8. Domain connection checklist

- [ ] Purchase/connect `mbjewellers.in` (or chosen domain)
- [ ] Vercel → Domains → Add domain
- [ ] DNS: `A` / `CNAME` as Vercel instructs
- [ ] Enable www → apex redirect (or vice versa)
- [ ] Wait for SSL provisioning
- [ ] Update `NEXT_PUBLIC_SITE_URL` to canonical URL
- [ ] Redeploy after URL change

---

## 9. Hosting readiness checklist

- [x] Production build passes
- [x] Static/SSG routes generated
- [x] API routes functional
- [x] Security headers (production)
- [x] robots + sitemap
- [ ] Environment variables on host
- [ ] Database provisioned (if Postgres)
- [ ] Email notifications tested
- [ ] Admin login tested on production URL

---

## 10. Google indexing checklist

- [ ] Verify domain in Search Console
- [ ] Submit sitemap: `/sitemap.xml`
- [ ] Request indexing for `/` and `/collections`
- [ ] Confirm `robots.txt` allows crawl
- [ ] Confirm no accidental `noindex` on marketing pages
- [ ] Test rich results (JewelryStore schema)
- [ ] Set up GA4 property + measurement ID
- [ ] Link GA4 to Search Console

---

## 11. Production launch checklist

**Pre-launch**

- [x] Legal pages live
- [x] Cookie banner live
- [x] 404 page live
- [x] CI passes
- [ ] Content proofread (policies, contact info)
- [ ] All forms tested (contact, appointment, newsletter)
- [ ] WhatsApp + phone links verified
- [ ] Maps embed API key (if used)

**Launch day**

- [ ] Deploy to Vercel production
- [ ] DNS live
- [ ] SSL green padlock
- [ ] Smoke test mobile + desktop
- [ ] Submit sitemap to Google

**Post-launch**

- [ ] Monitor Vercel logs / errors
- [ ] Lighthouse on production URL
- [ ] Instagram bio link → site
- [ ] Optional: Vercel Speed Insights

---

## Files created/updated in this audit

**New pages:** `refund-policy`, `shipping-policy`, `cancellation-policy`, `cookie-policy`, `disclaimer`  
**New infrastructure:** `manifest.ts`, `not-found.tsx`, `opengraph-image.tsx`, `admin/layout.tsx`, `CookieConsent`, `GoogleAnalytics`, `legalContent.ts`, `cookieConsent.ts`  
**Updated:** Footer, sitemap, layout, seo schema, CI, `.gitignore`, `.env.example`, `next.config.ts` CSP, `package.json` scripts

---

## UI/UX recommendations (luxury positioning)

1. **Hero:** Add poster frame before video loads; shorten loop for mobile data.
2. **Collections:** Add subtle parallax only on desktop.
3. **Conversion:** Sticky “Book private viewing” on mobile scroll.
4. **Trust:** Surface BIS/hallmark certification near promises section.
5. **Social proof:** Link testimonials to Google reviews if available.
6. **Bridal:** Dedicated CTA block with WhatsApp prefill for bridal consult.

---

_Generated as part of production readiness work. Re-run `npm run build` before each release._
