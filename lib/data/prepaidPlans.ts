import type { PrepaidPlan } from "./types";

// Prepaid tuition & "lock-in" programs. These let you buy future tuition at
// (roughly) today's prices instead of investing in the market. Most are
// resident-only and several have closed to new enrollees.

export const prepaidPlans: PrepaidPlan[] = [
  {
    name: "Florida Prepaid College Plan",
    state: "Florida",
    type: "Prepaid tuition",
    status: "Open (resident only)",
    whatItLocks: "Florida public university or college tuition + fees, locked at purchase price.",
    guarantee: "Backed by the State of Florida — guaranteed even if plan investments fall short.",
    notes: "The largest, most successful prepaid program. Open enrollment each spring; monthly payment plans. Refundable/transferable to private & out-of-state schools at the plan's value.",
  },
  {
    name: "Maryland Prepaid College Trust",
    state: "Maryland",
    type: "Prepaid tuition",
    status: "Closed to new enrollees",
    whatItLocks: "Semesters/years of Maryland public tuition at lock-in price.",
    guarantee: "State guarantee, but the program closed to new enrollment in 2023 after interest-calculation disputes.",
    notes: "Existing accounts honored. New Maryland savers use the Maryland College Investment Plan (T. Rowe Price) instead.",
  },
  {
    name: "Texas Tuition Promise Fund",
    state: "Texas",
    type: "Prepaid (unit)",
    status: "Open (resident only)",
    whatItLocks: "'Tuition units' redeemable for Texas public college tuition + required fees.",
    guarantee: "Constitutionally guaranteed by the State of Texas.",
    notes: "Buy units now, redeem later regardless of future price. The older Texas Guaranteed Tuition Plan is closed.",
  },
  {
    name: "Washington GET (Guaranteed Education Tuition)",
    state: "Washington",
    type: "Prepaid (unit)",
    status: "Open (resident only)",
    whatItLocks: "Units worth 1/100th of the most expensive WA public university's annual tuition.",
    guarantee: "State-guaranteed value floor.",
    notes: "100 units = one year of tuition. Reopened after a pause; pairs with WA's DreamAhead savings plan.",
  },
  {
    name: "Private College 529 Plan",
    state: "National (nonprofit)",
    type: "Prepaid (private)",
    status: "Open",
    whatItLocks: "Prepaid tuition certificates honored at ~300 participating PRIVATE colleges (e.g., Stanford, MIT, Notre Dame, Amherst).",
    guarantee: "Participating colleges bear the investment risk, not you.",
    notes: "The only national prepaid plan. No residency requirement. If the child doesn't attend a member school, you get contributions back +/- a capped market adjustment.",
  },
  {
    name: "Massachusetts U.Plan",
    state: "Massachusetts",
    type: "Prepaid tuition",
    status: "Open (resident only)",
    whatItLocks: "A percentage of tuition + mandatory fees at participating MA public & private colleges.",
    guarantee: "Backed by MA general-obligation bonds.",
    notes: "Buy 'tuition certificates' that keep pace with tuition inflation at member schools. Separate from the U.Fund savings plan.",
  },
  {
    name: "Mississippi MPACT",
    state: "Mississippi",
    type: "Prepaid tuition",
    status: "Open (resident only)",
    whatItLocks: "Mississippi public college tuition + mandatory fees.",
    guarantee: "State-backed.",
    notes: "Reopened in recent years after an earlier closure; resident-only.",
  },
  {
    name: "Pennsylvania Guaranteed Savings Plan (GSP)",
    state: "Pennsylvania",
    type: "Prepaid (unit)",
    status: "Open (resident only)",
    whatItLocks: "Savings that grow with tuition inflation at a chosen PA school 'tuition level' (community college, state, private).",
    guarantee: "Backed by a state fund; value tied to tuition increases.",
    notes: "A hybrid: behaves like prepaid but you pick a tuition benchmark. Pairs with PA's investment plan.",
  },
];
