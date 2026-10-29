# Canon brief: GTS Diesel landing page

*2026-10-28 · Mission type `landing-page` · Client: GTS Diesel Truck & Trailer Repair (Matt and Dom Enterprises LLC) · Contact: Mathew D'Ottavio, Operations Manager*

**How to use this file.** Upload it to the intake as a source file, so every requirement and criterion can cite a passage of it. Canon drafts the **summary, requirements and acceptance criteria** (sections 3–4). The **modules and checks** (sections 6–7) are for the mission plan, which adds them after approval. Ids follow the server's format: `R1`, `AC1`, `M1`, `CK1`.

---

## 1. Summary

Build a one-page, pre-rendered landing site for GTS Diesel Truck & Trailer Repair, 530 Roswell St NE, Marietta, GA 30060. Phone (770) 771-3468. Open 24 hours, 7 days. Its one goal is that a truck driver or fleet manager sees what GTS fixes and calls. A short quote form is the secondary action. The site lives at gts-diesel.com, hosted on Vercel. A short sister page for Cowboys Radiator lives at `/cowboys-radiator`. His old Duda site is offline.

Every claim on the page comes from his old site or from Mathew. Anything we don't know yet ships as a labelled blank, never a guess. Placeholder images are allowed until Mathew sends real photos, and each is marked as a blank.

## 2. Decisions already made

| Decision | Value |
|---|---|
| Stack | Vite, React, TypeScript (strict), Tailwind CSS v4, shadcn/ui, React Router v7 with pre-rendering |
| Hosting | Vercel, domain gts-diesel.com (transfer in progress, handled by the operator) |
| Actions | Tap-to-call is primary everywhere; a quote form is secondary |
| Pages | `/` for GTS Diesel; `/cowboys-radiator` for the sister business |
| Design direction | "Night Shift Industrial": near-black, the logo green `#8DC63F`, white; condensed Archivo display type; **dark mode only** |
| Design system | Approved handoff in `docs/design/`: `tokens.css` (the single source of colour, type, shape and motion), `app.css` (Tailwind v4 and the shadcn bridge), `design-spec.json` (component contracts), and `GTS_Handoff.dc.html` |
| Images | Labelled placeholders until real photos arrive |
| Search | Everything we control inside the site; his Google Business Profile comes later |
| Check runner | Chromium is added to the Docker check image, so browser checks (Lighthouse, axe, golden scenarios) can run |

## 3. Requirements

