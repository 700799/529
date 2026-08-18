import { describe, it, expect } from "vitest";
import { sectionPath, homePath, sectionIdFromPath } from "@/lib/routes";
import { SECTIONS } from "@/lib/sections";

// NEXT_PUBLIC_BASE_PATH is empty in the test env, matching the Cloudflare
// (root) deployment. The GitHub Pages "/529" case is covered by the build
// verification, which asserts the emitted hrefs carry the prefix.

describe("sectionPath", () => {
  it("builds a trailing-slash path for every section", () => {
    for (const s of SECTIONS) expect(sectionPath(s.id)).toBe(`/${s.id}/`);
  });

  it("keeps the trailing slash — trailingSlash is on, so a slashless URL redirects", () => {
    expect(sectionPath("compare").endsWith("/")).toBe(true);
  });
});

describe("homePath", () => {
  it("is the site root", () => {
    expect(homePath()).toBe("/");
  });
});

describe("sectionIdFromPath", () => {
  it("round-trips every section path", () => {
    for (const s of SECTIONS) expect(sectionIdFromPath(sectionPath(s.id))).toBe(s.id);
  });

  it("accepts a path with no trailing slash", () => {
    expect(sectionIdFromPath("/compare")).toBe("compare");
  });

  it("returns null for the launcher", () => {
    expect(sectionIdFromPath("/")).toBeNull();
    expect(sectionIdFromPath("")).toBeNull();
  });

  it("returns null for unknown paths rather than guessing", () => {
    expect(sectionIdFromPath("/not-a-section/")).toBeNull();
    expect(sectionIdFromPath("/compare/extra/")).toBeNull();
  });
});
