import type { MetadataRoute } from "next";
import meta from "@/lib/data/meta.json";

const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://700799.github.io/529";
const siteUrl = rawBase.endsWith("/") ? rawBase : rawBase + "/";

export const dynamic = "force-static";

// The guide is a single page; sections are hash fragments (crawlers strip
// fragments), so the sitemap has one canonical entry, re-stamped daily.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: meta.generatedAtISO,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
