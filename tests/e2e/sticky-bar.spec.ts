import { expect, test } from '@playwright/test';

test.describe('mobile sticky call bar', () => {
  test('is visible on mobile and stays put while scrolling', async ({ page }, info) => {
    test.skip(info.project.name !== 'mobile', 'mobile only');
    await page.goto('/');
    const bar = page.locator('[data-call="sticky"]');
    await expect(bar).toBeVisible();
    const before = await bar.boundingBox();
    await page.mouse.wheel(0, 3000);
    await expect(bar).toBeVisible();
    expect((await bar.boundingBox())?.y).toBeCloseTo(before?.y ?? 0, 0);
  });

  test('is absent on desktop, where the header carries the call button', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'desktop only');
    await page.goto('/');
    await expect(page.locator('[data-call="sticky"]')).toBeHidden();
  });
});

test.describe('self-starting motion stops', () => {
  test('no animation is still running after 5 seconds', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(5200);
    // Scroll-driven animations (animation-timeline: view()) sit in "running"
    // forever by design — they advance only with scroll. Hard rule 5 is about
    // motion that starts by itself, so count time-driven animations only.
    const running = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === 'running' && a.timeline instanceof DocumentTimeline)
        .map((a) => (a.effect as KeyframeEffect | null)?.target?.className ?? '?'),
    );
    expect(running, `still animating: ${running.join(', ')}`).toEqual([]);
  });
});
