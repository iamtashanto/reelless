import { expect, test } from "@playwright/test";

const PAGES = [
  "/en",
  "/en/features",
  "/en/how-it-works",
  "/en/platforms",
  "/en/pricing",
  "/en/download",
  "/en/faq",
  "/en/about",
  "/en/contact",
  "/en/guides",
  "/en/guides/stop-watching-youtube-shorts",
  "/en/changelog",
  "/en/block-youtube-shorts",
  "/en/privacy",
  "/en/accessibility-disclosure",
  "/bn",
  "/bn/features",
];

for (const path of PAGES) {
  test(`${path} renders with one h1, a title and no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

    // No horizontal scrolling at any viewport.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("root redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|bn)$/);
});

test("unknown pages return 404", async ({ page }) => {
  const response = await page.goto("/en/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("html lang follows the locale", async ({ page }) => {
  await page.goto("/bn");
  await expect(page.locator("html")).toHaveAttribute("lang", "bn-BD");
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("language switcher keeps the current page", async ({ page, isMobile }) => {
  test.skip(isMobile, "Covered on desktop");
  await page.goto("/en/pricing");
  await page.getByRole("banner").getByLabel("Change language").click();
  await page.getByRole("banner").getByRole("link", { name: /বাংলা/ }).click();
  await expect(page).toHaveURL(/\/bn\/pricing$/);
});

test("developer credit links to tashanto.com", async ({ page }) => {
  await page.goto("/en");
  const credit = page.getByRole("contentinfo").getByRole("link", { name: /TA Shanto/ });
  await expect(credit).toHaveAttribute("href", "https://tashanto.com");
  await expect(credit).toHaveAttribute("target", "_blank");
});

test("home exposes FAQPage and SoftwareApplication JSON-LD", async ({ page }) => {
  await page.goto("/en");
  const types = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.flatMap((n) => {
      const data = JSON.parse(n.textContent ?? "null");
      return (Array.isArray(data) ? data : [data]).map((d: { "@type": string }) => d["@type"]);
    }),
  );
  expect(types).toEqual(
    expect.arrayContaining(["Organization", "WebSite", "SoftwareApplication", "FAQPage"]),
  );
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/en/features");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});

test("OG image renders", async ({ request }) => {
  const res = await request.get("/og?title=Hello");
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("image/png");
});
