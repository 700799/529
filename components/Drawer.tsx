"use client";

import React, { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Drawer({
  open,
  title,
  accent = "#1d57f5",
  onClose,
  onPrev,
  onNext,
  children,
}: {
  open: boolean;
  title: string;
  accent?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // When the drawer opens: lock scroll, move focus in, trap Tab, close on Esc.
  // On close: restore focus to the element that opened it.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the drawer (after the slide-in starts).
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!panel.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      // Restore focus to the trigger tile.
      triggerRef.current?.focus?.();
    };
  }, [open]);

  // Reset the body scroll to top when the active section changes.
  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTo({ top: 0 });
  }, [open, title]);

  const iconBtn =
    "rounded-full p-2 text-slate-500 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:hover:bg-slate-800";

  return (
    <div className={"fixed inset-0 z-50 " + (open ? "" : "pointer-events-none")} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={
          "absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />

      {/* Panel: bottom sheet on mobile, right drawer on desktop */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Section"}
        className={
          "absolute flex flex-col bg-slate-50 shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-950 " +
          "inset-x-0 bottom-0 h-[92svh] rounded-t-3xl " +
          (open ? "translate-y-0" : "translate-y-full") +
          " sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[min(1000px,94vw)] sm:rounded-t-none " +
          (open ? "sm:translate-x-0" : "sm:translate-x-full sm:translate-y-0")
        }
      >
        {/* Header */}
        <header
          className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800"
          style={{ boxShadow: `inset 0 3px 0 ${accent}` }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
            <h2 className="truncate text-base font-bold text-slate-900 dark:text-white">{title}</h2>
          </div>
          <div className="flex items-center gap-1">
            {onPrev && (
              <button onClick={onPrev} aria-label="Previous section" className={iconBtn}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
            )}
            {onNext && (
              <button onClick={onNext} aria-label="Next section" className={iconBtn}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="ml-1 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </header>

        {/* Scrollable body — always renders children so section content is in the
            static HTML for crawlers; visibility per section is controlled by the
            caller via the `hidden` attribute. */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
