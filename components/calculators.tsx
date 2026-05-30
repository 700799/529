"use client";

import React, { useMemo, useState } from "react";
import { Slider, NumberInput, Callout, Badge } from "./ui";
import { GrowthAreaChart, CompareLines, SimpleBars } from "./charts";
import { futureValue, growthSeries, usd, pct, monthlyPayment, inflate } from "@/lib/format";
import { four01kRaid, paydayExample } from "@/lib/data/tradeoffs";
import { schoolTiers } from "@/lib/data/schoolCosts";
import meta from "@/lib/data/meta.json";

// 1) College savings projection -------------------------------------------
export function ProjectionCalculator() {
  const [initial, setInitial] = useState(2000);
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(18);
  const [rate, setRate] = useState(7);

  const series = useMemo(
    () => growthSeries({ monthly, years, annualRate: rate / 100, initial }),
    [monthly, years, rate, initial]
  );
  const final = series[series.length - 1];
  const earnings = final.balance - final.contributed;

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">529 growth projection</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        See how tax-free compounding turns steady contributions into a college fund.
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <NumberInput label="Starting balance" prefix="$" value={initial} onChange={setInitial} min={0} step={500} />
          <Slider label="Monthly contribution" value={monthly} min={0} max={2000} step={25} onChange={setMonthly} display={usd(monthly)} />
          <Slider label="Years until college" value={years} min={1} max={18} onChange={setYears} display={`${years} yr`} />
          <Slider label="Expected annual return" value={rate} min={1} max={10} step={0.5} onChange={setRate} display={pct(rate, 1)} />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Mini label="Contributed" value={usd(final.contributed)} tone="slate" />
            <Mini label="Tax-free earnings" value={usd(earnings)} tone="green" />
            <Mini label="Total" value={usd(final.balance)} tone="blue" />
          </div>
        </div>
        <div>
          <GrowthAreaChart data={series} />
        </div>
      </div>
      <Callout tone="green" title="Why the 529 wins here">
        In a taxable account, the {usd(earnings)} of earnings would be taxed along the way and again at withdrawal. In a 529, qualified
        withdrawals are 100% tax-free — and many states add a deduction or credit on the way in.
      </Callout>
    </div>
  );
}

// 2) 529 vs. no-plan (taxable) ---------------------------------------------
export function PlanVsNoPlanCalculator() {
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(18);
  const [rate, setRate] = useState(7);
  const [drag, setDrag] = useState(1.5); // annual tax drag in taxable account
  const [marginal, setMarginal] = useState(24);

  const data = useMemo(() => {
    const plan529 = growthSeries({ monthly, years, annualRate: rate / 100 });
    const taxable = growthSeries({ monthly, years, annualRate: (rate - drag) / 100 });
    return plan529.map((p, i) => ({
      year: p.year,
      "529 (tax-free)": p.balance,
      "Taxable account": taxable[i].balance,
    }));
  }, [monthly, years, rate, drag]);

  const f529 = data[data.length - 1]["529 (tax-free)"];
  const fTax = data[data.length - 1]["Taxable account"];
  const contributed = monthly * 12 * years;
  // Extra tax owed on the taxable account's gains at exit (rough cap-gains hit on remaining gain)
  const taxableGain = fTax - contributed;
  const exitTax = Math.max(0, taxableGain) * 0.15; // long-term cap gains approx
  const advantage = f529 - (fTax - exitTax);

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">529 vs. no plan: the tax drag</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Compare a tax-free 529 against saving the same amount in an ordinary taxable brokerage account.
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Monthly contribution" value={monthly} min={50} max={2000} step={25} onChange={setMonthly} display={usd(monthly)} />
          <Slider label="Years" value={years} min={3} max={18} onChange={setYears} display={`${years} yr`} />
          <Slider label="Gross return" value={rate} min={3} max={10} step={0.5} onChange={setRate} display={pct(rate, 1)} />
          <Slider label="Annual tax drag (taxable acct.)" value={drag} min={0.5} max={3} step={0.1} onChange={setDrag} display={pct(drag, 1)} />
          <Slider label="Your marginal tax bracket" value={marginal} min={10} max={37} onChange={setMarginal} display={`${marginal}%`} />
        </div>
        <div>
          <CompareLines
            data={data}
            series={[
              { key: "529 (tax-free)", color: "#1d57f5", name: "529 (tax-free)" },
              { key: "Taxable account", color: "#94a3b8", name: "Taxable account" },
            ]}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Mini label="529 ending value" value={usd(f529)} tone="blue" />
        <Mini label="Taxable (after exit tax)" value={usd(fTax - exitTax)} tone="slate" />
        <Mini label="529 advantage" value={usd(advantage)} tone="green" />
      </div>
      <Callout tone="blue" title="The takeaway">
        Even before counting any state deduction, the 529 ends up ahead by about <strong>{usd(advantage)}</strong> because its
        earnings are never taxed. Add a state deduction or credit and the gap widens further.
      </Callout>
    </div>
  );
}

