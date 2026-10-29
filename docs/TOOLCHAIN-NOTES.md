# Toolchain notes

Prep findings for the crew. Everything here was verified by running it on this
machine (WSL2, Node 24.18, pnpm 10.34.6) — none of it is from memory.

`package.json` carries pinned dependencies and no `scripts`. The script names are
fixed by the brief's section 7 and belong to whoever writes the source they call.

---

## 1. One dependency pairing does not work

`@vitejs/plugin-react@6` imports `vite/internal`, which only exists in Vite 8.
With Vite 7 the build dies before reading the config:

```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './internal' is not
defined by "exports" in .../vite/package.json
```

`@vitejs/plugin-react@5.2.0` declares `vite: ^4.2 || ^5 || ^6 || ^7 || ^8`, so it
spans both. That is what is pinned.

Also pinned deliberately against the newest published versions:

| Package | Pinned | Latest | Why |
|---|---|---|---|
| `react-router` | `^7.18.5` | 8.5.1 | The brief's section 2 says v7 |
| `vite` | `^7.3.7` | 8.3.5 | Keeps plugin-react 5.2 and vitest 3 in range |
| `vitest` | `^3.2.7` | 5.0.5 | vitest 5 wants Vite 6.4+ and pulls the stack forward |
| `typescript` | `^5.9.3` | 7.0.2 | TS 7 is the native port; not for a client deadline |

## 2. `pnpm test -- <pattern>` does not filter

The brief's CK4 to CK15 all look like `pnpm test -- content.services`. pnpm
forwards the bare `--`, giving `vitest run -- content.services`, and **vitest
ignores the pattern and runs the whole suite**. The check reports green having
tested something else entirely.

```
vitest run content.services      ->  1 file,  6 tests   (correct)
vitest run -- content.services   ->  8 files, 82 tests  (silently wrong)
```

Whoever writes the `test` script must strip the separator, e.g. a two-line
wrapper that filters `--` out of `process.argv` before spawning vitest. Verify it
by checking the file count drops, not just that it passes.

## 3. Lighthouse leaks directories into the repo under WSL

`chrome-launcher` calls `isWsl`, takes its Windows temp-dir branch, and hands a
Windows-format path to a POSIX `mkdtemp`. Linux reads it as a relative path, so
every Chrome launch creates a directory literally named
`C:\Users\<you>\AppData\Local\lighthouse.XXXXXX` in the working directory — six
per `lhci autorun`. Thirty of them reached 110 MB here before I noticed.

The WSL branch overwrites `process.env.TEMP` itself, so exporting `TEMP` or
`TMPDIR` first does **not** prevent it. Either sweep them after the run or
gitignore them; `.gitignore` already covers `C:*` and `lighthouse.*`.

## 4. Browser checks need a browser

```bash
npx playwright install chromium
export CHROME_PATH=~/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome
```

There is no system Chrome on this machine. Lighthouse needs `CHROME_PATH`; axe
via `@axe-core/playwright` needs `browser.newContext()` and throws
`Please use browser.newContext()` if given `browser.newPage()`.

Per the brief's section 7, CK3, CK12, CK13 and CK14 need Chromium in the Docker
check image. Until it is there the run can only reach `pass`, never `verified`.

## 5. `tsc --noEmit` on a solution-style tsconfig checks nothing

A root `tsconfig.json` of `{"files": [], "references": [...]}` makes
`tsc --noEmit` exit 0 without reading a single source file. It hid two real
`exactOptionalPropertyTypes` errors here. Use `tsc -b`, and prove it works by
planting a type error and watching it fail.

## 6. Pre-rendered routes need the right serving mode

Vite's default SPA fallback rewrites every extensionless path to `/index.html`.
With a route pre-rendered to `dist/cowboys-radiator/index.html`, requesting
`/cowboys-radiator` serves **the home page's HTML** instead, and the client then
renders the right route — so it looks fine in a browser while the pre-render is
being thrown away, and the `<title>` stays wrong.

`appType: 'mpa'` fixes the fallback but only answers the trailing-slash form
(`/cowboys-radiator/` works, `/cowboys-radiator` 404s), and it makes Vite glob
every `.html` in the repo as a build entry — including the 1.1 MB
`docs/design/handoff.html`. Pin `build.rollupOptions.input` to `index.html`.

Vercel resolves the extensionless form itself with `cleanUrls: true`. For local
parity, a small preview middleware that tries `<path>/index.html` then `404.html`
is enough. Worth a golden scenario, because a browser will not show you the bug.

## 7. The handoff bundle was missing two files

`docs/design/prototype/gts-page.dc.html` references three files. The bundle
shipped one. `gts-tokens.css` is reconstructed from Fantem's `tokens.css`;
`image-slot.js` is reconstructed to the blank rule (dashed outline plus the
needed-photo label) and is marked as such in its header comment. Neither is
authoritative — `src/design/tokens.css` is.

---

## Reported, not fixed: `app.css` has no base layer

**`src/design/app.css` is Fantem's file, so this is a report, not a change.**

`app.css` defines `@theme inline` and the shadcn bridge but never paints the
page. Nothing sets `background` or `color` on `html` or `body`. The handoff's
prototype painted its background on a wrapper `div`; a real page has no such
wrapper, so the dark text tokens land on the browser's white canvas.

Verified: axe reported `color-contrast` failures on `h1 > span` and the hero
subhead on both pages at both widths — near-white `--text` (`#F5F6F3`) on white.
Four serious violations, gone once `body` carried `background: var(--bg)`.

A `@layer base` block setting `html`/`body` background, colour and base font
clears it. Fantem's call how.

Two smaller ones in the same area, also unfixed:

- **Targets under 44 px** (AC20). A `size="sm"` button is `h-9` (36 px) and a
  bare inline phone link measures ~25 px. Both need ≥44 px; call buttons are
  specified at 56 px.
- **`:focus-visible` and programmatic focus.** `tokens.css` sets a 2 px outline
  on `:focus-visible`, which a Playwright `.focus()` call does not reliably
  trigger. Test AC20 by pressing Tab, not by calling `.focus()`.
