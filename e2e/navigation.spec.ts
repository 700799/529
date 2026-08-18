import { test, expect } from "@playwright/test";

test.describe("drawer navigation", () => {
  test("opening a section navigates to its real route", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Compare plans/i }).click();
    await expect(page).toHaveURL(/\/compare\/$/);
    await expect(page.getByRole("dialog")).toContainText("Compare plans");
  });

  test("every tile exposes a crawlable href", async ({ page }) => {
    // Crawlers follow hrefs, not click handlers. If these ever revert to
    // <button>, the 16 section routes become undiscoverable.
    await page.goto("/");
    const hrefs = await page.locator("main a[href]").evaluateAll((as) =>
      as.map((a) => new URL((a as HTMLAnchorElement).href).pathname),
    );
    expect(hrefs).toHaveLength(16);
    expect(hrefs).toContain("/compare/");
    expect(hrefs).toContain("/calculators/");
  });

  test("the Back button closes the drawer instead of leaving the site", async ({ page }) => {
    // The whole point of hash routing here: Back must feel like "close",
    // not "exit to the previous website".
    await page.goto("/");
    await page.getByRole("link", { name: /Compare plans/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.goBack();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/$|\/#?$/);
  });

  test("a deep link opens its section directly with charts mounted", async ({ page }) => {
    await page.goto("/calculators/");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Calculators");
    // Charts are gated to mount only when their section is visible; a deep
    // link must still trigger that.
    await expect(dialog.locator(".recharts-wrapper")).not.toHaveCount(0);
  });

  test("section content is prerendered into the static HTML for crawlers", async ({ request }) => {
    // Regression guard for the SEO prerender: content must exist in the
    // server-sent HTML, not only after hydration.
    const html = await (await request.get("/")).text();
    expect(html).toContain("Compare plans");
    expect(html).toContain("Calculators");
  });

  test("each section route serves its own title, description and canonical", async ({ request }) => {
    // The reason the routes exist: distinct metadata per URL is what lets each
    // section rank on its own instead of collapsing into one result.
    const seen = new Set<string>();
    for (const id of ["compare", "calculators", "learn", "loans"]) {
      const html = await (await request.get(`/${id}/`)).text();
      const title = /<title>(.*?)<\/title>/s.exec(html)?.[1] ?? "";
      const desc = /<meta name="description" content="(.*?)"/s.exec(html)?.[1] ?? "";
      expect(title, id).not.toBe("");
      expect(desc, id).not.toBe("");
      expect(html, id).toContain(`/${id}/"`); // canonical
      expect(seen.has(title), `duplicate title for ${id}`).toBe(false);
      seen.add(title);
    }
  });

  test("legacy #hash links still land on the right section", async ({ page }) => {
    // These URLs predate the routes and are out in the wild.
    await page.goto("/#compare");
    await expect(page.getByRole("dialog")).toContainText("Compare plans");
    // ...and get upgraded to the route form.
    await expect(page).toHaveURL(/\/compare\/$/);
  });

  test("Back from a directly-entered section route goes to the launcher, not off-site", async ({ page }) => {
    await page.goto("/compare/");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: /close/i }).first().click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
  });
});
