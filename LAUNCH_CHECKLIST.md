# MB Jewellers — Launch checklist (your action items)

**Last E2E check:** Build ✅ · Lint ✅ · Typecheck ✅ · 71 routes generated

The codebase is ready for deployment. Below is what **you** need to provide or complete before going live.

---

## 1. Must do before launch (critical)

### A. Create production environment file (Vercel)

Copy `.env.example` and set these on **Vercel → Project → Settings → Environment Variables**:

| Variable | What to provide |
|----------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | Your live URL, e.g. `https://www.mbjewellers.in` (no trailing slash) |
| `ADMIN_EMAIL` | Email you use to log into `/admin` |
| `ADMIN_PASSWORD` | **Strong** password (not the example in `.env.example`) |
| `ADMIN_SESSION_SECRET` | Random string **≥ 32 characters** (generate at password manager) |
| `LEAD_STORAGE_MODE` | `postgres` for production (recommended) or `json` for testing only |
| `DATABASE_URL` | Postgres connection string (if using `postgres` mode) |

### B. Database (if using Postgres for leads)

1. Create a Postgres database (Vercel Postgres, Neon, Supabase, etc.).
2. Set `DATABASE_URL` in Vercel.
3. Locally run once: `npm run prisma:migrate` then commit the `prisma/migrations` folder (or run migrate on deploy).
4. Set `LEAD_STORAGE_MODE=postgres`.

### C. Domain & hosting

1. Push code to **GitHub**.
2. Import repo in **Vercel** → deploy.
3. Add custom domain `mbjewellers.in` (or your domain) in Vercel.
4. Update DNS as Vercel instructs (A/CNAME).
5. Confirm `NEXT_PUBLIC_SITE_URL` matches the **canonical** URL (www or non-www — pick one).

### D. Change default admin password

Never deploy with `ChangeThisAdminPassword`. Set a unique `ADMIN_PASSWORD` in Vercel only.

---

## 2. Strongly recommended

### E. Email notifications (Resend)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `MB Jewellers <noreply@mbjewellers.in>` |
| `LEADS_NOTIFICATION_EMAIL` | Where inquiry/appointment emails go |

Without Resend, forms still save leads (if DB/json works) but you may not get email alerts.

### F. Rate limiting (Upstash Redis)

| Variable | Purpose |
|----------|---------|
| `UPSTASH_REDIS_REST_URL` | From [upstash.com](https://upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Paired token |

Without this, rate limits use in-memory store (weaker on serverless).

### G. Google Analytics

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 ID, e.g. `G-XXXXXXXXXX` |

Create property at [analytics.google.com](https://analytics.google.com). Analytics loads only after cookie consent.

### H. Google Maps (studio map on contact/home)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Maps JavaScript API key with domain restrictions |

Optional if map embed works without it — test `/contact` after deploy.

---

## 3. After deploy (SEO & marketing)

1. **Google Search Console** — verify domain, submit `https://www.mbjewellers.in/sitemap.xml`
2. **Test forms** — contact, appointment, newsletter on live URL
3. **Test admin** — `/admin/login` → dashboard → view leads
4. **WhatsApp / phone** — tap links on mobile
5. **Social** — share homepage link; check Open Graph preview (generated image at `/opengraph-image`)
6. **Lighthouse** — run on production URL (mobile + desktop); target 90+

---

## 4. Optional polish (provide to developer later)

| Item | What you can send |
|------|-------------------|
| OG image | One **1200×630** JPG of hero jewellery (better than auto-generated) |
| Favicon set | `favicon.ico` + 192px and 512px PNG if you want crisper tabs |
| Copy review | Proofread policies, FAQ, contact hours |
| Product photos | Any new pieces to add to carousel/collections |
| Instagram reels | New MP4s for `/public/instareel/` if replacing videos |

---

## 5. What is already done in code

- Showcase-only policies (no online shop)
- Legal pages + cookie banner + GA (consent-gated)
- SEO: sitemap, robots, schema, OG image
- Security headers (production)
- Admin auth + API rate limits + honeypot
- New Arrivals on homepage (not in header)
- CI: lint, typecheck, build, audit, verify script
- 404 page, manifest, accessibility skip link

---

## 6. Quick local commands

```bash
npm run dev          # http://localhost:3000
npm run build        # production build test
npm run lint         # ESLint
npm run typecheck    # TypeScript
```

---

## 7. If something breaks after deploy

Share with your developer:

1. Vercel deployment URL or error log screenshot  
2. Browser console errors (F12) on the failing page  
3. Which form/action failed (contact / appointment / admin login)  
4. Your env var names set (not the secret values)

---

*Generated from end-to-end project check.*
