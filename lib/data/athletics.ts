// Data for the "Special cases: sports & music" tab.
//
// Athletic scholarship figures use the traditional NCAA per-team limits.
// IMPORTANT CONTEXT: the 2025 House v. NCAA settlement is replacing many of
// these sport-by-sport scholarship limits with *roster* limits, letting D1
// schools fund more (up to full-roster) scholarships if they choose. The
// numbers below are the long-standing baselines families have planned around;
// treat them as a guide to relative scarcity, not a guarantee, and verify the
// current rules for a specific school/division. "HS->NCAA" is the approximate
// share of high-school participants who go on to compete in the NCAA (any
// division), based on NCAA "estimated probability of competing" research.

export interface SportScholarship {
  sport: string;
  gender: "Men" | "Women";
  d1: string;
  d2: string;
  type: "Headcount" | "Equivalency";
  hsToNcaa: string; // percent of HS athletes who compete in NCAA
  hsToD1: string; // percent who reach D1
  note: string;
}

export const sportScholarships: SportScholarship[] = [
  { sport: "Football (FBS)", gender: "Men", d1: "85", d2: "36", type: "Headcount", hsToNcaa: "~7%", hsToD1: "~3%", note: "FBS scholarships are full rides; FCS (63) and D2 are equivalency. The most scholarships of any sport, but enormous competition." },
  { sport: "Basketball", gender: "Men", d1: "13", d2: "10", type: "Headcount", hsToNcaa: "~3.5%", hsToD1: "~1%", note: "Full rides only, but tiny rosters. Reaching D1 basketball is among the longest odds in college sports." },
  { sport: "Basketball", gender: "Women", d1: "15", d2: "10", type: "Headcount", hsToNcaa: "~4%", hsToD1: "~1.3%", note: "Full rides; slightly better odds than the men's game but still very selective." },
  { sport: "Volleyball", gender: "Women", d1: "12", d2: "8", type: "Headcount", hsToNcaa: "~4%", hsToD1: "~1.2%", note: "A D1 headcount sport, so awards are full rides — one of the better full-ride paths for women." },
  { sport: "Gymnastics", gender: "Women", d1: "12", d2: "6", type: "Headcount", hsToNcaa: "~3%", hsToD1: "~1%", note: "Full-ride headcount sport with very few programs nationally — extremely competitive." },
  { sport: "Tennis", gender: "Women", d1: "8", d2: "6", type: "Headcount", hsToNcaa: "~5%", hsToD1: "~1.5%", note: "Women's tennis is headcount (full rides); men's tennis is equivalency (partial)." },
  { sport: "Soccer", gender: "Men", d1: "9.9", d2: "9", type: "Equivalency", hsToNcaa: "~5.7%", hsToD1: "~1.3%", note: "Equivalency: those ~10 scholarships are split among a 25+ roster, so most 'scholarship' players get a partial award." },
  { sport: "Soccer", gender: "Women", d1: "14", d2: "9.9", type: "Equivalency", hsToNcaa: "~7%", hsToD1: "~2.4%", note: "More scholarships than men's, but still split across a large roster — full rides are uncommon." },
  { sport: "Baseball", gender: "Men", d1: "11.7", d2: "9", type: "Equivalency", hsToNcaa: "~7%", hsToD1: "~2%", note: "Famously stingy: ~11.7 scholarships across a 35-man roster means small partials are the norm (the House settlement raises this)." },
  { sport: "Softball", gender: "Women", d1: "12", d2: "7.2", type: "Equivalency", hsToNcaa: "~5.5%", hsToD1: "~1.6%", note: "Equivalency sport; awards typically partial and combined with academic aid." },
  { sport: "Ice Hockey", gender: "Men", d1: "18", d2: "13.5", type: "Equivalency", hsToNcaa: "~11%", hsToD1: "~4%", note: "Relatively high scholarship count and better odds, but very few programs and a long junior-hockey development path." },
  { sport: "Lacrosse", gender: "Men", d1: "12.6", d2: "10.8", type: "Equivalency", hsToNcaa: "~3%", hsToD1: "~1%", note: "Equivalency with limited programs concentrated regionally; awards usually partial." },
  { sport: "Lacrosse", gender: "Women", d1: "12", d2: "9.9", type: "Equivalency", hsToNcaa: "~3.5%", hsToD1: "~1.2%", note: "Growing sport, but scholarships split across the roster." },
  { sport: "Track & Field / XC", gender: "Men", d1: "12.6", d2: "12.6", type: "Equivalency", hsToNcaa: "~5%", hsToD1: "~1.5%", note: "Those scholarships cover a large combined track/cross-country roster, so partials dominate." },
  { sport: "Track & Field / XC", gender: "Women", d1: "18", d2: "12.6", type: "Equivalency", hsToNcaa: "~6%", hsToD1: "~1.8%", note: "More scholarships than men's; still spread thin across many athletes and events." },
  { sport: "Swimming & Diving", gender: "Men", d1: "9.9", d2: "8.1", type: "Equivalency", hsToNcaa: "~7%", hsToD1: "~2.5%", note: "Equivalency; strong swimmers often stack a partial athletic award with academic merit aid." },
  { sport: "Swimming & Diving", gender: "Women", d1: "14", d2: "8.1", type: "Equivalency", hsToNcaa: "~7%", hsToD1: "~3%", note: "More scholarships available, but still partial for most of a deep roster." },
  { sport: "Wrestling", gender: "Men", d1: "9.9", d2: "9", type: "Equivalency", hsToNcaa: "~3%", hsToD1: "~1%", note: "Equivalency across a large roster; partial awards are standard." },
  { sport: "Golf", gender: "Men", d1: "4.5", d2: "3.6", type: "Equivalency", hsToNcaa: "~3%", hsToD1: "~1%", note: "Only ~4.5 scholarships for a small team — full rides are rare; elite junior results are essentially required." },
  { sport: "Golf", gender: "Women", d1: "6", d2: "5.4", type: "Equivalency", hsToNcaa: "~6%", hsToD1: "~2.5%", note: "Better odds than men's due to fewer participants relative to roster spots." },
  { sport: "Rowing", gender: "Women", d1: "20", d2: "20", type: "Equivalency", hsToNcaa: "~5%", hsToD1: "~3%", note: "The most scholarships of any women's sport, and many rowers are recruited as 'walk-on' novices — an underrated path." },
  { sport: "Field Hockey", gender: "Women", d1: "12", d2: "6.3", type: "Equivalency", hsToNcaa: "~6%", hsToD1: "~2.5%", note: "Concentrated in certain regions; partial awards typical." },
];

