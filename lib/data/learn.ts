// Glossary and FAQ content for the guide. Plain-language definitions and
// answers to the questions families actually ask.

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
}

export const glossary: GlossaryTerm[] = [
  { term: "529 plan", category: "Accounts", definition: "A state-sponsored, tax-advantaged investment account for education. Named after Section 529 of the Internal Revenue Code. Growth and qualified withdrawals are federal-tax-free." },
  { term: "Account owner", category: "Accounts", definition: "The person who controls the 529 — chooses investments, makes withdrawals, and can change the beneficiary. Usually a parent or grandparent, not the child." },
  { term: "Beneficiary", category: "Accounts", definition: "The future student the account is meant for. Can be changed to another qualifying family member at any time without tax consequences." },
  { term: "Qualified education expense", category: "Accounts", definition: "Costs a 529 can pay tax-free: tuition, fees, books, required equipment, room and board (if at least half-time), computers, up to $10,000/yr of K-12 tuition, apprenticeship costs, and up to $10,000 lifetime of student-loan repayment." },
  { term: "Non-qualified withdrawal", category: "Accounts", definition: "Taking money out for something other than education. The earnings portion is taxed as income plus a 10% penalty; your original contributions always come out tax- and penalty-free." },
  { term: "Age-based / target-enrollment portfolio", category: "Investing", definition: "A 529 investment option that automatically shifts from stocks toward bonds and cash as the child nears college age, reducing risk over time." },
  { term: "Expense ratio", category: "Investing", definition: "The annual percentage a fund charges to manage your money. Lower is better; the best 529 index options run well under 0.20%." },
  { term: "Direct-sold plan", category: "Plans", definition: "A 529 you open yourself, online, with no sales commission. Almost always cheaper than an advisor-sold plan with the same investments." },
  { term: "Advisor-sold plan", category: "Plans", definition: "A 529 sold through a financial advisor who earns a commission. Convenient, but usually higher cost than the direct-sold version." },
  { term: "Prepaid tuition plan", category: "Plans", definition: "A type of 529 that lets you buy future tuition at (roughly) today's prices, usually for in-state public schools. Removes market risk." },
  { term: "Tax parity", category: "Taxes", definition: "A feature of some states' tax laws that lets residents claim the state tax break for contributions to ANY state's 529, not just the home-state plan." },
  { term: "State tax deduction vs. credit", category: "Taxes", definition: "A deduction lowers your taxable income; a credit lowers your tax bill dollar-for-dollar. A credit is usually worth more for the same contribution." },
  { term: "Annual gift tax exclusion", category: "Taxes", definition: "The amount one person can give another in a year with no gift-tax filing (about $19,000 in 2026). 529 contributions count as gifts." },
  { term: "Superfunding (5-year election)", category: "Taxes", definition: "A 529-only rule that lets a donor front-load five years of gift-tax exclusions into one contribution (up to ~$95,000) without gift tax." },
  { term: "529-to-Roth rollover", category: "Taxes", definition: "A SECURE 2.0 provision allowing up to $35,000 of leftover 529 funds to move into the beneficiary's Roth IRA, subject to a 15-year account age and other limits." },
  { term: "FAFSA", category: "Financial aid", definition: "The Free Application for Federal Student Aid — the form that determines eligibility for federal grants, loans, and work-study, and is used by most colleges for aid." },
  { term: "CSS Profile", category: "Financial aid", definition: "A supplemental aid application used by roughly 200 mostly-private colleges. Unlike the FAFSA, it can count home equity and other assets." },
  { term: "Student Aid Index (SAI)", category: "Financial aid", definition: "The number, calculated from income and assets, that colleges use to gauge how much your family can contribute. Replaced the old 'Expected Family Contribution.'" },
  { term: "Cost of attendance (COA)", category: "Costs", definition: "A school's total annual price tag: tuition, fees, room and board, books, and estimated personal expenses. Aid is awarded against this number." },
  { term: "Net price", category: "Costs", definition: "The real cost after subtracting grants and scholarships from the sticker price. Always compare schools by net price, not sticker." },
  { term: "Sticker price", category: "Costs", definition: "The published, before-aid cost of a college. For most families it is far higher than what they actually pay." },
  { term: "Subsidized loan", category: "Loans", definition: "A federal student loan on which the government pays the interest while you're in school. Need-based and the cheapest borrowing available." },
  { term: "Unsubsidized loan", category: "Loans", definition: "A federal student loan that accrues interest from day one. Not need-based — almost any enrolled student qualifies." },
  { term: "Parent PLUS loan", category: "Loans", definition: "A federal loan parents can take to cover up to the full cost of attendance. Higher rate and a steep origination fee; easy to over-borrow." },
  { term: "Origination fee", category: "Loans", definition: "An upfront fee deducted from a loan when it's disbursed. Federal PLUS loans charge over 4%, so you receive less than you borrow." },
  { term: "Capitalization", category: "Loans", definition: "When unpaid interest is added to your loan principal, so you then pay interest on interest. Avoid it by paying interest while in school when possible." },
  { term: "Income-driven repayment (IDR)", category: "Loans", definition: "Federal repayment plans that cap your monthly payment at a share of discretionary income and can forgive the balance after 20–25 years." },
  { term: "Public Service Loan Forgiveness (PSLF)", category: "Loans", definition: "Forgives the remaining federal loan balance, tax-free, after 120 qualifying payments while working full-time for government or a nonprofit." },
  { term: "Coverdell ESA", category: "Alternatives", definition: "An education savings account with tax-free growth and the broadest qualified uses (including K-12), but only a $2,000/year limit and income caps." },
  { term: "UGMA/UTMA custodial account", category: "Alternatives", definition: "An account holding assets for a minor. Flexible but counts heavily against financial aid (20% of value) and becomes the child's at adulthood." },
];

