import type { SchoolTier } from "./types";

// Average all-in cost of attendance (tuition + fees + room/board + books)
// by school tier for the 2025-26 year, with typical net price after aid.
// Sticker figures are rounded annual all-in estimates.

export const schoolTiers: SchoolTier[] = [
  {
    tier: "Community / 2-year college",
    example: "Local community college (in-district)",
    sticker: 13000,
    netAvg: 8500,
    fourYearSticker: 26000,
    typicalAid: "Pell + state grants frequently cover tuition entirely; many pay $0 tuition.",
    notes: "Tuition averages ~$4,000/yr; the rest is living costs. Transfer pathways cut a bachelor's cost dramatically.",
  },
  {
    tier: "In-state public university",
    example: "State flagship, resident",
    sticker: 29000,
    netAvg: 20000,
    fourYearSticker: 116000,
    typicalAid: "Merit + need aid commonly knock 25–40% off sticker.",
    notes: "The workhorse value. ~$11,000 tuition + ~$13,000 room/board + fees/books.",
  },
  {
    tier: "Out-of-state public university",
    example: "State flagship, non-resident",
    sticker: 47000,
    netAvg: 35000,
    fourYearSticker: 188000,
    typicalAid: "Merit scholarships for strong students can rival in-state pricing.",
    notes: "Non-resident tuition (~$30,000) is the big jump. Some schools offer regional tuition exchanges.",
  },
  {
    tier: "Private nonprofit college",
    example: "Mid-tier private university",
    sticker: 62000,
    netAvg: 36000,
    fourYearSticker: 248000,
    typicalAid: "High sticker, high discount: average tuition discount rate exceeds 56% for first-years.",
    notes: "The 'sticker shock' tier. Net price is often far lower than the headline number.",
  },
  {
    tier: "Elite / highly selective private",
    example: "Ivy+ and peers",
    sticker: 90000,
    netAvg: 28000,
    fourYearSticker: 360000,
    typicalAid: "Need-blind, no-loan aid: families under ~$100k–$200k often pay little or nothing.",
    notes: "Counterintuitively cheap for low/middle income due to huge endowments. Full-pay families pay the full ~$90k.",
  },
  {
    tier: "For-profit college",
    example: "National for-profit chain",
    sticker: 32000,
    netAvg: 28000,
    fourYearSticker: 128000,
    typicalAid: "Little institutional aid; heavy reliance on loans.",
    notes: "CAUTION: highest student-loan default rates and weakest earnings outcomes per dollar. Vet outcomes carefully.",
  },
];
