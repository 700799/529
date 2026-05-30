import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Complete 529 & College Funding Guide",
  description:
    "A self-contained, daily-refreshed guide to 529 education savings plans: compare all 50 states + DC and private plans, prepaid tuition, Coverdell, calculators, loans, financial-aid strategy, crypto, and worst-case tradeoffs.",
  keywords: [
    "529 plan",
    "college savings",
    "education savings",
    "Coverdell",
    "prepaid tuition",
    "financial aid",
    "student loans",
    "FAFSA",
  ],
  authors: [{ name: "529 Guide" }],
  openGraph: {
    title: "The Complete 529 & College Funding Guide",
    description:
      "Compare every state 529 plan, run calculators, and plan college funding from birth to graduation.",
    type: "website",
  },
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
