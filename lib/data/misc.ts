import type {
  LoanStat,
  JuniorCollegeOption,
  AgeStep,
  Source,
} from "./types";

// "Which kids get which loans" — distribution stats (approximate, drawn from
// federal and nonprofit reporting; see Sources).
export const loanStats: LoanStat[] = [
  {
    group: "All bachelor's graduates",
    stat: "~50%",
    detail: "About half of bachelor's degree earners graduate with student debt; the average balance is roughly $29,000–$30,000.",
  },
  {
    group: "By income — lowest quartile",
    stat: "Most reliant on loans + Pell",
    detail: "Lower-income students borrow the most relative to family resources and lean heavily on subsidized loans and Pell Grants.",
  },
  {
    group: "By income — highest quartile",
    stat: "Lowest borrowing rate",
    detail: "High-income students borrow least and, when they do, more often use unsubsidized or private loans rather than need-based aid.",
  },
  {
    group: "Parent PLUS borrowers",
    stat: "~3.7 million families",
    detail: "Parent PLUS balances exceed $100 billion; average balances often top $30,000 and disproportionately burden middle-income families at private schools.",
  },
  {
    group: "Private loan users",
    stat: "~6–8% of undergrads",
    detail: "A minority use private loans, usually after exhausting federal options; ~90% require a cosigner.",
  },
  {
    group: "For-profit college students",
    stat: "Highest default rates",
    detail: "For-profit attendees borrow more and default at far higher rates than public or private nonprofit peers.",
  },
  {
    group: "Community college students",
    stat: "~Lowest borrowing",
    detail: "Most community-college students borrow little or nothing; many cover tuition with Pell and state aid.",
  },
  {
    group: "Graduate students",
    stat: "~40% of federal loan dollars",
    detail: "Grad and professional students take a large share of total federal loan volume via Unsubsidized and Grad PLUS loans.",
  },
];

export const juniorCollegeOptions: JuniorCollegeOption[] = [
  {
    name: "2+2 community college transfer",
    type: "Associate → bachelor's transfer",
    cost: "~$4,000/yr tuition; often $0 net with aid",
    payoff: "Cuts a bachelor's total cost by 40–60%.",
    notes: "Complete general-ed requirements cheaply, then transfer to a 4-year school for the degree (and the diploma is identical).",
  },
  {
    name: "Statewide guaranteed-transfer / articulation agreements",
    type: "Guaranteed admission pathway",
    cost: "Community-college pricing",
    payoff: "Locks in admission + credit transfer to the state university.",
    notes: "Many states (CA ADT, FL, TX, VA GAA) guarantee junior-year admission to a public university if you finish the associate path.",
  },
  {
    name: "'Promise' free community college programs",
    type: "Tuition-free local college",
    cost: "$0 tuition (Tennessee Promise, College Promise programs, many city programs)",
    payoff: "Debt-free first two years.",
    notes: "Last-dollar scholarships cover tuition after grants. Residency and enrollment rules apply.",
  },
  {
    name: "Registered apprenticeship",
    type: "Earn-while-you-learn",
    cost: "Often paid TO you (wages) + free instruction",
    payoff: "Journeyman wages with little or no debt.",
    notes: "Electrical, plumbing, manufacturing, IT, healthcare. Combines paid work with classroom training.",
  },
  {
    name: "Employer tuition assistance",
    type: "Working program",
    cost: "Up to $5,250/yr tax-free from an employer (IRS §127)",
    payoff: "Company pays for school while you work.",
    notes: "Starbucks, Amazon, Walmart, Target, UPS, Disney and others fund degrees. $5,250/yr is excluded from your taxable income.",
  },
  {
    name: "Military / service pathways",
    type: "Service-for-education",
    cost: "$0 + stipend",
    payoff: "GI Bill, ROTC scholarships, service academies, and tuition assistance.",
    notes: "AmeriCorps Segal Award (~$7,395) and National Guard tuition benefits are lower-commitment options.",
  },
  {
    name: "Co-op programs (e.g., Northeastern, Drexel, Cincinnati)",
    type: "Paid work integrated into the degree",
    cost: "Standard tuition, offset by co-op earnings",
    payoff: "Students earn five figures across multiple paid work terms.",
    notes: "Alternating study and full-time paid work; graduates leave with experience and earnings.",
  },
];

