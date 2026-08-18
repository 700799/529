import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideApp from "@/components/GuideApp";
import { StructuredData } from "@/components/StructuredData";
import { SECTIONS, sectionById } from "@/lib/sections";

// One file, sixteen routes: the section registry is already the single source
// of truth, so adding a section still means editing only lib/sections.tsx.
export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }));
}

export const dynamicParams = false;

/**
 * Per-route metadata is the point of the whole migration: distinct titles,
 * descriptions, and canonicals are what let "compare 529 plans" and "college
 * savings calculator" rank as separate results instead of one page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const def = sectionById[section];
  if (!def) return {};

  const title = `${def.label} — 529 & College Funding Guide`;
  const description = def.seoDescription;

  return {
    // `absolute` bypasses the layout's "%s | 529 Guide" template, which would
    // otherwise double-brand these already-suffixed titles.
    title: { absolute: title },
    description,
    alternates: { canonical: `/${section}/` },
    // Next replaces the parent's openGraph wholesale rather than merging, so
    // the share image has to be restated here or section links preview blank.
    openGraph: {
      title,
      description,
      url: `/${section}/`,
      siteName: "529 College Funding Guide",
      type: "article",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!sectionById[section]) notFound();

  return (
    <>
      <StructuredData sectionId={section} />
      <GuideApp initialSection={section} />
    </>
  );
}
