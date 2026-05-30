"use client";

import React, { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  group?: string;
}

/**
 * A fixed right-edge navigation rail. Collapsed it shows a column of dots;
 * on hover it expands to reveal section labels for quick jumping while you
 * scroll. Also reflects a live scroll-progress indicator.
 */
export function HoverNav({
  items,
  active,
  onSelect,
}: {
  items: NavItem[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section quick-nav"
      className="group fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col items-end gap-1 rounded-2xl border border-transparent bg-transparent p-1 transition-all duration-300 group-hover:border-slate-200 group-hover:bg-white/95 group-hover:p-2 group-hover:shadow-xl group-hover:backdrop-blur dark:group-hover:border-slate-700 dark:group-hover:bg-slate-900/95">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              title={it.label}
              aria-current={isActive ? "true" : undefined}
              className="flex w-full items-center justify-end gap-2 rounded-lg px-1 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span
                className={
                  "max-w-0 overflow-hidden whitespace-nowrap text-right text-xs font-medium opacity-0 transition-all duration-300 group-hover:max-w-[14rem] group-hover:opacity-100 " +
                  (isActive ? "text-brand-700 dark:text-brand-300" : "text-slate-600 dark:text-slate-300")
                }
              >
                {it.label}
              </span>
              <span
                className={
                  "h-2.5 shrink-0 rounded-full transition-all duration-300 " +
                  (isActive
                    ? "w-6 bg-brand-600"
                    : "w-2.5 bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600")
                }
              />
            </button>
          );
        })}
      </div>
      {/* scroll progress bar */}
      <div className="absolute -right-0.5 top-0 h-full w-1 overflow-hidden rounded-full bg-transparent">
        <div
          className="w-full rounded-full bg-gradient-to-b from-brand-400 to-brand-600 transition-[height]"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </nav>
  );
}

/** Floating "back to top" button that appears after scrolling down. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:bg-brand-700"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
