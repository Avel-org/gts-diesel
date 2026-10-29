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
<!-- blanks:end -->
