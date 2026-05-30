import type { Article } from "./types";

// Curated "Editor's Library" of high-quality, evergreen reading on 529s,
// financial aid, loans, and college funding. This is the always-available
// fallback that powers the Reading Room even when the daily build cannot
// reach live news sources. Live, dated articles fetched at build time are
// layered on top (see scripts/generate-data.mjs -> articles.json).
//
// Grouped into themed collections of ~10 so readers can page through them.

export const articleSeed: Article[] = [
  // --- Getting started ---------------------------------------------------
  { title: "529 Plans: Questions and Answers", source: "IRS", url: "https://www.irs.gov/newsroom/529-plans-questions-and-answers", summary: "The federal government's plain-language primer on what a 529 is, qualified expenses, and the tax rules.", collection: "Getting started", topic: "Basics" },
  { title: "What Is a 529 Plan?", source: "NerdWallet", url: "https://www.nerdwallet.com/article/investing/what-is-a-529-plan", summary: "A friendly overview of how 529s work, the two plan types, and who they're for.", collection: "Getting started", topic: "Basics" },
  { title: "529 Plan Basics", source: "Fidelity", url: "https://www.fidelity.com/learning-center/personal-finance/college-planning/college-savings-options", summary: "Fidelity's learning center on college-savings options and how to start.", collection: "Getting started", topic: "Basics" },
  { title: "An Introduction to 529 Plans", source: "U.S. SEC (Investor.gov)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/529-plans", summary: "The SEC's investor-education explainer, including fees and risks to understand.", collection: "Getting started", topic: "Basics" },
  { title: "How to Open a 529 Account", source: "Saving for College", url: "https://www.savingforcollege.com/", summary: "Step-by-step guidance on opening and funding a plan, plus a plan-comparison engine.", collection: "Getting started", topic: "Basics" },
  { title: "529 Plan vs. Savings Account", source: "Investopedia", url: "https://www.investopedia.com/terms/1/529plan.asp", summary: "Definition, mechanics, and how a 529 compares to ordinary savings.", collection: "Getting started", topic: "Basics" },
  { title: "Vanguard 529 College Savings", source: "Vanguard", url: "https://investor.vanguard.com/accounts-plans/529-plans", summary: "How the nationally popular Vanguard 529 works and its low-cost portfolios.", collection: "Getting started", topic: "Plans" },
  { title: "Schwab 529 Education Savings", source: "Charles Schwab", url: "https://www.schwab.com/529-plan", summary: "Schwab's 529 overview and index-based portfolio options.", collection: "Getting started", topic: "Plans" },
  { title: "College Savings: Where to Begin", source: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov/", summary: "Government consumer guidance on saving and paying for college without predatory products.", collection: "Getting started", topic: "Basics" },
  { title: "Why Start Saving Early", source: "T. Rowe Price", url: "https://www.troweprice.com/personal-investing/planning-and-research/college-savings.html", summary: "The compounding case for opening a plan as soon as possible.", collection: "Getting started", topic: "Strategy" },

  // --- Choosing a plan ---------------------------------------------------
  { title: "The Best 529 Plans", source: "Morningstar", url: "https://www.morningstar.com/", summary: "Morningstar's annual medalist ratings of the strongest direct-sold 529 plans.", collection: "Choosing a plan", topic: "Plans" },
  { title: "529 Plan Comparison by State", source: "Saving for College", url: "https://www.savingforcollege.com/compare-529-plans", summary: "Side-by-side comparison of fees, tax benefits, and features for every state plan.", collection: "Choosing a plan", topic: "Plans" },
  { title: "Best 529 Plans of the Year", source: "Forbes Advisor", url: "https://www.forbes.com/advisor/investing/best-529-plans/", summary: "Editorial picks for top plans with reasoning on fees and tax breaks.", collection: "Choosing a plan", topic: "Plans" },
  { title: "Best 529 Plans", source: "Bankrate", url: "https://www.bankrate.com/investing/best-529-plans/", summary: "Bankrate's roundup of low-cost, well-managed plans.", collection: "Choosing a plan", topic: "Plans" },
  { title: "State Tax Deductions for 529 Contributions", source: "Saving for College", url: "https://www.savingforcollege.com/article/how-much-is-your-states-529-plan-tax-deduction-really-worth", summary: "What each state's deduction or credit is actually worth to residents.", collection: "Choosing a plan", topic: "Taxes" },
  { title: "Prepaid Tuition Plans Explained", source: "College Savings Plans Network", url: "https://www.collegesavings.org/", summary: "How prepaid plans lock in tuition and which programs are open.", collection: "Choosing a plan", topic: "Prepaid" },
  { title: "Private College 529 Plan", source: "Private College 529", url: "https://privatecollege529.com/", summary: "The only national prepaid plan, honored at ~300 private colleges.", collection: "Choosing a plan", topic: "Prepaid" },
  { title: "Florida Prepaid College Plans", source: "Florida Prepaid", url: "https://www.myfloridaprepaid.com/", summary: "The largest, state-guaranteed prepaid tuition program in the country.", collection: "Choosing a plan", topic: "Prepaid" },
  { title: "Direct-Sold vs. Advisor-Sold 529s", source: "FINRA", url: "https://www.finra.org/investors/insights/529-savings-plans", summary: "Why low-cost direct-sold plans usually beat commissioned advisor-sold ones.", collection: "Choosing a plan", topic: "Plans" },
  { title: "my529 (Utah) Plan Details", source: "my529", url: "https://my529.org/", summary: "A perennially top-rated, low-cost plan available to savers nationwide.", collection: "Choosing a plan", topic: "Plans" },

  // --- Taxes & gifting ---------------------------------------------------
  { title: "Publication 970: Tax Benefits for Education", source: "IRS", url: "https://www.irs.gov/forms-pubs/about-publication-970", summary: "The authoritative IRS reference on education tax benefits, including 529s and credits.", collection: "Taxes & gifting", topic: "Taxes" },
  { title: "Frequently Asked Questions on Gift Taxes", source: "IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes", summary: "Annual exclusion, the 5-year election, and lifetime exemption rules.", collection: "Taxes & gifting", topic: "Gifting" },
  { title: "529 Superfunding: Front-Loading Five Years", source: "Saving for College", url: "https://www.savingforcollege.com/article/the-superfunding-strategy", summary: "How to move up to five years of gifts into a 529 at once, gift-tax-free.", collection: "Taxes & gifting", topic: "Gifting" },
  { title: "529-to-Roth IRA Rollovers (SECURE 2.0)", source: "Fidelity", url: "https://www.fidelity.com/learning-center/personal-finance/529-rollover-to-roth", summary: "The new rule letting leftover 529 funds roll into a Roth IRA, and its limits.", collection: "Taxes & gifting", topic: "Rollover" },
  { title: "American Opportunity Tax Credit", source: "IRS", url: "https://www.irs.gov/credits-deductions/individuals/aotc", summary: "The $2,500 education credit and how to coordinate it with 529 withdrawals.", collection: "Taxes & gifting", topic: "Taxes" },
  { title: "Lifetime Learning Credit", source: "IRS", url: "https://www.irs.gov/credits-deductions/individuals/llc", summary: "A flexible credit for grad school, part-time, and lifelong learners.", collection: "Taxes & gifting", topic: "Taxes" },
  { title: "Estate Planning With 529 Plans", source: "Kiplinger", url: "https://www.kiplinger.com/", summary: "Using 529s to shift assets out of a taxable estate while funding education.", collection: "Taxes & gifting", topic: "Estate" },
  { title: "Coordinating 529 Withdrawals With Tax Credits", source: "Saving for College", url: "https://www.savingforcollege.com/article/how-to-avoid-paying-taxes-on-529-withdrawals", summary: "Avoid accidental taxes by keeping some tuition in cash for the AOTC.", collection: "Taxes & gifting", topic: "Taxes" },
  { title: "Grandparents and 529 Plans", source: "Fidelity", url: "https://www.fidelity.com/learning-center/personal-finance/grandparents-529-plan", summary: "How grandparents can fund education and the recent FAFSA change.", collection: "Taxes & gifting", topic: "Gifting" },
  { title: "U.S. Savings Bonds for Education", source: "TreasuryDirect", url: "https://www.treasurydirect.gov/savings-bonds/tax-information-ee-i-bonds/", summary: "When Series EE/I bond interest can be tax-free for tuition.", collection: "Taxes & gifting", topic: "Alternatives" },

  // --- Financial aid -----------------------------------------------------
  { title: "Completing the FAFSA Form", source: "Federal Student Aid", url: "https://studentaid.gov/h/apply-for-aid/fafsa", summary: "The official application for federal grants, loans, and work-study.", collection: "Financial aid", topic: "Aid" },
  { title: "How Aid Is Calculated (Student Aid Index)", source: "Federal Student Aid", url: "https://studentaid.gov/complete-aid-process/how-calculated", summary: "How income and assets translate into your aid eligibility.", collection: "Financial aid", topic: "Aid" },
  { title: "How 529 Plans Affect Financial Aid", source: "Saving for College", url: "https://www.savingforcollege.com/article/how-do-529-plans-affect-financial-aid", summary: "Parent vs. student ownership and the gentle FAFSA asset treatment.", collection: "Financial aid", topic: "Aid" },
  { title: "CSS Profile Overview", source: "College Board", url: "https://cssprofile.collegeboard.org/", summary: "The supplemental aid form (used by ~200 schools) that counts home equity.", collection: "Financial aid", topic: "Aid" },
  { title: "Federal Pell Grants", source: "Federal Student Aid", url: "https://studentaid.gov/understand-aid/types/grants/pell", summary: "The foundational need-based grant and who qualifies.", collection: "Financial aid", topic: "Grants" },
  { title: "Federal Work-Study Jobs", source: "Federal Student Aid", url: "https://studentaid.gov/understand-aid/types/work-study", summary: "Part-time earnings that don't count against next year's aid.", collection: "Financial aid", topic: "Aid" },
  { title: "Trends in College Pricing and Student Aid", source: "College Board", url: "https://research.collegeboard.org/trends", summary: "The definitive annual data on tuition, net price, and aid.", collection: "Financial aid", topic: "Costs" },
  { title: "Net Price Calculators", source: "U.S. Dept. of Education", url: "https://collegecost.ed.gov/net-price", summary: "Estimate your real cost at a specific college after aid.", collection: "Financial aid", topic: "Costs" },
  { title: "Appealing Your Financial Aid Offer", source: "NerdWallet", url: "https://www.nerdwallet.com/article/loans/student-loans/financial-aid-appeal", summary: "How and when to negotiate a better aid package.", collection: "Financial aid", topic: "Aid" },
  { title: "College Scorecard", source: "U.S. Dept. of Education", url: "https://collegescorecard.ed.gov/", summary: "Compare cost, graduation rates, and graduate earnings across schools.", collection: "Financial aid", topic: "Costs" },

  // --- Loans & repayment -------------------------------------------------
  { title: "Types of Federal Student Loans", source: "Federal Student Aid", url: "https://studentaid.gov/understand-aid/types/loans", summary: "Subsidized, unsubsidized, and PLUS loans compared.", collection: "Loans & repayment", topic: "Loans" },
  { title: "Federal Student Loan Interest Rates", source: "Federal Student Aid", url: "https://studentaid.gov/understand-aid/types/loans/interest-rates", summary: "Current rates and origination fees, updated annually.", collection: "Loans & repayment", topic: "Loans" },
  { title: "Income-Driven Repayment Plans", source: "Federal Student Aid", url: "https://studentaid.gov/manage-loans/repayment/plans/income-driven", summary: "How payments can be capped as a share of income.", collection: "Loans & repayment", topic: "Repayment" },
  { title: "Public Service Loan Forgiveness", source: "Federal Student Aid", url: "https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service", summary: "Forgiveness after 120 qualifying payments in public-service jobs.", collection: "Loans & repayment", topic: "Forgiveness" },
  { title: "Parent PLUS Loans: What to Know", source: "NerdWallet", url: "https://www.nerdwallet.com/article/loans/student-loans/parent-plus-loan", summary: "The high-rate federal loan that can let parents over-borrow.", collection: "Loans & repayment", topic: "Loans" },
  { title: "Private Student Loans vs. Federal", source: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov/ask-cfpb/category-student-loans/", summary: "Why federal protections usually make federal loans the better first choice.", collection: "Loans & repayment", topic: "Loans" },
  { title: "Payday Loans: Why to Avoid Them", source: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-payday-loan-en-1567/", summary: "The triple-digit APR debt trap, in the government's own words.", collection: "Loans & repayment", topic: "Warning" },
  { title: "Student Loan Debt Statistics", source: "Education Data Initiative", url: "https://educationdata.org/student-loan-debt-statistics", summary: "Up-to-date data on balances, borrowers, and default rates.", collection: "Loans & repayment", topic: "Data" },
  { title: "Loan Repayment Estimator", source: "Federal Student Aid", url: "https://studentaid.gov/loan-simulator/", summary: "Model monthly payments across federal repayment plans.", collection: "Loans & repayment", topic: "Repayment" },
  { title: "The Economics of Student Debt", source: "Brookings Institution", url: "https://www.brookings.edu/topic/student-loans/", summary: "Research on who borrows, who struggles, and policy debates.", collection: "Loans & repayment", topic: "Data" },

  // --- Alternatives & advanced ------------------------------------------
  { title: "Coverdell Education Savings Accounts", source: "IRS", url: "https://www.irs.gov/taxtopics/tc310", summary: "The $2,000 ESA with the broadest set of qualified K-12 and college uses.", collection: "Alternatives & advanced", topic: "Alternatives" },
  { title: "UGMA/UTMA Custodial Accounts", source: "FINRA", url: "https://www.finra.org/investors/investing/investment-accounts/custodial-accounts", summary: "Flexible but aid-unfriendly custodial accounts for minors.", collection: "Alternatives & advanced", topic: "Alternatives" },
  { title: "Roth IRA for College", source: "Schwab", url: "https://www.schwab.com/learn/story/using-roth-ira-college-savings", summary: "Using retirement accounts as a flexible college backstop.", collection: "Alternatives & advanced", topic: "Alternatives" },
  { title: "Apprenticeships: Earn While You Learn", source: "Apprenticeship.gov", url: "https://www.apprenticeship.gov/", summary: "Paid, debt-free pathways into skilled careers.", collection: "Alternatives & advanced", topic: "Pathways" },
  { title: "Employer Tuition Assistance (Section 127)", source: "IRS", url: "https://www.irs.gov/government-entities/federal-state-local-governments/educational-assistance-programs", summary: "Up to $5,250/year of tax-free education benefits from an employer.", collection: "Alternatives & advanced", topic: "Pathways" },
  { title: "Community College Transfer Pathways", source: "Community College Research Center", url: "https://ccrc.tc.columbia.edu/", summary: "Research on the 2+2 transfer route to a cheaper bachelor's degree.", collection: "Alternatives & advanced", topic: "Pathways" },
  { title: "GI Bill Education Benefits", source: "U.S. Dept. of Veterans Affairs", url: "https://www.va.gov/education/", summary: "Service-connected education funding and how to use it.", collection: "Alternatives & advanced", topic: "Pathways" },
  { title: "529 ABLE Accounts for Disabilities", source: "ABLE National Resource Center", url: "https://www.ablenrc.org/", summary: "Tax-advantaged accounts for qualified disability expenses, with 529 rollover options.", collection: "Alternatives & advanced", topic: "Alternatives" },
  { title: "Cryptocurrency Tax Basics", source: "IRS", url: "https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions", summary: "Why crypto sales to pay tuition are taxable events.", collection: "Alternatives & advanced", topic: "Crypto" },
  { title: "Using 529s for K-12 and Apprenticeships", source: "Saving for College", url: "https://www.savingforcollege.com/article/qualified-529-expenses", summary: "The expanded list of qualified 529 expenses beyond college tuition.", collection: "Alternatives & advanced", topic: "Basics" },
];

export const articleCollections = [
  "Getting started",
  "Choosing a plan",
  "Taxes & gifting",
  "Financial aid",
  "Loans & repayment",
  "Alternatives & advanced",
] as const;
