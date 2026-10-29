import { describe, expect, it } from 'vitest';
import { cowboys, gts } from '../src/content';
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

  it('never ships a review or a star rating as a sourced claim', () => {
    for (const [, page] of pages) {
      for (const r of page.reviews) expect(r.source).toBe('blank');
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
    expect(needs).toContain('Fourth stat');
    expect(needs).toContain('Towns served list');
    expect(needs.filter((n) => n.startsWith('Customer review'))).toHaveLength(3);
  });
});