| Id | Requirement |
|---|---|
| R1 | A single landing page at `/`, pre-rendered to complete HTML at build time, with 13 sections in this order: header, hero, emergency band, services, how it works, fleet services, why GTS, reviews, service area, FAQ, final call band with quote form, footer, and a phone-only sticky call bar. |
| R2 | Tap-to-call is available everywhere it matters: header, hero, emergency band, every service card, fleet section, final band, and a sticky call bar on phones. |
| R3 | The services section shows five cards, emergency first: 24/7 emergency roadside repair, computer diagnostics, general truck repair, trailer repair, and fleet services, each with 3–4 specifics taken from his old site. |
| R4 | All page copy lives in one content file, and every claim records its source: `his-site`, `mathew` or `blank`. Blanks render as labelled placeholders and are listed at build time. |
| R5 | The site uses the approved dark-only design system in `docs/design/` (Night Shift Industrial) and meets the contrast and motion rules in section 5. |
| R6 | A quote form (name, phone, what's going on, optional fleet toggle) that sends to Mathew through a Vercel serverless function, with spam protection and clear sent and error states. |
| R7 | In-site search optimisation: title and meta description, one H1, `AutoRepair` structured data with 24/7 hours, sitemap, robots file, canonical address, Open Graph tags. |
| R8 | Permanent (301) redirects from the old Duda paths to their new places on the page. |
| R9 | The site meets WCAG 2.2 AA. |
| R10 | The site meets Core Web Vitals budgets on a mid-range phone. |
| R11 | A shorter Cowboys Radiator page at `/cowboys-radiator`, using the same components with its own theme, linked from the GTS footer. |
| R12 | Each tap on a call link and each form submission is counted in analytics. |
| R13 | A handoff for Mathew: how to edit content, and the list of open blanks. |

## 4. Acceptance criteria

| Id | Req | Criterion |
|---|---|---|
| AC1 | R1 | The built HTML for `/` contains the H1 text, the phone number and the address before any JavaScript runs. |
| AC2 | R1 | The 13 sections appear in the order listed in R1. |
| AC3 | R2 | Every call link is `tel:+17707713468` and shows the number as text. |
| AC4 | R2 | On a 360 × 640 phone screen, a call button is visible without scrolling. |
| AC5 | R2 | The sticky call bar appears after the hero call button scrolls out of view, hides when the final call band is on screen, never shows on desktop, and never covers content or a focused field. |
| AC6 | R3 | The five service cards appear in the order in R3, and every listed specific matches his old site's wording (see section 8). |
| AC7 | R4 | A test fails if any claim in the content file has no source. |
| AC8 | R4 | The phone number, address and hours come from one place and are identical in the page, the structured data and the footer. |
| AC9 | R4 | The build prints the list of open blanks. |
| AC10 | R5 | Every colour, font, radius and motion value comes from `tokens.css`; components hold no raw hex values. The site is dark only, with no theme toggle. |
| AC11 | R5 | Text contrast is at least 4.5:1 (3:1 for large text), and button edges and focus rings at least 3:1. Any motion that starts by itself ends within 5 seconds of load. |
| AC12 | R5 | The page uses none of the looks in the avoid list (section 5). |
| AC13 | R6 | The form function rejects a request with the spam-trap field filled, accepts a valid request, and its email arrives in a test inbox. |
| AC14 | R6 | The sent and error states both show the phone number. |
| AC15 | R6 | No API key or secret appears in the repository; keys live in Vercel environment settings. |
| AC16 | R7 | The structured data parses and validates as `AutoRepair` with `name`, `address`, `telephone`, `url` and seven days of 00:00–23:59 hours, and contains no ratings or reviews. |
| AC17 | R7 | `sitemap.xml` lists `/` and `/cowboys-radiator`; `robots.txt` points to it; each page has one canonical tag on `https://gts-diesel.com`. |
| AC18 | R8 | Each old path (`/computer-diagnostics`, `/emergency-roadside-repair`, `/general-truck-repair`, `/trailer-repair`, `/fleet-services`, `/service-area`, `/referral`, `/contact`) answers with a 301 to its new section. |
| AC19 | R9 | axe finds no serious or critical issues on either page. |
| AC20 | R9 | Every control works by keyboard with a visible focus outline; targets are at least 44 px. |
| AC21 | R10 | Lighthouse on mobile scores 95 or higher for Performance, Accessibility, Best Practices and SEO, with LCP ≤ 2.5 s, CLS ≤ 0.1, and total blocking time within budget. |
| AC22 | R11 | `/cowboys-radiator` is pre-rendered, uses the shared components with its own theme tokens, and its unknown facts render as blanks. |
| AC23 | R12 | A test confirms a call-tap event and a form-submit event fire. |
| AC24 | R13 | `docs/HANDOFF.md` and `docs/OPEN-BLANKS.md` exist and match the build's blank list. |

## 5. Design rules (from the approved handoff in `docs/design/`)

`tokens.css` is the single source of truth. The values below are a summary; if they ever differ, the file wins.

- **Dark mode only.** No light theme and no theme toggle.
- **Colour tokens:**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0D0C` | Page background |
| `--b-ink` | `#050606` | Deepest ground: footer |
| `--surface` | `#16191A` | Cards, alternating bands |
| `--surface-2` | `#22272A` | Raised elements, inputs |
| `--border` | `#2C3235` | 1px borders, rules |
| `--text` | `#F5F6F3` | Headlines, body |
| `--text-muted` | `#D4D4D4` | Secondary text, ghost edges |
| `--accent` | `#8DC63F` | The logo green: fills, numerals, rules, focus |
| `--primary-hover` | `#9FD455` | Call button hover |
| `--accent-ink` | `#0B0D0C` | Text and icons on green |

- **Contrast:** green `#8DC63F` on near-black is 9.55:1; near-black text on green is the same. Never white text on green (about 1.9:1). Green is a fill, a numeral, a rule or the focus ring, at most about 10% of any screen.
- **Type:** Archivo variable (condensed display at 800–900 weight, uppercase; normal width for body at 16 px or more). JetBrains Mono for labels, specs, hours and the phone numeral only. Self-host both with Fontsource.
- **Motion:** transform and opacity only, interactions 250 ms or less. Self-starting motion ends within 5 seconds of load (WCAG 2.2.2): the live dot pulses twice, the hero call-button ring and eyebrow sweep run once. All motion off under reduced motion.
- **Hazard stripe:** exactly twice, at the top of the emergency band and the final call band.
- **Avoid list:** purple or blue gradients, glassmorphism, gradient text, an untouched shadcn neutral theme, three identical rounded cards under a centred hero, a beige serif hero, 3D or particle backgrounds, video heroes, carousels, scroll-jacking, fake logo marquees, count-up numbers, low-contrast grey text.
- **Assets:** `brand-assets/` (colour logo, white logo on near-black, `BRAND-COLORS.md`). Ask for a vector logo.

## 6. Modules (for the plan)

| Id | Module | Agent (Name · territory) | Requirements | Reads |
|---|---|---|---|---|
| M1 | Design system | **Fantem · gts-design** (`src/design/`, `src/components/ui/`) | R5, R9 | `docs/design/**`, `brand-assets/**`, this brief |
| M2 | Page and content | **Leon · gts-sections** (`src/sections/`, `src/content/`, `src/routes/`, `public/`, `vercel.json`) | R1, R2, R3, R4, R7, R8, R10, R11, R12 | `src/design/**`, `src/components/ui/**`, this brief |
| M3 | Quote form function | **Dunn · gts-api** (`api/`) | R6 | `src/content/**`, this brief |
| M4 | Handoff | **Leon · gts-sections** (`docs/`) | R13 | `src/content/**` |

**Order:** M1, then M2 and M3 (separate folders, so they may run side by side), then M4.

**The rest of the crew:**
- **Nemi · gts-tests** writes the tests in `tests/` from this brief, never from the code.
- **Fenn · gts-fixtures** writes browser scenarios in `fixtures/golden/`.
- **Judges** (findings only):
  - **Brennan:** does the build match this brief and the mission map? Brennan also carries the **design-and-brand role skill**: the handoff in `docs/design/`, section 5's rules and the avoid list.
  - **Zane:** the form, secrets, and the privacy note under the form.
- **Not judges:** accessibility (axe) and performance (Lighthouse) are code checks in the check runner.

## 7. Checks (for the plan)

| Id | Req | Kind | Command or path |
|---|---|---|---|
| CK1 | R1 | typecheck | `pnpm typecheck` |
| CK2 | R1 | command | `pnpm build && node scripts/check-prerender.mjs` |
| CK3 | R2 | test | `pnpm test:e2e --grep @call` |
| CK4 | R3 | test | `pnpm test -- content.services` |
| CK5 | R4 | test | `pnpm test -- content.sources` |
| CK6 | R5 | test | `pnpm test -- tokens.contrast` |
| CK7 | R6 | test | `pnpm test -- api.quote` |
| CK8 | R7 | test | `pnpm test -- seo` |
| CK9 | R7 | file_exists | `public/robots.txt` |
| CK10 | R8 | file_exists | `vercel.json` |
| CK11 | R8 | test | `pnpm test -- redirects` |
| CK12 | R9 | command | `pnpm a11y` (axe in Chromium, both pages) |
| CK13 | R10 | command | `pnpm lhci` (Lighthouse CI, mobile) |
| CK14 | R11 | test | `pnpm test:e2e --grep @cowboys` |
| CK15 | R12 | test | `pnpm test -- analytics` |
| CK16 | R13 | file_exists | `docs/HANDOFF.md` |
| CK17 | R13 | file_exists | `docs/OPEN-BLANKS.md` |

CK3, CK12, CK13 and CK14 need Chromium in the check image. Until it's there, they show as not checked and the run can only reach `pass`, not `verified`.

## 8. Content source: his old site (copy exactly)

- **Hero line (old site):** "Your stop for diesel truck repairs in Marietta, GA." **Proposed H1:** "Broken down? We roll to you." (Alternative: "Diesel truck & trailer repair. Day or night.")
- **Emergency roadside:** "Big jobs roadside, no problem. We'll do a clutch on the side of the road." Engines, brakes, transmissions, suspension, trailer repairs, refrigerated trailer engines, drive shafts, electrical, heating and AC. "Even if you're 100 miles away from us."
- **Computer diagnostics:** factory (OEM) software for all brands. Advanced computer diagnostics, forced regeneration, reduced-power diagnostics, advanced electrical troubleshooting.
- **General truck repair:** shop pricing is lower than roadside. Engines, brakes, transmissions, suspension, drive shafts, electrical, heating and AC.
- **Trailer repair:** brakes and air systems, air lines and hoses, suspension, refrigerated trailers and air chutes, trailer legs, bumpers and bushings, interior repairs, trailer electrical, roadside trailer repair.
- **Fleet services:** tailored contracts, special pricing, 24/7 support; vans, semi-trucks and trailers, buses, tow trucks, box trucks.
- **How it works:** a free phone consultation; "If we can't fix it on the spot, we'll bring your vehicle to our shop."
- **Who he serves (old site):** personal and commercial drivers, "from the latest models to classic cars and heavy machinery to tractor-trailers".
- **Why GTS (to confirm):** 30+ years combined experience; 24/7 emergency roadside; $200 referral discounts; free phone consultations.

## 9. Blanks (render as labelled placeholders)

1. Real photos: trucks, shop, service truck, crew
2. Vector logo
3. Towns and highways served
4. "DPS system repairs" on his old site: probably DPF (diesel particulate filter); use DPF only once he confirms
5. The 573-855-0518 WhatsApp link on his old site: current, or remove
6. Commercial trucks only, or personal vehicles too
7. Confirmation of the four "Why GTS" facts
8. Payment methods and fleet billing
9. The email the quote form sends to: **to confirm**. The old site's structured data lists dottavioenterprises@yahoo.com
10. Cowboys Radiator: services, address, phone, hours, logo and colours, shared location or not
11. Reviews: his Google Business Profile exists ("GTS DIESEL TRUCK AND TRAILER REPAIR 24/7", map location 33.9503957, -84.5367057, linked from the old site). It needs manager access from Mathew before reviews can be used

**Facts found in the old site's structured data:** coordinates 33.95014, -84.53668 (use for `geo`); the email above; open 00:00–24:00 every day. The old site typed the business as `AutoBodyShop` (collision repair), which is wrong; use `AutoRepair`. Its social links were placeholders, so there are no social profiles to list.

## 10. Outside the agents' scope (operator tasks)

- **Client consent:** Mathew's written OK to build and run this with AI agents (required before mission start).
- **Domain transfer:** the domain transfer to Vercel, in Matt and Dom Enterprises LLC's name. Check first whether anyone uses an @gts-diesel.com email, and if so, copy the MX records.
- **Search tools:** point gts-diesel.com at the Vercel project, then verify it in Google Search Console and Bing Webmaster Tools and submit the sitemap.
- **Check image:** add Chromium to the Docker check image.
- **Brennan's role skill:** attach the design-and-brand role skill to Brennan, then regenerate his identity.
- **Final review:** the design lead reviews screenshots at phone, tablet and desktop widths before you approve delivery.

## 11. Playbook and gate policy (`landing-page`)

| Gate | Policy | Fed by |
|---|---|---|
| acceptance | mandatory | The checks in section 7, run by the Docker check runner |
| qa | mandatory | Spec check, test-file checkpoint, protected paths, judge coverage, open judge findings |
| security | mandatory | Secret scan and dependency check |
| alignment, phase1-close, rollback | not listed | Nothing feeds them for this mission type |

**Deliverable:** a pull request to the new site repo.
**Required fields:** the brief, the repo URL, and the client's consent.
**Blanks:** they don't block delivery. They appear on the receipt as open blanks and go to Mathew as a list.