// 3) Raiding a 401(k) -------------------------------------------------------
export function RetirementRaidCalculator() {
  const [amount, setAmount] = useState(40000);
  const [marginal, setMarginal] = useState(24);
  const [yearsToRet, setYearsToRet] = useState(17);
  const [growth, setGrowth] = useState(7);
  const [under59, setUnder59] = useState(true);

  const tax = amount * (marginal / 100);
  const penalty = under59 ? amount * 0.1 : 0;
  const netCash = amount - tax - penalty;
  const lostFV = Math.round(amount * Math.pow(1 + growth / 100, yearsToRet));
  const trueCost = tax + penalty + (lostFV - amount);

  const bars = [
    { name: "Cash you wanted", value: amount, color: "#94a3b8" },
    { name: "Income tax", value: tax, color: "#f97316" },
    { name: "10% penalty", value: penalty, color: "#ef4444" },
    { name: "You actually get", value: netCash, color: "#0ea5e9" },
    { name: "Lost future value", value: lostFV - amount, color: "#7f1d1d" },
  ];

  return (
    <div className="card border-red-200 dark:border-red-900">
      <div className="flex items-center gap-2">
        <Badge tone="red">Worst case</Badge>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">What raiding your 401(k) really costs</h3>
      </div>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Pre-tax retirement withdrawals are taxed as ordinary income, often hit a 10% early penalty, and forfeit decades of growth.
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <NumberInput label="Amount withdrawn" prefix="$" value={amount} onChange={setAmount} min={1000} step={1000} />
          <Slider label="Marginal tax bracket" value={marginal} min={10} max={37} onChange={setMarginal} display={`${marginal}%`} />
          <Slider label="Years until retirement" value={yearsToRet} min={1} max={35} onChange={setYearsToRet} display={`${yearsToRet} yr`} />
          <Slider label="Assumed market return" value={growth} min={3} max={10} step={0.5} onChange={setGrowth} display={pct(growth, 1)} />
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={under59} onChange={(e) => setUnder59(e.target.checked)} className="accent-red-600" />
            Under age 59½ (adds 10% penalty — the higher-ed exception does <em>not</em> apply to 401(k)s)
          </label>
        </div>
        <div>
          <SimpleBars data={bars} height={300} />
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Mini label="Net cash in hand" value={usd(netCash)} tone="slate" />
        <Mini label="That $ in 401(k) later" value={usd(lostFV)} tone="blue" />
        <Mini label="True total cost" value={usd(trueCost)} tone="red" />
      </div>
      <Callout tone="red" title="Plus a hidden FAFSA penalty">
        {four01kRaid.fafsaWarning} You can borrow for college, but you cannot borrow for retirement — this is almost always the wrong move.
      </Callout>
    </div>
  );
}

