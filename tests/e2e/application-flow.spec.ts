import { expect, test } from "@playwright/test";

test.describe("application flow", () => {
  test("creates a letter and restores it after reload", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Create New" }).first().click();

    await page.getByLabel("Job title").fill("Frontend Engineer");
    await page.getByLabel("Company").fill("Acme");
    await page.getByLabel("I am good at...").fill("React, TypeScript, A11y");
    await page
      .getByLabel("Additional details")
      .fill("I can deliver maintainable product features end to end.");

    await page.getByRole("button", { name: "Generate Now" }).click();

    await expect(page.getByText("Dear Acme Team,")).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Home" }).click();
    await expect(page.getByText("Dear Acme Team,")).toBeVisible();

    await page.reload();
    await expect(page.getByText("Dear Acme Team,")).toBeVisible();
  });
});
