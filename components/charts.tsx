"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usd } from "@/lib/format";

const axisStyle = { fontSize: 12, fill: "#94a3b8" };
const grid = "#e2e8f0";

function compactUSD(n: number) {
  if (Math.abs(n) >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

/**
 * Renders a fixed-height box and only mounts its chart child once the box has a
 * real width. This keeps charts inside prerendered-but-hidden sections (the SEO
 * prerender in the drawer) from rendering — and from logging recharts'
 * zero-dimension warnings — until their section is actually shown. A
 * ResizeObserver flips it on when the section becomes visible.
 */
function Gate({ height, children }: { height: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (el.clientWidth > 0 && el.clientHeight > 0) setReady(true);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: "100%", height }}>
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

export function GrowthAreaChart({
  data,
}: {
  data: { year: number; balance: number; contributed: number }[];
}) {
  return (
    <Gate height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gBal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1d57f5" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#1d57f5" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="gCon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: grid }} unit="y" />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={compactUSD} width={48} />
        <Tooltip
          formatter={(v: number, name: string) => [usd(v), name === "balance" ? "Balance" : "Contributed"]}
          labelFormatter={(l) => `Year ${l}`}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
        />
        <Area type="monotone" dataKey="contributed" stroke="#94a3b8" fill="url(#gCon)" strokeWidth={2} name="Contributed" />
        <Area type="monotone" dataKey="balance" stroke="#1d57f5" fill="url(#gBal)" strokeWidth={2.5} name="Balance" />
      </AreaChart>
    </Gate>
  );
}

export function CompareLines({
  data,
  series,
}: {
  data: Record<string, number>[];
  series: { key: string; color: string; name: string }[];
}) {
  return (
    <Gate height={300}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: grid }} unit="y" />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={compactUSD} width={48} />
        <Tooltip
          formatter={(v: number, n: string) => [usd(v), n]}
          labelFormatter={(l) => `Year ${l}`}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
        />
        <Legend wrapperStyle={{ fontSize: 13 }} />
        {series.map((s) => (
          <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2.5} dot={false} name={s.name} />
        ))}
      </LineChart>
    </Gate>
  );
}

export function FundingStack({
  data,
}: {
  data: { label: string; amount: number; color: string }[];
}) {
  // Render as a single horizontal stacked bar via one row.
  const row: Record<string, number> = { name: 0 as unknown as number };
  data.forEach((d, i) => (row[`s${i}`] = d.amount));
  return (
    <Gate height={90}>
      <BarChart layout="vertical" data={[row]} margin={{ top: 0, right: 10, left: 0, bottom: 0 }} stackOffset="none">
        <XAxis type="number" tick={axisStyle} tickFormatter={compactUSD} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" hide />
        <Tooltip
          formatter={(v: number, key: string) => {
            const idx = parseInt(key.replace("s", ""), 10);
            return [usd(v), data[idx]?.label ?? key];
          }}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
        />
        {data.map((d, i) => (
          <Bar key={i} dataKey={`s${i}`} stackId="a" fill={d.color} radius={i === 0 ? [6, 0, 0, 6] : i === data.length - 1 ? [0, 6, 6, 0] : 0} />
        ))}
      </BarChart>
    </Gate>
  );
}

export function SimpleBars({
  data,
  color = "#1d57f5",
  height = 300,
  referenceY,
}: {
  data: { name: string; value: number; color?: string }[];
  color?: string;
  height?: number;
  referenceY?: number;
}) {
  return (
    <Gate height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="name" tick={{ ...axisStyle, fontSize: 11 }} interval={0} tickLine={false} axisLine={{ stroke: grid }} />
        <YAxis tick={axisStyle} tickFormatter={compactUSD} axisLine={false} tickLine={false} width={48} />
        <Tooltip
          formatter={(v: number) => usd(v)}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
          cursor={{ fill: "rgba(148,163,184,0.1)" }}
        />
        {referenceY != null && <ReferenceLine y={referenceY} stroke="#ef4444" strokeDasharray="4 4" />}
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color || color} />
          ))}
        </Bar>
      </BarChart>
    </Gate>
  );
}

export function DonutChart({
  data,
  height = 260,
}: {
  data: { name: string; value: number; color: string }[];
  height?: number;
}) {
  return (
    <Gate height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: number, n: string) => [usd(v), n]}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </Gate>
  );
}
