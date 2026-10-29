import { business } from '../content/business';

/**
 * Hard rule 8: AutoRepair, open 00:00-23:59 every day.
 * Never add aggregateRating or review — we have no sourced reviews.
 */
export function autoRepairSchema(origin = 'https://gts-diesel.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: business.name,
    legalName: business.legal,
    url: origin,
    telephone: business.phoneDisplay,
    image: `${origin}/uploads/gts-logo-white-on-ink.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: business.opens,
        closes: business.closes,
      },
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', address: business.locality },
      geoRadius: `${business.roadsideRadiusMiles} mi`,
    },
  };
}
