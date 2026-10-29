import { describe, expect, it } from 'vitest';
import { head, headMeta } from '../src/lib/head';
import { autoRepairSchema } from '../src/lib/schema';
import { business } from '../src/content/business';

const indexable = Object.keys(headMeta).filter((p) => p !== '/404');

describe('page head', () => {
  it.each(Object.keys(headMeta))('%s has a title and a description', (path) => {
    const h = head(path);
    expect(h).toMatch(/<title>.+<\/title>/);
    expect(h).toMatch(/<meta name="description" content=".+" \/>/);
  });

  it.each(indexable)('%s declares its canonical URL', (path) => {
    expect(head(path)).toContain(`<link rel="canonical" href="https://gts-diesel.com${path}" />`);
  });

  it('keeps the 404 out of the index and gives it no canonical', () => {
    const h = head('/404');
    expect(h).toContain('<meta name="robots" content="noindex" />');
    expect(h).not.toContain('rel="canonical"');
  });

  it('keeps every description inside the length search engines show', () => {
    for (const m of Object.values(headMeta)) {
      expect(m.description.length).toBeLessThanOrEqual(165);
      expect(m.title.length).toBeLessThanOrEqual(75);
    }
  });

  it('escapes the ampersand in the business name', () => {
    expect(head('/')).not.toMatch(/<title>[^<]*[^&;]&[^a-z#]/);
  });
});

describe('hard rule 8: structured data', () => {
  const schema = autoRepairSchema();

  it('is AutoRepair, open 00:00 to 23:59 every day', () => {
    expect(schema['@type']).toBe('AutoRepair');
    const spec = schema.openingHoursSpecification[0]!;
    expect(spec.opens).toBe('00:00');
    expect(spec.closes).toBe('23:59');
    expect(spec.dayOfWeek).toHaveLength(7);
  });

  it('never carries a rating or a review', () => {
    const json = JSON.stringify(schema);
    expect(json).not.toMatch(/aggregateRating|ratingValue|"review"/);
  });

  it('uses the one phone number and address from business.ts', () => {
    expect(schema.telephone).toBe(business.phoneDisplay);
    expect(schema.address.streetAddress).toBe(business.street);
    expect(schema.address.postalCode).toBe(business.postalCode);
  });

  it('is only emitted for the GTS page', () => {
    expect(head('/')).toContain('application/ld+json');
    expect(head('/cowboys-radiator')).not.toContain('application/ld+json');
  });
});

describe('link previews', () => {
  it('the GTS page offers a card, at the size a large card wants', () => {
    const h = head('/');
    expect(h).toContain('<meta property="og:image" content="https://gts-diesel.com/og-gts.png" />');
    expect(h).toContain('<meta property="og:image:width" content="1200" />');
    expect(h).toContain('<meta property="og:image:height" content="630" />');
    expect(h).toContain('<meta name="twitter:image"');
  });

  it('gives the image an absolute URL, which every scraper requires', () => {
    const srcs = [...head('/').matchAll(/(?:og:image|twitter:image)" content="([^"]+)"/g)].map((m) => m[1]);
    expect(srcs.length).toBeGreaterThan(0);
    for (const s of srcs) expect(s).toMatch(/^https:\/\/gts-diesel\.com\//);
  });

  it('describes the card for anyone who cannot see it', () => {
    expect(head('/')).toMatch(/<meta property="og:image:alt" content=".+" \/>/);
  });

  it('gives Cowboys no card, rather than borrowing GTS branding', () => {
    // Its logo and colours are brief blank 10.
    expect(head('/cowboys-radiator')).not.toContain('og:image');
  });
});

describe('structured data images', () => {
  it('uses the mark as logo and real photographs as image', () => {
    const s = autoRepairSchema();
    expect(s.logo).toMatch(/gts-logo-white-on-ink\.png$/);
    expect(Array.isArray(s.image)).toBe(true);
    for (const i of s.image) expect(i).toMatch(/^https:\/\/gts-diesel\.com\/uploads\/.+\.jpg$/);
  });
});
