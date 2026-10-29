# Editing the GTS Diesel site

Everything a visitor reads lives in two files. You do not need to touch a
component to change a word on the page.

| File | What is in it |
|---|---|
| `src/content/business.ts` | Phone, address, hours, the 100-mile radius |
| `src/content/gts.ts` | Every word on the main page |
| `src/content/cowboys.ts` | Every word on the Cowboys Radiator page |

## The one rule

**Every claim records where it came from.** That is why the site can go live
without anyone inventing a review, a certification or a response time.

```ts
site('30+ yrs combined experience')   // copied from the old website
said('We take Comdata and cash')      // Mathew confirmed it
blank('Payment methods accepted')     // we do not know yet
```

A `blank()` renders on the page as a dashed box reading what we need, and it
shows up in `docs/OPEN-BLANKS.md`. It never renders as empty space, and it is
never quietly replaced with something plausible.

## Changing a word

Find it in `src/content/gts.ts` and edit the string inside the quotes:

```ts
subhead: site('Emergency roadside repair up to 100 miles out, …'),
```

If Mathew is the one confirming the new wording, change `site` to `said` — that
promotes the source from "off the old site" to "confirmed". Then:

```bash
pnpm test        # checks the content rules still hold
pnpm build       # rebuilds and reprints the open blanks
```

## Filling in a blank

```ts
// before
{ q: site('What payment do you accept?'), a: blank('Payment methods accepted') },

// after
{ q: site('What payment do you accept?'), a: said('Cash, all major cards, and Comdata.') },
```

Then `pnpm blanks` to refresh `docs/OPEN-BLANKS.md`.

## Changing the phone number or address

Only in `src/content/business.ts`, and only there. The page, the footer, the
sticky call bar, every call button and the structured data Google reads all
come from that one file. Changing it in one place changes it everywhere, which
is the point — there is no second copy to forget.

## Adding a photo

1. Put the file in `public/uploads/`.
2. In the content file, swap the `blank(...)` for the path.
3. Photos should be at least 1600px wide. Landscape for the hero and the fleet
   section, anything for the service tiles.

Until then the dashed box states the shot we are waiting for, which is more
useful to everyone than a stock photo of somebody else's truck.

## What not to do

- **Don't put a fact in a component.** If it isn't in `src/content/`, it does
  not belong on the page.
- **Don't add a review or a star rating** until we have the customer's words and
  their permission. The structured data deliberately carries no rating.
- **Don't add a light theme.** The site is dark only, by design.
- **Don't put a colour in a component.** Colours come from
  `src/design/tokens.css`.
- **Don't commit `.env`.** Keys live in Vercel's project settings.

## Checking your work

```bash
pnpm typecheck && pnpm test && pnpm build
```

All three must pass. For the full gate, see "Done means" in `AGENTS.md`.
