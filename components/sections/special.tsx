"use client";

import React, { useMemo, useState } from "react";
import { SectionHeader, ToggleGroup, Badge, Callout, Slider } from "../ui";
import { SimpleBars, CompareLines } from "../charts";
import { usd, pct } from "@/lib/format";
import {
  sportScholarships,
  realismStats,
  artsScholarships,
  nilFacts,
  edgeCases,
  sportsCostTiers,
} from "@/lib/data/athletics";

type Tab = "reality" | "sports" | "arts" | "nil" | "cost";

export function SpecialCases() {
  const [tab, setTab] = useState<Tab>("reality");
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Special cases"
        title="Sports & music scholarships — the honest version"
        intro="Athletic and arts scholarships are real, but far rarer and smaller than most families assume. Here are the per-sport D1/D2 numbers, the NIL and edge cases, a clear-eyed look at the odds — and a calculator for what chasing them can actually cost."
      />

      <HappinessBanner />

      <ToggleGroup<Tab>
        value={tab}
        onChange={setTab}
        options={[
          { value: "reality", label: "How realistic is it?" },
          { value: "sports", label: "D1 / D2 by sport" },
          { value: "arts", label: "Music & the arts" },
          { value: "nil", label: "NIL & edge cases" },
          { value: "cost", label: "Cost calculator" },
        ]}
      />

      {tab === "reality" && <Reality />}
      {tab === "sports" && <SportsTable />}
      {tab === "arts" && <Arts />}
      {tab === "nil" && <NilEdge />}
      {tab === "cost" && <CostCalculator />}
    </div>
  );
}

function HappinessBanner() {
  return (
    <div className="rounded-2xl border border-accent-200 bg-gradient-to-br from-accent-50 to-brand-50 p-5 dark:border-accent-900 dark:from-accent-950/40 dark:to-brand-950/40">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">First, the most important thing</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
        Let a child play a sport or an instrument because it makes them happy, healthy, and connected — not as an investment with an
        expected financial return. The overwhelming majority of kids will never get an athletic or music scholarship, and that is
        completely fine. The friendships, discipline, resilience, and joy are the real return. Chase those, and treat any scholarship as
        a rare, lucky bonus rather than the goal.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
        And here&apos;s the encouraging part: <strong>even if your child never earns a soccer (or violin, or debate) scholarship,
        colleges still genuinely value the activity.</strong> Sustained commitment, leadership, teamwork, and growth in an extracurricular
        are exactly what admissions officers look for — and they often unlock <em>academic</em> merit aid that dwarfs a typical partial
        athletic award. The years matter even when the scholarship doesn&apos;t.
      </p>
    </div>
  );
}

