import { blank } from './types';
import type { Blank } from './types';

/**
 * Open questions from the brief's section 9 that have no slot on the page yet,
 * so they cannot be tracked as content blanks. They still have to reach Mathew,
 * so they are registered here and `pnpm blanks` lists them with the rest.
 */
export const openQuestions: Blank[] = [
  blank('Vector logo — we only have a raster white-on-ink PNG from the handoff'),
  blank('Towns and highways served inside the 100-mile radius — the service-area section states the radius only, with no list'),
  blank('"DPS system repairs" on his old site: is it DPF (diesel particulate filter)? Do not print DPF until he confirms'),
  blank('The 573-855-0518 WhatsApp number on his old site: still current, or remove it'),
  blank('Commercial trucks only, or personal vehicles too — his old site said both'),
  blank('Fleet billing terms, alongside the payment methods'),
  blank('The email address the quote form sends to — old structured data listed dottavioenterprises@yahoo.com, unconfirmed'),
  blank('Manager access to the Google Business Profile, before any review can be used'),
  blank('Cowboys Radiator: whether it shares the GTS location, and its own logo and colours'),
];