// 4) Gift / superfunding ----------------------------------------------------
export function GiftSuperfundCalculator() {
  const [donors, setDonors] = useState(2);
  const [perChild, setPerChild] = useState(19000);
  const [superfund, setSuperfund] = useState(true);
  const annual = donors * perChild;
  const lump = superfund ? annual * 5 : annual;
  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gift & superfunding calculator</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        How much can grandparents (or anyone) move into a 529 without touching their lifetime gift/estate exemption?
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Number of donors" value={donors} min={1} max={4} onChange={setDonors} display={`${donors}`} />
          <NumberInput label="Annual exclusion per donor" prefix="$" value={perChild} onChange={setPerChild} min={1000} step={1000} />
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={superfund} onChange={(e) => setSuperfund(e.target.checked)} className="accent-brand-600" />
            Use the 5-year &quot;superfunding&quot; election (front-load 5 years at once)
          </label>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Mini label="Per year, gift-tax-free" value={usd(annual)} tone="blue" />
            <Mini label={superfund ? "Lump sum (5-yr)" : "This year"} value={usd(lump)} tone="green" />
          </div>
        </div>
        <div className="flex items-center">
          <Callout tone="amber" title="How superfunding works">
            A special 529 election lets a donor treat one big contribution as if spread over 5 years, so up to {usd(perChild * 5)} per
            donor (or {usd(perChild * 5 * 2)} for a couple) per child avoids gift tax — as long as no other gifts are made to that child
            during the 5 years. File IRS Form 709 to elect. Great for moving money out of a taxable estate quickly.
          </Callout>
        </div>
      </div>
    </div>
  );
}

