import React from "react";
import { Overview, WhatIs529 } from "@/components/sections/overview";
import { ComparePlans } from "@/components/sections/compare";
import { LoansAndAid } from "@/components/sections/loans";
import { Scenarios } from "@/components/sections/scenarios";
import { Tradeoffs, AidStrategy, AgeSteps, GiftTaxSection } from "@/components/sections/strategy";
import { CalculatorsSection, Crypto, JuniorCollege, Sources } from "@/components/sections/extras";
import { ReadingRoom } from "@/components/sections/articles";
import { LearnSection } from "@/components/sections/learn";
import { SpecialCases } from "@/components/sections/special";
import { iconIds } from "@/components/SectionIcons";

/**
 * Single source of truth for the app's sections.
 *
 * To add, remove, or reorder a section you edit THIS file only (plus create the
 * section component and add a matching icon in components/SectionIcons.tsx).
 * The launcher grid, the drawer, deep-link hashes, and the sitemap all derive
 * from this array.
 */
export interface SectionDef {
  /** Stable id — also the deep-link hash (e.g. "#compare") and icon key. */
  id: string;
  label: string;
  blurb: string;
  /** Tile / drawer accent color. */
  accent: string;
  /** Whether to append the newsletter Subscribe block inside the drawer. */
  showSubscribe?: boolean;
  render: (go: (id: string) => void) => React.ReactNode;
}

export const SECTIONS: SectionDef[] = [
  { id: "overview", label: "Overview", blurb: "Start here", accent: "#1d57f5", render: (go) => <Overview go={go} /> },
  { id: "what", label: "What is a 529?", blurb: "The basics", accent: "#0ea5e9", showSubscribe: true, render: () => <WhatIs529 /> },
  { id: "compare", label: "Compare plans", blurb: "50 states + more", accent: "#6366f1", showSubscribe: true, render: () => <ComparePlans /> },
  { id: "calculators", label: "Calculators", blurb: "10 tools", accent: "#8b5cf6", showSubscribe: true, render: () => <CalculatorsSection /> },
  { id: "loans", label: "Costs, loans & aid", blurb: "Pay for it", accent: "#0891b2", showSubscribe: true, render: () => <LoansAndAid /> },
  { id: "scenarios", label: "7 scenarios", blurb: "Real packages", accent: "#2563eb", showSubscribe: true, render: () => <Scenarios /> },
  { id: "tradeoffs", label: "Tradeoffs & worst cases", blurb: "Avoid these", accent: "#ef4444", showSubscribe: true, render: () => <Tradeoffs /> },
  { id: "aid-strategy", label: "Financial-aid strategy", blurb: "Maximize aid", accent: "#10b981", showSubscribe: true, render: () => <AidStrategy /> },
  { id: "ages", label: "Steps by age", blurb: "Birth to grad", accent: "#14b8a6", showSubscribe: true, render: () => <AgeSteps /> },
  { id: "gifts", label: "Grandparents & gifts", blurb: "Gift tax", accent: "#f59e0b", showSubscribe: true, render: () => <GiftTaxSection /> },
  { id: "crypto", label: "Crypto", blurb: "Digital assets", accent: "#f97316", showSubscribe: true, render: () => <Crypto /> },
  { id: "junior", label: "2-year & working", blurb: "Low-cost paths", accent: "#84cc16", showSubscribe: true, render: () => <JuniorCollege /> },
  { id: "learn", label: "FAQ & glossary", blurb: "Learn the terms", accent: "#22c55e", showSubscribe: true, render: () => <LearnSection /> },
  { id: "articles", label: "Reading room", blurb: "Weekly top 10", accent: "#3b82f6", render: () => <ReadingRoom /> },
  { id: "special", label: "Sports & music", blurb: "Scholarships", accent: "#d946ef", showSubscribe: true, render: () => <SpecialCases /> },
  { id: "sources", label: "Sources", blurb: "References", accent: "#64748b", showSubscribe: true, render: () => <Sources /> },
];

export const sectionById: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s])
);

// Dev-time guard: every section must have a matching icon, otherwise the tile
// silently falls back to the overview icon.
if (process.env.NODE_ENV !== "production") {
  const missing = SECTIONS.filter((s) => !iconIds.includes(s.id)).map((s) => s.id);
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn("[sections] These section ids have no icon in SectionIcons.tsx:", missing);
  }
}
