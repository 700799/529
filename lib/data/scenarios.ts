import type { Scenario } from "./types";

// Seven scenarios named by their situation (not by a student's name), each with
// a realistic funding package. Colors map to the funding-stack bar chart.
// Amounts are PER YEAR unless noted.

const C = {
  family: "#1d57f5", // parent/family cash + 529
  grant: "#10b981", // free money
  scholarship: "#f59e0b",
  work: "#8b5cf6",
  fedLoan: "#0ea5e9",
  plus: "#ef4444",
  privateLoan: "#dc2626",
};

export const scenarios: Scenario[] = [
  {
    id: "early-saver-public",
    name: "Early Saver, Mid-Cost In-State University",
    short: "Early saver, mid-cost",
    archetype: "Started at birth · middle income",
    description:
      "This is the textbook success story, and it is deliberately ordinary — no high income, no windfall, just time and consistency. The parents earn about $95,000 combined and opened a 529 within a month of the child's birth, setting up an automatic $250 monthly transfer they almost never thought about again. Over 18 years that habit, invested in a low-cost age-based portfolio, grew to roughly $112,000 — and because it was inside a 529, every dollar of growth was tax-free. They captured their state's income-tax deduction each year as a bonus. When college arrived they chose the in-state flagship, applied for aid on time, and the student earned a modest merit award for solid grades. The 529 covers the large majority of the bill; a small subsidized federal loan rounds it out. The family never touched retirement savings, never borrowed privately, and the parents' own finances were never at risk.",
    family: "Household income ~$95k; opened a 529 at birth and auto-saved $250/mo into a low-cost age-based portfolio for 18 years.",
    school: "In-state public university (mid-cost)",
    stickerPerYear: 29000,
    netPerYear: 22000,
    funding: [
      { label: "529 withdrawal", amount: 14000, color: C.family },
      { label: "Need-based grant", amount: 3000, color: C.grant },
      { label: "Merit scholarship", amount: 3000, color: C.scholarship },
      { label: "Direct Subsidized loan", amount: 2000, color: C.fedLoan },
    ],
    loanPackage: "Only $2,000/yr subsidized federal — about $8,000 total, interest-free while in school.",
    totalDebt: 8000,
    outcome: "Graduates with ~$8k of low-interest debt, repaid easily on a starting salary. The 529 did the heavy lifting.",
    lesson: "Time plus automatic monthly contributions beats everything. Starting at birth — not earning more — is the single biggest lever.",
  },
  {
    id: "no-savings-low-cost",
    name: "No Savings, Low-Cost Community-to-University Path",
    short: "No savings, low-cost",
    archetype: "No 529 · lower income · high resourcefulness",
    description:
      "Here a family with no college savings at all still reaches a debt-light bachelor's degree by being strategic about where the education happens. Household income is about $38,000, there is no 529, and there was never spare money to start one — but the student is capable and well-advised. Instead of enrolling directly at a four-year school, the student spends two years at the local community college (tuition roughly $4,000/year, almost entirely covered by the Pell Grant and a state grant), knocks out general-education requirements at a fraction of the cost, and then transfers into the state university as a junior under a guaranteed-transfer agreement. Because the family income is low, the federal aid formula is generous: maximum Pell, state grant money, and work-study fill most of the gap, with only a small subsidized loan each year. The diploma at the end is identical to that of a student who paid four years of full freight.",
    family: "Household income ~$38k; no savings, but a capable student and a deliberate low-cost route.",
    school: "2 years community college → 2 years in-state public (transfer)",
    stickerPerYear: 13000,
    netPerYear: 3000,
    funding: [
      { label: "Pell Grant", amount: 7000, color: C.grant },
      { label: "State grant", amount: 3000, color: C.grant },
      { label: "Work-study", amount: 2500, color: C.work },
      { label: "Subsidized loan", amount: 1500, color: C.fedLoan },
    ],
    loanPackage: "Minimal: ~$1,500/yr subsidized. The community-college years cost almost nothing out of pocket.",
    totalDebt: 6000,
    outcome: "A bachelor's degree for under $20k total debt — proof that a plan-free family can still avoid a debt trap.",
    lesson: "The 2+2 transfer path plus maximizing Pell is the cheapest route to a four-year degree. Where you start matters more than where you start saving.",
  },
  {
    id: "merit-maximizer-oos",
    name: "Modest Savings, Merit-Maximizer at a High-Cost Out-of-State School",
    short: "Merit maximizer",
    archetype: "High-stats student · upper-middle income",
    description:
      "This family earns about $160,000 — too much to expect meaningful need-based aid, but not enough to comfortably write a $47,000 check every year for an out-of-state public university. Their advantage is a high-achieving student and a willingness to shop for merit money rather than prestige. They saved into a 529 over the years, accumulating a respectable but not enormous ~$60,000. Rather than chase the most selective schools (which rarely give merit aid), the student targets strong out-of-state publics that compete for high-stats applicants with large automatic merit scholarships. A $25,000/year merit award transforms a $47,000 sticker into something the 529 and current income can handle. The parents deliberately pay $4,000 of tuition in cash each year so they can claim the full $2,500 American Opportunity Tax Credit — a detail that nets them $10,000 over four years.",
    family: "Household income ~$160k; a modest ~$60k 529 and a high-stats student who chases merit aid instead of prestige.",
    school: "Out-of-state public university (high-cost) with a large merit award",
    stickerPerYear: 47000,
    netPerYear: 22000,
    funding: [
      { label: "Merit scholarship", amount: 25000, color: C.scholarship },
      { label: "529 withdrawal", amount: 15000, color: C.family },
      { label: "Parent cash (for AOTC)", amount: 4000, color: C.family },
      { label: "Unsubsidized loan", amount: 3000, color: C.fedLoan },
    ],
    loanPackage: "~$3,000/yr unsubsidized; parents pay $4k in cash to capture the $2,500 American Opportunity Tax Credit.",
    totalDebt: 12000,
    outcome: "A pricey out-of-state school becomes affordable; the student graduates with only ~$12k of debt.",
    lesson: "If you won't qualify for need-based aid, chase merit aggressively — and keep $4k of tuition in cash to claim the AOTC.",
  },
  {
    id: "elite-need-aid",
    name: "Little Savings, Elite School With Generous Need-Based Aid",
    short: "Elite, generous aid",
    archetype: "High-achiever · lower-middle income",
    description:
      "This scenario overturns the most expensive myth in college pricing: that elite schools are only for the wealthy. The family earns about $70,000 and has little saved. The student is a strong applicant and is admitted to a highly selective private university with a $90,000 sticker price — a number that would terrify most families. But this school is need-blind and follows a no-loan financial-aid policy, meeting full demonstrated need with grants instead of loans. For a household at this income, that means an institutional grant covering the overwhelming majority of the cost, topped up by Pell and state grants and a manageable work-study job. The family's actual out-of-pocket cost lands around $6,000 a year — less than many in-state public universities — and the student graduates with no debt at all. The lesson is to apply and read the aid offer before ruling anything out on sticker price.",
    family: "Household income ~$70k; little savings, but a strong applicant admitted to a need-blind, no-loan elite school.",
    school: "Highly selective private university (no-loan aid policy)",
    stickerPerYear: 90000,
    netPerYear: 6000,
    funding: [
      { label: "Institutional grant", amount: 78000, color: C.grant },
      { label: "Pell + state grant", amount: 6000, color: C.grant },
      { label: "Work-study", amount: 3000, color: C.work },
      { label: "Family contribution", amount: 3000, color: C.family },
    ],
    loanPackage: "Zero loans — the school's no-loan policy replaces all loans with grants.",
    totalDebt: 0,
    outcome: "Attends a $90k/yr school for ~$6k/yr and graduates completely debt-free.",
    lesson: "The most expensive schools are often the cheapest for lower-income high achievers. Never rule out an elite school on sticker price alone.",
  },
  {
    id: "no-plan-plus-trap",
    name: "No Plan, High-Cost Private School Funded by Parent PLUS Loans",
    short: "PLUS over-borrowing",
    archetype: "Middle-class · no savings · dream-school pressure",
    description:
      "This is the most common middle-class trap, and it is a cautionary tale precisely because every step feels reasonable in the moment. The family earns about $130,000 — enough to be offered little need-based aid, not enough to pay cash — and they never opened a 529. The student is admitted to a $62,000-a-year private university that offers only token aid, and emotionally the family can't say no to the 'dream school.' To bridge the roughly $34,000 annual gap, the parents lean on Parent PLUS loans, which conveniently let them borrow up to the entire cost of attendance. At an 8.94% rate plus a 4.2% origination fee, that gap compounds into about $114,000 of parent debt over four years — debt that balloons past $150,000 with interest and follows the parents into what should have been their peak retirement-saving years. The student adds another ~$22,000 of their own loans on top.",
    family: "Household income ~$130k; no 529; chose a $62k private school and filled the gap with Parent PLUS loans.",
    school: "Private nonprofit university (high-cost, little aid)",
    stickerPerYear: 62000,
    netPerYear: 54000,
    funding: [
      { label: "Parent cash", amount: 20000, color: C.family },
      { label: "Student federal loan", amount: 5500, color: C.fedLoan },
      { label: "Parent PLUS loan", amount: 28500, color: C.plus },
    ],
    loanPackage: "~$28,500/yr Parent PLUS at 8.94% + a 4.2% fee → ~$114k of PLUS debt over four years, plus ~$22k of student loans.",
    totalDebt: 136000,
    outcome: "Parents owe ~$114k in PLUS debt (ballooning past $150k with interest) and delay retirement; the student adds ~$22k.",
    lesson: "Borrowing the entire gap with PLUS is the classic middle-class mistake. No 529 + a high sticker price puts the parents' retirement at risk.",
  },
  {
    id: "working-student-trade",
    name: "Working Student, Low-Cost Trade & Apprenticeship Path",
    short: "Working student, trade",
    archetype: "Hands-on learner · debt-averse",
    description:
      "Not every strong outcome runs through a four-year degree, and this scenario shows the trades and 'earn-while-you-learn' paths in their best light. The family earns about $55,000 and places a high value on avoiding debt. The student is a capable, hands-on learner who isn't excited by a traditional campus. Instead, they enroll at the community college for a low-cost technical certificate while working part-time, and pair it with a registered apprenticeship that pays wages during training. An employer with a tuition-assistance benefit (up to $5,250/year tax-free under IRS Section 127) covers much of the coursework, the Pell Grant covers more, and the part-time wages handle the rest. There are no loans at any point. At the end the student holds a marketable credential, several years of real work experience, and enters a skilled trade earning a strong wage immediately — often out-earning four-year peers who are still paying down loans.",
    family: "Household income ~$55k; a debt-averse, hands-on student combining community college, an apprenticeship, and employer tuition help.",
    school: "Community college certificate + registered apprenticeship / trade",
    stickerPerYear: 9000,
    netPerYear: 2000,
    funding: [
      { label: "Pell Grant", amount: 4000, color: C.grant },
      { label: "Employer tuition aid", amount: 3000, color: C.scholarship },
      { label: "Part-time work", amount: 3000, color: C.work },
    ],
    loanPackage: "No loans. Employer tuition assistance + Pell + a part-time job cover everything.",
    totalDebt: 0,
    outcome: "Earns a marketable credential debt-free and enters a skilled trade earning a strong wage right away.",
    lesson: "Apprenticeships, employer tuition benefits, and the trades can beat a four-year degree on return-on-investment for many students.",
  },
  {
    id: "worst-case-stack",
    name: "Worst Case: For-Profit School, Private Loans & a Raided 401(k)",
    short: "Worst case",
    archetype: "No plan · poor information · predatory products",
    description:
      "This scenario deliberately stacks every avoidable mistake into one family to make the damage visible. Household income is about $60,000, there is no 529, and the family is poorly informed about how aid and loans work. The student enrolls at a for-profit college — the tier with the highest student-loan default rates and the weakest graduate-earnings outcomes per dollar spent — drawn in by aggressive marketing rather than results. With little institutional aid available, the family fills the gap the most expensive way possible: a cosigned private loan at 13% (no income-driven repayment, no forgiveness, no hardship protection), and, worst of all, the parents cash out $10,000 from a 401(k). That withdrawal is taxed as ordinary income, hit with a 10% early-withdrawal penalty, spikes the next year's FAFSA income, and — measured in lost future value — sets their retirement back roughly $70,000. The student may not even finish, but the debt and the retirement hole remain.",
    family: "Household income ~$60k; no plan, a for-profit school, a 13% private loan, and a $10k 401(k) withdrawal.",
    school: "For-profit college (weak outcomes)",
    stickerPerYear: 32000,
    netPerYear: 31000,
    funding: [
      { label: "401(k) withdrawal", amount: 10000, color: C.plus },
      { label: "Unsubsidized loan", amount: 7500, color: C.fedLoan },
      { label: "Private loan (cosigned)", amount: 13500, color: C.privateLoan },
    ],
    loanPackage: "$13.5k/yr private at 13% with no federal protections, plus a $10k 401(k) raid (tax + 10% penalty + lost growth).",
    totalDebt: 84000,
    outcome: "Graduates (if at all) with ~$80k+ of mixed debt and no IDR/PSLF on the private share; the parents set their retirement back ~$70k in future value.",
    lesson: "Every avoidable mistake at once: a for-profit school, private over federal borrowing, and raiding retirement. The Tradeoffs tab models the damage dollar-for-dollar.",
  },
];
