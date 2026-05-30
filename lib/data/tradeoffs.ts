// Tradeoffs, worst-case math, and predatory-product warnings.
// These feed the "Tradeoffs & Worst Cases" tab and several calculators.

export interface Tradeoff {
  choice: string;
  upside: string;
  downside: string;
  verdict: string;
}

export const tradeoffs: Tradeoff[] = [
  {
    choice: "529 plan",
    upside: "Tax-free growth, high limits, possible state deduction, favorable aid treatment, $35k Roth rollover escape hatch.",
    downside: "Earnings on non-qualified withdrawals owe income tax + 10% penalty. Investment risk. Limited to education (plus the Roth path).",
    verdict: "Best all-around college vehicle for most families. The penalty only hits EARNINGS on non-qualified use, and scholarships waive it.",
  },
  {
    choice: "Prepaid tuition",
    upside: "Locks tuition at today's price; removes market risk; often state-guaranteed.",
    downside: "Usually resident/public-school focused; lower upside than equities; some programs closed or had funding scares.",
    verdict: "Good for risk-averse families confident the child will attend an in-state public school.",
  },
  {
    choice: "Pay cash as you go (no plan)",
    upside: "Total flexibility; no investment risk; preserves AOTC eligibility.",
    downside: "No tax-free growth — you forfeit potentially tens of thousands in compounding and any state tax break.",
    verdict: "Leaves real money on the table over an 18-year horizon. Modeled in the 'no-plan tax drag' calculator.",
  },
  {
    choice: "Custodial (UGMA/UTMA)",
    upside: "No limits, any use for the child.",
    downside: "Worst FAFSA treatment (20%), child controls it at majority, no tax shelter.",
    verdict: "Usually inferior to a 529 for college; can actively reduce financial aid.",
  },
  {
    choice: "Parent PLUS loans",
    upside: "Covers any remaining gap; fixed rate; some federal protections.",
    downside: "8.94% rate + 4.2% fee; easy to over-borrow up to full cost; parents personally liable into retirement.",
    verdict: "Use sparingly and cap it. Borrowing the whole gap is the most common middle-class mistake.",
  },
  {
    choice: "Private student loans",
    upside: "Can beat PLUS for top-credit borrowers; sometimes no fees.",
    downside: "No IDR, no PSLF, limited hardship help; variable rates; ~90% need a cosigner.",
    verdict: "Only after exhausting federal aid, and only with eyes open about lost protections.",
  },
  {
    choice: "Raiding a 401(k) / IRA",
    upside: "Liquidity in a genuine emergency.",
    downside: "Income tax + (often) 10% penalty, decades of lost compounding, and the withdrawal spikes next year's FAFSA income.",
    verdict: "Almost never worth it. You can borrow for college; you cannot borrow for retirement.",
  },
  {
    choice: "Payday / high-cost loans",
    upside: "None for college funding.",
    downside: "200–664% APR, built to roll over, traps borrowers in a debt cycle.",
    verdict: "Never. Full stop. Modeled below so the cost is undeniable.",
  },
];

// ---- 401(k) raid: worked example ----
// A parent pulls $40,000 from a pre-tax 401(k) at age 50 to pay tuition.
export const four01kRaid = {
  withdrawal: 40000,
  marginalTaxRate: 0.24,
  penaltyRate: 0.1, // before 59.5; the IRA higher-ed exception does NOT apply to 401(k)s
  get federalTax() {
    return this.withdrawal * this.marginalTaxRate;
  },
  get penalty() {
    return this.withdrawal * this.penaltyRate;
  },
  get netCashReceived() {
    return this.withdrawal - this.federalTax - this.penalty;
  },
  // Lost future value if that $40k had stayed invested at 7% for 17 years (to age 67).
  yearsToRetirement: 17,
  growthRate: 0.07,
  get lostFutureValue() {
    return Math.round(this.withdrawal * Math.pow(1 + this.growthRate, this.yearsToRetirement));
  },
  fafsaWarning:
    "The $40,000 also counts as income on the next FAFSA. At a ~30% marginal aid rate, that can cut need-based aid by ~$12,000 the following year — on top of the tax, penalty, and lost growth.",
};

// ---- Payday loan: worked example ----
// CFPB: a typical $375 payday loan costs ~$520 in fees before it is repaid,
// because borrowers re-borrow repeatedly. Fee is ~$15 per $100 per 2 weeks.
export const paydayExample = {
  principal: 375,
  feePer100: 15,
  termDays: 14,
  get aprPercent() {
    // ($15/$100) over 14 days, annualized
    return Math.round((this.feePer100 / 100) * (365 / this.termDays) * 100);
  },
  typicalTotalFees: 520,
  comparisonFederalLoanAPR: 6.39,
  note: "A single $375 payday loan, rolled over the typical number of times, costs about $520 in fees — roughly 391% APR — versus 6.39% on a federal student loan.",
};

// ---- "No plan" tax drag, used as default inputs in the comparison calculator.
export const noPlanDefaults = {
  monthly: 300,
  years: 18,
  growthRate: 0.07,
  taxableDragRate: 0.015, // ~1.5%/yr drag from taxing dividends/gains in a taxable account
  marginalRate: 0.24,
};
