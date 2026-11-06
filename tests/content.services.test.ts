import { describe, expect, it } from 'vitest';
import oldSite from '../fixtures/golden/old-site-copy.json' with { type: 'json' };
import { gts } from '../src/content';
import { isBlank } from '../src/content/types';

const haystack = Object.values(oldSite.services).flat().join(' ');
/** Mathew's additions, 2026-11-06, verbatim and in his order. */
const fromMathew = {
  'General truck repair': [
    'Advanced transmission diagnostics: Eaton Fuller and Mack mDRIVE',
    'Advanced electrical diagnostics',
    'CAN bus communication diagnostics',
    'Wiring harness repair',
    'Frame and structural repair',
  ],
  'Trailer repair': ['Structural door repair', 'Aluminum floor repair', 'Aluminum welding'],
  'Computer diagnostics': ['PACCAR, Caterpillar, Volvo, Freightliner and Detroit specialists'],
  'Fleet services': ['Non-contract options available'],
} satisfies Record<string, string[]>;

const itemsOf = (title: string) =>
  gts.services
    .find((s) => !isBlank(s.title) && s.title.value === title)!
    .items.map((i) => (isBlank(i) ? null : i.value));

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

  it('gives each card three or four specifics from his old site', () => {
    // R3's 3–4 specifics are the old-site lines. Mathew's own additions
    // (source "mathew") sit on top and are pinned exactly in the test below.
    for (const s of gts.services) {
      const t = isBlank(s.title) ? '?' : s.title.value;
      const fromSite = s.items.filter((i) => i.source === 'his-site').length;
      expect(fromSite, `${t} has ${fromSite} from his site`).toBeGreaterThanOrEqual(3);
      expect(fromSite, `${t} has ${fromSite} from his site`).toBeLessThanOrEqual(4);
    }
  });

  it('takes every specific from his old site, in his wording', () => {
    const invented: string[] = [];
    for (const s of gts.services) {
      for (const item of s.items) {
        // Only his-site lines must match the old site; Mathew's additions are
        // checked line by line against his list below.
        if (isBlank(item) || item.source !== 'his-site') continue;
        const words = norm(item.value).split(' ').filter((w) => w.length > 3);
        const unmatched = words.filter((w) => !norm(haystack).includes(w));
        if (unmatched.length) invented.push(`"${item.value}" (not his: ${unmatched.join(', ')})`);
      }
    }
    expect(invented, `not traceable to his old site:\n${invented.join('\n')}`).toEqual([]);
  });

  it('sources every specific to his site or to Mathew, never to a guess', () => {
    const mathewLines = new Set<string | null>(Object.values(fromMathew).flat());
    for (const s of gts.services) {
      for (const i of s.items) {
        expect(['his-site', 'mathew']).toContain(i.source);
        // A "mathew" line must be one he actually gave us.
        if (i.source === 'mathew' && !isBlank(i)) expect(mathewLines).toContain(i.value);
      }
    }
  });

  it("carries Mathew's 2026-11-06 additions, sourced to him, in his order", () => {
    for (const [title, lines] of Object.entries(fromMathew)) {
      const card = gts.services.find((s) => !isBlank(s.title) && s.title.value === title);
      expect(card, title).toBeDefined();
      const said = card!.items.filter((i) => i.source === 'mathew').map((i) => (isBlank(i) ? null : i.value));
      expect(said, title).toEqual(lines);
    }
  });

  it('lists the cards in the order Mathew approved', () => {
    expect(itemsOf('General truck repair')).toEqual([
      'Engines, brakes, transmissions',
      'Suspension, drive shafts',
      'Heating and AC',
      ...fromMathew['General truck repair'],
    ]);
    expect(itemsOf('Trailer repair')).toEqual([
      'Brakes and air systems',
      'Air lines and hoses',
      'Refrigerated trailers and air chutes',
      'Trailer legs, bumpers and bushings',
      ...fromMathew['Trailer repair'],
    ]);
    expect(itemsOf('Computer diagnostics')).toEqual([
      'Advanced computer diagnostics',
      'Forced regeneration',
      'Reduced-power diagnostics',
      'Advanced electrical troubleshooting',
      ...fromMathew['Computer diagnostics'],
    ]);
    expect(itemsOf('Fleet services')).toEqual([
      'Tailored contracts, special pricing',
      'Non-contract options available',
      '24/7 support',
      'Vans, semi-trucks and trailers',
      'Buses, tow trucks, box trucks',
    ]);
  });

  it("drops the bare 'Electrical' line from General truck repair", () => {
    expect(itemsOf('General truck repair')).not.toContain('Electrical');
  });

  it('leaves the 24/7 emergency roadside card unchanged and all his-site', () => {
    expect(itemsOf('24/7 Emergency roadside repair')).toEqual([
      "We'll do a clutch on the side of the road",
      "Even if you're 100 miles away from us",
      'Engines, brakes, transmissions, suspension',
      'Drive shafts, electrical, heating and AC',
    ]);
    expect(gts.services[0]!.items.every((i) => i.source === 'his-site')).toBe(true);
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
