"use client";

import React, { useMemo, useState } from "react";
import { SectionHeader, ToggleGroup, Badge } from "../ui";
import { glossary, faqs, faqCategories } from "@/lib/data/learn";

type Tab = "faq" | "glossary";

export function LearnSection() {
  const [tab, setTab] = useState<Tab>("faq");
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Learn the language"
        title="FAQ & glossary"
        intro="The questions families actually ask, answered plainly — plus a plain-language glossary of every term in this guide."
      />
      <ToggleGroup<Tab>
        value={tab}
        onChange={setTab}
        options={[
          { value: "faq", label: "Frequently asked questions" },
          { value: "glossary", label: "Glossary" },
        ]}
      />
      {tab === "faq" ? <FAQView /> : <GlossaryView />}
    </div>
  );
}

function FAQView() {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(0);
  const list = useMemo(
    () => (cat === "All" ? faqs : faqs.filter((f) => f.category === cat)),
    [cat]
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
        {["All", ...faqCategories].map((c) => (
          <button
            key={c}
            onClick={() => {
              setCat(c);
              setOpen(null);
            }}
            className={
              "rounded-full px-3 py-1 text-xs font-medium transition " +
              (cat === c
                ? "bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-300"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100")
            }
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {list.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="card !p-0">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <Badge tone="blue">{f.category}</Badge>
                  <span className="font-semibold text-slate-900 dark:text-white">{f.q}</span>
                </span>
                <svg
                  className={"h-5 w-5 shrink-0 text-slate-400 transition-transform " + (isOpen ? "rotate-180" : "")}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GlossaryView() {
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? glossary.filter((t) => `${t.term} ${t.definition} ${t.category}`.toLowerCase().includes(q))
      : glossary;
    return [...filtered].sort((a, b) => a.term.localeCompare(b.term));
  }, [query]);
  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms..."
        className="w-full max-w-xs rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((t) => (
          <div key={t.term} className="card">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white">{t.term}</h3>
              <Badge tone="neutral">{t.category}</Badge>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.definition}</p>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="py-8 text-center text-sm text-slate-400">No terms match your search.</p>}
    </div>
  );
}
