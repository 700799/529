// Shared types for the 529 guide data layer.

export interface StatePlan {
  state: string;
  abbr: string;
  planName: string;
  programManager: string;
  /** Plain-language summary of the state income-tax benefit for residents. */
  stateTaxBenefit: string;
  /** Maximum deductible/creditable contribution per year, in plain text. */
  deductionDetail: string;
  /** Account balance cap (aggregate contribution limit). */
  maxBalance: number;
  /** Lowest all-in annual asset-based fee for the cheapest age-based / index option. */
  lowestFeePct: number;
  /** Does the state give the tax break for contributions to ANY state's plan? */
  taxParity: boolean;
  /** Editorial tier: gold / silver / bronze / neutral / negative. */
  tier: "gold" | "silver" | "bronze" | "neutral";
  notes: string;
}

export interface DirectSoldPlan {
  name: string;
  sponsorState: string;
  manager: string;
  highlight: string;
  expenseRange: string;
  minimum: string;
  bestFor: string;
}

export interface PrepaidPlan {
  name: string;
  state: string;
  type: "Prepaid tuition" | "Prepaid (private)" | "Prepaid (unit)";
  status: "Open" | "Closed to new enrollees" | "Open (resident only)";
  whatItLocks: string;
  guarantee: string;
  notes: string;
}

export interface AltVehicle {
  name: string;
  taxTreatment: string;
  contributionLimit: string;
  qualifiedUses: string;
  financialAidImpact: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface LoanType {
  name: string;
  category: "Federal" | "Federal (parent/grad)" | "State" | "Private";
  borrower: "Student" | "Parent" | "Graduate student";
  rate: string;
  fees: string;
  limits: string;
  subsidized: boolean;
  keyFeatures: string[];
  watchOut: string;
}

export interface FederalProgram {
  name: string;
  type: "Grant" | "Work" | "Loan forgiveness" | "Tax credit" | "Service";
  maxValue: string;
  whoQualifies: string;
  mustRepay: boolean;
  notes: string;
}

export interface Scenario {
  id: string;
  name: string;
  archetype: string;
  family: string;
  school: string;
  stickerPerYear: number;
  netPerYear: number;
  funding: { label: string; amount: number; color: string }[];
  loanPackage: string;
  /** Approximate total debt at graduation (student + parent), 4-year basis. */
  totalDebt: number;
  outcome: string;
  lesson: string;
}

export interface SchoolTier {
  tier: string;
  example: string;
  sticker: number;
  netAvg: number;
  fourYearSticker: number;
  typicalAid: string;
  notes: string;
}

export interface LoanStat {
  group: string;
  stat: string;
  detail: string;
}

export interface JuniorCollegeOption {
  name: string;
  type: string;
  cost: string;
  payoff: string;
  notes: string;
}

export interface AgeStep {
  stage: string;
  ageRange: string;
  steps: string[];
}

export interface Source {
  category: string;
  name: string;
  url: string;
  used: string;
}
