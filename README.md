# The Complete 529 & College Funding Guide

A full, self-contained, daily-refreshed guide to **529 education savings plans**
and the entire landscape of paying for college — built with **Next.js** and
deployed as a **static site on GitHub Pages**.

> Educational information only — not tax, legal, or investment advice. Verify
> all figures against official plan documents and current IRS / Federal Student
> Aid guidance. See the in-app **Sources** tab.

## What's inside

A pill-toggle, browse-everything interface with 13 sections:

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
- **Sources** — every reference used.

All graphics are inline SVG and all data lives in `/lib/data`, so the site is
fully self-contained (no runtime external requests) and works offline.

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

## "Refresh every day"

`scripts/generate-data.mjs` runs before every build and stamps `lib/data/meta.json`
with the current date, academic year, and time-sensitive constants. The GitHub
Actions workflow (`.github/workflows/deploy.yml`) runs on a **daily cron
(08:10 UTC)**, so each rebuild re-stamps "today" and redeploys.

## Deployment (GitHub Pages)

1. In the repo, go to **Settings → Pages** and set **Source = GitHub Actions**.
2. Merge this branch into `main`.
3. The workflow builds with the correct base path and publishes to Pages.
   It also redeploys daily and can be triggered manually from the Actions tab.

The site will be served at `https://<owner>.github.io/<repo>/`.
