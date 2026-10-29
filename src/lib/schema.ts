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
    logo: `${origin}/uploads/gts-logo-white-on-ink.png`,
    // schema.org wants photographs of the business here, not the mark.
    image: [
      `${origin}/uploads/service-truck-yard.jpg`,
      `${origin}/uploads/roadside-brake-job.jpg`,
      `${origin}/uploads/engine-out.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    // From the old site's structured data, per the brief's section 9.
    geo: { '@type': 'GeoCoordinates', latitude: 33.95014, longitude: -84.53668 },
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
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 33.95014, longitude: -84.53668 },
      geoRadius: `${business.roadsideRadiusMiles} mi`,
    },
  };
}