export interface RealismStat {
  value: string;
  label: string;
  detail: string;
}

export const realismStats: RealismStat[] = [
  { value: "~2%", label: "of high-school athletes earn ANY athletic scholarship", detail: "Across all NCAA divisions, only about 2 in 100 high-school athletes receive athletic aid — and most of those are partial, not full rides." },
  { value: "~7%", label: "of high-school athletes compete in the NCAA at all", detail: "Roughly 1 in 14 high-school athletes go on to play any NCAA sport (D1, D2, or D3). Reaching D1 is closer to 1 in 50." },
  { value: "$0", label: "athletic scholarships at every NCAA Division III school", detail: "D3 (and the Ivy League) award no athletic scholarships — only academic, talent, and need-based aid. That's hundreds of strong schools." },
  { value: "~1%", label: "of college athletes get a 'full ride'", detail: "Full scholarships exist almost only in headcount sports (football, basketball, women's volleyball/gymnastics/tennis). Everywhere else, partial awards are the rule." },
  { value: "$18k", label: "approximate average athletic scholarship (where awarded)", detail: "The typical award is a partial scholarship well below the full cost of attendance, often combined with academic or need-based aid." },
  { value: "6", label: "years of full college, often, for what elite youth sports can cost", detail: "Families routinely spend more raising a 'recruitable' athlete over a decade than a partial scholarship will ever return. Run the calculator below." },
];

export interface ArtsScholarship {
  area: string;
  typicalAward: string;
  realism: string;
  note: string;
}

