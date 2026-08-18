import { describe, it, expect } from "vitest";
import { stateTaxBenefits, annualBenefitValue } from "@/lib/data/stateTaxBenefits";
import { statePlans } from "@/lib/data/statePlans";

describe("stateTaxBenefits coverage", () => {
  it("has an entry for every state in statePlans, and no extras", () => {
    const planAbbrs = statePlans.map((p) => p.abbr).sort();
    expect(Object.keys(stateTaxBenefits).sort()).toEqual(planAbbrs);
  });

  it("gives deductions a cap or an explicit uncapped flag", () => {
    for (const [abbr, b] of Object.entries(stateTaxBenefits)) {
      if (b.kind !== "deduction") continue;
      const described = b.uncapped || (b.deductionSingle !== undefined && b.deductionJoint !== undefined);
      expect(described, `${abbr} deduction is neither capped nor marked uncapped`).toBe(true);
      if (!b.uncapped) {
        expect(b.deductionSingle!, abbr).toBeGreaterThan(0);
        expect(b.deductionJoint!, abbr).toBeGreaterThanOrEqual(b.deductionSingle!);
      }
    }
  });

  it("gives every credit a dollar ceiling", () => {
    for (const [abbr, b] of Object.entries(stateTaxBenefits)) {
      if (b.kind !== "credit") continue;
      expect(b.creditMaxSingle, abbr).toBeGreaterThan(0);
      expect(b.creditMaxJoint!, abbr).toBeGreaterThanOrEqual(b.creditMaxSingle!);
    }
  });

  it("marks the no-income-tax states as having no benefit", () => {
    for (const abbr of ["AK", "FL", "NV", "SD", "TX", "WA", "WY"]) {
      expect(stateTaxBenefits[abbr].kind, abbr).toBe("none");
    }
  });

  it("agrees with statePlans prose about which states offer nothing", () => {
    // A plan whose prose says "None" must not advertise a computable benefit.
    for (const p of statePlans) {
      if (/^none\b/i.test(p.deductionDetail.trim())) {
        expect(stateTaxBenefits[p.abbr].kind, `${p.state} prose says none`).toBe("none");
      }
    }
  });
});

describe("annualBenefitValue", () => {
  const NY = stateTaxBenefits.NY; // deduction, 5,000 / 10,000

  it("applies the marginal rate below the cap", () => {
    expect(annualBenefitValue({ benefit: NY, contribution: 4000, marginalRatePct: 6, joint: false })).toBeCloseTo(240);
  });

  it("caps the deduction — the bug this replaced", () => {
    // Contributing 10,000 as a single filer in NY only deducts 5,000. The old
    // calculator multiplied the full contribution and doubled the answer.
    expect(annualBenefitValue({ benefit: NY, contribution: 10000, marginalRatePct: 6, joint: false })).toBeCloseTo(300);
    // Same contribution, joint filing: the whole 10,000 is eligible.
    expect(annualBenefitValue({ benefit: NY, contribution: 10000, marginalRatePct: 6, joint: true })).toBeCloseTo(600);
  });

  it("never exceeds the cap no matter how large the contribution", () => {
    const huge = annualBenefitValue({ benefit: NY, contribution: 1_000_000, marginalRatePct: 6, joint: true });
    expect(huge).toBeCloseTo(10000 * 0.06);
  });

  it("returns zero for states with no benefit", () => {
    expect(annualBenefitValue({ benefit: stateTaxBenefits.TX, contribution: 10000, marginalRatePct: 6, joint: true })).toBe(0);
  });

  it("applies a rate-based credit and its ceiling", () => {
    // Indiana: 20% credit capped at $1,500.
    const IN = stateTaxBenefits.IN;
    expect(annualBenefitValue({ benefit: IN, contribution: 5000, marginalRatePct: 0, joint: true })).toBeCloseTo(1000);
    expect(annualBenefitValue({ benefit: IN, contribution: 50000, marginalRatePct: 0, joint: true })).toBeCloseTo(1500);
  });

  it("treats a fixed-dollar credit as its ceiling", () => {
    // Oregon's credit is not a simple percentage.
    const OR = stateTaxBenefits.OR;
    expect(annualBenefitValue({ benefit: OR, contribution: 10000, marginalRatePct: 0, joint: true })).toBe(360);
    expect(annualBenefitValue({ benefit: OR, contribution: 10000, marginalRatePct: 0, joint: false })).toBe(180);
  });

  it("deducts the full contribution in uncapped states", () => {
    const WV = stateTaxBenefits.WV;
    expect(annualBenefitValue({ benefit: WV, contribution: 30000, marginalRatePct: 5, joint: false })).toBeCloseTo(1500);
  });

  it("is zero for a zero or negative contribution", () => {
    expect(annualBenefitValue({ benefit: NY, contribution: 0, marginalRatePct: 6, joint: true })).toBe(0);
    expect(annualBenefitValue({ benefit: NY, contribution: -100, marginalRatePct: 6, joint: true })).toBe(0);
  });
});
