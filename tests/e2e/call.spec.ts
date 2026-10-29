import { expect, test } from '@playwright/test';
import paths from '../../fixtures/golden/call-paths.json' with { type: 'json' };

test.describe('the visitor can always call', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const s of paths.scenarios) {
    test(`${s.name} dials the one number`, async ({ page }, info) => {
      const project = info.project.name as 'mobile' | 'desktop';
      test.skip(s.viewport !== 'both' && s.viewport !== project, `${s.name} is ${s.viewport} only`);

      const el = page.locator(s.selector).first();
      await expect(el).toHaveAttribute('href', paths.tel);
    });
  }

  test('the call button meets the 56px target from the a11y spec', async ({ page }) => {
    const box = await page.locator('[data-call="hero"]').first().boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(56);
  });

  test('no call link is broken or empty', async ({ page }) => {
    const hrefs = await page.locator('a[href^="tel:"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('href')),
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const h of hrefs) expect(h).toBe(paths.tel);
  });
});
