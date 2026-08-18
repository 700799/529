import { test, expect, type Page } from "@playwright/test";

// Fail any test that logs a console error. Silent runtime errors (hydration
// mismatches, chart warnings) are the failure mode this suite exists to catch.
function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

test.describe("launcher", () => {
  test("renders all 16 section tiles", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/");
    await expect(page.locator("main a[href]")).toHaveCount(16);
    expect(errors).toEqual([]);
  });

  test("fits the viewport without scrolling", async ({ page }) => {
    // The launcher is designed to fit on one screen; a regression here means
    // tiles overflow and the "everything at a glance" premise breaks.
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollHeight - document.documentElement.clientHeight,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("has exactly one h1 for SEO", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("ships JSON-LD structured data in the static HTML", async ({ page }) => {
    await page.goto("/");
    const blocks = page.locator('script[type="application/ld+json"]');
    await expect(blocks).toHaveCount(3);
    const types = await blocks.evaluateAll((nodes) =>
      nodes.map((n) => JSON.parse(n.textContent || "{}")["@type"]),
    );
    expect(types).toEqual(["WebSite", "EducationalOrganization", "FAQPage"]);
  });
});
