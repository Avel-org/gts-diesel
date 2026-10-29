import { expect, test } from '@playwright/test';

test.describe('mobile sticky call bar @call', () => {
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

test.describe('AC5: when the sticky bar shows @call', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 768, 'mobile only');

  test('is hidden at the top, where the hero button is already on screen', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-sticky-bar]')).toHaveAttribute('data-sticky-bar', 'hidden');
  });

  test('appears once the hero call button has scrolled away', async ({ page }) => {
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-sticky-bar]')).toHaveAttribute('data-sticky-bar', 'shown');
  });

  test('hides again when the final call band is on screen', async ({ page }) => {
    await page.goto('/');
    await page.locator('#quote').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-sticky-bar]')).toHaveAttribute('data-sticky-bar', 'hidden');
  });

  test('gets out of the way of a focused field', async ({ page }) => {
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-sticky-bar]')).toHaveAttribute('data-sticky-bar', 'shown');
    await page.locator('#q-name').focus();
    await expect(page.locator('[data-sticky-bar]')).toHaveAttribute('data-sticky-bar', 'hidden');
  });
});
