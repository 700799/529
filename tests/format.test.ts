import { describe, it, expect } from "vitest";
import { usd, pct, futureValue, monthlyPayment, inflate, growthSeries } from "@/lib/format";

// These functions produce the dollar figures users act on, so the values are
// pinned against independently-derived closed-form results rather than against
// whatever the implementation happens to return today.

describe("usd", () => {
  it("formats whole dollars by default", () => {
    expect(usd(1234.56)).toBe("$1,235");
    expect(usd(0)).toBe("$0");
  });
  it("formats cents on request", () => {
    expect(usd(1234.5, { cents: true })).toBe("$1,234.50");
  });
  it("handles negatives", () => {
    expect(usd(-500)).toBe("-$500");
  });
});

describe("pct", () => {
  it("defaults to two decimals", () => {
    expect(pct(3.14159)).toBe("3.14%");
  });
  it("honours an explicit precision", () => {
    expect(pct(3.14159, 0)).toBe("3%");
  });
});

describe("futureValue", () => {
  it("returns the lump sum when there is no contribution stream", () => {
    // 10,000 * 1.05^10, compounded monthly at 5%/12.
    const expected = 10000 * Math.pow(1 + 0.05 / 12, 120);
    expect(futureValue({ monthly: 0, years: 10, annualRate: 0.05, initial: 10000 })).toBeCloseTo(expected, 6);
  });

  it("matches the ordinary-annuity closed form", () => {
    // FV = PMT * ((1+r)^n - 1) / r  with r = 0.06/12, n = 18*12.
    const r = 0.06 / 12, n = 216;
    const expected = 200 * ((Math.pow(1 + r, n) - 1) / r);
    expect(futureValue({ monthly: 200, years: 18, annualRate: 0.06 })).toBeCloseTo(expected, 6);
  });

  it("degrades to simple accumulation at a 0% rate", () => {
    // No growth: 18 years of $200/mo plus the initial deposit.
    expect(futureValue({ monthly: 200, years: 18, annualRate: 0, initial: 1000 })).toBe(200 * 216 + 1000);
  });

  it("is zero when nothing is invested", () => {
    expect(futureValue({ monthly: 0, years: 18, annualRate: 0.06 })).toBe(0);
  });

  it("grows monotonically with the contribution", () => {
    const low = futureValue({ monthly: 100, years: 18, annualRate: 0.06 });
    const high = futureValue({ monthly: 300, years: 18, annualRate: 0.06 });
    expect(high).toBeGreaterThan(low);
  });
});

describe("monthlyPayment", () => {
  it("matches the standard amortization formula", () => {
    // $30,000 at 6.5% over 10 years -> ~$340.65/mo.
    const pmt = monthlyPayment({ principal: 30000, annualRate: 0.065, years: 10 });
    expect(pmt).toBeCloseTo(340.65, 1);
  });

  it("splits principal evenly at a 0% rate", () => {
    expect(monthlyPayment({ principal: 12000, annualRate: 0, years: 10 })).toBe(100);
  });

  it("guards against a zero term instead of dividing by zero", () => {
    expect(monthlyPayment({ principal: 12000, annualRate: 0.05, years: 0 })).toBe(0);
  });

  it("amortizes exactly: the payment stream retires the principal", () => {
    const principal = 30000, annualRate = 0.065, years = 10;
    const pmt = monthlyPayment({ principal, annualRate, years });
    let bal = principal;
    for (let i = 0; i < years * 12; i++) bal = bal * (1 + annualRate / 12) - pmt;
    expect(bal).toBeCloseTo(0, 6);
  });
});

describe("inflate", () => {
  it("compounds annually", () => {
    expect(inflate(30000, 0.05, 18)).toBeCloseTo(30000 * Math.pow(1.05, 18), 6);
  });
  it("is the identity at zero years or zero rate", () => {
    expect(inflate(30000, 0.05, 0)).toBe(30000);
    expect(inflate(30000, 0, 18)).toBe(30000);
  });
});

describe("growthSeries", () => {
  const series = growthSeries({ monthly: 200, years: 18, annualRate: 0.06, initial: 1000 });

  it("emits one point per year plus the year-0 opening balance", () => {
    expect(series).toHaveLength(19);
    expect(series[0]).toEqual({ year: 0, balance: 1000, contributed: 1000 });
  });

  it("tracks contributions as principal only, excluding growth", () => {
    expect(series[18].contributed).toBe(1000 + 200 * 216);
    expect(series[18].balance).toBeGreaterThan(series[18].contributed);
  });

  it("increases monotonically", () => {
    for (let i = 1; i < series.length; i++) {
      expect(series[i].balance).toBeGreaterThan(series[i - 1].balance);
    }
  });

  it("agrees with futureValue — the chart and the headline number cannot diverge", () => {
    const fv = futureValue({ monthly: 200, years: 18, annualRate: 0.06, initial: 1000 });
    expect(series[18].balance).toBe(Math.round(fv));
  });
});
