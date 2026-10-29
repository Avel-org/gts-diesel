import type { Blank, Claim } from './types';

/** A real photograph we have the rights to use. */
export type Photo = {
  /** JPEG fallback, served from public/uploads. */
  src: string;
  /** webp widths offered to the browser, smallest first. */
  webp: Array<{ src: string; width: number }>;
  alt: string;
  width: number;
  height: number;
};

/**
 * A customer review, quoted from the client's Google Business Profile.
 * Never summarised, never edited beyond a marked excerpt, and never allowed
 * into the structured data — hard rule 8 forbids ratings and reviews there.
 */
export type Review = {
  name: string;
  stars: 5;
  when: string;
  text: string;
  /** Marked when the quote is trimmed from a longer review. */
  excerpt?: boolean;
};

/** Icon keys. The section components map these to lucide-react icons. */
export type IconName =
  | 'zap' | 'cpu' | 'wrench' | 'box' | 'users' | 'thermo' | 'drop' | 'phone';

export type Service = {
  title: Claim<string>;
  benefit: Claim<string>;
  icon: IconName;
  /** Hard rule 9: a photo we don't have renders as a labelled placeholder. */
  photo: Claim<Photo>;
  items: Claim<string>[];
  /** The one feature tile in the services bento. */
  large?: boolean;
};

export type Step = { n: string; title: Claim<string>; meta: Claim<string>; body: Claim<string> };
export type Stat = { label: string; value: Claim<string> };
export type Faq = { q: Claim<string>; a: Claim<string> };

export type PageContent = {
  /** Which business this page is for; drives the header lockup and schema. */
  brand: 'gts' | 'cowboys';
  name: string;
  sub: string;
  eyebrow: Claim<string>;
  /** h1Variant 'a' is the approved default; 'b' is the handoff's alternate. */
  h1: Claim<string>;
  h1Alt: Claim<string>;
  subhead: Claim<string>;
  ghostLabel: string;
  heroPhoto: Claim<Photo>;
  fleetPhoto: Claim<Photo>;
  shopPhoto: Claim<Photo>;
  proof: Claim<string>[];
  /** Towns served: never list a town we cannot source. */
  townsServed: Blank;
  servicesTitle: Claim<string>;
  specRow: Claim<string>;
  services: Service[];
  howTitle: Claim<string>;
  steps: Step[];
  stats: Stat[];
  /** Hard rule 1: never invent a review. Real ones only, or a blank. */
  reviews: Claim<Review>[];
  faqs: Faq[];
  finalTitle: Claim<string>;
  footerName: string;
  llc: Claim<string>;
  addressLines: Claim<string>[];
  sisterLink: { label: string; path: string };
};
