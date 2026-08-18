import { test, expect } from "@playwright/test";

test.describe("drawer navigation", () => {
  test("opening a section updates the URL hash", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Compare plans/i }).click();
    await expect(page).toHaveURL(/#compare$/);
    await expect(page.getByRole("dialog")).toContainText("Compare plans");
  });

  test("the Back button closes the drawer instead of leaving the site", async ({ page }) => {
    // The whole point of hash routing here: Back must feel like "close",
    // not "exit to the previous website".
    await page.goto("/");
    await page.getByRole("button", { name: /Compare plans/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.goBack();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/$|\/#?$/);
  });

  test("a deep link opens its section directly with charts mounted", async ({ page }) => {
    await page.goto("/#calculators");
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
});
