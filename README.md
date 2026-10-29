# GTS Diesel Truck & Trailer Repair

The website for GTS Diesel Truck & Trailer Repair in Marietta, GA. The site does one job: a driver or fleet manager sees what GTS fixes, then calls. A short quote form is the second option.

- **Live:** https://gts-diesel.com (domain transfer in progress)
- **Client:** Matt and Dom Enterprises LLC
- **Built by:** AVEL's five-agent crew, checked at AVEL's gate

## Stack

| | |
|---|---|
| App | Vite, React 19, TypeScript (strict) |
| Routing | React Router v7, every page pre-rendered at build time |
| Styling | Tailwind CSS v4, shadcn/ui, design tokens in `src/design/tokens.css` |
| Fonts | Archivo and JetBrains Mono, self-hosted with Fontsource |
| Form | A Vercel serverless function in `api/` |
| Hosting | Vercel |

## Pages

| Path | What it is |
|---|---|
| `/` | GTS Diesel: the landing page |
| `/cowboys-radiator` | The sister business, Cowboys Radiator |

## Getting started

```bash
corepack enable          # uses the pinned pnpm
pnpm install
cp .env.example .env     # form settings; never commit .env
pnpm dev                 # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Local dev server |
| `pnpm build` | Pre-rendered production build, and prints the list of open blanks |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Unit tests (content, tokens, SEO, redirects, form, analytics) |
| `pnpm test:e2e` | Browser tests (call buttons, sticky bar, Cowboys page) |
| `pnpm a11y` | axe accessibility check on both pages |
| `pnpm lhci` | Lighthouse on mobile |

## Project layout

```
src/
  design/        tokens.css, app.css: colour, type, shape, motion
  components/ui/ shadcn components, themed with the tokens
  sections/      one file per page section
  content/       all page copy, one file, every claim with a source
  routes/        the two pages
api/             quote form function
public/          robots.txt, images, favicon
docs/
  design/        the approved design handoff and spec
  HANDOFF.md     how Mathew edits content
  OPEN-BLANKS.md what we still need from him
tests/           unit tests
fixtures/golden/ browser scenarios
vercel.json      redirects from the old site's paths
```

## Editing content

Every word on the page lives in `src/content/`. Each claim records where it came from:

- `his-site`: copied from the old website
- `mathew`: confirmed by Mathew
- `blank`: not known yet. It renders as a labelled placeholder and appears in `docs/OPEN-BLANKS.md`

Don't write a fact into a component. If it isn't in the content file, it doesn't go on the page. See `docs/HANDOFF.md` for the full guide.

## Design rules (short version)

- **Dark mode only.** No light theme, no toggle.
- **One green:** `#8DC63F`, from the logo. Near-black text on green, never white.
- **Every colour, font and motion value comes from `tokens.css`.** No hex values in components.
- **Motion that starts on its own stops within 5 seconds**, and all motion is off under reduced motion.

The full rules and the avoid list are in `docs/design/`.

## Environment variables

Set these in Vercel's project settings. Never in the repo.

| Name | Used for |
|---|---|
| `QUOTE_TO_EMAIL` | Where quote requests go |
| `EMAIL_API_KEY` | The email-sending service |

## Deploying

Pushes to `main` deploy to production on Vercel. Every pull request gets a preview URL. Old site paths (`/fleet-services`, `/contact`, …) redirect with a 301 through `vercel.json`.

---

**Status:** the design handoff is extracted into `docs/design/` and the toolchain is pinned. The source tree above is the target, not the current state — see `docs/TOOLCHAIN-NOTES.md` before you start.
