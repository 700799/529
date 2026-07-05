import React from "react";

// Compact line icons for the app-launcher tiles. One per section id.
const paths: Record<string, React.ReactNode> = {
  overview: (
    <>
      <path d="M4 13h7V4H4v9zM13 20h7V4h-7v16zM4 20h7v-5H4v5z" />
    </>
  ),
  what: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  compare: (
    <>
      <path d="M12 3v18M3 7l4-2 4 2-4 2-4-2zM13 7l4-2 4 2-4 2-4-2zM3 7v4M21 7v4" />
    </>
  ),
  calculators: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
    </>
  ),
  loans: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  scenarios: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3 3 0 010 5.8M21 20a5.5 5.5 0 00-4-5.3" />
    </>
  ),
  tradeoffs: (
    <>
      <path d="M12 3l9 16H3l9-16z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  "aid-strategy": (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  ages: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  gifts: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 13h16M12 9v11M12 9c-1.5-3-5-3-5-1s2 1 5 1zM12 9c1.5-3 5-3 5-1s-2 1-5 1z" />
    </>
  ),
  crypto: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 8h4a2 2 0 010 4h-4zM9.5 12h4.2a2 2 0 010 4H9.5zM10.5 8v8M13 6v2M13 16v2" />
    </>
  ),
  junior: (
    <>
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-2.4 2.6-2.6z" />
    </>
  ),
  learn: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 015 .2c0 1.8-2.5 2-2.5 3.8M12 17h.01" />
    </>
  ),
  articles: (
    <>
      <path d="M4 5h12v15H6a2 2 0 01-2-2V5z" />
      <path d="M16 8h4v10a2 2 0 01-2 2M7 8h6M7 12h6M7 16h4" />
    </>
  ),
  sources: (
    <>
      <path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1" />
      <path d="M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1" />
    </>
  ),
  special: (
    <>
      <path d="M8 4h8v3a4 4 0 01-8 0V4z" />
      <path d="M8 5H5v2a3 3 0 003 3M16 5h3v2a3 3 0 01-3 3M9 14h6M10 14v3M14 14v3M8 20h8" />
    </>
  ),
};

/** Ids that have a defined icon — used by the section registry's dev guard. */
export const iconIds = Object.keys(paths);

export function SectionIcon({ id, className = "h-6 w-6" }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[id] || paths.overview}
    </svg>
  );
}
