// Structured, machine-usable form of each state's 529 contribution tax break.
//
// statePlans.ts describes the same benefit in prose (`stateTaxBenefit`,
// `deductionDetail`) which reads well but cannot be computed with. The
// calculators need numbers, so the caps live here, keyed by postal
// abbreviation, and are joined to the plan records by `abbr`.
//
// IMPORTANT: these are maintained estimates for the cycle named by
// DATA_CYCLE in ./meta-cycle.ts, simplified to a single annual cap per filing
// status. Several states have rules this shape cannot express exactly
// (per-beneficiary vs per-return caps, carryforward, income phase-outs).
// Treat the result as an estimate and verify against the plan's disclosure
// booklet — the UI says so wherever these numbers surface.

export type BenefitKind = "deduction" | "credit" | "none";

export interface StateTaxBenefit {
  kind: BenefitKind;
  /** Annual deductible contribution cap, single filer. Omitted when uncapped. */
  deductionSingle?: number;
  /** Annual deductible contribution cap, married filing jointly. */
  deductionJoint?: number;
  /** Credit as a percent of contributions (e.g. 20 for Indiana). */
  creditRatePct?: number;
  /** Maximum credit in dollars, single filer. */
  creditMaxSingle?: number;
  /** Maximum credit in dollars, married filing jointly. */
  creditMaxJoint?: number;
  /** Deduction limited only by taxable income or the account balance cap. */
  uncapped?: boolean;
  /** Set when the shape above materially simplifies the real rule. */
  caveat?: string;
}

const D = (single: number, joint: number, caveat?: string): StateTaxBenefit => ({
  kind: "deduction",
  deductionSingle: single,
  deductionJoint: joint,
  ...(caveat ? { caveat } : {}),
});

const NONE: StateTaxBenefit = { kind: "none" };

const UNCAPPED = (caveat: string): StateTaxBenefit => ({
  kind: "deduction",
  uncapped: true,
  caveat,
});

export const stateTaxBenefits: Record<string, StateTaxBenefit> = {
  AL: D(5000, 10000),
  AK: NONE, // no state income tax
  AZ: D(2000, 4000),
  AR: D(5000, 10000, "Only $3,000/$6,000 for out-of-state plans."),
  CA: NONE,
  CO: D(25400, 25400, "Effectively limited by taxable income; cap is per beneficiary."),
  CT: D(5000, 10000, "Excess carries forward up to five years."),
  DE: D(1000, 2000),
  DC: D(4000, 8000, "Five-year carryforward."),
  FL: NONE, // no state income tax
  GA: D(4000, 8000, "Per beneficiary."),
  HI: NONE,
  ID: D(6000, 12000),
  IL: D(10000, 20000),
  IN: { kind: "credit", creditRatePct: 20, creditMaxSingle: 1500, creditMaxJoint: 1500 },
  IA: D(5800, 11600, "Per beneficiary, indexed annually."),
  KS: D(3000, 6000),
  KY: NONE,
  LA: D(2400, 4800, "Plus a state Earnings Enhancement match."),
  ME: NONE, // grant programs instead
  MD: D(2500, 5000, "Per beneficiary, per account; ten-year carryforward."),
  MA: D(1000, 2000),
  MI: D(5000, 10000),
  MN: D(1500, 3000, "Alternatively a credit up to $500; the deduction is modelled here."),
  MS: D(10000, 20000),
  MO: D(8000, 16000),
  MT: D(3000, 6000),
  NE: D(10000, 10000, "Per return, not per spouse."),
  NV: NONE, // no state income tax
  NH: NONE, // no broad income tax
  NJ: D(10000, 10000, "Per return; gross income under $200k."),
  NM: UNCAPPED("Full contribution deductible, limited by taxable income."),
  NY: D(5000, 10000),
  NC: NONE,
  ND: D(5000, 10000, "Plus Bank of North Dakota match grants."),
  OH: D(4000, 4000, "Per beneficiary regardless of filing status; unlimited carryforward."),
  OK: D(10000, 20000, "Five-year carryforward."),
  OR: { kind: "credit", creditMaxSingle: 180, creditMaxJoint: 360, caveat: "Fixed-dollar credit that phases down as income rises." },
  PA: D(19000, 38000, "Up to the federal gift-tax annual exclusion, per beneficiary."),
  RI: D(500, 1000, "Unlimited carryforward."),
  SC: UNCAPPED("Deductible up to the account balance cap; contributions count until the filing deadline."),
  SD: NONE, // no state income tax
  TN: NONE, // no broad income tax
  TX: NONE, // no state income tax
  UT: { kind: "credit", creditRatePct: 4.55, creditMaxSingle: 120, creditMaxJoint: 240, caveat: "Per beneficiary." },
  VT: { kind: "credit", creditRatePct: 10, creditMaxSingle: 250, creditMaxJoint: 500, caveat: "Per beneficiary." },
  VA: D(4000, 8000, "Per account; unlimited carryforward, and no cap at age 70+."),
  WA: NONE, // no state income tax
  WV: UNCAPPED("Deductible up to the account balance cap."),
  WI: D(5130, 10260, "Per beneficiary, indexed annually."),
  WY: NONE, // no state income tax and no in-state plan
};

/**
 * Annual value of a state's tax break on a given contribution.
 *
 * Deductions are capped before the marginal rate is applied — the cap is the
 * whole point, and ignoring it overstates the benefit for anyone contributing
 * above it. Credits apply their rate then their dollar ceiling.
 */
export function annualBenefitValue({
  benefit,
  contribution,
  marginalRatePct,
  joint,
}: {
  benefit: StateTaxBenefit;
  contribution: number;
  /** State marginal income-tax rate, used for deductions only. */
  marginalRatePct: number;
  joint: boolean;
}): number {
  if (benefit.kind === "none" || contribution <= 0) return 0;

  if (benefit.kind === "credit") {
    const ceiling = (joint ? benefit.creditMaxJoint : benefit.creditMaxSingle) ?? 0;
    const rate = benefit.creditRatePct;
    // Some credits are fixed-dollar rather than rate-based; those are the ceiling.
    const raw = rate === undefined ? ceiling : contribution * (rate / 100);
    return Math.min(raw, ceiling);
  }

  const cap = benefit.uncapped
    ? contribution
    : (joint ? benefit.deductionJoint : benefit.deductionSingle) ?? 0;
  const eligible = Math.min(contribution, cap);
  return eligible * (marginalRatePct / 100);
}
