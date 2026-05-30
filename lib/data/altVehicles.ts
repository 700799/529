import type { AltVehicle } from "./types";

// Alternatives and complements to a 529: Coverdell, custodial accounts,
// Roth IRA, savings bonds, taxable brokerage, HSA, crypto, and the
// "raid your retirement" anti-pattern.

export const altVehicles: AltVehicle[] = [
  {
    name: "Coverdell ESA (Education Savings Account)",
    taxTreatment: "After-tax in; tax-free growth & withdrawals for qualified education (K-12 AND college).",
    contributionLimit: "$2,000 per beneficiary per year (all contributors combined).",
    qualifiedUses: "K-12 tuition, tutoring, books, uniforms, computers, AND college — broader than a 529 historically.",
    financialAidImpact: "Treated as a parent asset if owned by parent (~5.64% assessment) — same favorable treatment as a 529.",
    pros: [
      "Widest range of qualified expenses, including K-12 supplies and tutoring.",
      "Self-directed: invest in nearly anything (stocks, ETFs, funds).",
      "Tax-free growth like a 529.",
    ],
    cons: [
      "Tiny $2,000/year cap.",
      "Income limits to contribute ($110k single / $220k joint MAGI).",
      "Funds must generally be used by the beneficiary's 30th birthday.",
    ],
    bestFor: "Families paying for private K-12 who also want investment flexibility.",
  },
  {
    name: "UGMA / UTMA custodial account",
    taxTreatment: "Taxable; first ~$1,350 of child's unearned income tax-free, next taxed at child rate, then 'kiddie tax' at parent rate.",
    contributionLimit: "No limit (gifts above annual exclusion use lifetime exemption).",
    qualifiedUses: "ANY purpose that benefits the child — not restricted to education.",
    financialAidImpact: "Counted as the STUDENT'S asset — assessed at 20%, the harshest treatment. Hurts aid the most.",
    pros: [
      "No restrictions on how funds are spent (for the child's benefit).",
      "No contribution cap.",
      "Simple to open.",
    ],
    cons: [
      "Irrevocable gift: the child legally controls it at 18/21.",
      "Worst financial-aid treatment (20% of value).",
      "No tax-free growth; subject to kiddie tax.",
    ],
    bestFor: "Non-education goals, or families not seeking need-based aid.",
  },
  {
    name: "Roth IRA (for education)",
    taxTreatment: "After-tax in; contributions always withdrawable tax/penalty-free; 10% early-withdrawal penalty waived for qualified higher-ed expenses.",
    contributionLimit: "$7,000/yr ($8,000 if 50+), income limits apply.",
    qualifiedUses: "Retirement first; contributions (not earnings) can be pulled for college without penalty.",
    financialAidImpact: "Retirement accounts are NOT reported as assets on FAFSA — invisible to the aid formula.",
    pros: [
      "Doesn't count as an asset on FAFSA.",
      "Total flexibility — if not needed for college, it funds retirement.",
      "Contributions accessible anytime tax-free.",
    ],
    cons: [
      "Withdrawals (even penalty-free) count as income on the NEXT FAFSA, which can slash aid.",
      "Diverts money from retirement.",
      "Earnings withdrawn before 59½ may still be taxed.",
    ],
    bestFor: "Parents who may not need all the money for college and want a retirement backstop.",
  },
  {
    name: "Series I / EE U.S. Savings Bonds",
    taxTreatment: "Federal-tax-deferred; interest can be FEDERALLY TAX-FREE if used for qualified education (income limits apply).",
    contributionLimit: "$10,000/yr per type per person (electronic).",
    qualifiedUses: "Tuition & fees (not room/board). Education Tax Exclusion has income phaseouts.",
    financialAidImpact: "Parent asset if owned by parent.",
    pros: [
      "Government-guaranteed principal; I-bonds track inflation.",
      "Possible federal tax-free interest for education.",
      "Very low risk.",
    ],
    cons: [
      "Low real returns versus equities over 18 years.",
      "Income limits erase the tax exclusion for higher earners.",
      "Purchase caps are small.",
    ],
    bestFor: "Conservative savers within a few years of paying tuition.",
  },
  {
    name: "Taxable brokerage account",
    taxTreatment: "Fully taxable: dividends and capital gains taxed yearly / on sale (long-term cap-gains rates).",
    contributionLimit: "Unlimited.",
    qualifiedUses: "Anything.",
    financialAidImpact: "Parent asset (~5.64%) if in parent's name.",
    pros: [
      "Total flexibility and liquidity.",
      "No contribution caps or qualified-use rules.",
      "Long-term capital-gains rates are favorable.",
    ],
    cons: [
      "No tax-free growth — you pay tax along the way.",
      "Counts as an assessable asset for aid.",
    ],
    bestFor: "Overflow savings beyond 529 limits, or uncertain goals.",
  },
  {
    name: "HSA (Health Savings Account)",
    taxTreatment: "Triple tax-advantaged, but ONLY for medical expenses.",
    contributionLimit: "$4,300 single / $8,550 family (2025).",
    qualifiedUses: "Medical only — NOT a college vehicle, but frees up cash for college by covering health costs tax-free.",
    financialAidImpact: "Not reported as an asset on FAFSA.",
    pros: [
      "Not counted on FAFSA.",
      "Triple tax advantage for the medical share of a college budget.",
    ],
    cons: [
      "Cannot pay tuition; education withdrawals are penalized + taxed.",
      "Requires a high-deductible health plan.",
    ],
    bestFor: "Indirect strategy: shelter assets from FAFSA while covering real medical costs.",
  },
  {
    name: "Cryptocurrency (held directly)",
    taxTreatment: "Property: every sale/conversion is a taxable capital-gains event. NO tax-free education treatment.",
    contributionLimit: "Unlimited.",
    qualifiedUses: "Must be sold (taxable) and converted to cash to pay tuition.",
    financialAidImpact: "Counted as an investment asset on FAFSA at its fair market value on the filing date.",
    pros: [
      "High historical upside (and extreme volatility).",
      "You can gift appreciated crypto INTO a Coverdell/taxable, or donate to lower taxes.",
    ],
    cons: [
      "No tax shelter for education — unlike a 529.",
      "Extreme volatility can wipe out a tuition fund right before enrollment.",
      "Reportable asset that can reduce aid.",
      "You cannot hold crypto directly inside a 529.",
    ],
    bestFor: "See the dedicated Crypto tab — generally a complement, not a college-savings core.",
  },
  {
    name: "Raiding a 401(k)/IRA (the anti-pattern)",
    taxTreatment: "Pre-tax withdrawals are taxed as ORDINARY INCOME; 10% early-withdrawal penalty before 59½ (IRA college exception waives the penalty but NOT the income tax).",
    contributionLimit: "N/A — this is a withdrawal.",
    qualifiedUses: "Technically possible, almost always a mistake. See the Tradeoffs & Worst Cases tab.",
    financialAidImpact: "The withdrawal becomes INCOME on next year's FAFSA — often cutting aid by 20–47 cents per dollar.",
    pros: [
      "Liquidity in a true emergency.",
    ],
    cons: [
      "Lost decades of tax-deferred compounding.",
      "Income tax + (often) 10% penalty.",
      "Spikes your FAFSA income and shrinks aid.",
      "No do-overs: you cannot 'borrow' for retirement.",
    ],
    bestFor: "Almost no one. Modeled explicitly in the Tradeoffs & Worst Cases tab so you can see the damage.",
  },
];
