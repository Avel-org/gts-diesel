import { describe, expect, it } from 'vitest';
import oldSite from '../fixtures/golden/old-site-copy.json' with { type: 'json' };
import { gts } from '../src/content';
import { isBlank } from '../src/content/types';

const haystack = Object.values(oldSite.services).flat().join(' ');
const norm = (s: string) => s.toLowerCase().replace(/[“”"'’.,]/g, '').replace(/\s+/g, ' ').trim();

describe('R3 and AC6: the five service cards', () => {
  it('shows five cards, emergency first, in the brief order', () => {
    expect(gts.services.map((s) => (isBlank(s.title) ? null : s.title.value))).toEqual([
      '24/7 Emergency roadside repair',
      'Computer diagnostics',
      'General truck repair',
      'Trailer repair',
      'Fleet services',
    ]);
  });

  it('gives each card three or four specifics', () => {
    for (const s of gts.services) {
      const t = isBlank(s.title) ? '?' : s.title.value;
      expect(s.items.length, `${t} has ${s.items.length}`).toBeGreaterThanOrEqual(3);
      expect(s.items.length, `${t} has ${s.items.length}`).toBeLessThanOrEqual(4);
    }
  });

  it('takes every specific from his old site, in his wording', () => {
    const invented: string[] = [];
    for (const s of gts.services) {
      for (const item of s.items) {
        if (isBlank(item)) continue;
        const words = norm(item.value).split(' ').filter((w) => w.length > 3);
        const unmatched = words.filter((w) => !norm(haystack).includes(w));
        if (unmatched.length) invented.push(`"${item.value}" (not his: ${unmatched.join(', ')})`);
      }
    }
    expect(invented, `not traceable to his old site:\n${invented.join('\n')}`).toEqual([]);
  });

  it('sources every specific to his site, not to a guess', () => {
    for (const s of gts.services) for (const i of s.items) expect(i.source).toBe('his-site');
  });

  it('marks the one feature tile and leaves the rest equal', () => {
    expect(gts.services.filter((s) => s.large === true)).toHaveLength(1);
    expect(gts.services[0]?.large).toBe(true);
  });

  it('carries all four "Why GTS" facts, sourced to his site', () => {
    expect(gts.stats).toHaveLength(4);
    for (const s of gts.stats) expect(s.value.source).toBe('his-site');
    expect(gts.stats.map((s) => (isBlank(s.value) ? null : s.value.value))).toEqual(['30+', '24/7', 'Free', '$200']);
  });
});
