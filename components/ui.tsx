"use client";

import React from "react";

export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
        (active
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700")
      }
    >
      {children}
    </button>
  );
}

export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={
              (size === "sm" ? "px-3 py-1 text-xs " : "px-4 py-1.5 text-sm ") +
              "rounded-full font-medium transition " +
              (active
                ? "bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-300"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100")
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const tierStyles: Record<string, string> = {
  gold: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  silver: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  bronze: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  neutral: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  green: "bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  blue: "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof tierStyles;
  children: React.ReactNode;
}) {
  return <span className={"tag " + (tierStyles[tone] || tierStyles.neutral)}>{children}</span>;
}

export function Stat({
  value,
  label,
  tone = "blue",
}: {
  value: string;
  label: string;
  tone?: "blue" | "green" | "red" | "amber";
}) {
  const tones: Record<string, string> = {
    blue: "text-brand-600 dark:text-brand-400",
    green: "text-accent-600 dark:text-accent-400",
    red: "text-red-600 dark:text-red-400",
    amber: "text-amber-600 dark:text-amber-400",
  };
  return (
    <div className="card text-center">
      <div className={"text-3xl font-extrabold tracking-tight " + tones[tone]}>{value}</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-1">{title}</h2>
      {intro && <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{intro}</p>}
    </header>
  );
}

export function Callout({
  tone = "blue",
  title,
  children,
}: {
  tone?: "blue" | "green" | "red" | "amber";
  title: string;
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    blue: "border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/40",
    green: "border-accent-200 bg-accent-50 dark:border-accent-900 dark:bg-accent-950/40",
    red: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40",
    amber: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
  };
  return (
    <div className={"rounded-xl border p-4 " + tones[tone]}>
      <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{children}</div>
    </div>
  );
}

export function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div className="flex items-center rounded-lg border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-brand-400 dark:border-slate-700 dark:bg-slate-900">
        {prefix && <span className="pl-3 text-slate-400">{prefix}</span>}
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none dark:text-white"
        />
        {suffix && <span className="pr-3 text-slate-400">{suffix}</span>}
      </div>
    </label>
  );
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  display,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  display: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
      />
    </label>
  );
}
