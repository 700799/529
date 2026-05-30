"use client";

import React from "react";
import { SectionHeader, Callout, Badge } from "../ui";
import { RetirementRaidCalculator, PaydayWarning, GiftSuperfundCalculator } from "../calculators";
import { GiftTreeInfographic, AidShelterInfographic } from "../infographics";
import { tradeoffs } from "@/lib/data/tradeoffs";
import { ageSteps } from "@/lib/data/misc";
import { usd } from "@/lib/format";
import meta from "@/lib/data/meta.json";

export function Tradeoffs() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Tradeoffs & worst cases"
        title="Every option has a cost — here are the worst ones"
        intro="A clear-eyed look at the tradeoffs of each funding choice, plus the calculations behind the two most damaging mistakes: raiding your 401(k) and turning to payday loans."
      />

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Choice</th>
              <th>Upside</th>
              <th>Downside</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {tradeoffs.map((t) => (
              <tr key={t.choice}>
                <td className="font-semibold text-slate-900 dark:text-white">{t.choice}</td>
                <td className="text-accent-700 dark:text-accent-300">{t.upside}</td>
                <td className="text-red-700 dark:text-red-300">{t.downside}</td>
                <td>{t.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RetirementRaidCalculator />
      <PaydayWarning />

      <Callout tone="amber" title="The hierarchy of regret">
        Ranked from least to most damaging when you&apos;re short on tuition: (1) more federal student loans, (2) a modest Parent PLUS
        loan, (3) a home-equity line at low rates, (4) a private loan, (5) raiding retirement, (6) payday/title loans. Always climb this
        ladder from the top, and stop as early as you can.
      </Callout>
    </div>
  );
}

export function AidStrategy() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Financial-aid strategy"
        title="How to legally position assets for more aid"
        intro="The FAFSA (and CSS Profile) assess your income and assets to set your Student Aid Index. A few legal moves before the 'base year' can meaningfully increase need-based aid."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-bold text-slate-900 dark:text-white">What the formula counts (and doesn&apos;t)</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Parent assets</strong> assessed at up to ~5.64% — gentle.</li>
            <li><strong>Student assets</strong> assessed at 20% — harsh. Keep savings out of the child&apos;s name.</li>
            <li><strong>Retirement accounts</strong> (401k, IRA, Roth) — <Badge tone="green">not counted</Badge> as assets.</li>
            <li><strong>Primary home equity</strong> — <Badge tone="green">not counted</Badge> on the federal FAFSA (the CSS Profile may count it).</li>
            <li><strong>Small-business / family-farm</strong> value — largely sheltered on FAFSA.</li>
            <li><strong>Income</strong> is the biggest driver — and prior-prior year is the &quot;base year.&quot;</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold text-slate-900 dark:text-white">Legal positioning moves</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Pay down your mortgage / put cash into home equity.</strong> Reportable cash becomes sheltered home equity on the FAFSA.</li>
            <li><strong>Max out retirement accounts</strong> before the base year — sheltered and good for you anyway.</li>
            <li><strong>Keep college savings in the parent&apos;s name</strong> (529), never the child&apos;s (custodial).</li>
            <li><strong>Time income</strong> — avoid large capital gains or Roth conversions in the base year; they spike your SAI.</li>
            <li><strong>Spend student assets first</strong> if any exist, before parental assets.</li>
            <li><strong>Use grandparent 529s freely now</strong> — see the win below.</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-slate-900 dark:text-white">Repositioning assets the formula treats gently</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The same dollars, moved from assessable buckets into sheltered ones, can lower your Student Aid Index — without lowering your net worth.
        </p>
        <div className="mt-4">
          <AidShelterInfographic />
        </div>
      </div>

      <Callout tone="green" title="Major win: grandparent 529s no longer hurt aid">
        Under FAFSA Simplification, distributions from a grandparent-owned 529 are <strong>no longer reported</strong> as untaxed
        student income. Previously they could slash aid by up to 50% of the withdrawal. Now grandparents can pay tuition directly from
        their 529 with no FAFSA penalty — one of the best recent changes for families.
      </Callout>

      <Callout tone="amber" title="A caution on over-engineering">
        Don&apos;t make bad financial decisions purely to chase aid. Sheltering assets only helps if your family would otherwise qualify
        for need-based aid; high-income families who won&apos;t qualify should focus on merit scholarships and tax credits (AOTC)
        instead. And the CSS Profile (used by ~200 mostly-private colleges) counts home equity and assets the FAFSA ignores.
      </Callout>
    </div>
  );
}

export function AgeSteps() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="A roadmap"
        title="Five steps to take at every age"
        intro="A stage-by-stage checklist from birth to graduation. The single most powerful move is the earliest one: open and automate a 529 as soon as possible."
      />
      <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700 sm:before:left-1/2">
        {ageSteps.map((stage, idx) => (
          <div key={stage.stage} className={"relative sm:flex " + (idx % 2 ? "sm:flex-row-reverse" : "")}>
            <div className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-600 ring-4 ring-brand-100 dark:ring-brand-950 sm:left-1/2" />
            <div className="ml-10 sm:ml-0 sm:w-1/2 sm:px-6">
              <div className="card">
                <div className="flex items-center gap-2">
                  <Badge tone="blue">Ages {stage.ageRange}</Badge>
                  <h3 className="font-bold text-slate-900 dark:text-white">{stage.stage}</h3>
                </div>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {stage.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GiftTaxSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Grandparents & gifting"
        title="Gift taxes, grandparents & superfunding"
        intro="529s are a powerful estate-planning tool. Grandparents can move large sums out of their taxable estate, fund a grandchild's education, and — thanks to recent rules — no longer hurt the student's financial aid."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-bold text-slate-900 dark:text-white">The annual exclusion</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Each person can give up to <strong>{usd(meta.giftTaxAnnualExclusion)}</strong> per recipient per year with no gift-tax
            filing — so a couple can give <strong>{usd(meta.giftTaxAnnualExclusion * 2)}</strong> per grandchild, per year.
          </p>
          <GiftTreeInfographic />
        </div>
        <div className="card">
          <h3 className="font-bold text-slate-900 dark:text-white">5-year superfunding</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            A unique 529 rule lets you front-load five years of gifts at once — up to <strong>{usd(meta.superfunding5yr)}</strong> per
            donor (<strong>{usd(meta.superfunding5yrCouple)}</strong> per couple) per beneficiary — and treat it as spread over five
            years for gift-tax purposes. File IRS Form 709 to elect.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Removes a big chunk from your taxable estate immediately.</li>
            <li>Lets the money compound tax-free for five extra years up front.</li>
            <li>The <strong>{usd(meta.estateExemption2026)}</strong> lifetime exemption covers gifts above the annual exclusion for most families anyway.</li>
          </ul>
        </div>
      </div>

      <GiftSuperfundCalculator />

      <Callout tone="green" title="The grandparent triple win">
        (1) Move assets out of the estate, (2) fund education tax-free, and (3) under FAFSA Simplification, grandparent-529 withdrawals
        no longer count against the student&apos;s aid. Grandparents can also pay tuition directly to a school with no gift-tax limit at
        all (the unlimited education exclusion) — though that doesn&apos;t get the 529 tax-free growth.
      </Callout>
    </div>
  );
}
