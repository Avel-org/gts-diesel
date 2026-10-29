import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

type Vercel = {
  redirects: Array<{ source: string; destination: string; permanent: boolean }>;
  headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
};

const config: Vercel = JSON.parse(
  readFileSync(join(import.meta.dirname, '../vercel.json'), 'utf8'),
);

describe('old site paths', () => {
  it('redirects the paths named in the README', () => {
    const sources = config.redirects.map((r) => r.source);
    expect(sources).toContain('/fleet-services');
    expect(sources).toContain('/contact');
  });

  it('every redirect is a permanent 301', () => {
    for (const r of config.redirects) expect(r.permanent, `${r.source} is not a 301`).toBe(true);
  });

  it('every redirect lands somewhere on the new page', () => {
    for (const r of config.redirects) expect(r.destination).toMatch(/^\/($|#|\?)|^\/#/);
  });

  it('declares no duplicate sources', () => {
    const sources = config.redirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });
});

describe('headers', () => {
  it('caches the logo and other uploads for a year', () => {
    const uploads = config.headers.find((h) => h.source.startsWith('/uploads'));
    expect(uploads?.headers[0]?.value).toMatch(/max-age=31536000/);
  });
});
