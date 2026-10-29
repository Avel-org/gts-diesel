import { business } from '../content/business';
import { autoRepairSchema } from './schema';

const ORIGIN = 'https://gts-diesel.com';

const meta: Record<string, { title: string; description: string; path: string }> = {
  '/': {
    title: `${business.name} | 24/7 Roadside, Marietta GA`,
    description:
      'Emergency diesel truck and trailer repair in Marietta, GA. Roadside up to 100 miles, OEM computer diagnostics, open 24 hours. Call (770) 771-3468.',
    path: '/',
  },
  '/404': {
    title: 'Page not found | GTS Diesel Truck & Trailer Repair',
    description: 'That page moved. Call (770) 771-3468, open 24 hours.',
    path: '/404',
  },
  '/cowboys-radiator': {
    title: 'Cowboys Radiator | Auto Radiator & Cooling Repair, Marietta GA',
    description: 'Auto radiator and cooling system repair in Marietta, GA.',
    path: '/cowboys-radiator',
  },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** The <head> for one route, emitted at build time by the prerender step. */
export function head(url: string): string {
  const m = meta[url] ?? meta['/']!;
  // A 404 is not a page to index, so it gets no canonical.
  const indexable = url !== '/404';
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    indexable
      ? `<link rel="canonical" href="${ORIGIN}${m.path}" />`
      : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${ORIGIN}${m.path}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  // Only GTS carries the AutoRepair schema; Cowboys has no sourced NAP yet.
  if (url === '/') {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(autoRepairSchema(ORIGIN))}</script>`,
    );
  }
  return tags.join('\n    ');
}

export const headMeta = meta;
