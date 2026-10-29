# Working in this repo

Rules for every agent and person on this repo. The full spec is the Canon brief for the GTS landing page; when this file and the brief disagree, the brief wins.

## The goal

The page has one goal: **the visitor calls.** Every choice should make calling easier, faster or more trusted. If a change doesn't help with that, leave it out.

## Territories

Each agent writes only inside its own folders. Reading anything is fine.

| Territory | Writes to | Owns |
|---|---|---|
| gts-design | `src/design/`, `src/components/ui/` | Tokens, theme, base components |
| gts-sections | `src/sections/`, `src/content/`, `src/routes/`, `public/`, `vercel.json`, `docs/` | The page, content, SEO, redirects, handoff |
| gts-api | `api/` | The quote form function |
| gts-tests | `tests/` | Unit and browser tests, written from the brief, never from the code |
| gts-fixtures | `fixtures/golden/` | Browser scenarios |

**Build order:** design first, then sections and the form function (side by side), then the handoff.

If a change needs a file outside your territory, stop and report it. Don't edit it.

## Hard rules

1. **No invented facts.** Every claim comes from `src/content/` with a source: `his-site`, `mathew` or `blank`. Unknown means `blank`, never a guess. No made-up reviews, ratings, years, towns or certifications.
2. **One phone number, one place.** The phone, address and hours are defined once in the content file and used everywhere: page, footer, structured data. Every call link is `tel:+17707713468`.
3. **Tokens only.** Colours, fonts, radii and motion come from `src/design/tokens.css`. No raw hex values in components.
4. **Dark mode only.** Don't add a light theme or a theme toggle.
5. **Motion ends.** Self-starting motion stops within 5 seconds of load. Use transform and opacity only, 250 ms or less for interactions. Everything stops under `prefers-reduced-motion`.
6. **Pre-rendered.** The H1, phone number and address must be in the built HTML before JavaScript runs.
7. **No secrets in the repo.** Keys live in Vercel's environment settings. `.env` is ignored.
8. **Structured data is `AutoRepair`,** open 00:00–23:59 every day. Never add ratings or reviews to it.
9. **Placeholders are labelled.** A missing photo shows "Photo: what's needed" and is marked `blank`.

## The avoid list

Purple or blue gradients, glassmorphism, gradient text, the default shadcn neutral theme, three identical rounded cards under a centred hero, beige serif heroes, 3D or particle backgrounds, video heroes, carousels, scroll-jacking, fake logo marquees, count-up numbers, low-contrast grey text. The hazard stripe appears exactly twice: at the top of the emergency band and of the final call band.

## Done means

A change is done when these pass:

```bash
pnpm typecheck
pnpm build          # pre-rendered, prints open blanks
pnpm test
pnpm test:e2e
pnpm a11y           # no serious or critical axe issues
pnpm lhci           # 95+ on mobile in all four categories
```

Then the gate decides. Only a **verified** result ships; a **pass** isn't enough.

## Before you start

- Read `docs/design/` (the handoff, `tokens.css`, `design-spec.json`).
- Check `docs/OPEN-BLANKS.md` for what's still unknown.
- Search `src/components/ui/` before building a new component. Change the existing one rather than adding a near-copy.
