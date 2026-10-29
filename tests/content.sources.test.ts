import { describe, expect, it } from 'vitest';
import { cowboys, gts, openQuestions } from '../src/content';
import { collectBlanks, isBlank } from '../src/content/types';
import type { Claim } from '../src/content/types';
import type { PageContent } from '../src/content/page';

const pages: Array<[string, PageContent]> = [['gts', gts], ['cowboys', cowboys]];

/** Every leaf claim in a page, so nothing escapes the source rule. */
function claims(node: unknown, path = ''): Array<[string, Claim<unknown>]> {
  if (node === null || typeof node !== 'object') return [];
  const obj = node as Record<string, unknown>;
  if (typeof obj.source === 'string') return [[path, obj as Claim<unknown>]];
  return Object.entries(obj).flatMap(([k, v]) => claims(v, path ? `${path}.${k}` : k));
}

describe('hard rule 1: no invented facts', () => {
  it.each(pages)('%s: every claim records a source', (_name, page) => {
    const all = claims(page);
    expect(all.length).toBeGreaterThan(20);
    for (const [path, c] of all) {
      expect(['his-site', 'mathew', 'blank'], `${path} has an unknown source`).toContain(c.source);
    }
  });

  it.each(pages)('%s: every blank says what is needed', (_name, page) => {
    for (const [path, c] of claims(page)) {
      if (isBlank(c)) expect(c.need, `${path} is blank with no need`).toBeTruthy();
    }
  });

  it.each(pages)('%s: no claim is an empty string', (_name, page) => {
    for (const [path, c] of claims(page)) {
      if (!isBlank(c) && typeof c.value === 'string') {
        expect(c.value.trim(), `${path} is empty`).not.toBe('');
      }
    }
  });

  it('every review is attributable, never generated', () => {
    for (const [name, page] of pages) {
      for (const r of page.reviews) {
        if (isBlank(r)) continue;
        // A real review carries a real name and the client's own confirmation.
        expect(r.source, `${name} review has the wrong source`).toBe('mathew');
        expect((r.value as { name: string }).name.trim().length).toBeGreaterThan(2);
        expect((r.value as { text: string }).text.trim().length).toBeGreaterThan(40);
      }
    }
  });
});

describe('hard rule 2: one phone number, one place', () => {
  it('no page content hard-codes a different phone number', () => {
    const text = JSON.stringify([gts, cowboys]);
    const digits = text.match(/\d{3}[ .-]?\d{3}[ .-]?\d{4}/g) ?? [];
    for (const d of digits) expect(d.replace(/\D/g, '')).toBe('7707713468');
  });
});

describe('open blanks are discoverable', () => {
  it('collectBlanks finds the Cowboys blanks', () => {
    const found = collectBlanks(cowboys, 'cowboys');
    expect(found.length).toBeGreaterThan(30);
    expect(found.every((b) => b.need.length > 0)).toBe(true);
  });

  it('GTS still has the four known gaps', () => {
    const needs = collectBlanks(gts, 'gts').map((b) => b.need);
    expect(needs).toContain('Payment methods accepted');
    // The three review blanks are closed: real Google reviews now fill them.
    expect(needs.filter((n) => n.startsWith('Customer review'))).toHaveLength(0);
    expect(gts.reviews.filter((r) => !isBlank(r))).toHaveLength(3);
  });
});
