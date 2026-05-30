export function usd(n: number, opts?: { cents?: boolean }): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts?.cents ? 2 : 0,
    maximumFractionDigits: opts?.cents ? 2 : 0,
  });
}

export function pct(n: number, digits = 2): string {
  return `${n.toFixed(digits)}%`;
}

/** Future value of a monthly contribution stream + lump sum. */
export function futureValue({
  monthly,
  years,
  annualRate,
  initial = 0,
}: {
  monthly: number;
  years: number;
  annualRate: number;
  initial?: number;
}): number {
  const r = annualRate / 12;
  const n = years * 12;
  const fvLump = initial * Math.pow(1 + r, n);
  const fvStream = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  return fvLump + fvStream;
}

/** Standard fixed-rate loan monthly payment. */
export function monthlyPayment({
  principal,
  annualRate,
  years,
}: {
  principal: number;
  annualRate: number;
  years: number;
}): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Project a cost forward by an annual inflation rate. */
export function inflate(amount: number, rate: number, years: number): number {
  return amount * Math.pow(1 + rate, years);
}

/** Build a year-by-year balance series for a contribution stream. */
export function growthSeries({
  monthly,
  years,
  annualRate,
  initial = 0,
}: {
  monthly: number;
  years: number;
  annualRate: number;
  initial?: number;
}): { year: number; balance: number; contributed: number }[] {
  const out: { year: number; balance: number; contributed: number }[] = [];
  const r = annualRate / 12;
  let balance = initial;
  let contributed = initial;
  out.push({ year: 0, balance: Math.round(balance), contributed: Math.round(contributed) });
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
    }
    out.push({ year: y, balance: Math.round(balance), contributed: Math.round(contributed) });
  }
  return out;
}
