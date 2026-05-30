"use client";

import React, { useEffect, useState } from "react";
import { Overview, WhatIs529 } from "./sections/overview";
import { ComparePlans } from "./sections/compare";
import { LoansAndAid } from "./sections/loans";
import { Scenarios } from "./sections/scenarios";
import { Tradeoffs, AidStrategy, AgeSteps, GiftTaxSection } from "./sections/strategy";
import { CalculatorsSection, Crypto, JuniorCollege, Sources } from "./sections/extras";
import { ReadingRoom } from "./sections/articles";
import { LearnSection } from "./sections/learn";
import { HoverNav, BackToTop } from "./HoverNav";
import { Subscribe } from "./Subscribe";
import meta from "@/lib/data/meta.json";

interface Tab {
  id: string;
  label: string;
}

const TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "what", label: "What is a 529?" },
  { id: "compare", label: "Compare plans" },
  { id: "calculators", label: "Calculators" },
  { id: "loans", label: "Costs, loans & aid" },
  { id: "scenarios", label: "7 student scenarios" },
  { id: "tradeoffs", label: "Tradeoffs & worst cases" },
  { id: "aid-strategy", label: "Financial-aid strategy" },
  { id: "ages", label: "Steps by age" },
  { id: "gifts", label: "Grandparents & gifts" },
  { id: "crypto", label: "Crypto" },
  { id: "junior", label: "2-year & working programs" },
  { id: "learn", label: "FAQ & glossary" },
  { id: "articles", label: "Reading room" },
  { id: "sources", label: "Sources" },
];

export default function GuideApp() {
  const [active, setActive] = useState<string>("overview");
  const [dark, setDark] = useState(false);

  // Initialize theme from system / storage.
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme529") : null;
    const prefers = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme529", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  const go = (id: string) => {
    setActive(id);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Header + sticky pill nav */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <button onClick={() => go("overview")} className="flex items-center gap-2 text-left">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-extrabold text-white">529</span>
              <span className="font-bold tracking-tight text-slate-900 dark:text-white">College Funding Guide</span>
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              className="rounded-full p-2 text-slate-500 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {dark ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M21 12.8A8.5 8.5 0 1111.2 3a6.6 6.6 0 009.8 9.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
              )}
            </button>
          </div>
          {/* Pill toggle navigation */}
          <nav className="-mx-4 overflow-x-auto px-4 pb-3" aria-label="Sections">
            <div className="flex gap-2">
              {TABS.map((t) => {
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => go(t.id)}
                    aria-pressed={isActive}
                    className={
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
                      (isActive
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700")
                    }
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div key={active} className="animate-fade-in">
          {active === "overview" && <Overview go={go} />}
          {active === "what" && <WhatIs529 />}
          {active === "compare" && <ComparePlans />}
          {active === "calculators" && <CalculatorsSection />}
          {active === "loans" && <LoansAndAid />}
          {active === "scenarios" && <Scenarios />}
          {active === "tradeoffs" && <Tradeoffs />}
          {active === "aid-strategy" && <AidStrategy />}
          {active === "ages" && <AgeSteps />}
          {active === "gifts" && <GiftTaxSection />}
          {active === "crypto" && <Crypto />}
          {active === "junior" && <JuniorCollege />}
          {active === "learn" && <LearnSection />}
          {active === "articles" && <ReadingRoom />}
          {active === "sources" && <Sources />}
        </div>

        {active !== "articles" && active !== "overview" && (
          <div className="mt-12">
            <Subscribe />
          </div>
        )}
      </main>

      <HoverNav items={TABS} active={active} onSelect={go} />
      <BackToTop />

      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>
              The Complete 529 &amp; College Funding Guide — self-contained &amp; rebuilt daily. Last updated{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{meta.generatedAtHuman}</span>.
            </p>
            <button onClick={() => go("sources")} className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              Sources &amp; disclaimer
            </button>
          </div>
          <p className="mt-3 text-xs">
            Educational information only — not tax, legal, or investment advice. Verify all figures against the official plan documents
            and current IRS / Federal Student Aid guidance.
          </p>
        </div>
      </footer>
    </div>
  );
}
