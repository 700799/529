"use client";

import React from "react";
import { SectionHeader, Callout, Stat, Badge } from "../ui";
import { HeroArt, FlowDiagram, WaterfallInfographic, IconShield, IconCalc, IconBook, IconWarning } from "../infographics";
import meta from "@/lib/data/meta.json";

export function Overview({ go }: { go: (id: string) => void }) {
  return (
    <div className="space-y-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <Badge tone="blue">Updated {meta.generatedAtHuman}</Badge>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            The Complete 529 &amp; College Funding Guide
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Everything you need to pay for college without wrecking your finances: compare all 50 states + DC plans and brand-name
            private plans, run calculators, weigh loans and aid, and see seven real student funding packages — including the worst-case
            mistakes to avoid.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => go("calculators")}
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Run the calculators
            </button>
            <button
              onClick={() => go("compare")}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
            >
              Compare every plan
            </button>
          </div>
        </div>
        <HeroArt className="w-full rounded-2xl shadow-lg" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="50+1" label="State plans compared" tone="blue" />
        <Stat value="$7,395" label="Maximum Pell Grant" tone="green" />
        <Stat value="$35k" label="529 → Roth rollover limit" tone="amber" />
        <Stat value="7" label="Sample student scenarios" tone="blue" />
      </div>

      <section>
        <SectionHeader eyebrow="The core idea" title="How a 529 works in three steps" />
        <FlowDiagram />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Funding order" title="Where the money should come from" intro="Spend free money first, your own money next, and borrow last — cheapest debt before expensive debt." />
          <div className="card">
            <WaterfallInfographic />
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeader eyebrow="Jump in" title="Explore the guide" />
          <div className="grid gap-3 sm:grid-cols-2">
            <NavCard icon={<IconBook className="h-6 w-6" />} title="What is a 529?" desc="The rules, tax breaks, and the Roth escape hatch." onClick={() => go("what")} />
            <NavCard icon={<IconCalc className="h-6 w-6" />} title="Calculators" desc="Growth, tax drag, 401(k) raid, and gifting." onClick={() => go("calculators")} />
            <NavCard icon={<IconShield className="h-6 w-6" />} title="Financial-aid strategy" desc="Legally shelter assets to maximize aid." onClick={() => go("aid-strategy")} />
            <NavCard icon={<IconWarning className="h-6 w-6" />} title="Tradeoffs & worst cases" desc="401(k) raids, payday loans, and over-borrowing." onClick={() => go("tradeoffs")} />
          </div>
        </div>
      </section>

      <Callout tone="amber" title="A note on the numbers">
        This guide is self-contained and rebuilt every day (last refresh: {meta.generatedAtHuman}). {meta.note} See the Sources tab for
        every reference used. This is educational information, not personalized tax, legal, or investment advice.
      </Callout>
    </div>
  );
}

function NavCard({ icon, title, desc, onClick }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="card card-hover flex items-start gap-3 text-left">
      <span className="mt-0.5 text-brand-600 dark:text-brand-400">{icon}</span>
      <span>
        <span className="block font-semibold text-slate-900 dark:text-white">{title}</span>
        <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">{desc}</span>
      </span>
    </button>
  );
}

export function WhatIs529() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="The basics"
        title="What is a 529 plan?"
        intro="A 529 is a state-sponsored, tax-advantaged investment account designed for education. You contribute after-tax dollars, the money grows tax-free, and withdrawals are tax-free when used for qualified education expenses."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-bold text-slate-900 dark:text-white">Two flavors of 529</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong className="text-slate-900 dark:text-white">Education savings plans</strong> — investment accounts (the common
              type). You pick portfolios; the balance rises and falls with the market.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Prepaid tuition plans</strong> — lock in future tuition at today&apos;s
              prices, usually at in-state public schools. See the Prepaid tab.
            </li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold text-slate-900 dark:text-white">What counts as &quot;qualified&quot;</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Tuition &amp; fees, books, supplies, required equipment</li>
            <li>Room &amp; board (if enrolled at least half-time)</li>
            <li>Computers, software, and internet for school</li>
            <li>Up to $10,000/yr of K-12 tuition</li>
            <li>Up to $10,000 lifetime toward student-loan repayment</li>
            <li>Registered apprenticeship program costs</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Tax-free growth" body="Earnings are never taxed if used for qualified education — the single biggest advantage over a regular brokerage account." tone="green" />
        <FeatureCard title="High limits" body="Aggregate caps typically run $235k–$614k per beneficiary. Contributions count as gifts (see the gifting tab)." tone="blue" />
        <FeatureCard title="You stay in control" body="The account owner — not the child — controls the money, can change the beneficiary to another family member, and can reclaim funds (taxes + 10% penalty on earnings apply to non-qualified use)." tone="blue" />
        <FeatureCard title="The Roth escape hatch" body="Under SECURE 2.0, up to $35,000 of leftover 529 money can roll into the beneficiary's Roth IRA (15-year-old account, other rules apply) — easing the 'what if they don't go?' worry." tone="green" />
        <FeatureCard title="Scholarship relief" body="If your child wins a scholarship, you can withdraw up to that amount from the 529 and pay only income tax on earnings — the 10% penalty is waived." tone="green" />
        <FeatureCard title="Favorable for aid" body="A parent-owned 529 is assessed at most ~5.64% on the FAFSA, far gentler than a custodial account's 20%." tone="blue" />
      </div>

      <Callout tone="red" title="The one real downside">
        If you withdraw earnings for something other than education (and no exception applies), you owe income tax plus a 10% penalty on
        the earnings portion. Your contributions always come back tax- and penalty-free. Plan your contributions so you&apos;re unlikely
        to over-fund — and remember the Roth rollover and beneficiary-change options.
      </Callout>
    </div>
  );
}

function FeatureCard({ title, body, tone }: { title: string; body: string; tone: "green" | "blue" }) {
  const bar = tone === "green" ? "bg-accent-500" : "bg-brand-500";
  return (
    <div className="card relative overflow-hidden">
      <div className={"absolute left-0 top-0 h-full w-1 " + bar} />
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
    </div>
  );
}
