# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing website for **PlutoSolve**, a "Growth Systems Agency", built from the specs in `data/`. Routes: `/` (narrative homepage), `/what-we-do`, `/industries`, `/approach`, `/about`, `/work`, `/contact`. All prerender as static.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000 (Turbopack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (flat config: next core-web-vitals + typescript)
```

No test runner is configured.

## Stack and config notes

- Next.js 16.4 (App Router), React 19.3, TypeScript, Tailwind CSS v4. Per `AGENTS.md`, check `node_modules/next/dist/docs/` before writing Next.js code; APIs differ from older versions.
- `next.config.ts` turns on `cacheComponents` (Cache Components / PPR, so `use cache` semantics apply), `partialPrefetching`, and `experimental.agentFeedback`. CSS goes through Turbopack's `@tailwindcss/turbopack` loader rather than PostCSS, which is why there is no `postcss.config`.
- Path alias: `@/*` maps to the repo root.
- The root layout types props with the global `LayoutProps<"/">` helper (generated route types; `tsc` alone reports it missing until `next build`/`next dev` has run).
- Motion library: `motion` (`import … from "motion/react"`).

## Architecture

- **`lib/content.ts`** holds all site copy, verbatim from the PDF. Pages and components read from it. Change copy there, not in JSX.
- **Styles:** `app/globals.css` imports `app/styles/tokens.css` (layer base) and `app/styles/bundle.css` + `app/styles/site.css` (layer components), so Tailwind utilities can override them. `tokens.css`/`bundle.css` are copies from `plutosolve-design-system/`; site-specific CSS goes in `site.css`. Tailwind colour utilities are mapped to the tokens (`bg-surface`, `text-ink-muted`, `border-line`, …).
- **Theme:** an inline script in `app/layout.tsx` sets `data-theme` before paint from `localStorage.theme` or the OS. `components/layout/theme-toggle.tsx` flips it with a View Transition wipe.
- **Components:** `components/ui` (server wrappers over the `ps-*` markup), `components/layout` (nav, footer, `Page` wrapper with React `<ViewTransition>` for route transitions), `components/motion/primitives.tsx` (Reveal, Stagger, SplitHeadline, Parallax, CountUp, Magnetic, `useMedia`, `useScenes`, `useReducedMotionSafe`), `components/art` (the artwork and scroll scenes), `components/sections.tsx` (PageHero, FinalCta).
- **Artwork** follows the cover's grammar: a dot grid, square nodes, orthogonal hairline edges, an inverse slab and one signal element. `art/system-field.tsx` is the canvas hero network: edges draw in, pulses travel, the pointer pulls on it, and it pauses off-screen. SVG pieces read colours through `.art-*` classes in `site.css`, so they theme automatically.
- **Pinned scroll scenes** (`idea-scene`, `principle-scene`, `process` → `ProcessScene`) pin at every width when `useScenes()` is true (motion allowed). Otherwise they render a `Still` variant that shows the final state. On phones (`useCompact()`, <900px) the Idea and Principle scenes switch to a `Story` layout: their own compact SVG geometry, one line at a time, and the full text in an `sr-only` block.
- **Phone and touch motion:** the canvases start their entrance when first seen, not on mount. On `(hover: none)` devices a slow "scanner" sweeps the field, and a tap fires pulses down every path. Industry cells take hover focus when they cross the middle of the screen. Flow chains go vertical below 640px, with `flow-pass-v`. The systems panel swipes between tabs, and the homepage steps become a vertical timeline. The sticky container must not have an ancestor with `overflow: hidden`, because that breaks `position: sticky`; use `overflow: clip`.
- **Hydration:** never branch markup on Motion's `useReducedMotion()`. It reads `matchMedia` during hydration and causes React #418. Use `useReducedMotionSafe()`, which is false while hydrating. `MotionProvider` (`MotionConfig reducedMotion="user"`) wraps the app.
- **Work:** `lib/work.ts` holds the 16 projects (facts from each live site and the old plutosolve.com, nothing invented), and `lib/people.ts` the testimonials and team. `app/work/[slug]` is prerendered via `generateStaticParams`; `dynamicParams` isn't allowed with Cache Components, so unknown slugs go to `notFound()`. Screenshots live in `public/work/<slug>/` (`p0..pN` = 1200×750 page shots, `mobile.webp`), and `lib/media.json` holds their sizes for `next/image`. Regenerate `media.json` after adding images. the homepage `WorkBand` is the one warm, `signal-soft` band.
- `app/opengraph-image.tsx` and `app/icon.tsx` draw the cover composition and the signal-node icon. The OG image uses the bundled Liberation Sans fonts in `app/og-fonts/` (OFL).

## Source of truth: `data/`

- `data/PLUTOSOLVE website Content-1.pdf`: the full page copy, in order. Sections are 01 Hero, 02 Trusted By, 03 The PlutoSolve Idea, 04 About, 05 Vision, 06 What We Do (4 capabilities), 07 How We Build (5 steps), 08 What a Growth System Can Look Like, 09 Industries, 10 Selected Clients, 11 Why PlutoSolve, 12 Who We Work With, 13 The PlutoSolve Principle, 14 Final CTA, 15 Footer, then the site navigation and core brand positioning. Read it with `pdftotext -layout`. Use the copy verbatim.
- `data/PLUTOSOLVE-DESIGN-SYSTEM.md`: voice rules, colour/type/spacing/radius tokens (light + dark), and the component specs (SiteNav, SectionHeader, Eyebrow, Button, Statement, FlowChain, CapabilityBlock, ProcessSteps, ClientList). Read it before building any UI.
- `plutosolve-design-system/` (extracted from `data/plutosolve-design-system.zip`): the same doc plus its implementation. `tokens/tokens.css` holds the CSS variables (`--surface`, `--ink`, `--signal`, `--space-*`, …) and type classes; `tokens/tokens.json` has the raw values; `components/bundle.css` has the plain-CSS `ps-*` component classes (load it after tokens.css). Each component folder has a README with the markup it expects and a `preview.html`, and `assets/` has cover SVGs and light/dark screenshots of every component.

## Design constraints that are easy to violate

The design doc has the full rules. These are the ones that conflict with the scaffold or with agency-site defaults:

- **Fonts:** a single `sans` stack (Helvetica Neue → Helvetica → Arial), weights 400/700 only.
- **Theming:** dark mode is `data-theme="dark"` on `<html>`, and every token swaps. Never hard-code hex colours in components; use the tokens.
- **Colour:** monochrome plus one accent, `signal`, used on one thing per view. No gradients, no shadows, radius 4px at most. At most one `surface-inverse` band per page.
- **Imagery:** abstract nodes/flows/systems only. No stock photos, no icon set, no emoji. No logo exists, so the wordmark is "PlutoSolve" set in type.
- **Copy:** brand positioning lines are used verbatim; British spelling; CTAs are title case + `→`; numbered items use `01 — TITLE`; never "best/leading/innovative/world-class".
- **Motion (deliberate override):** the owner chose rich motion over the design system's "subtle only" rule. Pinned scroll scenes, parallax, ambient loops and canvas art are allowed. Everything else in the design system still applies, and `prefers-reduced-motion` must still remove all movement and show final states.
- **Wordmark (deliberate override):** "Pluto" is ink and "Solve" is `signal`, via `components/ui/wordmark.tsx` and `.wordmark-accent`. Use it for every wordmark (nav, footer, giant footer mark, OG image), but not for "PlutoSolve" in running copy.
- **Not in the copy yet:** there are no case studies (so `/work` shows clients, systems and industries) and no real LinkedIn/Instagram URLs (`footer` in `lib/content.ts` points at the sites' home pages). Don't invent either.
