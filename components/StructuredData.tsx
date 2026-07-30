import { faqs } from "@/lib/data/learn";
import meta from "@/lib/data/meta.json";

const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://700799.github.io/529";
const siteUrl = rawBase.endsWith("/") ? rawBase : rawBase + "/";

// JSON-LD structured data for search engines and AI answer engines. Server
// component (no "use client"), so this renders straight into the static HTML.
// `<` is escaped so no payload can prematurely close the <script> tag — this is
// our own static/generated data, not user input, but it's cheap insurance.
function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Complete 529 & College Funding Guide",
  alternateName: "529 Guide",
  url: siteUrl,
  description:
    "A self-contained, daily-refreshed guide to 529 education savings plans, financial aid, student loans, and college funding strategy.",
  inLanguage: "en-US",
  dateModified: meta.generatedAtISO,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "529 College Funding Guide",
  url: siteUrl,
  logo: `${siteUrl}icon.svg`,
  description: "Educational resource comparing 529 plans, financial aid, and college funding strategy.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />
    </>
  );
}
