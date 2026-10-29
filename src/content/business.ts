/**
 * Hard rule 2: one phone number, one place. The page, the footer and the
 * structured data all read from here. Every call link is `tel:+17707713468`.
 *
 * Source: the old website, carried through the approved design handoff
 * (docs/design/design-spec.json -> business).
 */
export const business = {
  name: 'GTS Diesel Truck & Trailer Repair',
  legal: 'Matt and Dom Enterprises LLC',
  phoneDisplay: '(770) 771-3468',
  phoneHref: 'tel:+17707713468',
  street: '530 Roswell St NE',
  locality: 'Marietta',
  region: 'GA',
  postalCode: '30060',
  country: 'US',
  hoursText: 'Open 24 hours, 7 days',
  /** Hard rule 8: AutoRepair, open 00:00-23:59 every day, never any rating. */
  opens: '00:00',
  closes: '23:59',
  roadsideRadiusMiles: 100,
  sister: { name: 'Cowboys Radiator', path: '/cowboys-radiator' },
} as const;

export const addressLine = `${business.street}, ${business.locality}, ${business.region} ${business.postalCode}`;
