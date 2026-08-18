import { test, expect } from "@playwright/test";

test.describe("drawer accessibility", () => {
  test("moves focus into the drawer and traps Tab inside it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Compare plans/i }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Focus must land inside the dialog, not stay on the launcher behind it.
    await expect
      .poll(() => dialog.evaluate((d) => d.contains(document.activeElement)))
      .toBe(true);

    // Tabbing repeatedly must never escape the dialog.
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    }
  });

  test("marks the background inert while the drawer is open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Compare plans/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await page.locator("[inert]").count()).toBeGreaterThan(0);

    // ...and releases it on close, or the page stays unusable.
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await page.locator("[inert]").count()).toBe(0);
  });

  test("restores focus to the triggering tile on close", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /Compare plans/i });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("renders without console errors under prefers-reduced-motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto("/#calculators");
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(errors).toEqual([]);
    await context.close();
  });
});
