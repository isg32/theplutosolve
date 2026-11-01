# PlutoSolve website

React 19 + TypeScript + Vite, routed with `react-router`, animated with GSAP + ScrollTrigger.
Design and copy are ported from `old/PlutoSolve Website.html`; all assets (Inter font, logo) are self-hosted.

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview
```

## Structure
- `src/data/content.ts`: all copy (services, clients, industries, projects, people)
- `src/pages/`: Home, WhatWeDo, OurWork, About, Contact, NotFound
- `src/components/`: Header, Footer, Page (SEO + page motion), HeroVisual, shared UI
- `src/hooks/usePageMotion.ts`: motion driven by data attributes (`data-hero-item`, `data-reveal`, `data-stagger`, `data-rule-draw`, `data-drift`). Respects `prefers-reduced-motion`.
- `src/styles/site.css`: tokens and styles

## Forms → Google Apps Script
Both forms (Contact, and "Request the Complete Portfolio" on Our Work) post to one Apps Script web app.
The full script, including the visitor confirmation email, the internal notification and the CRM/lead-sheet
columns from the Our Work copy document, is in `apps-script/Code.gs`.

1. Create a Google Sheet, open **Extensions → Apps Script** and paste `apps-script/Code.gs` (set `TEAM_EMAIL`).
2. **Deploy → New deployment → Web app**, execute as *Me*, access *Anyone*. Copy the `/exec` URL.
3. Set `VITE_ENQUIRY_ENDPOINT` to it (`.env.local` locally; Vercel → Settings → Environment Variables).
   In `npm run dev` with no endpoint, submissions are simulated.

Form analytics events (`portfolio_form_view`, `portfolio_form_start`, `portfolio_form_success`) are pushed to
`window.dataLayer` if a tag manager is loaded; nothing is tracked otherwise (`src/lib/analytics.ts`).

## Our Work page content
All copy lives in `src/data/ourWork.ts` (taken from *PlutoSolve_Our_Work_Page_Complete_Copy.docx*). Counts shown on the page
come from `src/data/content.ts`; confirm them against the publishing checklist in that document before launch.

## Deploy (Vercel)
`vercel.json` rewrites all routes to `index.html` and caches hashed assets. SEO/OG tags are set per route; `index.html` and `public/og.png` hold the defaults (site URL assumed `https://plutosolve.com`).
