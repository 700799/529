"use client";

import React, { useMemo, useState } from "react";
import { SectionHeader, ToggleGroup, Badge, Callout } from "../ui";
import { Subscribe } from "../Subscribe";
import { articleSeed, articleCollections } from "@/lib/data/articleSeed";
import articlesData from "@/lib/data/articles.json";
import type { Article, ArticleWeek } from "@/lib/data/types";

type Mode = "fresh" | "library";
const PER_PAGE = 9;

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Only ever emit http(s) hrefs — defense in depth against a compromised feed
// smuggling a javascript:/data: URL into a link.
function safeHref(url: string): string {
  return /^https?:\/\//i.test(url) ? url : "#";
}

function ArticleCard({ a, rank }: { a: Article; rank?: number }) {
  return (
    <a
      href={safeHref(a.url)}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group relative flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {rank != null && (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
              {rank}
            </span>
          )}
          <Badge tone="blue">{a.topic}</Badge>
        </div>
        {a.date && (
          <span className="text-xs text-slate-400">
            {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        )}
      </div>
      <h4 className="mt-2 font-semibold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
        {a.title}
      </h4>
      {a.summary && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{a.summary}</p>}
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{a.source}</span>
        <span className="text-xs text-slate-400">{hostOf(a.url)}</span>
      </div>
      {/* hover reveal */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export function ReadingRoom() {
  const hasLive = (articlesData as { hasLive: boolean }).hasLive;
  const weeks = (articlesData as unknown as { weeks: ArticleWeek[] }).weeks || [];
  const [mode, setMode] = useState<Mode>(hasLive ? "fresh" : "library");

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Reading room"
        title="The ten best articles, every week"
        intro="A continuously refreshed reading list. The published site fetches fresh news on 529s, financial aid, and paying for college every day and ranks the week's ten best. Plus a hand-curated library of the most useful evergreen guides — page through both."
      />

      <Subscribe />

      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup<Mode>
          value={mode}
          onChange={setMode}
          options={[
            { value: "fresh", label: "Fresh this week" },
            { value: "library", label: "Editor's library" },
          ]}
        />
        {hasLive ? (
          <Badge tone="green">{(articlesData as { liveCount: number }).liveCount} live articles</Badge>
        ) : (
          <Badge tone="neutral">Live feed updates daily on the published site</Badge>
        )}
      </div>

      {mode === "fresh" ? <FreshView weeks={weeks} hasLive={hasLive} /> : <LibraryView />}
    </div>
  );
}

function FreshView({ weeks, hasLive }: { weeks: ArticleWeek[]; hasLive: boolean }) {
  const [wi, setWi] = useState(0);

  if (!hasLive || weeks.length === 0) {
    return (
      <Callout tone="blue" title="Fresh articles populate on the live site">
        This environment couldn&apos;t reach the news feeds at build time, so no dated articles are shown here. On the deployed GitHub
        Pages site, the daily build fetches the week&apos;s top stories automatically. In the meantime, browse the hand-picked{" "}
        <strong>Editor&apos;s library</strong> tab — it covers the same ground with the best evergreen guides.
      </Callout>
    );
  }

  const week = weeks[wi];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{week.weekLabel}</h3>
        <div className="flex items-center gap-2">
          <PagerButton disabled={wi >= weeks.length - 1} onClick={() => setWi((i) => Math.min(weeks.length - 1, i + 1))}>
            ← Older
          </PagerButton>
          <span className="text-xs text-slate-400">
            Week {wi + 1} of {weeks.length}
          </span>
          <PagerButton disabled={wi <= 0} onClick={() => setWi((i) => Math.max(0, i - 1))}>
            Newer →
          </PagerButton>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {week.articles.map((a, i) => (
          <ArticleCard key={a.url + i} a={a} rank={i + 1} />
        ))}
      </div>
      {/* week jump pills */}
      {weeks.length > 1 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {weeks.map((w, i) => (
            <button
              key={w.weekStart}
              onClick={() => setWi(i)}
              className={
                "rounded-full px-3 py-1 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
                (i === wi
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700")
              }
            >
              {w.weekLabel.replace("Week of ", "")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LibraryView() {
  const [collection, setCollection] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articleSeed.filter((a) => {
      if (collection !== "All" && a.collection !== collection) return false;
      if (q && !`${a.title} ${a.source} ${a.summary} ${a.topic}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [collection, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages - 1);
  const slice = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  function setColl(c: string) {
    setCollection(c);
    setPage(0);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
          {["All", ...articleCollections].map((c) => (
            <button
              key={c}
              onClick={() => setColl(c)}
              className={
                "rounded-full px-3 py-1 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
                (collection === c
                  ? "bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-300"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100")
              }
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          placeholder="Search the library..."
          className="ml-auto w-full max-w-xs rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slice.map((a, i) => (
          <ArticleCard key={a.url + i} a={a} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">No articles match your search.</p>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <PagerButton disabled={safePage <= 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
            ← Prev
          </PagerButton>
          <div className="flex gap-1">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={
                  "h-8 w-8 rounded-full text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
                  (i === safePage
                    ? "bg-brand-600 text-white"
                    : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700")
                }
              >
                {i + 1}
              </button>
            ))}
          </div>
          <PagerButton disabled={safePage >= pages - 1} onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}>
            Next →
          </PagerButton>
        </div>
      )}
      <p className="text-center text-xs text-slate-400">
        Showing {slice.length} of {filtered.length} curated articles · page {safePage + 1} of {pages}
      </p>
    </div>
  );
}

function PagerButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
    >
      {children}
    </button>
  );
}