function Reality() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {realismStats.map((s) => (
          <div key={s.label} className="card">
            <div className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">{s.value}</div>
            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{s.label}</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Callout tone="amber" title="Headcount vs. equivalency — why 'a scholarship' usually means 'a partial'">
          In a handful of <strong>headcount</strong> sports (FBS football, basketball, women&apos;s volleyball, gymnastics, and tennis),
          every scholarship is a full ride. In every other sport — the <strong>equivalency</strong> sports — a coach gets a small number
          of scholarships (sometimes under 5) to divide across an entire roster of 25–40 athletes. So even talented, recruited athletes
          typically receive a <em>partial</em> award, often 25–50%, which they then stack with academic and need-based aid.
        </Callout>
        <Callout tone="blue" title="The smarter money is usually academic">
          For most families, grades and test scores unlock far more aid than athletics — and academic awards can&apos;t be cut after an
          injury or a coaching change. A great strategy is to use sports for development and admissions appeal, while leaning on academic
          merit and a 529 for the actual funding.
        </Callout>
      </div>

      <Callout tone="red" title="Don't fund youth sports expecting a payback">
        Families frequently spend more on a decade of competitive club fees, travel, and private coaching than any partial scholarship
        will ever return. If the spending is worth it for the child&apos;s happiness and growth, wonderful — but don&apos;t justify it as
        a financial bet. The Cost calculator tab shows what that decade can add up to, and what the same money could become in a 529.
      </Callout>
    </div>
  );
}

function SportsTable() {
  const [gender, setGender] = useState<"All" | "Men" | "Women">("All");
  const rows = useMemo(
    () => (gender === "All" ? sportScholarships : sportScholarships.filter((s) => s.gender === gender)),
    [gender]
  );
  const chartData = rows
    .map((s) => ({ name: `${s.sport.split(" ")[0]}${s.gender === "Women" ? " (W)" : " (M)"}`, value: parseFloat(s.d1) || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 12);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup<"All" | "Men" | "Women">
          size="sm"
          value={gender}
          onChange={setGender}
          options={[
            { value: "All", label: "All" },
            { value: "Men", label: "Men's" },
            { value: "Women", label: "Women's" },
          ]}
        />
        <span className="text-xs text-slate-400">{rows.length} sports · per-team scholarship limits</span>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white">Division I scholarships per team (full or equivalency)</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Headcount sports = full rides; equivalency sports split these across the whole roster.
        </p>
        <SimpleBars data={chartData} height={260} />
      </div>

      <div className="table-wrap max-h-[34rem] overflow-y-auto">
        <table className="data">
          <thead>
            <tr>
              <th>Sport</th>
              <th>D1</th>
              <th>D2</th>
              <th>Type</th>
              <th>HS → NCAA</th>
              <th>HS → D1</th>
              <th>Reality</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.sport + s.gender}>
                <td className="font-semibold text-slate-900 dark:text-white">
                  {s.sport}
                  <div className="text-xs font-normal text-slate-400">{s.gender}</div>
                </td>
                <td className="font-semibold">{s.d1}</td>
                <td>{s.d2}</td>
                <td>
                  <Badge tone={s.type === "Headcount" ? "green" : "neutral"}>{s.type}</Badge>
                </td>
                <td>{s.hsToNcaa}</td>
                <td>{s.hsToD1}</td>
                <td className="text-xs">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout tone="amber" title="A note on the changing rules">
        The 2025 House v. NCAA settlement is replacing many of these sport-by-sport limits with <strong>roster limits</strong>, letting
        D1 schools fund more scholarships (up to a full roster) if they choose — and adding direct revenue-sharing for athletes at some
        schools. The numbers above are the long-standing baselines; verify the current rules for a specific school and division.
      </Callout>
    </div>
  );
}

function Arts() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Music and arts scholarships are less standardized than athletics — there are no league-wide limits. Awards are talent- and
        audition-based, usually merit money layered on top of academic aid. The good news: they&apos;re often more <em>attainable</em>
        than a sports scholarship, especially for students who&apos;ll play in a college ensemble even as a non-major.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {artsScholarships.map((a) => (
          <div key={a.area} className="card">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white">{a.area}</h3>
              <Badge tone="blue">{a.realism}</Badge>
            </div>
            <p className="mt-1 text-sm font-semibold text-accent-600 dark:text-accent-400">{a.typicalAward}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{a.note}</p>
          </div>
        ))}
      </div>
      <Callout tone="green" title="An underused tip">
        Many large universities pay students to play in the <strong>marching band</strong> or perform in ensembles — awards that are far
        easier to land than an athletic scholarship. If your child plays an instrument, ask every prospective school&apos;s music
        department what talent awards exist, even for non-majors.
      </Callout>
    </div>
  );
}

