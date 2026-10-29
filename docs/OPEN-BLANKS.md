# Open blanks

What we still need from Mathew. Until each one arrives, the page renders a
labelled placeholder rather than a guess — that is hard rule 1, and it is the
reason the site can go live without anyone inventing a review or a certification.

The eleven-blank table below is from the brief's section 9 and is maintained by
hand. The per-field list that sits under it is generated from `src/content/`
once that module exists — AC9 requires the build to print it, and AC24 requires
this file to match that list.

## How to close one

1. Get the answer from Mathew, in his words where possible.
2. Open `src/content/gts.ts` or `src/content/cowboys.ts`.
3. Replace `blank('…')` with `said('his exact words')` — `said` records the
   source as `mathew`.
4. Run `pnpm blanks && pnpm test`. The row disappears from this table.

## The eleven blanks from the brief

Section 9 of `CANON-BRIEF-GTS-LANDING.md` is the authoritative list. Blanks do
not block delivery — they appear on the receipt and go to Mathew as this list.

| # | From the brief | Status |
|---|---|---|
| 1 | Real photos: trucks, shop, service truck, crew | Open — 9 photo slots render as labelled placeholders |
| 2 | Vector logo | Open — we have only the raster white-on-ink PNG |
| 3 | Towns and highways served | Open — `gts.townsServed` |
| 4 | "DPS system repairs": probably DPF, use DPF only once he confirms | Open — not printed anywhere until confirmed |
| 5 | The 573-855-0518 WhatsApp link: current, or remove | Open — not on the page |
| 6 | Commercial trucks only, or personal vehicles too | Open — his old site said both |
| 7 | Confirmation of the four "Why GTS" facts | Open — all four render, sourced `his-site`, not `mathew` |
| 8 | Payment methods and fleet billing | Open — the FAQ answer is blank |
| 9 | The email the quote form sends to | Open — `QUOTE_TO_EMAIL` is deliberately empty |
| 10 | Cowboys Radiator: services, address, phone, hours, logo, colours, shared location | Open — nearly the whole page |
| 11 | Reviews: needs manager access to his Google Business Profile | Open — 3 review slots blank, and no rating in the structured data |

## Ask in this order

The first four unblock the GTS page:

| Priority | What to ask |
|---|---|
| 1 | **Payment methods and fleet billing.** The FAQ already asks the question and has no answer (brief blank 8) |
| 2 | **Confirm the four "Why GTS" facts** — 30+ years combined experience, 24/7 emergency roadside, $200 referral discounts, free phone consultations. They came off his old site and still read as `his-site`, not `mathew` (blank 7) |
| 3 | **The email for the quote form.** Until this lands, the form cannot send. Old structured data said dottavioenterprises@yahoo.com (blank 9) |
| 4 | **Towns and highways served** inside the 100-mile radius (blank 3) |
| 5 | **Three to five reviews**, with first name, town and written permission — plus manager access to the Google Business Profile (blank 11) |
| 6 | **Photos**: service truck at dusk, shop front, a semi in the bay, trailer brakes, the fleet lot, a night roadside job (blank 1), and a **vector logo** (blank 2) |
| 7 | **Two wording checks**: is "DPS" really DPF (blank 4), and is the WhatsApp number still live (blank 5) |
| 8 | **Scope**: commercial only, or personal vehicles too (blank 6) |
| 9 | **Cowboys Radiator, all of it** (blank 10) |

## Generated list

`src/content/` does not exist yet, so there is nothing to generate from. When
`gts-sections` builds the content layer, it owns:

- a `blank()` claim carrying what is needed, per AC7
- a build step that prints every blank, per AC9
- a regeneration of the list below, so this file matches the build, per AC24

Keep the markers — whatever writes the list should replace what sits between them.

