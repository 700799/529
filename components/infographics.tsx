import React from "react";

// All graphics are inline SVG so the site stays fully self-contained
// (no external image requests, works offline on GitHub Pages). No emoji.

export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="A graduation cap above a growing stack of coins">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3479ff" />
          <stop offset="100%" stopColor="#1642e1" />
        </linearGradient>
        <linearGradient id="coin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="20" fill="url(#sky)" />
      {/* growth curve */}
      <path d="M30 250 C120 240 150 120 230 90 S360 50 380 40" fill="none" stroke="#bcdaff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      {/* coin stacks */}
      {[
        { x: 70, h: 60 },
        { x: 130, h: 95 },
        { x: 190, h: 130 },
        { x: 250, h: 170 },
      ].map((s, i) => (
        <g key={i}>
          {Array.from({ length: Math.round(s.h / 14) }).map((_, j) => (
            <ellipse key={j} cx={s.x} cy={258 - j * 14} rx="26" ry="8" fill="url(#coin)" stroke="#d97706" strokeWidth="1" />
          ))}
        </g>
      ))}
      {/* graduation cap */}
      <g transform="translate(300,70)">
        <polygon points="0,20 50,0 100,20 50,40" fill="#0f172a" />
        <polygon points="20,28 80,28 80,55 50,68 20,55" fill="#1e293b" />
        <line x1="100" y1="20" x2="100" y2="55" stroke="#fbbf24" strokeWidth="3" />
        <circle cx="100" cy="58" r="5" fill="#fbbf24" />
      </g>
    </svg>
  );
}

export function FlowDiagram() {
  const steps = [
    { t: "1. Contribute", d: "After-tax dollars (possible state deduction)", c: "#1d57f5" },
    { t: "2. Grow", d: "Investments compound 100% tax-free", c: "#059669" },
    { t: "3. Withdraw", d: "Tax-free for qualified education", c: "#f59e0b" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={i} className="relative">
          <div className="card h-full" style={{ borderTopColor: s.c, borderTopWidth: 4 }}>
            <div className="text-sm font-bold" style={{ color: s.c }}>
              {s.t}
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.d}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-300 sm:block">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function WaterfallInfographic() {
  // Order of college funding sources, best to last resort.
  const rows = [
    { label: "Scholarships & grants (free money)", color: "#10b981", w: 100 },
    { label: "529 / savings & current income", color: "#1d57f5", w: 86 },
    { label: "Work-study & part-time work", color: "#8b5cf6", w: 64 },
    { label: "Federal subsidized loans", color: "#0ea5e9", w: 50 },
    { label: "Federal unsubsidized loans", color: "#0284c7", w: 40 },
    { label: "Parent PLUS (cap it!)", color: "#f97316", w: 28 },
    { label: "Private loans (last resort)", color: "#ef4444", w: 18 },
    { label: "Payday / 401(k) raid — NEVER", color: "#7f1d1d", w: 10 },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 shrink-0 text-right text-xs font-bold text-slate-400">{i + 1}</div>
          <div className="flex-1">
            <div className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-300">{r.label}</div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full" style={{ width: `${r.w}%`, background: r.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function IconShield({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWarning({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconCalc({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="8" y="6" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 13h.01M12 13h.01M15 13h.01M9 16h.01M12 16h.01M15 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconBook({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 5a2 2 0 012-2h6v16H6a2 2 0 00-2 2V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 5a2 2 0 00-2-2h-6v16h6a2 2 0 012 2V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function VehicleMatrix() {
  // Quick at-a-glance comparison of the main education vehicles.
  const cols = ["529", "Coverdell", "UTMA", "Roth IRA"];
  const rows: { label: string; vals: ("yes" | "no" | "mid")[] }[] = [
    { label: "Tax-free growth for school", vals: ["yes", "yes", "no", "mid"] },
    { label: "High contribution limit", vals: ["yes", "no", "yes", "no"] },
    { label: "Gentle on financial aid", vals: ["yes", "yes", "no", "yes"] },
    { label: "Flexible / non-education use", vals: ["mid", "no", "yes", "yes"] },
    { label: "Owner keeps control", vals: ["yes", "yes", "no", "yes"] },
  ];
  const cell = (v: "yes" | "no" | "mid") => {
    const map = {
      yes: { bg: "bg-accent-100 dark:bg-accent-900/40", t: "text-accent-700 dark:text-accent-300", s: "Yes" },
      no: { bg: "bg-red-100 dark:bg-red-900/40", t: "text-red-700 dark:text-red-300", s: "No" },
      mid: { bg: "bg-amber-100 dark:bg-amber-900/40", t: "text-amber-700 dark:text-amber-300", s: "Partial" },
    }[v];
    return <span className={"inline-flex w-full items-center justify-center rounded-md py-1 text-xs font-semibold " + map.bg + " " + map.t}>{map.s}</span>;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] border-separate border-spacing-1 text-sm">
        <thead>
          <tr>
            <th className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Feature</th>
            {cols.map((c) => (
              <th key={c} className="px-2 text-center text-xs font-bold text-slate-700 dark:text-slate-200">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="py-1 pr-2 text-slate-600 dark:text-slate-300">{r.label}</td>
              {r.vals.map((v, i) => (
                <td key={i} className="w-20 px-1">{cell(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AidShelterInfographic() {
  // Before/after: moving reportable cash into sheltered buckets.
  const before = [
    { label: "Cash / brokerage (counted ~5.6%)", w: 70, color: "#ef4444" },
    { label: "Child's custodial (counted 20%)", w: 30, color: "#b91c1c" },
  ];
  const after = [
    { label: "Home equity (not counted on FAFSA)", w: 45, color: "#10b981" },
    { label: "Retirement accounts (not counted)", w: 40, color: "#059669" },
    { label: "Parent 529 (counted ~5.6%)", w: 15, color: "#1d57f5" },
  ];
  const Bar = ({ items, title }: { items: typeof before; title: string }) => (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="flex h-6 w-full overflow-hidden rounded-lg">
        {items.map((it, i) => (
          <div key={i} style={{ width: `${it.w}%`, background: it.color }} title={it.label} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {items.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <Bar items={before} title="Before: assessable assets" />
      <Bar items={after} title="After: legally repositioned" />
    </div>
  );
}

export function GiftTreeInfographic() {
  return (
    <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="Annual gift exclusion and 5-year superfunding diagram">
      <rect width="320" height="180" rx="14" fill="#eef6ff" className="dark:opacity-90" />
      <g transform="translate(20,30)">
        <rect x="0" y="0" width="120" height="50" rx="8" fill="#1d57f5" />
        <text x="60" y="22" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">$19,000 / yr</text>
        <text x="60" y="38" textAnchor="middle" fill="#bcdaff" fontSize="9">per donor, per child</text>
      </g>
      <g transform="translate(180,20)">
        <rect x="0" y="0" width="120" height="120" rx="8" fill="#059669" />
        <text x="60" y="34" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">$95,000</text>
        <text x="60" y="52" textAnchor="middle" fill="#d1fae5" fontSize="9">5-year superfund</text>
        <text x="60" y="80" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">$190,000</text>
        <text x="60" y="98" textAnchor="middle" fill="#d1fae5" fontSize="9">per couple, per child</text>
      </g>
      <path d="M140 55 C160 55 160 80 178 80" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
    </svg>
  );
}
