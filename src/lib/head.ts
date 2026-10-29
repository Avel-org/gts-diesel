import { business } from '../content/business';
import { autoRepairSchema } from './schema';

const ORIGIN = 'https://gts-diesel.com';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** The link-preview card, where we have one. */
  ogImage?: { src: string; width: number; height: number; alt: string };
};

const meta: Record<string, PageMeta> = {
  '/': {
    title: `${business.name} | 24/7 Roadside, Marietta GA`,
    description:
      'Emergency diesel truck and trailer repair in Marietta, GA. Roadside up to 100 miles, OEM computer diagnostics, open 24 hours. Call (770) 771-3468.',
    path: '/',
    ogImage: {
      src: '/og-gts.png',
      width: 1200,
      height: 630,
      alt: 'GTS Truck & Trailer Repair',
    },
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
    // The display face is what the LCP text waits on; start it with the HTML.
    `<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/archivo-latin-wdth.woff2" />`,
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

  // Link previews. Only the GTS page has a card: Cowboys has no logo or
  // colours yet (brief blank 10), and borrowing GTS branding for a different
  // business would misrepresent it.
  if (m.ogImage) {
    tags.push(
      `<meta property="og:image" content="${ORIGIN}${m.ogImage.src}" />`,
      `<meta property="og:image:width" content="${m.ogImage.width}" />`,
      `<meta property="og:image:height" content="${m.ogImage.height}" />`,
      `<meta property="og:image:alt" content="${esc(m.ogImage.alt)}" />`,
      `<meta name="twitter:image" content="${ORIGIN}${m.ogImage.src}" />`,
    );
  }
  // Only GTS carries the AutoRepair schema; Cowboys has no sourced NAP yet.
  if (url === '/') {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(autoRepairSchema(ORIGIN))}</script>`,
    );
  }
  return tags.join('\n    ');
}

export const headMeta = meta;
