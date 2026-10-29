import type { Blank, Claim } from './types';

/** Icon keys. The section components map these to lucide-react icons. */
export type IconName =
  | 'zap' | 'cpu' | 'wrench' | 'box' | 'users' | 'thermo' | 'drop' | 'phone';

export type Service = {
  title: Claim<string>;
  benefit: Claim<string>;
  icon: IconName;
  /** Hard rule 9: a missing photo renders as a labelled placeholder. */
  photo: Blank;
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
  heroPhoto: Blank;
  fleetPhoto: Blank;
  shopPhoto: Blank;
  proof: Claim<string>[];
  /** Towns served: never list a town we cannot source. */
  townsServed: Blank;
  servicesTitle: Claim<string>;
  specRow: Claim<string>;
  services: Service[];
  howTitle: Claim<string>;
  steps: Step[];
  stats: Stat[];
  /** Hard rule: never invent a review. All five blanks until Mathew supplies them. */
  reviews: Blank[];
  faqs: Faq[];
  finalTitle: Claim<string>;
  footerName: string;
  llc: Claim<string>;
  addressLines: Claim<string>[];
  sisterLink: { label: string; path: string };
};
