"use client";

import React, { useEffect, useState } from "react";
import { Subscribe } from "./Subscribe";
import { Drawer } from "./Drawer";
import { SectionIcon } from "./SectionIcons";
import { SECTIONS, sectionById } from "@/lib/sections";
import { sectionPath, homePath, sectionIdFromPath } from "@/lib/routes";
import meta from "@/lib/data/meta.json";

/**
 * Which section the current URL selects.
 *
 * Sections are real routes (`/compare/`) so each is independently indexable.
 * Legacy `#compare` links are still honoured — they predate the routes and are
 * out in the wild — and are upgraded to the route form on load.
 */
function currentId(): string | null {
  if (typeof window === "undefined") return null;
  const fromPath = sectionIdFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  const hash = window.location.hash.replace(/^#/, "");
  return sectionById[hash] ? hash : null;
}

export default function GuideApp({ initialSection = null }: { initialSection?: string | null }) {
  // Seeded from the server-rendered route so the correct section is open in
  // the very first paint — no flash of the launcher on a deep link.
  const [openId, setOpenId] = useState<string | null>(initialSection);
  const [dark, setDark] = useState(false);

  // Theme init + persistence.
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

  // The active section mirrors the URL, so drawers are shareable/bookmarkable
  // and the browser Back button closes the drawer rather than leaving the site.
  useEffect(() => {
    const sync = () => setOpenId(currentId());
    sync();
    // Upgrade a legacy "#compare" entry to "/compare/" without adding history.
    const legacy = window.location.hash.replace(/^#/, "");
    if (!sectionIdFromPath(window.location.pathname) && sectionById[legacy]) {
      window.history.replaceState({ g529: true }, "", sectionPath(legacy));
    }
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const go = (id: string) => {
    if (!sectionById[id]) return;
    if (typeof window !== "undefined") {
      // pushState only when opening from the launcher, so Back always lands
      // back on the launcher rather than walking through every section visited.
      if (openId === null) window.history.pushState({ g529: true }, "", sectionPath(id));
      else window.history.replaceState({ g529: true }, "", sectionPath(id));
    }
    setOpenId(id);
  };

  const close = () => {
    if (typeof window !== "undefined") {
      if (window.history.state && (window.history.state as { g529?: boolean }).g529) {
        window.history.back(); // pops our entry; the popstate listener sets null
      } else {
        // Entered directly on a section route: rewrite to the launcher instead
        // of leaving the site.
        window.history.replaceState(null, "", homePath());
      }
    }
    setOpenId(null);
  };

  const drawerOpen = openId !== null;
  const idx = openId ? SECTIONS.findIndex((s) => s.id === openId) : -1;
  const current = idx >= 0 ? SECTIONS[idx] : null;
  const prev = idx > 0 ? () => go(SECTIONS[idx - 1].id) : undefined;
  const next = idx >= 0 && idx < SECTIONS.length - 1 ? () => go(SECTIONS[idx + 1].id) : undefined;

  // Exactly one section is un-hidden at all times (overview when the drawer is
  // closed), so its content is present/crawlable and heavy charts only mount for
  // the section on screen. On a section route that is the routed section, which
  // is what puts its content in the statically exported HTML.
  const contentActiveId = openId ?? initialSection ?? "overview";

  return (
    <div className="flex h-[100svh] flex-col overflow-hidden">
      {/* Background (launcher). `inert` while the drawer is open so it isn't
          tabbable or exposed to assistive tech. */}
      <div className="flex min-h-0 flex-1 flex-col" inert={drawerOpen}>
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
            aria-pressed={dark}
            className="rounded-full p-2 text-slate-500 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
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
            {/* h2, not h1: the Overview section's prerendered headline (below) is
                the page's single h1 for SEO. */}
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Everything you need to pay for college
            </h2>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              Tap any tile — it opens in a drawer. Compare every plan, run the calculators, and avoid the worst-case mistakes.
            </p>
          </div>
          <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-4">
            {SECTIONS.map((s) => (
              // A real anchor, not a button: crawlers follow href to discover
              // each section route, and users get middle-click / open-in-new-tab
              // for free. The click handler keeps in-page navigation instant;
              // modified clicks fall through to the browser.
              <a
                key={s.id}
                href={sectionPath(s.id)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  go(s.id);
                }}
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
              </a>
            ))}
          </div>
        </main>
      </div>

      {/* Drawer — all sections are always rendered (for SEO/prerender); only the
          active one is visible. */}
      <Drawer
        open={drawerOpen}
        title={current?.label ?? ""}
        accent={current?.accent}
        onClose={close}
        onPrev={prev}
        onNext={next}
      >
        {SECTIONS.map((s, i) => {
          const nextOfThis = i < SECTIONS.length - 1 ? SECTIONS[i + 1] : undefined;
          return (
            <div key={s.id} id={s.id} hidden={s.id !== contentActiveId} className="space-y-10">
              {s.render(go)}
              {s.showSubscribe && <Subscribe />}
              <SectionFooter
                onClose={close}
                onNext={nextOfThis ? () => go(nextOfThis.id) : undefined}
                nextLabel={nextOfThis?.label}
              />
            </div>
          );
        })}
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
      <button onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
        ← Back to menu
      </button>
      {onNext && nextLabel && (
        <button onClick={onNext} className="rounded-full bg-brand-600 px-4 py-2 font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          Next: {nextLabel} →
        </button>
      )}
    </footer>
  );
}