export const artsScholarships: ArtsScholarship[] = [
  { area: "University music (general)", typicalAward: "$500 – $5,000 / yr", realism: "Common but small", note: "Most colleges with a music department offer modest talent awards via audition — even to non-majors who play in ensembles." },
  { area: "Music performance major (strong program)", typicalAward: "$5,000 – $25,000 / yr", realism: "Competitive", note: "Schools that prize their orchestra/band compete for talented players with sizable merit-plus-talent packages." },
  { area: "Conservatory / elite (Juilliard, Curtis, etc.)", typicalAward: "Up to full + stipend", realism: "Rare; world-class only", note: "A few top conservatories are need-based or even tuition-free, but admission rates rival the Ivies." },
  { area: "Marching band / spirit", typicalAward: "$500 – $4,000 / yr", realism: "Accessible", note: "Many large universities pay students to participate in the marching band — an underused, attainable award." },
  { area: "Theater / dance / visual arts", typicalAward: "$1,000 – $15,000 / yr", realism: "Portfolio/audition-based", note: "Talent awards exist at arts-focused programs; a strong portfolio or audition matters more than 'stats.'" },
  { area: "Debate / academic teams / robotics", typicalAward: "Varies; often academic", note: "Some schools fund competitive debate and STEM teams; more often these activities boost admission and academic merit aid.", realism: "Indirect but real" },
];

export const nilFacts: string[] = [
  "Since July 2021, college athletes can earn money from their Name, Image, and Likeness (NIL) — endorsements, social media, autographs, camps, and 'collective' deals.",
  "NIL is NOT a scholarship. It's earned income, it's fully taxable, and it does not reduce a school's cost — it's separate from financial aid.",
  "The money is extraordinarily concentrated: a small number of star football and basketball players (and a few viral athletes in other sports) earn the headline six- and seven-figure deals.",
  "For the vast majority of college athletes, NIL income is modest — often a few hundred to a few thousand dollars, if anything.",
  "High-school NIL is now allowed in many states, but rules vary and deals for minors raise tax, contract, and eligibility complexities — get professional advice before signing anything.",
  "Treat NIL as a possible bonus for a tiny minority, never as a college-funding plan.",
];

export interface EdgeCase {
  title: string;
  detail: string;
}

export const edgeCases: EdgeCase[] = [
  { title: "Ivy League: no athletic scholarships", detail: "The eight Ivies give zero athletic aid — only need-based aid. A recruited athlete still gets a meaningful admissions boost, and need-based aid at these wealthy schools is often very generous." },
  { title: "Service academies: 'full ride' + a stipend", detail: "West Point, Navy, Air Force, Coast Guard, and Merchant Marine are tuition-free with a monthly stipend, in exchange for a multi-year military service commitment after graduation." },
  { title: "Division III & NAIA", detail: "D3 awards no athletic money but plenty of academic/talent aid; NAIA (smaller colleges) DOES offer athletic scholarships and can be a great, less-crowded path." },
  { title: "Preferred & recruited walk-ons", detail: "Many athletes join a team without a scholarship and earn one later by contributing. 'Preferred walk-on' status is a real, common foot in the door." },
  { title: "Equivalency = partial is normal", detail: "Outside headcount sports, a coach splits a handful of scholarships across the whole roster. A '40% scholarship' stacked with academic aid is a typical, good outcome." },
  { title: "Academic aid usually beats athletic aid", detail: "For most students, grades and test scores unlock far more money than sports. A strong GPA can be worth more than a partial athletic award — and it can't get cut for an injury." },
  { title: "Recruited-athlete admissions boost", detail: "Even with no scholarship, being a recruited athlete can substantially raise admission odds at selective schools — sometimes the most valuable part of the whole journey." },
  { title: "Injury & roster risk", detail: "Athletic scholarships are typically year-to-year and can be reduced or not renewed after an injury or a coaching change. They are not guaranteed for four years." },
];

// Youth-sports cost tiers used by the calculator (annual, all-in: fees,
// travel, equipment, private coaching, tournaments).
export const sportsCostTiers = [
  { label: "Recreational / local league", annual: 600 },
  { label: "Competitive club / travel team", annual: 3500 },
  { label: "Serious travel + showcases", annual: 8000 },
  { label: "Elite / national / private coaching", annual: 15000 },
];
