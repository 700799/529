"use client";

import React from "react";
import { SectionHeader, Callout, Badge } from "../ui";
import {
  ProjectionCalculator,
  PlanVsNoPlanCalculator,
  RetirementRaidCalculator,
  GiftSuperfundCalculator,
  CollegeCostProjector,
  LoanRepaymentCalculator,
} from "../calculators";
import { juniorCollegeOptions, sources } from "@/lib/data/misc";
import meta from "@/lib/data/meta.json";

export function CalculatorsSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Run the numbers"
        title="Calculators"
        intro="Project your 529 growth and future college costs, see the tax cost of not having a plan, size up loan repayment, measure the damage of raiding retirement, and plan grandparent gifting. All run live in your browser."
      />
      <ProjectionCalculator />
      <CollegeCostProjector />
      <PlanVsNoPlanCalculator />
      <LoanRepaymentCalculator />
      <RetirementRaidCalculator />
      <GiftSuperfundCalculator />
    </div>
  );
}

export function Crypto() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Digital assets"
        title="Cryptocurrency & college savings"
        intro="Crypto gets a lot of attention as a way to grow a college fund. Here's an honest look at the advantages, the serious drawbacks, and how it interacts with 529s, taxes, and financial aid."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center gap-2">
            <Badge tone="green">Potential advantages</Badge>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>High historical upside.</strong> Over long horizons, assets like Bitcoin have posted large (if wildly volatile) returns.</li>
            <li><strong>Donating appreciated crypto.</strong> Gifting appreciated crypto to charity (or family) can avoid capital-gains tax on the appreciation.</li>
            <li><strong>Self-custody and portability.</strong> Not tied to any one institution or state plan.</li>
            <li><strong>Diversification.</strong> A small allocation can diversify a college portfolio (with much higher risk).</li>
          </ul>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Badge tone="red">Serious drawbacks</Badge>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>No tax shelter for education.</strong> You cannot hold crypto inside a 529. Selling to pay tuition is a taxable capital-gains event.</li>
            <li><strong>Extreme volatility.</strong> A 50–80% drawdown right before freshman year could gut a tuition fund.</li>
            <li><strong>Counts against financial aid.</strong> Crypto is a reportable investment asset on the FAFSA at its filing-date value.</li>
            <li><strong>Custody &amp; fraud risk.</strong> Lost keys, exchange failures, and scams are unrecoverable.</li>
          </ul>
        </div>
      </div>

      <Callout tone="amber" title="A reasonable way to think about it">
        Treat crypto as a <strong>high-risk satellite</strong>, never the core of a college fund. A common framework: keep the money you
        truly need for tuition in a tax-advantaged 529 on an age-based glide path, and limit any crypto to a small slice of
        &quot;extra&quot; savings you could afford to lose. As the child nears college age, de-risk aggressively — the closer to
        enrollment, the less volatility you can tolerate. If crypto gains are realized, remember every sale is taxable and can show up on
        next year&apos;s FAFSA as an asset.
      </Callout>

      <Callout tone="blue" title="The tax mechanics">
        The IRS treats cryptocurrency as property. Every sale or conversion to dollars triggers capital gains (short-term if held under a
        year, taxed as ordinary income; long-term if over a year, at preferential rates). There is no education exception — unlike a 529,
        Coverdell, or even savings bonds. Keep meticulous cost-basis records if you plan to liquidate for tuition.
      </Callout>
    </div>
  );
}

export function JuniorCollege() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Lower-cost paths"
        title="Two-year colleges & working programs"
        intro="A four-year residential degree is not the only route — and often not the smartest financially. Community college transfers, free-tuition programs, apprenticeships, co-ops, and employer tuition benefits can deliver a degree or credential with little or no debt."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {juniorCollegeOptions.map((o) => (
          <div key={o.name} className="card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{o.name}</h3>
              <Badge tone="blue">{o.type}</Badge>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-600 dark:text-slate-300">
              <p><strong>Cost:</strong> {o.cost}</p>
              <p><strong>Payoff:</strong> {o.payoff}</p>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{o.notes}</p>
          </div>
        ))}
      </div>
      <Callout tone="green" title="The 2+2 math">
        Two years at community college (~$4,000/yr tuition, frequently $0 after Pell) followed by two years at a state university can cut
        a bachelor&apos;s total cost by 40–60% — and the diploma is identical to a four-year student&apos;s. Pair it with a statewide
        guaranteed-transfer agreement and you lock in both admission and credit transfer.
      </Callout>
      <Callout tone="blue" title="Employer tuition assistance is underused">
        Under IRS Section 127, employers can provide up to <strong>$5,250/year tax-free</strong> in tuition assistance. Major employers
        (Starbucks, Amazon, Walmart, Target, UPS, Disney) fund degrees for part-time workers. Combined with Pell and a part-time wage,
        many students graduate debt-free — see Liam&apos;s scenario.
      </Callout>
    </div>
  );
}

export function Sources() {
  const grouped = sources.reduce<Record<string, typeof sources>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Show your work"
        title="Sources & methodology"
        intro="This guide synthesizes primary government data, nonprofit research, and industry plan directories. Figures are maintained estimates for the current cycle and re-stamped on each daily rebuild. Always verify current numbers against the primary source before acting."
      />
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">{cat}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover block"
              >
                <div className="font-semibold text-brand-700 dark:text-brand-300">{s.name}</div>
                <div className="mt-0.5 break-all text-xs text-slate-400">{s.url}</div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.used}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
      <Callout tone="amber" title="Disclaimer">
        This site is for general educational purposes only and is not tax, legal, investment, or financial advice. Tax laws, plan
        details, interest rates, and aid formulas change frequently. Consult a qualified professional and the official plan documents
        before making decisions. Last rebuilt {meta.generatedAtHuman}.
      </Callout>
    </div>
  );
}
