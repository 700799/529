/**
 * generate-data.mjs
 *
 * Runs before every dev/build (and on the daily GitHub Actions schedule).
 * It stamps a fresh "last updated" timestamp and recomputes the time-sensitive
 * constants the guide depends on (current academic year, projected tuition
 * inflation figures, etc.) so the published site reflects the day it was built.
 *
 * The guide is fully self-contained: all reference data lives in /lib/data.
 * This script only regenerates the small set of values that are a function of
 * "today", which is what the daily refresh is for.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fetchArticles } from "./fetch-articles.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "lib", "data");
mkdirSync(outDir, { recursive: true });

const now = new Date();

// Academic year that is currently being funded (fall start).
const month = now.getUTCMonth(); // 0 = Jan
const year = now.getUTCFullYear();
// After June we are planning for the *next* fall.
const fallYear = month >= 6 ? year + 1 : year;
const academicYear = `${fallYear}-${(fallYear + 1).toString().slice(2)}`;

// Long-run college cost inflation assumption used by the projection charts.
const TUITION_INFLATION = 0.05;

// The cycle the hand-maintained constants below actually represent. Must match
// DATA_CYCLE in lib/data/meta-cycle.ts -- a test asserts they agree. This is
// deliberately NOT derived from the build date: the nightly job re-stamps
// dates, it does not re-verify tax and aid figures.
const DATA_CYCLE = "2025-26";

const meta = {
  generatedAtISO: now.toISOString(),
  generatedAtHuman: now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }),
  buildYear: year,
  academicYear,
  tuitionInflationAssumption: TUITION_INFLATION,
  // Figures below are maintained constants (see /lib/data/sources.ts).
  giftTaxAnnualExclusion: 19000,
  superfunding5yr: 95000,
  superfunding5yrCouple: 190000,
  estateExemption2026: 15000000,
  rothRolloverLifetime: 35000,
  pellMax: 7395,
  dataCycle: DATA_CYCLE,
  note: `Tax and aid figures are maintained estimates for the ${DATA_CYCLE} cycle. The site rebuilds daily, but that re-stamps the date and refreshes articles -- it does not re-verify these figures. Check them against the cited primary sources before acting.`,
};

writeFileSync(
  join(outDir, "meta.json"),
  JSON.stringify(meta, null, 2) + "\n",
  "utf8"
);

console.log(
  `[generate-data] Stamped meta.json for ${meta.generatedAtHuman} (AY ${academicYear}).`
);

// --- Fresh articles (build-time fetch with graceful fallback) -------------
let articles = { hasLive: false, liveCount: 0, feedsTried: 0, weeks: [] };
try {
  articles = await fetchArticles();
} catch (e) {
  console.warn("[generate-data] Article fetch failed; using curated fallback.", e?.message || e);
}

const articlesData = {
  generatedAtISO: now.toISOString(),
  generatedAtHuman: meta.generatedAtHuman,
  hasLive: articles.hasLive,
  liveCount: articles.liveCount,
  feedsTried: articles.feedsTried,
  weeks: articles.weeks,
};

writeFileSync(
  join(outDir, "articles.json"),
  JSON.stringify(articlesData, null, 2) + "\n",
  "utf8"
);

console.log(
  `[generate-data] Articles: ${articles.liveCount} live across ${articles.weeks.length} week(s) from ${articles.feedsTried} feeds${
    articles.hasLive ? "" : " (falling back to curated library)"
  }.`
);
