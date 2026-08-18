import { test, expect } from "@playwright/test";

test.describe("state benefit calculator", () => {
  test("applies the state deduction cap instead of the raw contribution", async ({ page }) => {
    await page.goto("/#calculators");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const card = dialog.locator(".card", { hasText: "What is your state tax break worth?" });
    await expect(card).toBeVisible();

    // New York, single filer: $5,000 cap. Default contribution is $10,000, so
    // a correct calculator deducts only half of it.
    await card.locator("select").selectOption("NY");
    await card.getByRole("button", { name: "Single" }).click();

    await expect(card).toContainText("Only $5,000 of your $10,000 contribution is deductible");

    // Switching to joint lifts the cap to $10,000, so the warning disappears.
    await card.getByRole("button", { name: "Married filing jointly" }).click();
    await expect(card).not.toContainText("is deductible — the rest earns no state break");
  });

  test("shows no benefit for a state without an income tax", async ({ page }) => {
    await page.goto("/#calculators");
    const card = page.getByRole("dialog").locator(".card", { hasText: "What is your state tax break worth?" });
    await card.locator("select").selectOption("TX");
    await expect(card).toContainText("No contribution tax break");
    await expect(card.getByText("Tax savings per year").locator("..")).toContainText("$0");
  });

  test("prices the fee drag in the growth projection", async ({ page }) => {
    await page.goto("/#calculators");
    const card = page.getByRole("dialog").locator(".card", { hasText: "529 growth projection" });
    await expect(card).toBeVisible();
    // A non-zero default fee must show its cost, so fees are not invisible.
    await expect(card).toContainText("What the fee costs you");
  });
});
