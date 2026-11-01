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

## Contact form → Google Apps Script
1. Create a Google Sheet, open **Extensions → Apps Script**, and paste:
```js
const TEAM_EMAIL = 'contact@plutosolve.com';
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([new Date(), d.n, d.e, d.c, d.s, d.m, d.page]);
  MailApp.sendEmail({ to: TEAM_EMAIL, replyTo: d.e, subject: 'New enquiry from ' + d.n,
    body: `Name: ${d.n}\nEmail: ${d.e}\nCompany: ${d.c}\nNeeds: ${d.s}\n\n${d.m}` });
  return ContentService.createTextOutput('ok');
}
```
2. **Deploy → New deployment → Web app**, execute as *Me*, access *Anyone*. Copy the `/exec` URL.
3. Set `VITE_ENQUIRY_ENDPOINT` to it (`.env.local` locally; Vercel → Project Settings → Environment Variables). In `npm run dev` with no endpoint the submit is simulated.

## Deploy (Vercel)
`vercel.json` rewrites all routes to `index.html` and caches hashed assets. SEO/OG tags are set per route; `index.html` and `public/og.png` hold the defaults (site URL assumed `https://plutosolve.com`).
