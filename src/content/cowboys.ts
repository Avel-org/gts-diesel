/**
 * Cowboys Radiator, the sister business. Almost everything here is still blank:
 * the handoff prototype shipped it as a structural twin of the GTS page with
 * labelled placeholders. Do not fill these in from guesswork — see
 * docs/OPEN-BLANKS.md for the list to take to Mathew.
 */
import { business } from './business';
import { blank, site } from './types';
import type { PageContent, Service } from './page';

const blankService = (n: number): Service => ({
  title: blank(`Cowboys service ${n}: name`),
  benefit: blank(`Cowboys service ${n}: one-line benefit`),
  icon: 'wrench',
  photo: blank(`Cowboys service ${n} photo`),
  items: [blank(`Cowboys service ${n}: checklist item`), blank(`Cowboys service ${n}: checklist item`)],
});

export const cowboys: PageContent = {
  brand: 'cowboys',
  name: 'Cowboys',
  sub: 'Radiator & Cooling Repair',

  eyebrow: site('Radiator · Cooling · Marietta, GA'),
  h1: site('Auto radiator & cooling repair. Marietta.'),
  h1Alt: site('Running hot? Bring it in.'),
  subhead: site('Auto radiator and cooling repair in Marietta, GA.'),
  ghostLabel: 'Get a quote',

  heroPhoto: blank('Cowboys hero photo', 'Photo: radiator on the bench, warm shop light'),
  fleetPhoto: blank('Cowboys shop floor photo', 'Photo: Cowboys shop floor'),
  shopPhoto: blank('Cowboys shop front photo', 'Photo: Cowboys shop front'),

  proof: [blank('Cowboys proof point 1'), blank('Cowboys proof point 2')],

  servicesTitle: site('Radiators and cooling.'),
  specRow: blank('Cowboys hours', 'Marietta, GA · Hours: blank'),

  services: [
    {
      title: site('Radiator repair'),
      benefit: blank('Radiator repair: one-line benefit'),
      icon: 'thermo',
      large: true,
      photo: blank('Radiator photo', 'Photo: radiator core, close'),
      items: [
        blank('Radiator repair: checklist item'),
        blank('Radiator repair: checklist item'),
        blank('Radiator repair: checklist item'),
      ],
    },
    {
      title: site('Cooling system repair'),
      benefit: blank('Cooling system repair: one-line benefit'),
      icon: 'drop',
      photo: blank('Cooling system photo', 'Photo: coolant hoses and fan, close'),
      items: [
        blank('Cooling system repair: checklist item'),
        blank('Cooling system repair: checklist item'),
        blank('Cooling system repair: checklist item'),
      ],
    },
    blankService(3),
    blankService(4),
    blankService(5),
  ],

  howTitle: site('How it works'),
  steps: [
    { n: '01', title: site('Call'), meta: blank('Step 1 meta'), body: blank('Step 1 body') },
    { n: '02', title: site('Bring it in'), meta: blank('Step 2 meta'), body: blank('Step 2 body') },
    { n: '03', title: site('Drive cool'), meta: blank('Step 3 meta'), body: blank('Step 3 body') },
  ],

  stats: [
    { label: 'Stat', value: blank('Cowboys stat 1') },
    { label: 'Stat', value: blank('Cowboys stat 2') },
    { label: 'Stat', value: blank('Cowboys stat 3') },
    { label: 'Stat', value: blank('Cowboys stat 4') },
  ],

  reviews: [blank('Cowboys review 1'), blank('Cowboys review 2'), blank('Cowboys review 3')],

  faqs: [
    { q: blank('Cowboys FAQ 1: question'), a: blank('Cowboys FAQ 1: answer') },
    { q: blank('Cowboys FAQ 2: question'), a: blank('Cowboys FAQ 2: answer') },
    { q: blank('Cowboys FAQ 3: question'), a: blank('Cowboys FAQ 3: answer') },
  ],

  finalTitle: site('Call the shop.'),
  footerName: 'Cowboys Radiator',
  llc: blank('Cowboys legal entity'),
  addressLines: [blank('Cowboys street address'), site('Marietta, GA')],
  sisterLink: { label: business.name, path: '/' },
};
