import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const tokens = readFileSync(join(import.meta.dirname, '../src/design/tokens.css'), 'utf8');

function token(name: string): string {
  const m = tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!m?.[1]) throw new Error(`--${name} is not a hex token in tokens.css`);
  return m[1];
}
const luminance = (hex: string) => {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
};

describe('AC11: contrast', () => {
  const bg = token('bg');
  it.each([
    ['body text on the page', 'text', 'bg'],
    ['body text on a card', 'text', 'surface'],
    ['body text on a raised element', 'text', 'surface-2'],
    ['secondary text on the page', 'text-muted', 'bg'],
    ['secondary text on a card', 'text-muted', 'surface'],
  ])('%s is at least 4.5:1', (_l, fg, back) => {
    expect(ratio(token(fg), token(back))).toBeGreaterThanOrEqual(4.5);
  });

  it('near-black on the logo green is at least 4.5:1', () => {
    expect(ratio(token('accent-ink'), token('accent'))).toBeGreaterThanOrEqual(4.5);
  });

  it('the green reads at the 9.55:1 the brief states', () => {
    expect(ratio(token('accent'), bg)).toBeCloseTo(9.55, 1);
  });

  it('never puts white on the green, which would be about 1.9:1', () => {
    expect(ratio('#FFFFFF', token('accent'))).toBeLessThan(3);
    expect(token('accent-ink')).not.toBe(token('text'));
  });

  it('button edges and the focus ring are at least 3:1', () => {
    expect(ratio(token('accent'), bg)).toBeGreaterThanOrEqual(3);
    expect(ratio(token('text-muted'), bg)).toBeGreaterThanOrEqual(3);
  });

  it('uses no low-contrast grey body text, per the avoid list', () => {
    expect(ratio(token('text-muted'), bg)).toBeGreaterThanOrEqual(4.5);
  });
});
