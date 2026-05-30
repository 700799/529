"use client";

import React, { useState } from "react";
import { SectionHeader, ToggleGroup, Badge, Callout } from "../ui";
import { SimpleBars } from "../charts";
import { loanTypes, federalPrograms } from "@/lib/data/loans";
import { schoolTiers } from "@/lib/data/schoolCosts";
import { loanStats } from "@/lib/data/misc";
import { usd } from "@/lib/format";

type Tab = "costs" | "loans" | "programs" | "stats";

export function LoansAndAid() {
  const [tab, setTab] = useState<Tab>("costs");
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Costs, loans & aid"
        title="What college costs and how people pay"
        intro="Average costs by school tier, every loan type from best to worst, the federal grant and forgiveness programs, and the data on which students borrow what."
      />
      <ToggleGroup<Tab>
        value={tab}
        onChange={setTab}
        options={[
          { value: "costs", label: "Cost by school tier" },
          { value: "loans", label: "Types of loans" },
          { value: "programs", label: "Grants & federal programs" },
          { value: "stats", label: "Who borrows what" },
        ]}
      />
      {tab === "costs" && <CostTiers />}
      {tab === "loans" && <LoanTypes />}
      {tab === "programs" && <FederalPrograms />}
      {tab === "stats" && <LoanStatsView />}
    </div>
  );
}

function CostTiers() {
  const stickerData = schoolTiers.map((t) => ({ name: t.tier.split(" ")[0], value: t.sticker }));
  const netData = schoolTiers.map((t) => ({ name: t.tier.split(" ")[0], value: t.netAvg, color: "#10b981" }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white">Annual sticker price (all-in)</h3>
          <SimpleBars data={stickerData} height={240} />
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white">Average NET price after aid</h3>
          <SimpleBars data={netData} height={240} />
        </div>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Annual sticker</th>
              <th>Avg. net</th>
              <th>4-year sticker</th>
              <th>Typical aid &amp; notes</th>
            </tr>
          </thead>
          <tbody>
            {schoolTiers.map((t) => (
              <tr key={t.tier}>
                <td className="font-semibold text-slate-900 dark:text-white">{t.tier}<div className="text-xs font-normal text-slate-400">{t.example}</div></td>
                <td>{usd(t.sticker)}</td>
                <td className="font-semibold text-accent-600 dark:text-accent-400">{usd(t.netAvg)}</td>
                <td>{usd(t.fourYearSticker)}</td>
                <td><div className="text-xs">{t.typicalAid}</div><div className="mt-1 text-xs text-slate-400">{t.notes}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout tone="green" title="Sticker price is fiction for most families">
        The average first-year tuition discount at private colleges now exceeds 56%. Elite schools with no-loan aid can be cheaper than
        your state school for lower- and middle-income families. Always compare NET price (sticker minus grants), never the headline.
      </Callout>
    </div>
  );
}

function LoanTypes() {
  const catTone: Record<string, "green" | "blue" | "amber" | "red"> = {
    Federal: "green",
    "Federal (parent/grad)": "amber",
    State: "blue",
    Private: "red",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {loanTypes.map((l) => (
          <div key={l.name} className={"card " + (l.name.includes("Payday") ? "border-red-300 dark:border-red-800" : "")}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{l.name}</h3>
              <Badge tone={catTone[l.category]}>{l.category}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <KV label="Rate" value={l.rate} />
              <KV label="Fees" value={l.fees} />
              <KV label="Borrower" value={l.borrower} />
              <KV label="Limits" value={l.limits} />
            </div>
            <ul className="mt-3 list-disc space-y-0.5 pl-4 text-xs text-slate-600 dark:text-slate-300">
              {l.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <p className={"mt-2 rounded-lg p-2 text-xs " + (l.name.includes("Payday") ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300" : "bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300")}>
              <span className="font-semibold">Watch out:</span> {l.watchOut}
            </p>
          </div>
        ))}
      </div>
      <Callout tone="blue" title="The golden rule of borrowing">
        Always exhaust federal options before private. Federal loans carry income-driven repayment, deferment, forgiveness (PSLF), and
        death/disability discharge — protections private loans don&apos;t have. Borrow subsidized first, then unsubsidized, then think
        very hard before PLUS or private.
      </Callout>
    </div>
  );
}

function FederalPrograms() {
  const typeTone: Record<string, "green" | "blue" | "amber" | "red"> = {
    Grant: "green",
    Work: "blue",
    "Loan forgiveness": "green",
    "Tax credit": "amber",
    Service: "blue",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {federalPrograms.map((p) => (
          <div key={p.name} className="card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{p.name}</h3>
              <Badge tone={typeTone[p.type]}>{p.type}</Badge>
            </div>
            <p className="mt-2 text-sm font-semibold text-accent-600 dark:text-accent-400">{p.maxValue}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300"><strong>Who qualifies:</strong> {p.whoQualifies}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{p.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoanStatsView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {loanStats.map((s) => (
          <div key={s.group} className="card flex gap-4">
            <div className="shrink-0 text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.stat}</div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">{s.group}</div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <Callout tone="amber" title="The pattern in the data">
        Borrowing tracks both income and school type. Lower-income students lean on Pell + subsidized loans; middle-income families at
        pricey private schools take on the most Parent PLUS debt; and for-profit attendees borrow most and default most. Choosing the
        right school tier is itself a debt-avoidance strategy.
      </Callout>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">{value}</div>
    </div>
  );
}
