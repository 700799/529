"use client";

import React, { useMemo, useState } from "react";
import { SectionHeader, ToggleGroup, Badge, Callout } from "../ui";
import { statePlans } from "@/lib/data/statePlans";
import { directSoldPlans } from "@/lib/data/directSold";
import { prepaidPlans } from "@/lib/data/prepaidPlans";
import { altVehicles } from "@/lib/data/altVehicles";
import { pct } from "@/lib/format";

type View = "states" | "private" | "prepaid" | "alt";
type SortKey = "state" | "lowestFeePct" | "maxBalance" | "tier";

const tierLabel: Record<string, string> = { gold: "Top tier", silver: "Strong", bronze: "Okay", neutral: "No tax edge" };
const tierTone: Record<string, "blue" | "green" | "red" | "neutral"> = {
  gold: "green",
  silver: "blue",
  bronze: "neutral",
  neutral: "neutral",
};

export function ComparePlans() {
  const [view, setView] = useState<View>("states");

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Compare everything"
        title="Every 529 plan, side by side"
        intro="Toggle between all 50 states + DC, the brand-name private plans (Vanguard, Fidelity, Schwab), prepaid tuition programs, and non-529 alternatives like Coverdell."
      />

      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup<View>
          value={view}
          onChange={setView}
          options={[
            { value: "states", label: "State plans (50 + DC)" },
            { value: "private", label: "Private / brand-name" },
            { value: "prepaid", label: "Prepaid tuition" },
            { value: "alt", label: "Alternatives" },
          ]}
        />
      </div>

      {view === "states" && <StateTable />}
      {view === "private" && <PrivateCards />}
      {view === "prepaid" && <PrepaidCards />}
      {view === "alt" && <AltCards />}
    </div>
  );
}

