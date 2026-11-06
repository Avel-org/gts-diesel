import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { gts } from '../src/content';
import { isBlank } from '../src/content/types';
import type { Claim } from '../src/content/types';
import type { Photo } from '../src/content/page';

const pub = join(__dirname, '..', 'public');

/** Every real photo the GTS page references, with where it sits. */
function photos(node: unknown, path = ''): Array<[string, Photo]> {
  if (node === null || typeof node !== 'object') return [];
  const obj = node as Record<string, unknown>;
  if (typeof obj.source === 'string') {
    const c = obj as Claim<unknown>;
    const v = isBlank(c) ? undefined : (c.value as Partial<Photo>);
    return v && typeof v === 'object' && typeof v.src === 'string' && Array.isArray(v.webp)
      ? [[path, v as Photo]]
      : [];
  }
  return Object.entries(obj).flatMap(([k, v]) => photos(v, path ? `${path}.${k}` : k));
}

const all = photos(gts);

describe('photos declare their true size (no layout shift, no false srcset)', () => {
  it('finds the photos', () => {
    expect(all.length).toBeGreaterThanOrEqual(5);
  });

  it.each(all)('%s: width and height match the JPEG on disk', async (_path, p) => {
    const m = await sharp(join(pub, p.src)).metadata();
    expect([p.width, p.height]).toEqual([m.width, m.height]);
    expect(p.ratio).toBe(`${m.width} / ${m.height}`);
  });

  it.each(all)('%s: every AVIF and WebP rung exists, at its stated width, never upscaled', async (_path, p) => {
    expect(p.avif.length).toBeGreaterThan(0);
    for (const r of [...p.avif, ...p.webp]) {
      expect(existsSync(join(pub, r.src)), r.src).toBe(true);
      const m = await sharp(join(pub, r.src)).metadata();
      expect(m.width, r.src).toBe(r.width);
      expect(r.width, r.src).toBeLessThanOrEqual(p.width);
      expect(m.exif, `${r.src} carries EXIF`).toBeUndefined();
    }
  });
});
