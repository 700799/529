# The Complete 529 & College Funding Guide

A full, self-contained, daily-refreshed guide to **529 education savings plans**
and the entire landscape of paying for college — built with **Next.js** and
deployed as a **fully static site** — primarily to **Cloudflare Pages**, with
**GitHub Pages** kept as a daily-refreshed fallback.

> Educational information only — not tax, legal, or investment advice. Verify
> all figures against official plan documents and current IRS / Federal Student
> Aid guidance. See the in-app **Sources** tab.

## What's inside

A tile-launcher interface with 16 sections. Each is a **real route**
(`/compare/`, `/calculators/`, …) with its own title, description, and
canonical URL, so sections are independently indexable — but clicking a tile
opens it in a drawer without a page reload, and Back closes the drawer.
Legacy `#section` links still work and are upgraded to the route form.

- **Overview** — how a 529 works, the funding waterfall, key stats.
- **What is a 529?** — rules, qualified expenses, the $35k Roth rollover escape hatch.
- **Compare plans** — sortable/filterable tables for **all 50 states + DC**, the
  brand-name private plans (**Vanguard, Fidelity, Schwab, T. Rowe Price, my529,
  Wealthfront, Bright Start**), **prepaid tuition** programs (Florida Prepaid,
  Maryland Prepaid, Texas Tuition Promise, Washington GET, the national Private
  College 529, etc.), and **alternatives** (Coverdell ESA, UGMA/UTMA, Roth IRA,
  savings bonds, taxable, HSA, crypto, and the 401(k)-raid anti-pattern).
- **Calculators** — live growth projection, **529 vs. no-plan tax drag**,
  **401(k)-raid true cost**, and **gift/superfunding**.
- **Costs, loans & aid** — average cost by school tier, every loan type
  (subsidized → private → payday), federal grants/programs (Pell, FSEOG,
  work-study, PSLF, AOTC/LLC), and stats on **who borrows what**.
- **7 student scenarios** — from the early-saver success story to the worst-case
  stack of mistakes, each with a visual funding stack and loan package.
- **Tradeoffs & worst cases** — honest pros/cons of every option, plus the math
  on **raiding a 401(k)** and **payday loans**.
- **Financial-aid strategy** — how to legally position assets (home equity,
  retirement) to maximize need-based aid.
- **Steps by age** — a five-step checklist for every stage from birth to graduation.
- **Grandparents & gifts** — annual exclusion, 5-year superfunding, and the
  FAFSA win for grandparent-owned 529s.
- **Crypto** — advantages, drawbacks, tax mechanics, and aid impact.
- **2-year & working programs** — community-college transfer, free-tuition
  programs, apprenticeships, co-ops, and employer tuition assistance.
- **FAQ & glossary** — 15 common questions plus a plain-English glossary.
- **Reading room** — a daily-refreshed feed of 529 and college-funding articles.
- **Sports & music** — athletic and arts scholarships, recruiting timelines, and
  the realistic odds.
- **Sources** — every reference used.

All graphics are inline SVG and all data lives in `/lib/data`, so the site is
fully self-contained (no runtime external requests) and works offline.

### Adding a section

`lib/sections.tsx` remains the single source of truth. Add an entry (with an
`seoDescription`) and a matching icon in `components/SectionIcons.tsx`; the
launcher grid, drawer, route, metadata, and sitemap all follow automatically.

## Tech

- **Next.js 15** (App Router) with `output: "export"` → 100% static.
- **Tailwind CSS** for styling, dark-mode aware.
- **Recharts** for charts; custom SVG infographics.
- **TypeScript** throughout.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000  (runs generate-data first)
npm run build    # static export to ./out
```

To preview the production build exactly as GitHub Pages serves it (under the
`/529` base path), build with the base path set:

```bash
NEXT_PUBLIC_BASE_PATH=/529 npm run build
```

## Testing

```bash
npm test           # unit + end-to-end
npm run test:unit  # Vitest: financial math and data invariants
npm run test:e2e   # Playwright: desktop + mobile, against the real out/ build
```

- **Unit** (`tests/`) — pins the compounding, amortization, and inflation math in
  `lib/format.ts` against independently-derived closed-form values, and asserts
  invariants over the hand-maintained datasets (51 states, unique abbreviations,
  plausible fee/cap ranges, unique FAQ questions, a well-formed section registry).
- **End-to-end** (`e2e/`) — serves the actual static export via
  `scripts/serve-static.mjs` (zero dependencies) and covers the launcher, hash
  routing, Back-closes-drawer, deep links, focus trap, `inert` background, focus
  restoration, reduced motion, prerendered content, and JSON-LD — asserting zero
  console errors throughout.

`npm run test:e2e` needs a Chromium: CI runs `npx playwright install chromium`.
If your environment already ships one whose build differs from this Playwright
release, point at it with `PW_CHROMIUM_PATH=/path/to/chrome npm run test:e2e`.

## "Refresh every day"

`scripts/generate-data.mjs` runs before every build: it stamps
`lib/data/meta.json` with the current date, academic year, and time-sensitive
constants, and `scripts/fetch-articles.mjs` pulls fresh reading-room articles.
`scripts/generate-og.mjs` renders the social-share image. Because these run in
`prebuild`, **every rebuild reflects the day it was built** — so the site must be
rebuilt daily on whichever host is live (see below).

## Deployment

The app is base-path-agnostic: `next.config.mjs` derives `basePath`/`assetPrefix`
from `NEXT_PUBLIC_BASE_PATH`, and `NEXT_PUBLIC_SITE_URL` sets the canonical/OG
origin. Build env per host:

| Host | `NEXT_PUBLIC_BASE_PATH` | `NEXT_PUBLIC_SITE_URL` | Security headers |
|------|-------------------------|------------------------|------------------|
| **Cloudflare Pages** (primary) | _(unset → root)_ | your Pages/custom-domain URL | **yes** (`public/_headers`) |
| **GitHub Pages** (fallback) | `/529` (set by CI) | `https://<owner>.github.io/529` | no (Pages can't set headers) |

### Cloudflare Pages (primary, recommended)

1. Cloudflare dashboard → **Pages → Create → Connect to Git**, pick this repo.
2. Build command `npm run build`, output directory `out`. Leave
   `NEXT_PUBLIC_BASE_PATH` unset; set `NEXT_PUBLIC_SITE_URL` to your Pages URL.
3. `public/_headers` (CSP, HSTS, `X-Frame-Options`, etc.) and `public/_redirects`
   are honored automatically. `wrangler.toml` documents a direct
   `npx wrangler pages deploy out` alternative.
4. **Daily refresh:** create a **Deploy Hook** (Pages → Settings → Builds &
   deployments) and save the URL as the repo secret `CF_DEPLOY_HOOK`. The
   `.github/workflows/cf-refresh.yml` cron POSTs it daily (08:20 UTC) to rebuild
   with fresh data; it also runs on demand via **workflow_dispatch**.

### GitHub Pages (fallback)

1. **Settings → Pages → Source = GitHub Actions**.
2. `.github/workflows/deploy.yml` builds with base path `/529`, runs the
   typecheck/lint/audit gates, and publishes daily (cron 08:10 UTC). Served at
   `https://<owner>.github.io/529/`.

> If the site looks stale, the daily rebuild isn't running — confirm Pages/CF is
> enabled and the relevant cron/deploy-hook is configured.
