# MB Jewellers Website

Premium jewellery showcase and lead-generation website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Core capabilities

- Luxury brand storytelling pages and collection showcases
- Contact and appointment lead capture APIs
- Newsletter subscription API
- Admin authentication and lead-management dashboard
- WhatsApp and social integrations
- PostgreSQL-ready schema using Prisma ORM
- SEO foundation with metadata, JSON-LD, sitemap, and robots

## Tech stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP + Lenis
- Prisma ORM + PostgreSQL
- Optional lead notification via Resend

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

See **[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)** for step-by-step hosting.

See **[LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)** for environment variables and post-launch tasks.

## Prisma workflow

- Generate client: `npm run prisma:generate`
- Create and apply migration locally: `npm run prisma:migrate`
- Open Prisma Studio: `npm run prisma:studio`

### Prisma 7 note

This project includes `prisma.config.ts` for Prisma 7 datasource configuration.
If your machine has TLS/certificate issues with npm, fix Node/npm certificate trust first, then run Prisma commands.

## Deployment notes

- Recommended hosting: Vercel + managed PostgreSQL
- Configure all variables from `.env.example` in production
- Set `NEXT_PUBLIC_SITE_URL` to your live domain
- Enable Cloudflare CDN/proxy for media and caching
- Add Resend credentials to receive lead notifications
- Set `LEAD_STORAGE_MODE=postgres` and `DATABASE_URL` for durable lead storage
- Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for distributed rate limiting
- Optionally set `NEXT_ALLOWED_DEV_ORIGINS` (comma-separated) for local device testing

## Admin dashboard

- URL: `/admin/login`
- Credentials from `.env.local`:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
- Session protection: signed HttpOnly cookie (`ADMIN_SESSION_SECRET`)
- Manage:
  - appointment status
  - inquiry lead status
