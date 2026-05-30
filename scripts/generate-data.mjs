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
  note: "Tax and aid figures are maintained estimates for the 2025-2026 cycle and are stamped on each daily rebuild. Verify current numbers against the cited primary sources before acting.",
};

writeFileSync(
  join(outDir, "meta.json"),
  JSON.stringify(meta, null, 2) + "\n",
  "utf8"
);

console.log(
  `[generate-data] Stamped meta.json for ${meta.generatedAtHuman} (AY ${academicYear}).`
);
