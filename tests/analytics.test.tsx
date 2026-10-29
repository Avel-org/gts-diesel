import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Page } from '../src/sections/page';
import { cowboys, gts } from '../src/content';
import { business } from '../src/content/business';
import type { PageContent } from '../src/content/page';

function at(url: string, content: PageContent) {
  return render(
    <StaticRouter location={url}>
      <Page content={content} />
    </StaticRouter>,
  );
}

describe('call tracking', () => {
  it('tags every call-to-action with data-call so conversions are countable', () => {
    const { container } = at('/', gts);
    const tels = [...container.querySelectorAll('a[href^="tel:"]')];
    expect(tels.length).toBeGreaterThanOrEqual(4);
    for (const a of tels) {
      expect(a.getAttribute('data-call'), `${a.outerHTML.slice(0, 80)} is untagged`).toBeTruthy();
    }
  });

  it('gives each call position a distinct name', () => {
    const { container } = at('/', gts);
    const names = [...container.querySelectorAll('[data-call]')].map((e) =>
      e.getAttribute('data-call'),
    );
    expect(new Set(names).size).toBe(names.length);
    expect(names).toContain('hero');
    expect(names).toContain('sticky');
    expect(names).toContain('footer');
  });

  it('points every tel: link at the one number', () => {
    const { container } = at('/', gts);
    for (const a of container.querySelectorAll('a[href^="tel:"]')) {
      expect(a.getAttribute('href')).toBe(business.phoneHref);
    }
  });

  it('renders no tel: link on Cowboys, which has no sourced number yet', () => {
    const { container } = at('/cowboys-radiator', cowboys);
    expect(container.querySelectorAll('a[href^="tel:"]')).toHaveLength(0);
  });
});

describe('the page a visitor actually gets', () => {
  it('leads with one H1 carrying the sourced headline', () => {
    const { container } = at('/', gts);
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0]?.textContent).toContain('Broken down? We roll to you.');
  });

  it('shows the address and hours without JavaScript having to run', () => {
    const { container } = at('/', gts);
    expect(container.textContent).toContain(business.street);
    expect(container.textContent).toContain(business.hoursText);
  });

  it('labels every blank instead of leaving a hole', () => {
    const { container } = at('/cowboys-radiator', cowboys);
    const blanks = container.querySelectorAll('[data-blank]');
    expect(blanks.length).toBeGreaterThan(20);
    for (const b of blanks) expect(b.textContent?.trim()).toBeTruthy();
  });

  it('gives every photo placeholder an accessible name', () => {
    const { container } = at('/', gts);
    for (const img of container.querySelectorAll('[role="img"]')) {
      expect(img.getAttribute('aria-label')).toBeTruthy();
    }
  });

  it('gives every form control a label', () => {
    const { container } = at('/', gts);
    const visible = [...container.querySelectorAll('input, textarea')].filter(
      (el) => !el.hasAttribute('aria-hidden'),
    );
    expect(visible.length).toBeGreaterThan(3);
    for (const el of visible) {
      const id = el.getAttribute('id');
      expect(id, `${el.getAttribute('name')} has no id`).toBeTruthy();
      expect(container.querySelector(`label[for="${id}"]`)).not.toBeNull();
    }
  });
});
