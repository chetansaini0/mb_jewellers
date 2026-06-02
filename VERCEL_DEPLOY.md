# Deploy MB Jewellers on Vercel (start here tomorrow)

## Step 1 — Push code to GitHub

```bash
git add .
git commit -m "Production-ready MB Jewellers showcase site"
git push origin main
```

(Use `master` if that is your default branch.)

## Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Install command: `npm ci` (default)

## Step 3 — Environment variables

In Vercel → **Settings → Environment Variables**, add everything from `.env.example`.

**Minimum for launch:**

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.mbjewellers.in` |
| `ADMIN_EMAIL` | your email |
| `ADMIN_PASSWORD` | strong password |
| `ADMIN_SESSION_SECRET` | 32+ random characters |
| `LEAD_STORAGE_MODE` | `json` (quick) or `postgres` (recommended) |

If `postgres`: also set `DATABASE_URL` and run migrations (see `LAUNCH_CHECKLIST.md`).

**Recommended when ready:**

- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEADS_NOTIFICATION_EMAIL`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## Step 4 — Deploy

Click **Deploy**. First build takes ~2–3 minutes.

## Step 5 — Custom domain

1. Vercel → **Domains** → add `mbjewellers.in` and `www.mbjewellers.in`
2. Add DNS records at your domain registrar (Vercel shows exact values)
3. Wait for SSL (automatic)
4. Set `NEXT_PUBLIC_SITE_URL` to your **canonical** URL and redeploy

## Step 6 — Smoke test (production)

- [ ] Homepage + New Arrivals carousel
- [ ] `/contact` form submit
- [ ] `/admin/login`
- [ ] WhatsApp link on mobile
- [ ] `https://your-domain.com/sitemap.xml`

## Tomorrow — tell the developer

- Vercel project URL after first deploy
- Whether you chose `json` or `postgres` for leads
- Your real domain name
- GA4 ID when you have it

See also: `LAUNCH_CHECKLIST.md` and `PRODUCTION_READINESS.md`
