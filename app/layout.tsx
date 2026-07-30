import type { Metadata, Viewport } from "next";
import "./globals.css";

// Primary site URL, used to resolve canonical + social-preview URLs. Set
// NEXT_PUBLIC_SITE_URL to the Cloudflare (primary) origin; falls back to the
// GitHub Pages URL. Trailing slash matters so base-path deployments resolve
// relative asset URLs (og.png) correctly.
const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://700799.github.io/529";
const siteUrl = rawBase.endsWith("/") ? rawBase : rawBase + "/";

const title = "The Complete 529 & College Funding Guide";
// Kept under ~160 characters so Google shows it in full in the search snippet
// (the longer, keyword-rich version still lives in the OpenGraph description).
const description =
  "Compare every 529 plan (50 states + DC), private & prepaid options. Free calculators, financial-aid strategy, student loans, and scholarships — updated daily.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | 529 Guide" },
  description,
  applicationName: "529 Guide",
  category: "education",
  keywords: [
    "529 plan",
    "compare 529 plans",
    "college savings plan",
    "college savings calculator",
    "education savings account",
    "Coverdell ESA",
    "prepaid tuition plan",
    "financial aid strategy",
    "FAFSA",
    "student loans",
    "Parent PLUS loan",
    "college scholarships",
    "grandparent 529",
  ],
  authors: [{ name: "529 Guide" }],
  alternates: { canonical: "./" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title,
    description:
      "Compare every state 529 plan, run the calculators, and plan college funding from birth to graduation.",
    url: "./",
    siteName: "529 College Funding Guide",
    type: "website",
    images: [{ url: "og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Compare every state 529 plan, run the calculators, and plan college funding from birth to graduation.",
    images: ["og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d57f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
