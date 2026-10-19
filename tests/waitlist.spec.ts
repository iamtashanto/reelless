import { expect, test } from "@playwright/test";

const uniqueEmail = (tag: string) =>
  `e2e-${tag}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@example.test`;

test.describe("waitlist", () => {
  test("shows an error for an invalid email", async ({ page }) => {
    await page.goto("/en/download");
    const form = page.locator("#waitlist form");
    await form.getByLabel("Email address").fill("not-an-email");
    // Bypass native validation to exercise the server-side check.
    await form.evaluate((f: HTMLFormElement) => (f.noValidate = true));
    await form.getByRole("button", { name: "Join early access" }).click();
    await expect(form.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("joins with a valid email and asks to confirm", async ({ page }) => {
    await page.goto("/en/download");
    const section = page.locator("#waitlist");
    await section.getByLabel("Email address").fill(uniqueEmail("join"));
    await section.getByText("Chrome extension", { exact: true }).click(); // uncheck one product
    await section.getByRole("button", { name: "Join early access" }).click();
    await expect(section.getByText("Check your inbox")).toBeVisible();
  });

  test("confirm page without a token explains the link is invalid", async ({ page }) => {
    await page.goto("/en/waitlist/confirm");
    await expect(page.getByText("This link doesn’t work")).toBeVisible();
  });
});
