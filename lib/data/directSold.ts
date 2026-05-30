import type { DirectSoldPlan } from "./types";

// Nationally popular "private" / brand-name direct-sold plans people use
// regardless of residency (often through a brokerage). These are still
// technically state-sponsored 529s, but marketed under a financial brand.

export const directSoldPlans: DirectSoldPlan[] = [
  {
    name: "Vanguard 529 Plan",
    sponsorState: "Nevada",
    manager: "Vanguard / Ascensus",
    highlight: "The default low-cost choice. Vanguard index funds and target-enrollment portfolios.",
    expenseRange: "0.12% – 0.42%",
    minimum: "$3,000 ($1,000 for NV residents)",
    bestFor: "Index investors who already trust Vanguard and have no in-state tax break.",
  },
  {
    name: "Fidelity (UNIQUE / U.Fund / others)",
    sponsorState: "NH, MA, DE, AZ, CT",
    manager: "Fidelity",
    highlight: "Fidelity manages five state plans with identical low-cost index lineups. 2% '529 rewards' credit card funnels cash back into the account.",
    expenseRange: "0.10% – 0.99%",
    minimum: "$0",
    bestFor: "Fidelity brokerage customers; the $0 minimum and index option are excellent.",
  },
  {
    name: "Schwab 529",
    sponsorState: "Kansas (Learning Quest)",
    manager: "American Century / Schwab",
    highlight: "Schwab-branded version of Kansas Learning Quest. Index portfolios available.",
    expenseRange: "0.20% – 0.90%",
    minimum: "$0",
    bestFor: "Schwab customers who want everything in one login.",
  },
  {
    name: "T. Rowe Price College Savings",
    sponsorState: "Alaska & Maryland",
    manager: "T. Rowe Price",
    highlight: "Actively managed glide paths with a strong long-term record; higher fees than pure index plans.",
    expenseRange: "0.30% – 0.80%",
    minimum: "$0",
    bestFor: "Investors who prefer active management over pure indexing.",
  },
  {
    name: "my529 (Utah)",
    sponsorState: "Utah",
    manager: "Utah State (in-house)",
    highlight: "Perennially top-rated nationally. Vanguard & DFA underlying funds, fully customizable age-based tracks, very low fees.",
    expenseRange: "0.11% – 0.46%",
    minimum: "$0",
    bestFor: "DIY investors anywhere who want maximum control and low cost.",
  },
  {
    name: "Wealthfront 529",
    sponsorState: "Nevada",
    manager: "Wealthfront / Ascensus",
    highlight: "Robo-advisor that automatically manages a diversified 529 portfolio for a small advisory fee.",
    expenseRange: "~0.42% – 0.46% all-in",
    minimum: "$500",
    bestFor: "Hands-off savers who want automated risk adjustment.",
  },
  {
    name: "Bright Start (Illinois)",
    sponsorState: "Illinois",
    manager: "Union Bank & Trust",
    highlight: "Repeatedly rated a top overall direct plan: very low fees plus a large IL deduction for residents.",
    expenseRange: "0.07% – 0.50%",
    minimum: "$0",
    bestFor: "Illinois residents (deduction) and low-cost seekers everywhere.",
  },
];
