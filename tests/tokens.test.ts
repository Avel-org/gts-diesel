import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(import.meta.dirname, '..');
const tokens = readFileSync(join(root, 'src/design/tokens.css'), 'utf8');
const appCss = readFileSync(join(root, 'src/design/app.css'), 'utf8');

function filesUnder(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) filesUnder(p, out);
    else if (/\.tsx?$/.test(p)) out.push(p);
  }
  return out;
}

describe('hard rule 3: tokens only', () => {
  it('tokens.css defines the brand green once, from the logo', () => {
    expect(tokens).toMatch(/--accent:\s*#8DC63F/i);
    expect(tokens.match(/#8DC63F/gi) ?? []).toHaveLength(1);
  });

  it('no component carries a raw hex colour', () => {
    const offenders: string[] = [];
    for (const f of [...filesUnder(join(root, 'src')), ...filesUnder(join(root, 'api'))]) {
      const hex = readFileSync(f, 'utf8').match(/#[0-9a-f]{3,8}\b/gi);
      if (hex) offenders.push(`${f.replace(`${root}/`, '')}: ${hex.join(', ')}`);
    }
    expect(offenders, `raw hex found:\n${offenders.join('\n')}`).toEqual([]);
  });

  it('exposes the tokens to Tailwind v4 rather than redefining them', () => {
    expect(appCss).toMatch(/@theme inline/);
    expect(appCss).toContain('--color-accent: var(--accent)');
    expect(appCss).toContain('--color-bg: var(--bg)');
  });
});

describe('hard rule 4: dark mode only', () => {
  it('declares a dark colour-scheme and no light theme', () => {
    expect(tokens).toMatch(/color-scheme:\s*dark/);
    expect(tokens).not.toMatch(/prefers-color-scheme:\s*light/);
  });

  it('ships no theme toggle', () => {
    const src = filesUnder(join(root, 'src')).map((f) => readFileSync(f, 'utf8')).join('\n');
    expect(src).not.toMatch(/toggleTheme|ThemeToggle|setTheme/);
  });
});

describe('hard rule 5: motion ends', () => {
  it('self-starting loops are finite, so motion stops within 5 s', () => {
    expect(tokens).toMatch(/--loop-beacon-count:\s*2/);
    expect(tokens).toMatch(/--loop-signal-count:\s*1/);
    expect(tokens).toMatch(/--loop-scan-count:\s*1/);
    expect(tokens).not.toMatch(/animation:[^;]*\binfinite\b/);
  });

  it('every self-starting loop finishes inside 5 s', () => {
    const dur = (name: string) => {
      const m = tokens.match(new RegExp(`--loop-${name}:\\s*([\\d.]+)s`));
      return Number(m?.[1] ?? NaN);
    };
    const count = (name: string) => {
      const m = tokens.match(new RegExp(`--loop-${name}-count:\\s*(\\d+)`));
      return Number(m?.[1] ?? NaN);
    };
    for (const name of ['beacon', 'signal', 'scan']) {
      expect(dur(name) * count(name), `${name} runs too long`).toBeLessThanOrEqual(5);
    }
  });

  it('turns every animation and transition off under reduced motion', () => {
    expect(tokens).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    const block = tokens.slice(tokens.indexOf('prefers-reduced-motion'));
    expect(block).toMatch(/animation:\s*none\s*!important/);
    expect(block).toMatch(/transition:\s*none\s*!important/);
  });

  it('keeps interaction motion at or under 250 ms', () => {
    const durations = [...tokens.matchAll(/--dur-[a-z]+:\s*(\d+)ms/g)].map((m) => Number(m[1]));
    expect(durations.length).toBeGreaterThan(2);
    for (const d of durations) expect(d).toBeLessThanOrEqual(250);
  });
});

describe('the avoid list', () => {
  it('uses no gradient text, glassmorphism or purple/blue gradient', () => {
    const src = filesUnder(join(root, 'src')).map((f) => readFileSync(f, 'utf8')).join('\n');
    expect(src).not.toMatch(/bg-clip-text|text-transparent/);
    expect(src).not.toMatch(/from-(purple|blue|indigo|violet)-/);
  });

  it('uses the hazard stripe exactly twice per page', () => {
    const page = readFileSync(join(root, 'src/sections/page.tsx'), 'utf8');
    const emergency = readFileSync(join(root, 'src/sections/emergency.tsx'), 'utf8');
    const final = readFileSync(join(root, 'src/sections/final.tsx'), 'utf8');
    expect(page).toMatch(/EmergencyBand/);
    expect(page).toMatch(/FinalCall/);
    expect(emergency.match(/<HazardStripe\s*\/>/g) ?? []).toHaveLength(1);
    expect(final.match(/<HazardStripe\s*\/>/g) ?? []).toHaveLength(1);
  });
});
