/**
 * Every word on the GTS landing page. Hard rule 1: no fact goes in a component.
 *
 * Copy is carried verbatim from the approved design handoff
 * (docs/design/handoff.html -> GTS Page prototype), which drew it from the old
 * website. `site()` means "copied from his site, awaiting Mathew's confirmation";
 * `blank()` means we do not have it and it renders as a labelled placeholder.
 */
import { business } from './business';
import { blank, site } from './types';
import type { PageContent } from './page';

export const gts: PageContent = {
  brand: 'gts',
  name: 'GTS',
  sub: 'Diesel Truck & Trailer Repair',

  eyebrow: site('24/7 Roadside · Marietta, GA · Up to 100 mi'),
  h1: site('Diesel truck & trailer repair. Day or night.'),
  h1Alt: site('Broken down? We roll to you.'),
  subhead: site(
    'Emergency roadside repair up to 100 miles out, OEM computer diagnostics for every brand, and full truck and trailer repair at shop pricing. Open 24 hours, 7 days.',
  ),
  ghostLabel: 'Get a fleet quote',

  heroPhoto: blank('Hero photo', 'Photo: GTS service truck at dusk, lit bay behind'),
  fleetPhoto: blank('Fleet photo', 'Photo: vans, box trucks and semis at the shop'),
  shopPhoto: blank('Shop front photo', `Photo: shop front, ${business.street}`),

  // The three "to confirm" claims from the handoff. Still his-site, not mathew.
  proof: [
    site('30+ yrs combined experience'),
    site('Free phone consultations'),
    site('$200 referral discounts'),
  ],

  townsServed: blank('Towns served list'),

  servicesTitle: site('Trucks, trailers, fleets.'),
  specRow: site('Radius: 100 mi · Hours: 24/7 · Diagnostics: OEM'),

  services: [
    {
      title: site('24/7 Emergency roadside repair'),
      benefit: site('Up to 100 miles out, any hour.'),
      icon: 'zap',
      large: true,
      photo: blank('Roadside photo', 'Photo: roadside repair at night, hazards on'),
      items: [
        site('On-site repair up to 100 miles from Marietta'),
        site('“We\'ll do a clutch on the side of the road”'),
        site('Trucks and trailers'),
        site('Open 24 hours, 7 days'),
      ],
    },
    {
      title: site('Computer diagnostics'),
      benefit: site('Factory (OEM) software for all brands.'),
      icon: 'cpu',
      photo: blank('Diagnostics photo', 'Photo: laptop on OEM software, cable to the truck'),
      items: [
        site('Forced regeneration'),
        site('Reduced-power diagnostics'),
        site('Electrical troubleshooting'),
      ],
    },
    {
      title: site('Truck repair'),
      benefit: site('Shop pricing, lower than roadside.'),
      icon: 'wrench',
      photo: blank('Truck repair photo', 'Photo: semi in the bay, hood up'),
      items: [
        site('Engines, brakes, transmissions'),
        site('Suspension and drive shafts'),
        site('Electrical'),
        site('Heating and AC'),
      ],
    },
    {
      title: site('Trailer repair'),
      benefit: site('Brakes to reefers, back on the road.'),
      icon: 'box',
      photo: blank('Trailer repair photo', 'Photo: trailer brakes and air lines, close'),
      items: [
        site('Brakes and air systems'),
        site('Suspension, legs, bumpers and bushings'),
        site('Refrigerated trailers and air chutes'),
        site('Trailer electrical'),
      ],
    },
    {
      title: site('Fleet services'),
      benefit: site('Contracts, special pricing, 24/7 support.'),
      icon: 'users',
      photo: blank('Fleet lot photo', 'Photo: fleet trucks lined up in the lot'),
      items: [
        site('Vans, semis and trailers'),
        site('Buses and tow trucks'),
        site('Box trucks'),
        site('Tailored contracts'),
      ],
    },
  ],

  howTitle: site('Three steps. One call.'),
  steps: [
    {
      n: '01',
      title: site('Call'),
      meta: site('Free phone consultation'),
      body: site('Tell us where you are, what you drive and what happened.'),
    },
    {
      n: '02',
      title: site('We come to you'),
      meta: site('Roadside up to 100 mi · or the shop'),
      body: site('Or bring the truck to the shop for shop pricing, lower than roadside.'),
    },
    {
      n: '03',
      title: site('Back on the road'),
      meta: site('24 hours · 7 days'),
      body: site('Repaired on the shoulder or in the bay, any hour.'),
    },
  ],

  stats: [
    { label: 'Years combined experience', value: site('30+') },
    { label: 'Phone consultations', value: site('Free') },
    { label: 'Referral discounts', value: site('$200') },
    { label: 'Stat to be supplied', value: blank('Fourth stat') },
  ],

  // Hard rule 1 and design rule 05: no made-up reviews or ratings, ever.
  reviews: [
    blank('Customer review 1 (name, town, words)'),
    blank('Customer review 2 (name, town, words)'),
    blank('Customer review 3 (name, town, words)'),
  ],

  faqs: [
    {
      q: site('Are you really open 24 hours?'),
      a: site(`Yes. ${business.hoursText}. Call ${business.phoneDisplay} any time.`),
    },
    {
      q: site('How far will you come for roadside repair?'),
      a: site('Up to 100 miles from Marietta, GA.'),
    },
    {
      q: site('What do you work on?'),
      a: site(
        'Diesel trucks and trailers: engines, brakes, transmissions, suspension, drive shafts, electrical, heating and AC, trailer brakes and air systems, refrigerated trailers and air chutes. OEM computer diagnostics for all brands.',
      ),
    },
    {
      q: site('Do you offer fleet accounts?'),
      a: site(
        'Yes. Tailored contracts, special pricing and 24/7 support for vans, semis and trailers, buses, tow trucks and box trucks.',
      ),
    },
    { q: site('What payment do you accept?'), a: blank('Payment methods accepted') },
  ],

  finalTitle: site("Call now. We're up."),
  footerName: business.name,
  llc: site(business.legal),
  addressLines: [
    site(business.street),
    site(`${business.locality}, ${business.region} ${business.postalCode}`),
  ],
  sisterLink: { label: business.sister.name, path: business.sister.path },
};
