"use client";

import React, { useState } from "react";
import { SectionHeader, Callout, Badge } from "../ui";
import { FundingStack, SimpleBars } from "../charts";
import { scenarios } from "@/lib/data/scenarios";
import { usd } from "@/lib/format";

export function Scenarios() {
  const [openId, setOpenId] = useState<string>(scenarios[0].id);
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Seven students"
        title="Sample students & their funding packages"
        intro="Seven realistic students — from the early-saver success story to the worst-case stack of mistakes — with the exact mix of savings, grants, work, and loans that pays their way."
      />

      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white">Total debt at graduation, all seven students</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The spread runs from $0 (smart plays) to six figures (the cautionary cases). Same goal, wildly different outcomes.
        </p>
        <div className="mt-3">
          <SimpleBars
            data={scenarios.map((s) => ({
              name: s.name.split(" — ")[0],
              value: s.totalDebt,
              color: s.totalDebt === 0 ? "#10b981" : s.totalDebt > 50000 ? "#dc2626" : s.totalDebt > 12000 ? "#f97316" : "#1d57f5",
            }))}
            height={260}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setOpenId(s.id)}
            className={
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition " +
              (openId === s.id
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700")
            }
          >
            {s.name.split(" — ")[0]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {scenarios.map((s) => {
          const total = s.funding.reduce((a, b) => a + b.amount, 0);
          const isWorst = s.id === "sophia" || s.id === "harper";
          if (s.id !== openId) return null;
          return (
            <div key={s.id} className={"card " + (isWorst ? "border-red-200 dark:border-red-900" : "")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{s.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{s.archetype} · {s.school}</p>
                </div>
                {isWorst ? <Badge tone="red">Cautionary</Badge> : <Badge tone="green">Smart play</Badge>}
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{s.family}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Tile label="Sticker / year" value={usd(s.stickerPerYear)} />
                <Tile label="Net cost / year" value={usd(s.netPerYear)} />
                <Tile label="Funded / year" value={usd(total)} />
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Annual funding stack</p>
                <FundingStack data={s.funding} />
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {s.funding.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.color }} />
                      {f.label}: {usd(f.amount)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Loan package</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{s.loanPackage}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Outcome</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{s.outcome}</p>
                </div>
              </div>

              <Callout tone={isWorst ? "red" : "green"} title="Lesson">
                {s.lesson}
              </Callout>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 text-center dark:border-slate-700">
      <div className="text-lg font-extrabold text-slate-900 dark:text-white">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