export const ageSteps: AgeStep[] = [
  {
    stage: "Newborn to age 4",
    ageRange: "0–4",
    steps: [
      "Open a 529 within weeks of birth (or before, naming yourself, then change the beneficiary).",
      "Automate a monthly contribution — even $50/mo compounds for ~18 years.",
      "Pick a low-cost, age-based / target-enrollment portfolio (most aggressive now).",
      "Ask grandparents to redirect gift money into the 529 instead of toys.",
      "Set up a gifting page (Ugift / Upromise) and link a cash-back rewards card.",
    ],
  },
  {
    stage: "Early elementary",
    ageRange: "5–9",
    steps: [
      "Increase contributions with each raise; target ~one-third of projected cost saved by middle school.",
      "Confirm you're capturing your full state tax deduction/credit every year.",
      "Review the age-based glide path — it should still be equity-heavy.",
      "If paying for private K-12, weigh a Coverdell ESA alongside the 529.",
      "Teach basic money concepts; consider a small custodial or savings account for the child.",
    ],
  },
  {
    stage: "Tween / middle school",
    ageRange: "10–13",
    steps: [
      "Run the projection calculator annually and adjust monthly savings to close any gap.",
      "Begin researching school tiers and realistic net prices (not sticker).",
      "Start a brag sheet of the student's activities for future scholarship apps.",
      "If you're a high earner, learn the FAFSA asset rules now (retirement & home equity shelters).",
      "Avoid putting savings in the CHILD's name (custodial accounts hurt aid most).",
    ],
  },
  {
    stage: "Early high school",
    ageRange: "14–16",
    steps: [
      "Shift the 529 glide path more conservative as the time horizon shortens.",
      "Have the student take rigorous courses + dual-enrollment for free college credit.",
      "Build a scholarship pipeline; target merit-heavy schools if you won't qualify for need aid.",
      "Position assets BEFORE the first FAFSA 'base year' (the prior-prior tax year).",
      "Visit a mix of community, in-state, and reach schools to anchor expectations on net price.",
    ],
  },
  {
    stage: "Late high school & in college",
    ageRange: "17–22",
    steps: [
      "File the FAFSA (and CSS Profile if required) the day it opens — aid is first-come.",
      "Compare award letters by NET price, not sticker; appeal/negotiate aid when warranted.",
      "Withdraw 529 funds in the SAME calendar year as the expense; keep receipts.",
      "Reserve $4,000 of tuition paid in cash to claim the American Opportunity Tax Credit.",
      "Borrow federal before private; never touch retirement or payday loans to fill a gap.",
    ],
  },
];

export const sources: Source[] = [
  { category: "Government", name: "IRS — 529 plans, Publication 970 (Tax Benefits for Education)", url: "https://www.irs.gov/newsroom/529-plans-questions-and-answers", used: "Qualified expenses, gift-tax rules, AOTC/LLC, savings-bond exclusion." },
  { category: "Government", name: "Federal Student Aid (StudentAid.gov)", url: "https://studentaid.gov/", used: "Loan types, interest rates, limits, FAFSA, IDR, PSLF, work-study." },
  { category: "Government", name: "U.S. Dept. of Education — Pell Grant", url: "https://studentaid.gov/understand-aid/types/grants/pell", used: "Pell Grant maximum and eligibility." },
  { category: "Government", name: "IRS — Gift Tax & Annual Exclusion", url: "https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes", used: "Annual exclusion, 5-year superfunding election, lifetime exemption." },
  { category: "Government", name: "Treasury / TreasuryDirect — Savings Bonds", url: "https://www.treasurydirect.gov/savings-bonds/", used: "Series EE/I bonds and the education tax exclusion." },
  { category: "Government", name: "NCES — College Navigator & Digest of Education Statistics", url: "https://nces.ed.gov/", used: "Average cost of attendance and borrowing statistics." },
  { category: "Government", name: "CFPB — Payday loans & student loans", url: "https://www.consumerfinance.gov/", used: "Payday-loan APR/fee data and borrower-protection guidance." },
  { category: "Research", name: "College Board — Trends in College Pricing & Student Aid", url: "https://research.collegeboard.org/trends", used: "Tuition trends, net price, discount rates, aid distribution." },
  { category: "Research", name: "The Institute for College Access & Success (TICAS)", url: "https://ticas.org/", used: "Average debt at graduation and share of borrowers." },
  { category: "Industry", name: "Saving for College / SavingforCollege.com", url: "https://www.savingforcollege.com/", used: "State plan details, fees, and 5-Cap ratings cross-checks." },
  { category: "Industry", name: "Morningstar 529 Plan Ratings", url: "https://www.morningstar.com/", used: "Plan quality/medalist tiers used to inform editorial tiers." },
  { category: "Industry", name: "College Savings Plans Network (CSPN)", url: "https://www.collegesavings.org/", used: "Plan directory, prepaid program status, contribution caps." },
  { category: "State plans", name: "Individual state 529 disclosure booklets", url: "https://www.collegesavings.org/state-comparisons/", used: "Per-state deduction/credit rules, fees, and balance caps." },
  { category: "State plans", name: "Florida Prepaid College Board", url: "https://www.myfloridaprepaid.com/", used: "Florida Prepaid + Florida 529 Savings details." },
  { category: "State plans", name: "Private College 529 Plan", url: "https://privatecollege529.com/", used: "National private prepaid plan mechanics and member schools." },
];
