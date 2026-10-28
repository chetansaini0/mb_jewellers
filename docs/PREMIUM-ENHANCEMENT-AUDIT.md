# MB Jewellers — Premium Enhancement Audit

_Branch: `feat/premium-enhancement` (from `master` @ `6685bac`) · Audited 28 Oct 2026 (IST)_

This pass follows Chetan's **Premium Website Enhancement Master Prompt**: progressive
enhancement, not a redesign. It supersedes the older dark-editorial direction in
`MB-JEWELLERS-REDESIGN-PLAN.md`. Reference sites (CaratLane, Malabar Gold & Diamonds,
Kalyan Jewellers) were used only as high-level inspiration for presentation and customer
journey — no branding, imagery or layouts were copied.

## 1. Must not change

| Area | What stays exactly as is |
| --- | --- |
| Brand | MB Jewellers logo files (`public/mb-jewellers-logo*.png`, `logo/`), name, crest, favicon/app icons |
| Palette | Ivory `#faf7f0`, ink `#1a1510`, gold `#c8a24d` and the gold-gradient primary button. New tokens only *deepen* gold for readable text |
| Fonts | Playfair Display (display), Poppins (body), Cinzel (accent) — already loaded in `app/layout.tsx` |
| Routes | Every page under `app/` (collections, sections, products, bridal, heritage, gallery, services, blog, FAQ, legal, showrooms, contact, unsubscribe, admin) |
| Catalogue data | `app/lib/siteData.ts`, `premiumContent.ts`, `premiumPages.ts`, `collectionPages.ts` — names, images, copy and slugs |
| Contact facts | Showroom addresses, landlines, WhatsApp `919829231637`, email, opening hours (`app/lib/siteConfig.ts`) |
| Integrations | `/api/contact`, `/api/appointments`, `/api/newsletter(+unsubscribe)`, admin login/dashboard, Prisma/Postgres + file fallback lead store, Resend, rate limiting and honeypots |
| SEO | Metadata, JSON-LD (JewelryStore, Organization, WebSite, Product, FAQ), sitemap, robots, `llms.txt`, local-SEO section |
| Privacy | Cookie consent and the analytics gating behind it |
| Floating CTAs | WhatsApp, call and book buttons |
| Stack | Next.js 16 App Router, React 19, Tailwind v4, Framer Motion/GSAP/Lenis — no migrations, no 3D |

## 2. Current issues found

1. **Motion that gets in the way.** A 1.4 s full-screen loader on first visit, a custom cursor
   replacing the native pointer, 3D mouse-tilt on collection/blog cards, "magnetic" hero
   buttons, mouse-parallax on the hero video, and blur-in text filters. Together they delay
   first view, add main-thread work and feel gimmicky rather than classic.
2. **Product page auto-rotates its gallery every 3 s** with a 1.35 s cross-fade, so the main
   piece is often replaced by a close-up (our "before" screenshot caught the earrings instead of
   the set). No pause control — a WCAG 2.2.2 issue — and it fights the visitor.
3. **Product page lacks practical facts.** Only a name, one line and two buttons; no clear
   "how to buy / price / where to see it" answers, and on phones the enquiry buttons scroll
   away.
4. **Navigation is bare.** Desktop has no quick access to hours / phone / WhatsApp; the mobile
   menu is a plain uppercase list with no call, WhatsApp or showroom shortcuts.
5. **Cookie banner is large** (≈ 40 % of a 390 px viewport) and sits over the hero, the enquiry
   widget and product images on first visit.
6. **Footer** packs 22 Explore links into one long column, and the contact column is a run of
   unlinked text (phone numbers not tappable).
7. **Small gold text contrast.** Eyebrows use `rgba(156,122,50,.92)` on ivory (~3.8:1), below
   AA for small text.
8. **Traditional character is thin.** Section dividers are plain hairlines; nothing in the UI
   (beyond photos) signals Indian heritage craft.

### Content / claims to verify with the client (not changed in this pass)

These are **existing** claims; this pass neither added nor removed any. They should be
confirmed by MB Jewellers before the next big push:

- Header says **"Since 1998"**, About timeline starts at **"1950"**, trust section says
  **"30+ Years"** — these conflict.
- **"5 Lakh+ Happy Customers"**, **"100% Trust"**, **"Lifetime care"**, **"certified diamonds"**.
- Testimonials **"Ananya R."** and **"Rahul M."** — confirm they are real customers (with consent)
  or replace with Google reviews.
- Catalogue image/name mismatches: **"Moonlight Silver Hoops"** and **"Silver Dew Bracelet"** reuse
  photos of a silver necklace suite; **"Arctic Line Pendant"** and **"Luna Cluster Pendant"** use
  the collection cover images. These are listed as products and may misrepresent the piece.
  Needs client photos or removal.
- Map embeds on Contact render blank until cookies are accepted / in headless checks — expected,
  but worth a static map fallback image later.

## 3. Top 5 highest-impact improvements (implemented)

1. **Calm, usable motion** — retire the intro loader and custom cursor, replace 3D tilt and
   magnetic buttons with a gentle CSS lift, drop hero mouse-parallax and blur filters
   (simple fade-up instead). Reduced-motion users get no movement.
2. **Product presentation** — stop the product gallery autoplay (visitor chooses the angle; the
   main piece stays in view), add a "facts" panel (collection link, *how to buy: in person*,
   *price & availability: confirmed in showroom*, both showrooms with directions + hours), a
   sticky Book viewing / WhatsApp bar on phones, and a fine champagne keyline frame on product
   cards. No prices, purity, certificates or discounts were invented.
3. **Polished navigation** — a slim desktop showroom strip (hours, two showrooms, tap-to-call,
   WhatsApp) using only verified `siteConfig` data; a gold underline for hover/active links; the
   mobile menu becomes larger serif links plus Call / WhatsApp / Showrooms shortcuts and hours.
4. **Traditional detailing & typography** — an original gold ornamental divider (hairlines,
   bindu dots and a centre lozenge) on every section title and in the footer; Cinzel eyebrows in
   a deeper champagne-gold that passes AA; balanced heading wrapping; jharokha-arch framing on
   the collection covers.
5. **Easier enquiry journey & footer** — a compact cookie bar (one row on desktop, about half the
   height on phones) that no longer smothers the hero, and a reorganised footer: Explore links in
   two columns, each showroom as its own block with tap-to-call numbers and Google link, hours,
   mailto and WhatsApp.

## 4. Follow-ups (need Chetan / client)

- Push the branch and check the Vercel **preview** before merging (not done here).
- Client photos for the mismatched products above; confirm the founding year and trust stats.
- Optional next pass: lighter hero video on mobile (poster-only on slow connections), static map
  fallback, Google-review-backed testimonials.
