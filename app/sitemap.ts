import type { MetadataRoute } from "next";
import meta from "@/lib/data/meta.json";
import { SECTIONS } from "@/lib/sections";

const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://700799.github.io/529";
const siteUrl = rawBase.endsWith("/") ? rawBase : rawBase + "/";

export const dynamic = "force-static";

// Every section is its own route, so every section belongs in the sitemap.
// Derived from the registry, so a new section is listed automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: meta.generatedAtISO,
      changeFrequency: "daily",
      priority: 1,
    },
    ...SECTIONS.map((s) => ({
      url: `${siteUrl}${s.id}/`,
      lastModified: meta.generatedAtISO,
      // The reading room genuinely changes daily; the guide content does not.
      changeFrequency: (s.id === "articles" ? "daily" : "weekly") as "daily" | "weekly",
      priority: s.id === "compare" || s.id === "calculators" ? 0.9 : 0.7,
    })),
  ];
}
