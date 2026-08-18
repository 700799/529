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
  /**
   * Meta description for this section's route. Written for search results —
   * roughly 120-160 characters, leading with what the page actually answers.
   * `blurb` is a two-word tile caption and makes a poor snippet.
   */
  seoDescription: string;
  /** Whether to append the newsletter Subscribe block inside the drawer. */
  showSubscribe?: boolean;
  render: (go: (id: string) => void) => React.ReactNode;
}

export const SECTIONS: SectionDef[] = [
  { id: "overview", label: "Overview", blurb: "Start here", accent: "#1d57f5", seoDescription:
      "How a 529 plan works, the college-funding waterfall, and the key numbers — a plain-English starting point for paying for college.", render: (go) => <Overview go={go} /> },
  { id: "what", label: "What is a 529?", blurb: "The basics", accent: "#0ea5e9", seoDescription:
      "What a 529 plan is, which expenses qualify, contribution and balance limits, and the $35,000 Roth IRA rollover escape hatch.", showSubscribe: true, render: () => <WhatIs529 /> },
  { id: "compare", label: "Compare plans", blurb: "50 states + more", accent: "#6366f1", seoDescription:
      "Compare 529 plans across all 50 states and DC by fee, state tax deduction, and balance cap — plus Vanguard, Fidelity, Schwab, prepaid tuition, and Coverdell alternatives.", showSubscribe: true, render: () => <ComparePlans /> },
  { id: "calculators", label: "Calculators", blurb: "10 tools", accent: "#8b5cf6", seoDescription: "Free 529 calculators: growth projection with fees, tax savings vs a taxable account, your state's deduction, loan repayment, and 401(k)-raid true cost.".replace(/^/, ""), showSubscribe: true, render: () => <CalculatorsSection /> },
  { id: "loans", label: "Costs, loans & aid", blurb: "Pay for it", accent: "#0891b2", seoDescription:
      "What college actually costs by school tier, every loan type from subsidized to private, and the federal grants and programs that cut the bill.", showSubscribe: true, render: () => <LoansAndAid /> },
  { id: "scenarios", label: "7 scenarios", blurb: "Real packages", accent: "#2563eb", seoDescription:
      "Seven realistic student funding scenarios, from the early saver to the worst-case stack of mistakes, each with its full aid and loan package.", showSubscribe: true, render: () => <Scenarios /> },
  { id: "tradeoffs", label: "Tradeoffs & worst cases", blurb: "Avoid these", accent: "#ef4444", seoDescription:
      "Honest pros and cons of every college funding option — including the real math on raiding a 401(k) and on payday loans.", showSubscribe: true, render: () => <Tradeoffs /> },
  { id: "aid-strategy", label: "Financial-aid strategy", blurb: "Maximize aid", accent: "#10b981", seoDescription:
      "How to position assets legally to maximize need-based financial aid: what FAFSA counts, what it ignores, and when timing matters.", showSubscribe: true, render: () => <AidStrategy /> },
  { id: "ages", label: "Steps by age", blurb: "Birth to grad", accent: "#14b8a6", seoDescription: "A college savings checklist for every stage, from a newborn's first account to the final year before graduation.".replace(/^/, ""), showSubscribe: true, render: () => <AgeSteps /> },
  { id: "gifts", label: "Grandparents & gifts", blurb: "Gift tax", accent: "#f59e0b", seoDescription:
      "How grandparents can fund a 529: the annual gift-tax exclusion, five-year superfunding, and the FAFSA rule change that removed the aid penalty.", showSubscribe: true, render: () => <GiftTaxSection /> },
  { id: "crypto", label: "Crypto", blurb: "Digital assets", accent: "#f97316", seoDescription: "Using crypto for college savings: the tax mechanics, the financial-aid impact, and the drawbacks against a 529's tax-free growth.".replace(/^/, ""), showSubscribe: true, render: () => <Crypto /> },
  { id: "junior", label: "2-year & working", blurb: "Low-cost paths", accent: "#84cc16", seoDescription:
      "Lower-cost routes to a degree: community-college transfer, free-tuition programs, apprenticeships, co-ops, and employer tuition assistance.", showSubscribe: true, render: () => <JuniorCollege /> },
  { id: "learn", label: "FAQ & glossary", blurb: "Learn the terms", accent: "#22c55e", seoDescription:
      "Answers to the most common 529 questions, plus a plain-English glossary of college-funding terms from FAFSA to capitalization.", showSubscribe: true, render: () => <LearnSection /> },
  { id: "articles", label: "Reading room", blurb: "Weekly top 10", accent: "#3b82f6", seoDescription:
      "A daily-refreshed reading room of the latest 529, financial-aid, and college-cost articles worth your time.", render: () => <ReadingRoom /> },
  { id: "special", label: "Sports & music", blurb: "Scholarships", accent: "#d946ef", seoDescription:
      "Athletic and arts scholarships: realistic odds, recruiting timelines, and how sports and music money interacts with need-based aid.", showSubscribe: true, render: () => <SpecialCases /> },
  { id: "sources", label: "Sources", blurb: "References", accent: "#64748b", seoDescription: "Every primary source behind this guide — IRS guidance, Federal Student Aid, and each plan's disclosure documents.".replace(/^/, ""), showSubscribe: true, render: () => <Sources /> },
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