export interface FAQ {
  q: string;
  a: string;
  category: string;
}

export const faqs: FAQ[] = [
  { category: "Basics", q: "What happens to a 529 if my child doesn't go to college?", a: "You have several good options: change the beneficiary to another family member (including yourself), use it for trade school, apprenticeships, or up to $10,000 of student loans, roll up to $35,000 into the beneficiary's Roth IRA over time, or simply withdraw the money (paying income tax plus a 10% penalty on just the earnings). The expanded uses mean leftover funds are rarely wasted." },
  { category: "Basics", q: "Can I use a 529 from one state to attend college in another?", a: "Yes. A 529 from any state can be used at virtually any accredited college nationwide (and many abroad). The state that sponsors your plan does not restrict where the student enrolls. State tax benefits, however, may require using your home-state plan." },
  { category: "Basics", q: "How much should I save in a 529?", a: "A common rule of thumb is to aim for roughly one-third of projected costs from savings, one-third from current income during college, and one-third from aid and loans. Use the projection calculator to set a monthly target — even modest, automated contributions started early do most of the work." },
  { category: "Taxes", q: "Do I get a federal tax deduction for 529 contributions?", a: "No federal deduction — the benefit is federal-tax-free growth and withdrawals. Many states, however, offer a state income-tax deduction or credit for contributions to their plan (and a few allow it for any state's plan)." },
  { category: "Taxes", q: "Can grandparents contribute, and does it affect financial aid?", a: "Yes, anyone can contribute. Thanks to FAFSA Simplification, distributions from a grandparent-owned 529 are no longer reported as student income on the FAFSA, so they no longer reduce federal aid. Grandparents can also superfund up to ~$95,000 ($190,000 per couple) per grandchild at once." },
  { category: "Taxes", q: "What is the 529-to-Roth IRA rollover?", a: "Starting in 2024, leftover 529 funds can be rolled into the beneficiary's Roth IRA — up to $35,000 over their lifetime, subject to annual Roth contribution limits, a 15-year-old account requirement, and other rules. It's an escape hatch that reduces the risk of over-saving." },
  { category: "Financial aid", q: "How does a 529 affect financial aid?", a: "A parent-owned 529 is treated as a parental asset and assessed at a maximum of about 5.64% in the federal formula — a gentle hit. Withdrawals for the student aren't counted as income. This is far more favorable than a custodial (UGMA/UTMA) account, which is assessed at 20%." },
  { category: "Financial aid", q: "Is it true that home equity and retirement accounts don't count on the FAFSA?", a: "Yes, on the federal FAFSA. Your primary home's equity and balances in qualified retirement accounts (401(k), IRA, Roth) are not reported as assets. This is why paying down a mortgage or maxing retirement before the 'base year' can lower your Student Aid Index. Note: the CSS Profile used by some private colleges may count home equity." },
  { category: "Financial aid", q: "When should I file the FAFSA?", a: "As soon as it opens for the relevant year (typically in the fall, using prior-prior-year tax data). Some aid is first-come, first-served, so filing early can mean more grant and work-study money." },
  { category: "Loans", q: "Should I take federal or private student loans first?", a: "Federal, almost always. Federal loans offer fixed rates, income-driven repayment, forgiveness programs, and hardship protections that private loans lack. Exhaust subsidized, then unsubsidized federal loans before considering PLUS or private borrowing." },
  { category: "Loans", q: "Is it ever smart to use my 401(k) or a payday loan for tuition?", a: "Almost never. Raiding a 401(k) triggers income tax, often a 10% penalty, lost decades of growth, and a spike in next year's FAFSA income. Payday loans carry triple-digit APRs designed to trap borrowers. See the Tradeoffs & Worst Cases tab for the full math — there is always a better option." },
  { category: "Investing", q: "How should I invest the money inside a 529?", a: "Most families use a low-cost age-based (target-enrollment) portfolio that automatically grows more conservative as college approaches. Keep fees low — under ~0.20% for index options — since fees compound against you just like returns compound for you." },
  { category: "Investing", q: "Can I lose money in a 529?", a: "Yes, savings-type 529s are invested in the market and can fall in value. That's why the glide path shifts toward bonds and cash near enrollment. Prepaid plans avoid market risk by locking in tuition instead." },
  { category: "Alternatives", q: "529 vs. Coverdell vs. UGMA — which is best?", a: "For most college savers, the 529 wins on high limits, tax-free growth, and gentle aid treatment. A Coverdell adds flexibility for K-12 and investment choice but caps at $2,000/year. A UGMA/UTMA is the most flexible for non-education goals but has the worst aid treatment and no tax shelter." },
];

export const faqCategories = ["Basics", "Taxes", "Financial aid", "Loans", "Investing", "Alternatives"] as const;
