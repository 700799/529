import type { MetadataRoute } from "next";

const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://700799.github.io/529";
const siteUrl = rawBase.endsWith("/") ? rawBase : rawBase + "/";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}sitemap.xml`,
    host: siteUrl,
  };
}
