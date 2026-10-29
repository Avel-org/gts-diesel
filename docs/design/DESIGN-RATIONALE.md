# Design rationale — Night Shift Industrial v1.0

Carried verbatim from the approved handoff (`docs/design/handoff.html`). The
machine-readable form is `design-spec.json`; this is the why.

> A lit service bay at 2 a.m.

## The six rules

| | Rule | Why |
|---|---|---|
| 01 | **One action: call** | Every section ends in a way to call (770) 771-3468. The primary button is the only large accent fill outside the emergency band. |
| 02 | **Dark only** | A lit service bay at 2 a.m. One theme keeps contrast predictable and the brand recognisable. |
| 03 | **Accent is a signal** | Logo green `#8DC63F` is reserved for call buttons, live dots, numerals, rules and focus. Never body text, never white on green. |
| 04 | **Mono means data** | JetBrains Mono only for labels, specs, hours, radius and numerals. Archivo for everything you read. |
| 05 | **Blanks stay blank** | Reviews, towns, ratings, certifications, payment and photos are labelled placeholders until the client supplies them. |
| 06 | **Motion means live** | Pulses and sweeps only where they mean "open now" or "call". ≤250 ms for interactions. Off under reduced motion. |

## Who the page is for

A driver on the shoulder of I-75 at 2 a.m. with a dead truck, on a phone, on
bad signal, one-handed. And a fleet manager at a desk comparing three shops.
The first needs the number in reach at every scroll position; the second needs
to see the scope of work and that the shop is real. The page answers the driver
first and the manager second, which is why the sticky call bar exists on mobile
and the fleet section sits mid-page rather than at the top.

## Accent discipline

The green is the logo colour and it is the only saturated thing on the page, so
it carries meaning rather than decoration:

- call buttons and the emergency band fill
- the live dot beside "Open 24/7"
- numerals in the proof grid and the step numbers
- rules under the hero eyebrow, and every focus ring

At most ~10% of any viewport. Text on green is always `--accent-ink`
(`#0B0D0C`), never white — white on this green fails contrast.

## Motion budget

Three loops exist, and each one stops by itself:

| Class | Means | Runs |
|---|---|---|
| `.gts-beacon` | open / dispatch live | 2.4 s × 2 = 4.8 s |
| `.gts-signal` | the one primary call button | 2.6 s × 1 |
| `.gts-scan` | hero eyebrow light-bar glint | 2.8 s × 1 |

All three finish inside five seconds of load, which is WCAG 2.2.2. The counts
live in `tokens.css` as `--loop-*-count`, and `tests/tokens.test.ts` asserts the
duration × count product stays under five seconds, so the budget cannot drift.
`.gts-reveal` is scroll-driven (`animation-timeline: view()`) and so does not
start on its own at all.

Everything stops under `prefers-reduced-motion: reduce`.

## The avoid list

Purple or blue gradients, glassmorphism, gradient text, the default shadcn
neutral theme, three identical rounded cards under a centred hero, beige serif
heroes, 3D or particle backgrounds, video heroes, carousels, scroll-jacking,
fake logo marquees, count-up numbers, low-contrast grey text.

The hazard stripe appears exactly twice: the top of the emergency band and the
top of the final call band. `tests/tokens.test.ts` enforces the count.

## What shipped in this repo

`src/design/tokens.css` is the source of truth and is the design agent's own
file, carried in unchanged apart from being moved into `src/design/`. It is
more complete than the snippet shown inside the handoff page: it adds
`--b-ink`, the SVG `--grain` texture, the finite `--loop-*-count` values, and
the `.gts-scan` / `.gts-arrowlink` implementations.

`app.css` gained a `@layer base` block that the handoff did not specify. The
handoff's prototype painted its background on a wrapper div; a real page has no
such wrapper, so without `body { background: var(--bg) }` the dark text tokens
rendered on the browser's white canvas and every heading failed contrast. axe
caught it; the base layer fixes it.
