"use client";

import React, { useEffect, useState } from "react";
import { Subscribe } from "./Subscribe";
import { Drawer } from "./Drawer";
import { SectionIcon } from "./SectionIcons";
import { SECTIONS } from "@/lib/sections";
import meta from "@/lib/data/meta.json";

export default function GuideApp() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme529") : null;
    const prefers = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(stored ? stored === "dark" : prefers);
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

  const idx = openId ? SECTIONS.findIndex((s) => s.id === openId) : -1;
  const current = idx >= 0 ? SECTIONS[idx] : null;
  const go = (id: string) => setOpenId(id);
  const close = () => setOpenId(null);
  const prev = idx > 0 ? () => setOpenId(SECTIONS[idx - 1].id) : undefined;
  const next = idx >= 0 && idx < SECTIONS.length - 1 ? () => setOpenId(SECTIONS[idx + 1].id) : undefined;

  return (
    <div className="flex h-[100svh] flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">529</span>
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">College Funding Guide</div>
            <div className="text-[11px] text-slate-400">Updated {meta.generatedAtHuman}</div>
          </div>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="rounded-full p-2 text-slate-500 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M21 12.8A8.5 8.5 0 1111.2 3a6.6 6.6 0 009.8 9.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          )}
        </button>
      </header>

      {/* App launcher grid — fits the viewport, no scrolling */}
      <main className="flex min-h-0 flex-1 flex-col px-3 pb-3 sm:px-6 sm:pb-6">
        <div className="mb-2 shrink-0 px-1 sm:mb-3">
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Everything you need to pay for college
          </h1>
          <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            Tap any tile — it opens in a drawer. Compare every plan, run the calculators, and avoid the worst-case mistakes.
          </p>
        </div>
        <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-4">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="group flex min-h-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-2 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-800 dark:bg-slate-900 sm:gap-2 sm:p-3"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition group-hover:scale-105 sm:h-12 sm:w-12"
                style={{ backgroundColor: s.accent }}
              >
                <SectionIcon id={s.id} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-slate-800 dark:text-slate-100 sm:text-xs">
                {s.label}
              </span>
              <span className="hidden text-[10px] text-slate-400 sm:block">{s.blurb}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Drawer for the active section */}
      <Drawer
        open={openId !== null}
        title={current?.label ?? ""}
        accent={current?.accent}
        onClose={close}
        onPrev={prev}
        onNext={next}
      >
        {current && (
          <div className="animate-fade-in space-y-10">
            {current.render(go)}
            {current.showSubscribe && <Subscribe />}
            <SectionFooter onClose={close} onNext={next} nextLabel={next ? SECTIONS[idx + 1].label : undefined} />
          </div>
        )}
      </Drawer>
    </div>
  );
}

function SectionFooter({
  onClose,
  onNext,
  nextLabel,
}: {
  onClose: () => void;
  onNext?: () => void;
  nextLabel?: string;
}) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
      <button onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
        ← Back to menu
      </button>
      {onNext && nextLabel && (
        <button onClick={onNext} className="rounded-full bg-brand-600 px-4 py-2 font-semibold text-white transition hover:bg-brand-700">
          Next: {nextLabel} →
        </button>
      )}
    </footer>
  );
}
