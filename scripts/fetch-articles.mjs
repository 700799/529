/**
 * fetch-articles.mjs
 *
 * Pulls fresh college-funding news at BUILD time so the published static site
 * carries up-to-date reading without any runtime backend. The daily GitHub
 * Actions cron re-runs this, so "find new articles every day" happens on each
 * rebuild.
 *
 * Sources: Google News RSS search queries (no API key, parseable XML). Each
 * fetch is time-boxed; any failure is swallowed so the build never hangs or
 * breaks. If nothing is retrieved (e.g., restricted network), the site falls
 * back to the curated Editor's Library bundled in lib/data/articleSeed.ts.
 */

const QUERIES = [
  { q: '"529 plan" college savings', topic: "529 plans" },
  { q: "college savings plan tax", topic: "Saving" },
  { q: "FAFSA financial aid college", topic: "Financial aid" },
  { q: "student loans college repayment", topic: "Loans" },
  { q: "college tuition cost scholarships", topic: "Costs" },
  { q: "education savings Coverdell custodial", topic: "Alternatives" },
];

const GOOGLE_NEWS = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

function decode(s = "") {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function pick(re, block) {
  const m = block.match(re);
  return m ? decode(m[1]) : "";
}

async function fetchWithTimeout(url, ms = 9000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; 529GuideBot/1.0)" },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function parseItems(xml, topic) {
  if (!xml || !xml.includes("<item")) return [];
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return items.map((m) => {
    const b = m[1];
    let title = pick(/<title>([\s\S]*?)<\/title>/, b);
    let source = pick(/<source[^>]*>([\s\S]*?)<\/source>/, b);
    // Google News titles are "Headline - Publisher"; split if no <source>.
    if (!source && title.includes(" - ")) {
      const idx = title.lastIndexOf(" - ");
      source = title.slice(idx + 3);
      title = title.slice(0, idx);
    }
    const link = pick(/<link>([\s\S]*?)<\/link>/, b);
    const pub = pick(/<pubDate>([\s\S]*?)<\/pubDate>/, b);
    const date = pub ? new Date(pub) : null;
    return {
      title,
      source: source || "News",
      url: link,
      summary: "",
      collection: "Fresh",
      topic,
      date: date && !isNaN(date) ? date.toISOString() : null,
    };
  });
}

function mondayOf(d) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay(); // 0 Sun..6 Sat
  const diff = (day + 6) % 7; // days since Monday
  x.setUTCDate(x.getUTCDate() - diff);
  return x;
}

export async function fetchArticles() {
  const now = new Date();
  const sixWeeksAgo = new Date(now.getTime() - 42 * 24 * 3600 * 1000);

  const collected = [];
  let feedsTried = 0;
  for (const { q, topic } of QUERIES) {
    feedsTried++;
    const xml = await fetchWithTimeout(GOOGLE_NEWS(q));
    collected.push(...parseItems(xml, topic));
  }

  // Dedupe by normalized title, keep dated + recent items.
  const seen = new Set();
  const isHttp = (u) => typeof u === "string" && /^https?:\/\//i.test(u);
  const fresh = collected
    .filter((a) => a.title && isHttp(a.url) && a.date)
    .filter((a) => new Date(a.date) >= sixWeeksAgo)
    .filter((a) => {
      const key = a.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 80);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Bucket into ISO weeks (Mon-start), top 10 per week.
  const buckets = new Map();
  for (const a of fresh) {
    const mon = mondayOf(new Date(a.date));
    const key = mon.toISOString().slice(0, 10);
    if (!buckets.has(key)) buckets.set(key, []);
    const arr = buckets.get(key);
    if (arr.length < 10) arr.push(a);
  }

  const weeks = [...buckets.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, articles]) => {
      const d = new Date(key + "T00:00:00Z");
      const label =
        "Week of " +
        d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
      return { weekLabel: label, weekStart: key, articles };
    });

  return {
    hasLive: fresh.length > 0,
    liveCount: fresh.length,
    feedsTried,
    weeks,
  };
}