// 6) Future college-cost projector -----------------------------------------
export function CollegeCostProjector() {
  const [tierIdx, setTierIdx] = useState(1); // in-state public default
  const [yearsAway, setYearsAway] = useState(18);
  const [inflation, setInflation] = useState(meta.tuitionInflationAssumption * 100);

  const tier = schoolTiers[tierIdx];
  const futureAnnual = inflate(tier.sticker, inflation / 100, yearsAway);
  const futureFourYear = inflate(tier.fourYearSticker, inflation / 100, yearsAway);

  const data = Array.from({ length: yearsAway + 1 }, (_, y) => ({
    year: y,
    "Today's tier cost": Math.round(tier.sticker),
    "Projected cost": Math.round(inflate(tier.sticker, inflation / 100, y)),
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Future college-cost projector</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        College costs have historically risen faster than general inflation. See what a year (and four years) might cost when your child enrolls.
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">School tier</span>
            <select
              value={tierIdx}
              onChange={(e) => setTierIdx(parseInt(e.target.value, 10))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {schoolTiers.map((t, i) => (
                <option key={t.tier} value={i}>
                  {t.tier} — {usd(t.sticker)}/yr today
                </option>
              ))}
            </select>
          </label>
          <Slider label="Years until enrollment" value={yearsAway} min={1} max={18} onChange={setYearsAway} display={`${yearsAway} yr`} />
          <Slider label="Annual college inflation" value={inflation} min={2} max={8} step={0.5} onChange={setInflation} display={pct(inflation, 1)} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Mini label="Projected 1 year" value={usd(futureAnnual)} tone="red" />
            <Mini label="Projected 4 years" value={usd(futureFourYear)} tone="red" />
          </div>
        </div>
        <div>
          <CompareLines
            data={data}
            series={[
              { key: "Projected cost", color: "#ef4444", name: "Projected annual cost" },
              { key: "Today's tier cost", color: "#94a3b8", name: "Today's cost" },
            ]}
          />
        </div>
      </div>
      <Callout tone="amber" title="Why starting early matters">
        At {pct(inflation, 1)} annual inflation, a {usd(tier.sticker)} year becomes <strong>{usd(futureAnnual)}</strong> in {yearsAway} years.
        This is exactly why tax-free compounding in a 529 — which can grow faster than tuition inflation — is so valuable when you start early.
      </Callout>
    </div>
  );
}

// 7) Loan repayment calculator ---------------------------------------------
export function LoanRepaymentCalculator() {
  const [principal, setPrincipal] = useState(30000);
  const [rate, setRate] = useState(6.39);
  const [years, setYears] = useState(10);

  const pay = monthlyPayment({ principal, annualRate: rate / 100, years });
  const totalPaid = pay * years * 12;
  const totalInterest = totalPaid - principal;

  const bars = [
    { name: "Principal", value: principal, color: "#1d57f5" },
    { name: "Interest paid", value: Math.max(0, totalInterest), color: "#ef4444" },
    { name: "Total repaid", value: totalPaid, color: "#0ea5e9" },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student-loan repayment calculator</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        See the monthly payment and lifetime interest on a loan. Defaults to the federal undergrad rate; bump it to ~9% to model Parent PLUS.
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <NumberInput label="Amount borrowed" prefix="$" value={principal} onChange={setPrincipal} min={1000} step={1000} />
          <Slider label="Interest rate" value={rate} min={3} max={14} step={0.1} onChange={setRate} display={pct(rate, 2)} />
          <Slider label="Repayment term" value={years} min={5} max={25} onChange={setYears} display={`${years} yr`} />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Mini label="Monthly payment" value={usd(pay)} tone="blue" />
            <Mini label="Total interest" value={usd(totalInterest)} tone="red" />
            <Mini label="Total repaid" value={usd(totalPaid)} tone="slate" />
          </div>
        </div>
        <div>
          <SimpleBars data={bars} height={300} />
        </div>
      </div>
      <Callout tone="blue" title="The interest reality">
        Borrowing {usd(principal)} at {pct(rate, 2)} over {years} years means repaying <strong>{usd(totalPaid)}</strong> — about{" "}
        <strong>{usd(totalInterest)}</strong> of it pure interest. Every dollar saved in a 529 is a dollar you never borrow and never pay
        interest on. A shorter term raises the monthly payment but slashes total interest.
      </Callout>
    </div>
  );
}

// Small stat tile -----------------------------------------------------------
function Mini({ label, value, tone }: { label: string; value: string; tone: "blue" | "green" | "red" | "slate" }) {
  const tones: Record<string, string> = {
    blue: "text-brand-600 dark:text-brand-400",
    green: "text-accent-600 dark:text-accent-400",
    red: "text-red-600 dark:text-red-400",
    slate: "text-slate-700 dark:text-slate-200",
  };
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
      <div className={"text-lg font-extrabold " + tones[tone]}>{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

// 5) Payday loan illustration (static math) ---------------------------------
export function PaydayWarning() {
  const bars = [
    { name: "Federal student loan", value: paydayExample.comparisonFederalLoanAPR, color: "#10b981" },
    { name: "Credit card (typical)", value: 24, color: "#f59e0b" },
    { name: "Private student loan", value: 13, color: "#f97316" },
    { name: "Payday loan", value: paydayExample.aprPercent, color: "#7f1d1d" },
  ];
  return (
    <div className="card border-red-200 dark:border-red-900">
      <div className="flex items-center gap-2">
        <Badge tone="red">Never do this</Badge>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payday loans vs. everything else (APR)</h3>
      </div>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{paydayExample.note}</p>
      <div className="mt-4">
        <SimpleBars data={bars} height={260} />
      </div>
      <Callout tone="red" title="The trap, in numbers">
        A {usd(paydayExample.principal)} payday loan at {usd(paydayExample.feePer100)} per $100 every two weeks works out to roughly{" "}
        <strong>{paydayExample.aprPercent}% APR</strong>. Because they are built to roll over, the average borrower pays about{" "}
        <strong>{usd(paydayExample.typicalTotalFees)}</strong> in fees on that one loan. There is always a better option — call the
        financial-aid office before ever considering one.
      </Callout>
    </div>
  );
}
