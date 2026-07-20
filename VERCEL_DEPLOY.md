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

| Variable               | Example                                   |
| ---------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.mbjewellers.in`              |
| `ADMIN_EMAIL`          | your email                                |
| `ADMIN_PASSWORD_HASH`  | output from `npm run admin:hash-password` |
| `ADMIN_SESSION_SECRET` | 32+ random characters                     |
| `LEAD_STORAGE_MODE`    | `postgres`                                |
| `DATABASE_URL`         | managed PostgreSQL connection string      |

Production intentionally fails closed when durable PostgreSQL storage is unavailable. The JSON store is only for local development and tests because serverless files are ephemeral.

Generate the password hash locally without committing the password:

```bash
ADMIN_PASSWORD="<strong-password>" npm run admin:hash-password
```

Before the first production deployment, apply the committed migrations from a trusted environment:

```bash
npm run prisma:migrate:deploy
```

If the target database already contains these tables, do not apply the initial migration blindly. Compare the database to `prisma/schema.prisma`, back it up, and baseline the existing schema with `prisma migrate resolve --applied 20260717000000_init` only after confirming that they match.

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
- Confirmation that PostgreSQL migrations completed
- Your real domain name
- GA4 ID when you have it

See also: `LAUNCH_CHECKLIST.md` and `PRODUCTION_READINESS.md`