function StateTable() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("tier");
  const [parityOnly, setParityOnly] = useState(false);
  const [taxOnly, setTaxOnly] = useState(false);

  const rows = useMemo(() => {
    let r = statePlans.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${p.state} ${p.planName} ${p.programManager}`.toLowerCase().includes(q))) return false;
      if (parityOnly && !p.taxParity) return false;
      if (taxOnly && p.deductionDetail.toLowerCase().includes("none")) return false;
      if (taxOnly && p.deductionDetail.toLowerCase().startsWith("n/a")) return false;
      return true;
    });
    const tierRank: Record<string, number> = { gold: 0, silver: 1, bronze: 2, neutral: 3 };
    r = [...r].sort((a, b) => {
      switch (sort) {
        case "lowestFeePct":
          return a.lowestFeePct - b.lowestFeePct;
        case "maxBalance":
          return b.maxBalance - a.maxBalance;
        case "tier":
          return tierRank[a.tier] - tierRank[b.tier] || a.state.localeCompare(b.state);
        default:
          return a.state.localeCompare(b.state);
      }
    });
    return r;
  }, [query, sort, parityOnly, taxOnly]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a state, plan, or manager..."
          className="w-full max-w-xs rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900"
        />
        <ToggleGroup<SortKey>
          size="sm"
          value={sort}
          onChange={setSort}
          options={[
            { value: "tier", label: "Best first" },
            { value: "state", label: "A–Z" },
            { value: "lowestFeePct", label: "Lowest fee" },
            { value: "maxBalance", label: "Highest cap" },
          ]}
        />
        <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={parityOnly} onChange={(e) => setParityOnly(e.target.checked)} className="accent-brand-600" />
          Tax parity only
        </label>
        <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={taxOnly} onChange={(e) => setTaxOnly(e.target.checked)} className="accent-brand-600" />
          Has a tax break
        </label>
        <span className="text-xs text-slate-400">{rows.length} plans</span>
      </div>

      <div className="table-wrap max-h-[36rem] overflow-y-auto">
        <table className="data">
          <thead>
            <tr>
              <th>State</th>
              <th>Plan &amp; manager</th>
              <th>Resident tax benefit</th>
              <th>Lowest fee</th>
              <th>Max balance</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.abbr}>
                <td className="font-semibold text-slate-900 dark:text-white">
                  {p.state} <span className="text-slate-400">({p.abbr})</span>
                </td>
                <td>
                  <div className="font-medium text-slate-800 dark:text-slate-100">{p.planName}</div>
                  <div className="text-xs text-slate-400">{p.programManager}</div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{p.notes}</div>
                </td>
                <td>
                  <div>{p.deductionDetail}</div>
                  {p.taxParity && (
                    <div className="mt-1">
                      <Badge tone="green">Tax parity</Badge>
                    </div>
                  )}
                </td>
                <td>{p.lowestFeePct > 0 ? pct(p.lowestFeePct, 2) : "—"}</td>
                <td>{p.maxBalance ? `$${(p.maxBalance / 1000).toFixed(0)}k` : "—"}</td>
                <td>
                  <Badge tone={tierTone[p.tier]}>{tierLabel[p.tier]}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout tone="blue" title="How to read this">
        A state <strong>deduction</strong> reduces taxable income; a <strong>credit</strong> reduces your tax bill dollar-for-dollar
        (often a better deal). <strong>Tax parity</strong> means you can use any state&apos;s plan and still claim the break. If your
        state offers no benefit (e.g., CA, NC), pick the cheapest national plan — Utah my529, California ScholarShare, or the Vanguard /
        Fidelity plans are popular choices.
      </Callout>
    </div>
  );
}

function PrivateCards() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {directSoldPlans.map((p) => (
          <div key={p.name} className="card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{p.name}</h3>
              <Badge tone="blue">{p.sponsorState}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.highlight}</p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <Field label="Expenses" value={p.expenseRange} />
              <Field label="Minimum" value={p.minimum} />
              <Field label="Manager" value={p.manager} />
            </dl>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Best for:</span> {p.bestFor}
            </p>
          </div>
        ))}
      </div>
      <Callout tone="amber" title="&quot;Private&quot; 529s are still state plans">
        Vanguard, Fidelity, and Schwab plans are operated through specific states (Nevada, New Hampshire, Kansas, etc.) but marketed
        nationally under the brand. If your home state gives no tax break, these brand-name plans are excellent low-cost defaults.
      </Callout>
    </div>
  );
}

function PrepaidCards() {
  const statusTone: Record<string, "green" | "red" | "neutral"> = {
    Open: "green",
    "Open (resident only)": "green",
    "Closed to new enrollees": "red",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {prepaidPlans.map((p) => (
          <div key={p.name} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{p.name}</h3>
                <p className="text-xs text-slate-400">{p.state} · {p.type}</p>
              </div>
              <Badge tone={statusTone[p.status] || "neutral"}>{p.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300"><strong>Locks in:</strong> {p.whatItLocks}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300"><strong>Guarantee:</strong> {p.guarantee}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{p.notes}</p>
          </div>
        ))}
      </div>
      <Callout tone="blue" title="Prepaid vs. savings">
        Prepaid plans remove market risk by locking tuition at today&apos;s prices — ideal if you&apos;re confident the child attends an
        in-state public (or, for the Private College 529, a member private) school. The trade-off is lower upside and less flexibility
        than a market-based savings plan.
      </Callout>
    </div>
  );
}

function AltCards() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {altVehicles.map((v) => (
          <div key={v.name} className="card">
            <h3 className="font-bold text-slate-900 dark:text-white">{v.name}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Line label="Tax treatment" value={v.taxTreatment} />
              <Line label="Limit" value={v.contributionLimit} />
              <Line label="Qualified uses" value={v.qualifiedUses} />
              <Line label="Financial aid" value={v.financialAidImpact} />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">Pros</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-600 dark:text-slate-300">
                  {v.pros.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Cons</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-600 dark:text-slate-300">
                  {v.cons.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            </div>
            <p className="mt-3 rounded-lg bg-slate-50 p-2 text-xs text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Best for:</span> {v.bestFor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">{value}</dd>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-slate-600 dark:text-slate-300">
      <span className="font-semibold text-slate-800 dark:text-slate-100">{label}:</span> {value}
    </p>
  );
}
