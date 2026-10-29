// CK2. Asserts what the brief requires of the built HTML, reading dist/ only —
// no dev server, no JavaScript execution.
//
//   AC1  the H1 text, phone number and address are present before JS runs
//   AC2  the 13 sections appear in the order R1 lists
//   AC3  every call link is tel:+17707713468 and shows the number as text
//   AC16 AutoRepair structured data, 7 days of 00:00-23:59, no ratings
//   AC17 one canonical per page on https://gts-diesel.com
//   AC22 /cowboys-radiator is pre-rendered and its unknowns are blanks
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

const failures = [];
const check = (ok, label) => {
  if (ok) console.log(`  ok    ${label}`);
  else {
    console.error(`  FAIL  ${label}`);
    failures.push(label);
  }
};

const gts = await readFile(join(dist, 'index.html'), 'utf8');
const cowboys = await readFile(join(dist, 'cowboys-radiator/index.html'), 'utf8');

// AC1
check(/<h1[^>]*>.*Broken down\? We roll to you\./s.test(gts), 'AC1 H1 text in built HTML');
check(gts.includes('(770) 771-3468'), 'AC1 phone number in built HTML');
check(gts.includes('530 Roswell St NE'), 'AC1 street address in built HTML');
check(gts.includes('Marietta, GA 30060'), 'AC1 city, state and ZIP in built HTML');

// AC2 — the 13 sections of R1, by the markers each renders.
const order = [
  ['header', /<header\b/],
  ['hero', /id="top"/],
  ['emergency band', /id="emergency-h"/],
  ['services', /id="services"/],
  ['how it works', /id="how-h"/],
  ['fleet services', /id="fleet"/],
  ['why GTS', /id="why"/],
  ['reviews', /id="reviews-h"/],
  ['service area', /id="area"/],
  ['FAQ', /id="faq"/],
  ['final call band', /id="quote"/],
  ['footer', /<footer\b/],
  ['sticky call bar', /data-sticky-bar=/],
];
let cursor = -1;
let ordered = true;
for (const [name, re] of order) {
  const at = gts.search(re);
  if (at === -1) {
    check(false, `AC2 section present: ${name}`);
    ordered = false;
  } else if (at < cursor) {
    check(false, `AC2 section out of order: ${name}`);
    ordered = false;
  } else cursor = at;
}
check(ordered, `AC2 all 13 sections present, in R1's order`);

// AC3 — React SSR puts <!-- --> between adjacent text nodes, so strip comments
// and tags before reading each link's text.
const tels = [...gts.matchAll(/href="(tel:[^"]*)"/g)].map((m) => m[1]);
check(tels.length >= 4, `AC3 the page offers several call links (${tels.length})`);
check(tels.every((t) => t === 'tel:+17707713468'), 'AC3 every call link is tel:+17707713468');
const linkText = [...gts.matchAll(/<a\b[^>]*href="tel:[^"]*"[^>]*>(.*?)<\/a>/gs)].map((m) =>
  (m[1] ?? '').replace(/<!--.*?-->/gs, '').replace(/<[^>]+>/g, '').trim(),
);
const silent = linkText.filter((t) => !t.includes('(770) 771-3468'));
check(silent.length === 0, `AC3 every call link shows the number as text${silent.length ? ` (missing in: ${silent.join(' | ')})` : ''}`);

// AC16
const ld = gts.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!ld) check(false, 'AC16 structured data present');
else {
  let schema = null;
  try {
    schema = JSON.parse(ld[1]);
  } catch {
    check(false, 'AC16 structured data parses as JSON');
  }
  if (schema) {
    check(schema['@type'] === 'AutoRepair', 'AC16 typed as AutoRepair');
    for (const f of ['name', 'address', 'telephone', 'url']) check(!!schema[f], `AC16 has ${f}`);
    const h = schema.openingHoursSpecification?.[0];
    check(h?.dayOfWeek?.length === 7, 'AC16 seven days of hours');
    check(h?.opens === '00:00' && h?.closes === '23:59', 'AC16 hours are 00:00-23:59');
    check(!!schema.geo?.latitude, 'AC16 carries geo coordinates');
    check(!/aggregateRating|ratingValue|"review"/.test(JSON.stringify(schema)), 'AC16 no ratings and no reviews');
  }
}

// AC17
for (const [name, html] of [['/', gts], ['/cowboys-radiator', cowboys]]) {
  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  check(canon.length === 1 && canon[0]?.startsWith('https://gts-diesel.com'), `AC17 ${name} has exactly one canonical`);
}

// AC22
check(/<h1[^>]*>/.test(cowboys), 'AC22 /cowboys-radiator is pre-rendered with an H1');
check((cowboys.match(/data-blank=/g) ?? []).length > 20, 'AC22 Cowboys unknowns render as blanks');

if (failures.length) {
  console.error(`\n${failures.length} pre-render check(s) failed.`);
  process.exit(1);
}
console.log('\nAll pre-render checks passed.');