function NilEdge() {
  return (
    <div className="space-y-5">
      <div className="card">
        <div className="flex items-center gap-2">
          <Badge tone="amber">NIL</Badge>
          <h3 className="font-bold text-slate-900 dark:text-white">Name, Image &amp; Likeness — the new money, and the hype</h3>
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {nilFacts.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 font-bold text-slate-900 dark:text-white">Edge cases worth knowing</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {edgeCases.map((e) => (
            <div key={e.title} className="card">
              <h4 className="font-semibold text-slate-900 dark:text-white">{e.title}</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{e.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout tone="blue" title="The bottom line">
        For a tiny number of elite athletes, NIL and full scholarships are life-changing. For everyone else, the realistic wins are a
        partial award stacked with academic aid, a recruited-athlete admissions boost, an attainable arts or band award, or simply a
        happier, more well-rounded kid. Plan your finances around the 529 and academic aid; let sports and music be about the child.
      </Callout>
    </div>
  );
}

function CostCalculator() {
  const [startAge, setStartAge] = useState(5);
  const [endAge, setEndAge] = useState(16);
  const [annual, setAnnual] = useState(3500);
  const [investReturn, setInvestReturn] = useState(7);

  const safeEnd = Math.max(endAge, startAge + 1);
  const years = safeEnd - startAge;

  const investKey = `If invested at ${investReturn}%`;

  const { data, totalSpent, invested } = useMemo(() => {
    const rows: Record<string, number>[] = [];
    let spent = 0;
    let inv = 0;
    const r = investReturn / 100;
    for (let y = 0; y <= years; y++) {
      rows.push({
        year: startAge + y,
        "Cumulative spent": Math.round(spent),
        [investKey]: Math.round(inv),
      });
      // Pay once per year for each year in the range (not after the last age).
      if (y < years) {
        inv = inv * (1 + r) + annual;
        spent += annual;
      }
    }
    return { data: rows, totalSpent: spent, invested: Math.round(inv) };
  }, [startAge, annual, investReturn, years, investKey]);

  const avgScholarship = 18000;

  return (
    <div className="space-y-5">
      <div className="card">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">What competitive sports really cost (age 5–16)</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Slide to estimate a decade-plus of club fees, travel, equipment, and coaching — and see what the same money could become in a
          529 instead.
        </p>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <Slider label="Start age" value={startAge} min={4} max={14} onChange={(v) => setStartAge(v)} display={`age ${startAge}`} />
            <Slider label="Stop age" value={endAge} min={startAge + 1} max={18} onChange={(v) => setEndAge(v)} display={`age ${safeEnd}`} />
            <Slider label="Annual all-in cost" value={annual} min={300} max={20000} step={100} onChange={setAnnual} display={usd(annual)} />
            <div className="flex flex-wrap gap-2">
              {sportsCostTiers.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setAnnual(t.annual)}
                  className={
                    "rounded-full px-3 py-1 text-xs font-medium transition " +
                    (annual === t.annual
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300")
                  }
                >
                  {t.label} · {usd(t.annual)}
                </button>
              ))}
            </div>
            <Slider label="If invested instead, return" value={investReturn} min={3} max={10} step={0.5} onChange={setInvestReturn} display={pct(investReturn, 1)} />
          </div>

          <div className="flex flex-col justify-center gap-3">
            <div className="rounded-2xl bg-red-50 p-5 text-center dark:bg-red-950/40">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total spent over {years} years</div>
              <div className="mt-1 text-4xl font-extrabold text-red-600 dark:text-red-400">{usd(totalSpent)}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
                <div className="text-lg font-extrabold text-brand-600 dark:text-brand-400">{usd(invested)}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">If invested in a 529 instead</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
                <div className="text-lg font-extrabold text-slate-700 dark:text-slate-200">{(totalSpent / avgScholarship).toFixed(1)}×</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">the average athletic scholarship ({usd(avgScholarship)})</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <CompareLines
            data={data}
            series={[
              { key: investKey, color: "#1d57f5", name: investKey },
              { key: "Cumulative spent", color: "#ef4444", name: "Cumulative spent" },
            ]}
          />
        </div>
      </div>

      <Callout tone="amber" title="Read this the right way">
        This isn&apos;t an argument against youth sports — it&apos;s a reality check on the &quot;it&apos;ll pay for college&quot; story.
        If your family gets {usd(totalSpent)} of joy, health, and growth from these years, it&apos;s money well spent. Just don&apos;t
        count on a scholarship to recoup it: the same dollars in a 529 would likely grow to about <strong>{usd(invested)}</strong> — often
        more than any partial athletic award would ever provide.
      </Callout>
    </div>
  );
}
