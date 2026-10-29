/**
 * Every word on the GTS landing page. Hard rule 1: no fact goes in a component.
 *
 * Copy is carried verbatim from the approved design handoff
 * (docs/design/handoff.html -> GTS Page prototype), which drew it from the old
 * website. `site()` means "copied from his site, awaiting Mathew's confirmation";
 * `blank()` means we do not have it and it renders as a labelled placeholder.
 */
import { business } from './business';
import { blank, said, site } from './types';
import type { PageContent, Photo } from './page';

/** Photographs Mathew supplied. Served from public/uploads. */
const photo = (name: string, alt: string, width: number, height: number): Photo => ({
  src: `/uploads/${name}.jpg`,
  webp: [400, 800].map((w) => ({ src: `/uploads/${name}-${w}.webp`, width: w })),
  alt,
  width,
  height,
});

export const gts: PageContent = {
  brand: 'gts',
  name: 'GTS',
  sub: 'Diesel Truck & Trailer Repair',

  eyebrow: site('24/7 Roadside · Marietta, GA · Up to 100 mi'),
  h1: site('Broken down? We roll to you.'),
  h1Alt: site('Diesel truck & trailer repair. Day or night.'),
  subhead: site(
    'Emergency roadside repair up to 100 miles out, OEM computer diagnostics for every brand, and full truck and trailer repair at shop pricing. Open 24 hours, 7 days.',
  ),
  ghostLabel: 'Get a fleet quote',

  heroPhoto: said(
    photo('service-truck-yard', "The GTS service truck and its crane in the yard, alongside a forklift and a reefer trailer", 1152, 1146),
  ),
  fleetPhoto: said(
    photo('trailer-crane', 'A GTS technician working leased box trailers from the service truck crane', 1164, 1469),
  ),
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

  // AC6: every specific below is his old site's wording, from the brief's
  // section 8 (captured verbatim in fixtures/golden/old-site-copy.json).
  services: [
    {
      title: site('24/7 Emergency roadside repair'),
      benefit: site('Big jobs roadside, no problem.'),
      icon: 'zap',
      large: true,
      photo: said(photo('roadside-brake-job', 'A wheel off at the roadside, service van alongside', 1170, 565)),
      items: [
        site("We'll do a clutch on the side of the road"),
        site("Even if you're 100 miles away from us"),
        site('Engines, brakes, transmissions, suspension'),
        site('Drive shafts, electrical, heating and AC'),
      ],
    },
    {
      title: site('Computer diagnostics'),
      benefit: site('Factory (OEM) software for all brands.'),
      icon: 'cpu',
      photo: blank('Diagnostics photo', 'Photo: laptop on OEM software, cable to the truck'),
      items: [
        site('Advanced computer diagnostics'),
        site('Forced regeneration'),
        site('Reduced-power diagnostics'),
        site('Advanced electrical troubleshooting'),
      ],
    },
    {
      title: site('General truck repair'),
      benefit: site('Shop pricing is lower than roadside.'),
      icon: 'wrench',
      photo: said(photo('engine-out', 'A diesel engine out on the hoist in the yard', 1170, 538)),
      items: [
        site('Engines, brakes, transmissions'),
        site('Suspension, drive shafts'),
        site('Electrical'),
        site('Heating and AC'),
      ],
    },
    {
      title: site('Trailer repair'),
      benefit: site('Brakes and air systems to reefers.'),
      icon: 'box',
      photo: said(photo('trailer-crane', 'Box trailers opened up for repair, worked from the crane', 1164, 1469)),
      items: [
        site('Brakes and air systems'),
        site('Air lines and hoses'),
        site('Refrigerated trailers and air chutes'),
        site('Trailer legs, bumpers and bushings'),
      ],
    },
    {
      title: site('Fleet services'),
      benefit: site('Tailored contracts, special pricing, 24/7 support.'),
      icon: 'users',
      photo: said(photo('semi-hood-up', 'A semi tractor with the hood up, worked on where it sat', 872, 880)),
      items: [
        site('Tailored contracts, special pricing'),
        site('24/7 support'),
        site('Vans, semi-trucks and trailers'),
        site('Buses, tow trucks, box trucks'),
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
      body: site("If we can't fix it on the spot, we'll bring your vehicle to our shop."),
    },
    {
      n: '03',
      title: site('Back on the road'),
      meta: site('24 hours · 7 days'),
      body: site('Repaired on the shoulder or in the bay, any hour.'),
    },
  ],

  // The four "Why GTS" facts from the brief, section 8. All four came off his
  // old site and all four still need Mathew's confirmation (blank 7).
  stats: [
    { label: 'Years combined experience', value: site('30+') },
    { label: 'Emergency roadside', value: site('24/7') },
    { label: 'Phone consultations', value: site('Free') },
    { label: 'Referral discounts', value: site('$200') },
  ],

  // Quoted verbatim from the client's Google Business Profile, supplied by the
  // client side. Never summarised, and never allowed into the structured data
  // — hard rule 8 keeps ratings and reviews out of schema.org.
  reviews: [
    said({
      name: 'Tra Westgate',
      stars: 5,
      when: '2 years ago',
      text: "Fast roadside service. They knew what they were doing. Got my dpf system taken care of with precision. Thought i needed an expensive filter. These guys found the issue was just a nox sensor and had it fixed in 2 hours. Saved me a bunch a money by knowing what they were doing. Great company. Worth every penny.",
    }),
    said({
      name: 'Peter Bagetakos',
      stars: 5,
      when: '5 months ago',
      text: "Great company, had an no start, they did a real diagnostic and discovered a bad sam cab in my dash. Previous company just changed my starter and guessed, then subsequently had me pay for a tow. These techs actually know how to test at dealer level. They are priced at 100 dollars an hour less then local dealers, got me in and fixed same day. Cheaper then the dealer and they are faster. Great experience.",
    }),
    said({
      name: 'Ken Gaffney',
      stars: 5,
      when: '4 months ago',
      excerpt: true,
      text: "Driver broke down on the side of the road on 285 in ATLANTA. I called GTS and spoke to Matt… GTS did a great job and even let the driver go before he received payment. He said he knew we wouldn't have stiffed him — just had a feeling. TRUST? That is something that you dont see too often anymore! The bill was way less than I expected as well.",
    }),
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
