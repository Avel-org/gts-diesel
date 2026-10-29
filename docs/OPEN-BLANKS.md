# Open blanks

What we still need from Mathew. Until each one arrives, the page renders a
labelled placeholder rather than a guess — that is hard rule 1, and it is the
reason the site can go live without anyone inventing a review or a certification.

**This table is generated.** Run `pnpm blanks` to rewrite it from
`src/content/`, or `pnpm build`, which prints the same list. Do not hand-edit
below the marker; edit the content file and regenerate.

## How to close one

1. Get the answer from Mathew, in his words where possible.
2. Open `src/content/gts.ts` or `src/content/cowboys.ts`.
3. Replace `blank('…')` with `said('his exact words')` — `said` records the
   source as `mathew`.
4. Run `pnpm blanks && pnpm test`. The row disappears from this table.

## The short version, for the client call

Ask Mathew for these in roughly this order — the first four unblock the GTS page:

| Priority | What to ask |
|---|---|
| 1 | **Payment methods.** "What can customers pay with?" (cash, card, fleet cards, ACH, Comdata?) |
| 2 | **Three to five customer reviews**, with first name and town, and written permission to publish |
| 3 | **Towns served** for roadside, inside the 100-mile radius |
| 4 | **A fourth proof stat** to sit beside 30+ years, free consultations and $200 referrals |
| 5 | **Confirm the three carried-over claims**: 30+ years combined experience, free phone consultations, $200 referral discounts. These came off the old site and are still marked `his-site`, not confirmed |
| 6 | **Photos**: service truck at dusk, shop front, a semi in the bay, trailer brakes, the fleet lot, a night roadside job |
| 7 | **Certifications and response times**, if he has any he can evidence |
| 8 | **Cowboys Radiator, all of it**: phone number, address, hours, legal entity, services, FAQs, stats, photos |

## Generated list

<!-- blanks:start -->
| # | Where | What we need |
|---|---|---|
| 1 | `gts.heroPhoto` | Hero photo |
| 2 | `gts.fleetPhoto` | Fleet photo |
| 3 | `gts.shopPhoto` | Shop front photo |
| 4 | `gts.townsServed` | Towns served list |
| 5 | `gts.services.0.photo` | Roadside photo |
| 6 | `gts.services.1.photo` | Diagnostics photo |
| 7 | `gts.services.2.photo` | Truck repair photo |
| 8 | `gts.services.3.photo` | Trailer repair photo |
| 9 | `gts.services.4.photo` | Fleet lot photo |
| 10 | `gts.stats.3.value` | Fourth stat |
| 11 | `gts.reviews.0` | Customer review 1 (name, town, words) |
| 12 | `gts.reviews.1` | Customer review 2 (name, town, words) |
| 13 | `gts.reviews.2` | Customer review 3 (name, town, words) |
| 14 | `gts.faqs.4.a` | Payment methods accepted |
| 15 | `cowboys.heroPhoto` | Cowboys hero photo |
| 16 | `cowboys.fleetPhoto` | Cowboys shop floor photo |
| 17 | `cowboys.shopPhoto` | Cowboys shop front photo |
| 18 | `cowboys.proof.0` | Cowboys proof point 1 |
| 19 | `cowboys.proof.1` | Cowboys proof point 2 |
| 20 | `cowboys.townsServed` | Cowboys towns served list |
| 21 | `cowboys.specRow` | Cowboys hours |
| 22 | `cowboys.services.0.benefit` | Radiator repair: one-line benefit |
| 23 | `cowboys.services.0.photo` | Radiator photo |
| 24 | `cowboys.services.0.items.0` | Radiator repair: checklist item |
| 25 | `cowboys.services.0.items.1` | Radiator repair: checklist item |
| 26 | `cowboys.services.0.items.2` | Radiator repair: checklist item |
| 27 | `cowboys.services.1.benefit` | Cooling system repair: one-line benefit |
| 28 | `cowboys.services.1.photo` | Cooling system photo |
| 29 | `cowboys.services.1.items.0` | Cooling system repair: checklist item |
| 30 | `cowboys.services.1.items.1` | Cooling system repair: checklist item |
| 31 | `cowboys.services.1.items.2` | Cooling system repair: checklist item |
| 32 | `cowboys.services.2.title` | Cowboys service 3: name |
| 33 | `cowboys.services.2.benefit` | Cowboys service 3: one-line benefit |
| 34 | `cowboys.services.2.photo` | Cowboys service 3 photo |
| 35 | `cowboys.services.2.items.0` | Cowboys service 3: checklist item |
| 36 | `cowboys.services.2.items.1` | Cowboys service 3: checklist item |
| 37 | `cowboys.services.3.title` | Cowboys service 4: name |
| 38 | `cowboys.services.3.benefit` | Cowboys service 4: one-line benefit |
| 39 | `cowboys.services.3.photo` | Cowboys service 4 photo |
| 40 | `cowboys.services.3.items.0` | Cowboys service 4: checklist item |
| 41 | `cowboys.services.3.items.1` | Cowboys service 4: checklist item |
| 42 | `cowboys.services.4.title` | Cowboys service 5: name |
| 43 | `cowboys.services.4.benefit` | Cowboys service 5: one-line benefit |
| 44 | `cowboys.services.4.photo` | Cowboys service 5 photo |
| 45 | `cowboys.services.4.items.0` | Cowboys service 5: checklist item |
| 46 | `cowboys.services.4.items.1` | Cowboys service 5: checklist item |
| 47 | `cowboys.steps.0.meta` | Step 1 meta |
| 48 | `cowboys.steps.0.body` | Step 1 body |
| 49 | `cowboys.steps.1.meta` | Step 2 meta |
| 50 | `cowboys.steps.1.body` | Step 2 body |
| 51 | `cowboys.steps.2.meta` | Step 3 meta |
| 52 | `cowboys.steps.2.body` | Step 3 body |
| 53 | `cowboys.stats.0.value` | Cowboys stat 1 |
| 54 | `cowboys.stats.1.value` | Cowboys stat 2 |
| 55 | `cowboys.stats.2.value` | Cowboys stat 3 |
| 56 | `cowboys.stats.3.value` | Cowboys stat 4 |
| 57 | `cowboys.reviews.0` | Cowboys review 1 |
| 58 | `cowboys.reviews.1` | Cowboys review 2 |
| 59 | `cowboys.reviews.2` | Cowboys review 3 |
| 60 | `cowboys.faqs.0.q` | Cowboys FAQ 1: question |
| 61 | `cowboys.faqs.0.a` | Cowboys FAQ 1: answer |
| 62 | `cowboys.faqs.1.q` | Cowboys FAQ 2: question |
| 63 | `cowboys.faqs.1.a` | Cowboys FAQ 2: answer |
| 64 | `cowboys.faqs.2.q` | Cowboys FAQ 3: question |
| 65 | `cowboys.faqs.2.a` | Cowboys FAQ 3: answer |
| 66 | `cowboys.llc` | Cowboys legal entity |
| 67 | `cowboys.addressLines.0` | Cowboys street address |
<!-- blanks:end -->
