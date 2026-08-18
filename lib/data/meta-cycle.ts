// The cycle the hand-maintained financial figures actually represent.
//
// This is deliberately separate from meta.json's `academicYear`, which the
// daily rebuild advances on its own (after June it rolls to the next fall).
// That auto-advance is right for "which year are you planning for" but wrong
// as a claim about the data: the nightly job re-stamps dates and re-fetches
// articles, it does not and cannot re-check 51 states' fee schedules and
// deduction caps. Keeping the two apart stops a fresh build date from
// implying freshly verified figures.
//
// Update this by hand, in the same change that refreshes the underlying
// numbers -- never automatically.
export const DATA_CYCLE = "2025-26";

/** Short lead-in, e.g. for a bolded prefix. */
export const DATA_CYCLE_HEADLINE = `Figures current as of the ${DATA_CYCLE} cycle.`;

/** The caveat that follows the headline. */
export const DATA_CYCLE_CAVEAT =
  "The site rebuilds daily, but plan fees, deduction caps, and balance limits are reviewed by hand — verify against the plan's disclosure booklet before acting.";

/** Both halves, for places that want one string. */
export const DATA_CYCLE_NOTE = `${DATA_CYCLE_HEADLINE} ${DATA_CYCLE_CAVEAT}`;
