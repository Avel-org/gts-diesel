import { expect, test } from '@playwright/test';

test.describe('the Cowboys Radiator page', () => {
  test('is pre-rendered at its own path', async ({ page }) => {
    const res = await page.goto('/cowboys-radiator');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Cowboys Radiator/);
    await expect(page.locator('h1')).toContainText('radiator');
  });

  test('offers no call link, because we have no number for it yet', async ({ page }) => {
    await page.goto('/cowboys-radiator');
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  });

  test('labels its blanks instead of showing empty space', async ({ page }) => {
    await page.goto('/cowboys-radiator');
    const blanks = page.locator('[data-blank]');
    expect(await blanks.count()).toBeGreaterThan(20);
    await expect(blanks.first()).not.toBeEmpty();
  });

  test('links back to GTS, and GTS links to it', async ({ page }) => {
    await page.goto('/cowboys-radiator');
    await page.getByRole('link', { name: /GTS Diesel/i }).first().click();
    await expect(page).toHaveURL('http://localhost:4173/');
    await page.getByRole('link', { name: /Cowboys Radiator/i }).first().click();
    await expect(page).toHaveURL(/cowboys-radiator/);
  });
});

test.describe('pre-rendering', () => {
  test('serves the H1, phone and address with JavaScript disabled', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Diesel truck & trailer repair');
    await expect(page.locator('a[href="tel:+17707713468"]').first()).toBeAttached();
    await expect(page.getByText('530 Roswell St NE').first()).toBeAttached();
    await ctx.close();
  });
});
