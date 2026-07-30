/**
 * generate-og.mjs
 *
 * Renders a branded 1200x630 Open Graph image to public/og.png at build time.
 * `ImageResponse` (next/og) requires the edge runtime and is unavailable under
 * `output: "export"`, so we rasterize an SVG with @resvg/resvg-js (prebuilt
 * binary, CI-safe) instead. Runs from the `prebuild` hook.
 */

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d57f5"/>
      <stop offset="100%" stop-color="#152057"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(80,90)">
    <rect x="0" y="0" width="120" height="120" rx="28" fill="#ffffff"/>
    <text x="60" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="52" font-weight="800" fill="#1d57f5">529</text>
  </g>
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="#ffffff">The Complete 529 &amp;</text>
  <text x="80" y="386" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="#ffffff">College Funding Guide</text>
  <text x="80" y="470" font-family="Arial, sans-serif" font-size="34" fill="#bcdaff">Compare every plan &#183; calculators &#183; loans &amp; aid &#183; scholarships</text>
  <g transform="translate(80,520)">
    <rect x="0" y="0" width="360" height="56" rx="28" fill="#ffffff" opacity="0.14"/>
    <text x="180" y="37" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff">Updated daily &#183; self-contained</text>
  </g>
</svg>`;

const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
writeFileSync(join(publicDir, "og.png"), png);
console.log(`[generate-og] Wrote public/og.png (${png.length} bytes).`);
