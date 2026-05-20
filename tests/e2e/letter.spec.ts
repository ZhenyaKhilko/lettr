import { test, expect } from "@playwright/test";

test.describe("Cover Letter Generator", () => {
  test("should load the dashboard and navigate to create page", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Applications" })).toBeVisible();

    const createBtn = page.getByRole("button", { name: "Create New" }).first();
    await expect(createBtn).toBeVisible();

    await createBtn.click();
    await expect(page).toHaveURL("/create");

    await expect(page.getByLabel("Job title")).toBeVisible();
    await expect(page.getByLabel("Company")).toBeVisible();
    await expect(page.getByLabel("I am good at...")).toBeVisible();
    await expect(page.getByLabel("Additional details")).toBeVisible();
  });

  test("should create a new cover letter", async ({ page }) => {
    await page.goto("/create");

    await page.getByLabel("Job title").fill("Frontend Developer");
    await page.getByLabel("Company").fill("Tech Innovations");
    await page.getByLabel("I am good at...").fill("React, TypeScript, Playwright");
    await page.getByLabel("Additional details").fill("I am very passionate about coding and have 5 years of experience.");

    const generateBtn = page.getByRole("button", { name: "Generate Now" });
    await expect(generateBtn).toBeEnabled();
    await generateBtn.click();

    await expect(page.getByText(/Dear Tech Innovations Team/)).toBeVisible({ timeout: 5000 });
  });
});
