import { sectionById } from "./sections";

// basePath is "" on Cloudflare (root) and "/529" on GitHub Pages. next.config
// exposes it to the client through the `env` block.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Canonical in-app path for a section.
 *
 * trailingSlash is enabled, so each section exports to `<id>/index.html` and is
 * served at `/<id>/`. Keeping the trailing slash here means client-side
 * pushState URLs match what the host serves on a hard load — otherwise a
 * refresh could redirect and lose the entry.
 */
export function sectionPath(id: string): string {
  return `${basePath}/${id}/`;
}

/** Path of the launcher itself. */
export function homePath(): string {
  return `${basePath}/`;
}

/** Section id for a pathname, or null if it is not a section route. */
export function sectionIdFromPath(pathname: string): string | null {
  let p = pathname;
  if (basePath && p.startsWith(basePath)) p = p.slice(basePath.length);
  const id = p.replace(/^\/+/, "").replace(/\/+$/, "");
  return id && sectionById[id] ? id : null;
}
