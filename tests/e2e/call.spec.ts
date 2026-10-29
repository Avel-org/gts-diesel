import { expect, test } from '@playwright/test';
import paths from '../../fixtures/golden/call-paths.json' with { type: 'json' };

test.describe('the visitor can always call @call', () => {
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

test.describe('AC4: a call button is reachable immediately @call', () => {
  test('is visible without scrolling on a 360 x 640 phone', async ({ browser }) => {
    // The brief names this screen size; it is smaller than the 390 x 844 the
    // design was drawn at.
    const ctx = await browser.newContext({ viewport: { width: 360, height: 640 } });
    const page = await ctx.newPage();
    await page.goto('/');
    const visible = page.locator('a[href^="tel:"]:visible');
    expect(await visible.count()).toBeGreaterThan(0);
    const box = await visible.first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(640);
    await ctx.close();
  });
});

test.describe('AC20: keyboard and target size @call', () => {
  test('tabbing to a call link shows a visible focus ring', async ({ page }) => {
    await page.goto('/');
    let found = false;
    for (let i = 0; i < 25 && !found; i += 1) {
      await page.keyboard.press('Tab');
      found = await page.evaluate(
        () => document.activeElement?.getAttribute('href')?.startsWith('tel:') ?? false,
      );
    }
    expect(found, 'no tel: link reachable within 25 tab stops').toBe(true);
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const s = getComputedStyle(el);
      return { width: s.outlineWidth, style: s.outlineStyle };
    });
    expect(outline).not.toBeNull();
    expect(outline!.style).not.toBe('none');
    expect(parseFloat(outline!.width)).toBeGreaterThanOrEqual(2);
  });

  test('interactive targets are at least 44px', async ({ page }) => {
    await page.goto('/');
    const small: string[] = [];
    for (const el of await page.locator('a[href^="tel:"]:visible, button:visible').all()) {
      const box = await el.boundingBox();
      if (box && box.height < 44) small.push(`${await el.innerText()} (${box.height}px)`);
    }
    expect(small, `under 44px: ${small.join(', ')}`).toEqual([]);
  });
});
