import type { MetadataRoute } from "next";

// Base path prefix (e.g. "/529" on GitHub Pages, "" at root on Cloudflare).
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const start = base ? `${base}/` : "/";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Complete 529 & College Funding Guide",
    short_name: "529 Guide",
    description:
      "Compare every 529 plan, run calculators, and plan college funding from birth to graduation.",
    start_url: start,
    scope: start,
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#1d57f5",
    icons: [
      { src: `${base}/icon.svg`, type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: `${base}/icon.svg`, type: "image/svg+xml", sizes: "any", purpose: "maskable" },
    ],
  };
}