<!-- blanks:start -->
| # | Where | What we need |
|---|---|---|
| 1 | `gts.shopPhoto` | Shop front photo |
| 2 | `gts.services.1.photo` | Diagnostics photo |
| 3 | `gts.faqs.4.a` | Payment methods accepted |
| 4 | `cowboys.heroPhoto` | Cowboys hero photo |
| 5 | `cowboys.fleetPhoto` | Cowboys shop floor photo |
| 6 | `cowboys.shopPhoto` | Cowboys shop front photo |
| 7 | `cowboys.proof.0` | Cowboys proof point 1 |
| 8 | `cowboys.proof.1` | Cowboys proof point 2 |
| 9 | `cowboys.specRow` | Cowboys hours |
| 10 | `cowboys.services.0.benefit` | Radiator repair: one-line benefit |
| 11 | `cowboys.services.0.photo` | Radiator photo |
| 12 | `cowboys.services.0.items.0` | Radiator repair: checklist item |
| 13 | `cowboys.services.0.items.1` | Radiator repair: checklist item |
| 14 | `cowboys.services.0.items.2` | Radiator repair: checklist item |
| 15 | `cowboys.services.1.benefit` | Cooling system repair: one-line benefit |
| 16 | `cowboys.services.1.photo` | Cooling system photo |
| 17 | `cowboys.services.1.items.0` | Cooling system repair: checklist item |
| 18 | `cowboys.services.1.items.1` | Cooling system repair: checklist item |
| 19 | `cowboys.services.1.items.2` | Cooling system repair: checklist item |
| 20 | `cowboys.services.2.title` | Cowboys service 3: name |
| 21 | `cowboys.services.2.benefit` | Cowboys service 3: one-line benefit |
| 22 | `cowboys.services.2.photo` | Cowboys service 3 photo |
| 23 | `cowboys.services.2.items.0` | Cowboys service 3: checklist item |
| 24 | `cowboys.services.2.items.1` | Cowboys service 3: checklist item |
| 25 | `cowboys.services.3.title` | Cowboys service 4: name |
| 26 | `cowboys.services.3.benefit` | Cowboys service 4: one-line benefit |
| 27 | `cowboys.services.3.photo` | Cowboys service 4 photo |
| 28 | `cowboys.services.3.items.0` | Cowboys service 4: checklist item |
| 29 | `cowboys.services.3.items.1` | Cowboys service 4: checklist item |
| 30 | `cowboys.services.4.title` | Cowboys service 5: name |
| 31 | `cowboys.services.4.benefit` | Cowboys service 5: one-line benefit |
| 32 | `cowboys.services.4.photo` | Cowboys service 5 photo |
| 33 | `cowboys.services.4.items.0` | Cowboys service 5: checklist item |
| 34 | `cowboys.services.4.items.1` | Cowboys service 5: checklist item |
| 35 | `cowboys.steps.0.meta` | Step 1 meta |
| 36 | `cowboys.steps.0.body` | Step 1 body |
| 37 | `cowboys.steps.1.meta` | Step 2 meta |
| 38 | `cowboys.steps.1.body` | Step 2 body |
| 39 | `cowboys.steps.2.meta` | Step 3 meta |
| 40 | `cowboys.steps.2.body` | Step 3 body |
| 41 | `cowboys.stats.0.value` | Cowboys stat 1 |
| 42 | `cowboys.stats.1.value` | Cowboys stat 2 |
| 43 | `cowboys.stats.2.value` | Cowboys stat 3 |
| 44 | `cowboys.stats.3.value` | Cowboys stat 4 |
| 45 | `cowboys.reviews.0` | Cowboys review 1 |
| 46 | `cowboys.reviews.1` | Cowboys review 2 |
| 47 | `cowboys.reviews.2` | Cowboys review 3 |
| 48 | `cowboys.faqs.0.q` | Cowboys FAQ 1: question |
| 49 | `cowboys.faqs.0.a` | Cowboys FAQ 1: answer |
| 50 | `cowboys.faqs.1.q` | Cowboys FAQ 2: question |
| 51 | `cowboys.faqs.1.a` | Cowboys FAQ 2: answer |
| 52 | `cowboys.faqs.2.q` | Cowboys FAQ 3: question |
| 53 | `cowboys.faqs.2.a` | Cowboys FAQ 3: answer |
| 54 | `cowboys.llc` | Cowboys legal entity |
| 55 | `cowboys.addressLines.0` | Cowboys street address |
| 56 | `ask.0` | Vector logo — we only have a raster white-on-ink PNG from the handoff |
| 57 | `ask.1` | Towns and highways served inside the 100-mile radius — the service-area section states the radius only, with no list |
| 58 | `ask.2` | "DPS system repairs" on his old site: is it DPF (diesel particulate filter)? Do not print DPF until he confirms |
| 59 | `ask.3` | The 573-855-0518 WhatsApp number on his old site: still current, or remove it |
| 60 | `ask.4` | Commercial trucks only, or personal vehicles too — his old site said both |
| 61 | `ask.5` | Fleet billing terms, alongside the payment methods |
| 62 | `ask.6` | The email address the quote form sends to — old structured data listed dottavioenterprises@yahoo.com, unconfirmed |
| 63 | `ask.7` | Manager access to the Google Business Profile, before any review can be used |
| 64 | `ask.8` | Cowboys Radiator: whether it shares the GTS location, and its own logo and colours |
<!-- blanks:end -->
