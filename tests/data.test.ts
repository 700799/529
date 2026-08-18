import { describe, it, expect } from "vitest";
import { statePlans } from "@/lib/data/statePlans";
import { prepaidPlans } from "@/lib/data/prepaidPlans";
import { faqs, glossary } from "@/lib/data/learn";
import { SECTIONS, sectionById } from "@/lib/sections";

// The datasets are hand-maintained, so a typo in one record is the most likely
// way this site ships something wrong. These invariants are cheap and catch it.

describe("statePlans", () => {
  it("covers all 50 states plus DC", () => {
    expect(statePlans).toHaveLength(51);
  });

  it("has unique state names and postal abbreviations", () => {
    expect(new Set(statePlans.map((p) => p.abbr)).size).toBe(51);
    expect(new Set(statePlans.map((p) => p.state)).size).toBe(51);
  });

  it("uses two-letter uppercase abbreviations", () => {
    for (const p of statePlans) expect(p.abbr).toMatch(/^[A-Z]{2}$/);
  });

  it("has no empty required text fields", () => {
    for (const p of statePlans) {
      for (const key of ["state", "planName", "programManager", "stateTaxBenefit", "deductionDetail", "notes"] as const) {
        expect(p[key].trim(), `${p.state}.${key}`).not.toBe("");
      }
    }
  });

  it("keeps fees in a plausible range, as a percent not a fraction", () => {
    // Values are percents (0.14 means 0.14%/yr), not fractions. A value at or
    // above 2.5 almost certainly means someone entered a fraction or slipped a
    // decimal. Zero is legitimate: Georgia's Path2College has portfolios with
    // no program-management fee.
    for (const p of statePlans) {
      expect(p.lowestFeePct, `${p.state} fee`).toBeGreaterThanOrEqual(0);
      expect(p.lowestFeePct, `${p.state} fee`).toBeLessThan(2.5);
    }
  });

  it("keeps balance caps in a plausible range, allowing the no-plan sentinel", () => {
    // maxBalance 0 is the documented sentinel for a state with no in-state
    // plan (the compare table renders it as an em-dash). Every state that does
    // have a plan must carry a realistic aggregate cap.
    for (const p of statePlans) {
      if (p.maxBalance === 0) continue;
      expect(p.maxBalance, `${p.state} cap`).toBeGreaterThanOrEqual(235000);
      expect(p.maxBalance, `${p.state} cap`).toBeLessThanOrEqual(750000);
    }
  });

  it("has exactly one state with no in-state plan, and it is Wyoming", () => {
    // Pins a real-world fact the dataset encodes. If another state's cap ever
    // lands at 0 it is a data-entry slip, not a new sentinel.
    const noPlan = statePlans.filter((p) => p.maxBalance === 0);
    expect(noPlan.map((p) => p.abbr)).toEqual(["WY"]);
  });

  it("uses only known editorial tiers", () => {
    const tiers = new Set(["gold", "silver", "bronze", "neutral"]);
    for (const p of statePlans) expect(tiers.has(p.tier), `${p.state} tier ${p.tier}`).toBe(true);
  });

  it("marks no-income-tax states as tax parity", () => {
    // A state with no income tax cannot offer a deduction, so treating it as
    // parity is what keeps the compare table honest.
    for (const abbr of ["AK", "FL", "NV", "SD", "TX", "WA", "WY"]) {
      const p = statePlans.find((s) => s.abbr === abbr);
      expect(p, abbr).toBeDefined();
      expect(p!.taxParity, `${abbr} should be parity (no income tax)`).toBe(true);
    }
  });
});

describe("prepaidPlans", () => {
  it("is non-empty and uses known statuses and types", () => {
    expect(prepaidPlans.length).toBeGreaterThan(0);
    const statuses = new Set(["Open", "Closed to new enrollees", "Open (resident only)"]);
    const types = new Set(["Prepaid tuition", "Prepaid (private)", "Prepaid (unit)"]);
    for (const p of prepaidPlans) {
      expect(statuses.has(p.status), `${p.name} status ${p.status}`).toBe(true);
      expect(types.has(p.type), `${p.name} type ${p.type}`).toBe(true);
    }
  });
});

describe("learn content", () => {
  it("has FAQs with both a question and an answer", () => {
    expect(faqs.length).toBeGreaterThan(0);
    for (const f of faqs) {
      expect(f.q.trim()).not.toBe("");
      expect(f.a.trim()).not.toBe("");
    }
  });

  it("has no duplicate FAQ questions — duplicates would pollute the FAQPage schema", () => {
    expect(new Set(faqs.map((f) => f.q)).size).toBe(faqs.length);
  });

  it("has glossary terms with definitions", () => {
    expect(glossary.length).toBeGreaterThan(0);
    for (const g of glossary) expect(g.definition.trim()).not.toBe("");
    expect(new Set(glossary.map((g) => g.term)).size).toBe(glossary.length);
  });
});

describe("section registry", () => {
  it("exposes 16 sections with unique ids", () => {
    expect(SECTIONS).toHaveLength(16);
    expect(new Set(SECTIONS.map((s) => s.id)).size).toBe(SECTIONS.length);
  });

  it("uses URL-safe ids — they are the hash today and route segments next", () => {
    for (const s of SECTIONS) expect(s.id).toMatch(/^[a-z0-9-]+$/);
  });

  it("gives every section a label, blurb, and render function", () => {
    for (const s of SECTIONS) {
      expect(s.label.trim(), s.id).not.toBe("");
      expect(s.blurb.trim(), s.id).not.toBe("");
      expect(typeof s.render, s.id).toBe("function");
    }
  });

  it("indexes every section in sectionById", () => {
    for (const s of SECTIONS) expect(sectionById[s.id]).toBe(s);
  });
});

describe("data cycle", () => {
  it("keeps meta.json's stamped cycle in sync with DATA_CYCLE", async () => {
    // Two files declare the cycle: lib/data/meta-cycle.ts (used by the UI) and
    // scripts/generate-data.mjs (stamped into meta.json). If they drift, the
    // site shows one cycle in the compare table and another in the footer.
    const { DATA_CYCLE } = await import("@/lib/data/meta-cycle");
    const meta = (await import("@/lib/data/meta.json")).default as { dataCycle?: string };
    expect(meta.dataCycle, "run `npm run refresh` after changing DATA_CYCLE").toBe(DATA_CYCLE);
  });
});
