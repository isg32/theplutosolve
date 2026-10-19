# PlutoSolve — Design System

*Growth Systems. Built to Perform.*

![PlutoSolve cover](assets/cover-light.svg)

PlutoSolve is a **Growth Systems Agency**. Build every page so it reads like a modern technology and strategy company, not a conventional marketing agency: **Premium. Minimal. Technical. Intelligent. Confident.** The visitor should come away thinking *"These people understand how businesses work, not just how to run ads."*

## Positioning to use verbatim

Use these lines exactly as written and in the same way wherever they appear. Don't paraphrase them.

| Use | Line |
| --- | --- |
| Primary positioning | PlutoSolve is a Growth Systems Agency. |
| Primary tagline | We Build Systems That Drive Growth. |
| Supporting statement | We combine strategy, technology, marketing and execution to build systems that generate leads, enable teams and drive revenue. |
| Short descriptor (eyebrow) | Strategy × Technology × Marketing × Execution |
| Brand philosophy | Growth isn't a service. It's a system. |
| Brand promise | We don't just deliver services. We build systems around outcomes. |
| Social / footer | Growth Systems. Built to Perform. |

Write the name as **PlutoSolve**: one word with a capital P and a capital S. Use all caps (PLUTOSOLVE) only where the whole line is uppercase, such as an eyebrow or a `heading-3`.

## Voice and content

- **Short declarative sentences, one idea per line.** The copy builds an argument in stacked lines: *"A website may not convert. Leads may not be followed up properly. Marketing may operate separately from sales."* Then a bold line lands the point: **"They're connected."** Keep that rhythm. Several plain `body` lines lead to one `body-strong` line.
- **Contrast pairs.** *"Strategy that gets built. Technology that gets used. Marketing that gets measured."* / *"Traffic is not growth. The system that turns attention into customers is."*
- **Write about outcomes, not outputs.** *"A website is an output… The goal is what they create: More qualified leads. More customers."*
- **Speak as "we" to "you".** *"Tell us what you're trying to build, improve or scale."* Use British spelling: organisation, specialise, colour.
- **Write chains with →.** For processes and systems: *Business → Customer → Problem → Opportunity.* Render them with the FlowChain component, not as plain text, when they are the focus.
- **Number things with "01 —".** Capabilities, steps and reasons use a two-digit index, an em dash and an uppercase title: *01 — GROWTH STRATEGY.*
- **Calls to action** are an imperative phrase in title case plus →: *Build Your Growth System →*, *Explore Our Work →*, *Start a Conversation →*, *See What We've Built →*.
- **Never** call PlutoSolve "the best", "leading", "innovative" or "world-class". Never use "360° Solutions", "We are passionate about…", buzzwords without substance, long lists of generic services, or emoji. Let the positioning and the work make the case.

## Visual foundations

### Colour

Work in monochrome with one accent. Give the page `surface`, set text in `ink`, and use `ink-muted` for supporting copy, leads, eyebrows and nav. Use `ink-subtle` for index numerals and metadata. Divide sections with `line` hairlines. Draw control borders and flow connectors in `line-strong`.

`signal` is the only accent. Spend it sparingly, on one thing per view: the primary button's hover state, the focus ring, the outcome node at the end of a flow, or one highlighted figure. Put text on a `signal` fill in `on-signal`, never in literal white. Behind signal text, use `signal-soft`. Don't add other hues. The brief asks for no gradients and no extra colours.

Allow one `surface-inverse` band per page, for the Principle section (*"Don't buy another service. Build something that works."*) or the final CTA, with text in `ink-inverse`. Signal can mark a node or rule inside it but is never used as text on it.

Both themes are complete. `light` is primary, and `dark` swaps every token, so no component needs theme-specific code.

### Type

Use one family, `sans` (Helvetica Neue → Helvetica → Arial), at two weights: 400 and 700. Hierarchy comes from size and weight, not colour.

- `display` is used once per page, for the hero headline. Below 720px wide it steps down to `heading-1`.
- `heading-1` is the section headline after each eyebrow. `heading-2` is for closing statements and sub-headlines.
- `heading-3` is uppercase, for numbered titles (01 — GROWTH STRATEGY, EDUCATION & EDTECH).
- `lead` is the first paragraph under a headline, in `ink-muted`, no wider than `text-max`.
- `body` is running copy, and `body-strong` is for punchlines and flow chains.
- `eyebrow` is uppercase, tracked 0.12em, in `ink-muted`, `space-3` above the headline.
- Set headlines with tight negative tracking as specified. Never centre long copy, and left-align everything except a single short closing statement.

### Space and layout

Be generous with whitespace. Pad sections by `space-32` vertically on desktop, `space-24` on tablet and `space-16` on mobile. Contain content in `content-max` with `space-12` gutters, or `space-4` on phones. Every section follows the same sequence: eyebrow → headline → lead → content → closing statement. Separate major sections with a full-width `line` hairline or with whitespace alone.

### Borders, radii, shadows

Use hairlines, not shadows: there is no shadow token, and none should be added. Corners are near-square: `radius-sm` (2px) for buttons and nodes, `radius-md` (4px) at most for panels, and `radius-0` for bands.

### Imagery

Communicate **Systems → Data → Connections → Infrastructure → Growth** through abstract, system-like visuals: nodes, flows, dashboards, data, interfaces, funnels and connected systems. Draw them in `line-strong` hairlines and `ink` nodes, with at most one `signal` node. **Never use** stock photos of people in meetings, handshakes, generic laptops, excessive gradients or cheap-looking service cards. For client logos, use the restrained monochrome treatment in ClientList, never oversized colourful logos.

### Motion

Motion should feel sophisticated and stay subtle. Fade and rise 8–12px over 200–300ms with ease-out. On hover, a button's arrow moves 3px to the right, and a flow edge can draw left-to-right once on scroll. Nothing loops, bounces or parallaxes. Respect `prefers-reduced-motion` by removing all movement.

### States

- **Hover:** the primary button goes from `ink` to `signal`. The secondary border goes from `line-strong` to `ink`. Links go from `ink` to `signal`.
- **Focus:** a solid 2px `focus-ring` outline offset 2px on every interactive element. Use `ink-inverse` on `surface-inverse`.
- **Disabled:** `surface-sunken` fill with `ink-subtle` text, no hover.

## Logo

PlutoSolve has no logo yet. Until one exists, set the name **PlutoSolve** as a wordmark in `sans` 700 with -0.02em tracking, in `ink`. Don't draw or invent a mark.

## Iconography

There is no icon set. Use typographic glyphs from the copy itself: → for CTAs and chains, × in the descriptor, ↓ between process steps, — in numbered titles and · in footer lists. Draw diagrams from nodes and lines as described under Imagery. No emoji.

## Components

These are plain-CSS classes in `components/bundle.css`, prefixed `ps-`, and every value comes from the tokens. Each component's README says what markup to provide.

- **Button**: primary, secondary and link CTAs with an arrow.
- **Eyebrow**: an uppercase section kicker, with an optional × separator.
- **SectionHeader**: eyebrow, headline and lead, the opening of every section.
- **Statement**: the bold closing lines at the end of a section.
- **FlowChain**: a → chain drawn as connected nodes.
- **CapabilityBlock**: a numbered capability with a sub-headline, description and list.
- **ProcessSteps**: the five-step "How we build" sequence.
- **ClientList**: client names in a monochrome strip.
- **SiteNav**: the wordmark, six links and the CTA.


---

# Tokens

CSS variables live in `tokens/tokens.css`; raw values in `tokens/tokens.json`. Set `data-theme="dark"` on `<html>` for the dark theme.

## Colour

| Token | Light | Dark | Usage |
|---|---|---|---|
| `surface` | `#f6f6f4` | `#0c0c0d` | Page background. Most of every page is this colour: whitespace is the brand. |
| `surface-raised` | `#ffffff` | `#161618` | Panels, flow nodes and capability blocks that sit on surface. |
| `surface-sunken` | `#ededea` | `#1f1f22` | Recessed bands, such as the client-list strip or a code/data well. |
| `surface-inverse` | `#0c0c0d` | `#f2f2ef` | The one high-contrast band per page (the Principle section, the final CTA). Text on it is ink-inverse. |
| `line` | `#e1e1dd` | `#2a2a2e` | Hairline section dividers and list rules. Decorative only: never the only edge of a control. |
| `line-strong` | `#86868a` | `#6a6a70` | Control borders, flow-node outlines and connectors; 3:1+ on surface and surface-raised in both themes. |
| `ink` | `#0c0c0d` | `#f2f2ef` | Headings, body copy and the primary button fill. Reads on surface, surface-raised and surface-sunken in both themes (14:1+). |
| `ink-muted` | `#57575b` | `#a6a6ab` | Supporting copy, leads, eyebrows, nav links. On surface, surface-raised and surface-sunken (6:1+ in both themes). |
| `ink-subtle` | `#6b6b70` | `#8d8d93` | Index numerals (01, 02), metadata, disabled text. On surface, surface-raised and surface-sunken (4.5:1+ in both themes); never smaller than 12px. |
| `ink-inverse` | `#f6f6f4` | `#0c0c0d` | Text on surface-inverse and on the ink-filled primary button. |
| `signal` | `#b8370b` | `#ff6a3d` | The single accent. Hover/active state of the primary button, focus ring, the outcome node of a flow, one highlighted figure per view. As text: on surface, surface-raised, surface-sunken or signal-soft (4.9:1+ in both themes); never as text on surface-inverse. |
| `signal-soft` | `#fbe9e1` | `#2e140b` | Tinted fill behind signal text, the outcome node in a FlowChain. |
| `on-signal` | `#ffffff` | `#0c0c0d` | Text and arrows on a signal fill (5.8:1 light, 6.9:1 dark). |
| `focus-ring` | `#b8370b` | `#ff6a3d` | Keyboard focus: a solid 2px ring offset 2px from the control, 3:1+ on every surface except surface-inverse, where ink-inverse is used instead. |

## Typography

Family `sans`: `"Helvetica Neue", Helvetica, Arial, sans-serif`

| Style | Size / line | Weight | Tracking | Usage |
|---|---|---|---|---|
| `display` | 72px / 76px | 700 | -0.03em | Hero headline only, once per page. Drops to heading-1 below 720px wide. |
| `heading-1` | 48px / 54px | 700 | -0.02em | Section headlines (the line after each eyebrow). |
| `heading-2` | 32px / 40px | 700 | -0.015em | Closing statements and sub-headlines inside a section. |
| `heading-3` | 20px / 26px | 700 | 0.01em | Numbered capability, step, industry and audience titles; set in uppercase. |
| `lead` | 20px / 30px | 400 | 0 | The first paragraph under a section headline, in ink-muted, max 640px wide. |
| `body` | 16px / 26px | 400 | 0 | All running copy. Bold (700) for the one line in a paragraph group that carries the point. |
| `body-strong` | 16px / 26px | 700 | 0 | Punchlines and flow chains (Business → Customer → Problem → Opportunity). |
| `small` | 14px / 22px | 400 | 0 | Capability lists, footer links, captions. |
| `label` | 15px / 20px | 700 | 0 | Buttons and text links. |
| `eyebrow` | 12px / 16px | 700 | 0.12em | Section eyebrows, always uppercase, in ink-muted. |

## Spacing

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon-to-label nudges, arrow gap fine-tuning. |
| `space-2` | 8px | Flow-node inner vertical padding, tight stacks. |
| `space-3` | 12px | Gap between eyebrow and headline; flow-node horizontal padding. |
| `space-4` | 16px | Paragraph spacing, list item spacing, mobile page gutter. |
| `space-6` | 24px | Button horizontal padding, connector length, card padding. |
| `space-8` | 32px | Gap between headline block and content; grid gutters. |
| `space-12` | 48px | Gap between capability blocks; desktop page gutter. |
| `space-16` | 64px | Inner section rhythm on mobile. |
| `space-24` | 96px | Vertical padding of a section on tablet. |
| `space-32` | 128px | Vertical padding of a section on desktop. Be generous: the brief asks for plenty of whitespace. |

## Radius

| Token | Value | Usage |
|---|---|---|
| `radius-0` | 0px | Section bands, rules, the inverse band. |
| `radius-sm` | 2px | Buttons, flow nodes, inputs: nearly square, precise. |
| `radius-md` | 4px | Panels and capability blocks when raised. Nothing rounder than this. |

## Sizes

| Token | Value | Usage |
|---|---|---|
| `content-max` | 1200px | Max width of page content. |
| `text-max` | 640px | Max measure for leads and body paragraphs. |
| `control-height` | 48px | Button height; 40px in SiteNav. |

---

# Component guidelines

All components are plain CSS in `components/bundle.css` (load after `tokens/tokens.css`). Each folder has a `preview.html` you can open in a browser.

## SiteNav

SiteNav is the top bar, with the PlutoSolve wordmark, six links and the primary CTA.

**Provide:** a `<nav class="ps-nav">` with an `<a class="ps-wordmark">PlutoSolve</a>`, a `<ul>` of links (set `aria-current="page"` on the current one) and an `<a class="ps-btn ps-btn--primary ps-btn--sm">`.

- The links, in order, are What We Do, Industries, Our Approach, Our Work, About and Contact. The CTA is *Build Your Growth System →*.
- The wordmark is type only until a logo exists.
- Below 900px the links collapse. You provide the menu toggle.

![SiteNav](assets/screenshots/SiteNav-light.png)

## SectionHeader

SectionHeader opens every section with an eyebrow, a headline and a lead.

**Provide:** a `<header class="ps-section-header">` containing a `ps-eyebrow`, then an `<h2 class="ps-h1">`, then an optional `<p class="ps-lead">`. In the hero, use `<h1 class="ps-display">` instead of `ps-h1`.

- Break a two-sentence headline into two lines with `<br>`, as the source does: *Build better systems. / Create measurable growth.*
- In the lead, wrap at most one phrase in `<strong>` to raise it to `ink`.
- Leave `space-8` or more between the header and the section content.

![SectionHeader](assets/screenshots/SectionHeader-light.png)

## Eyebrow

The eyebrow is the short uppercase kicker that opens every section, set in `eyebrow` in `ink-muted`.

**Provide:** a `<p class="ps-eyebrow">` with the text. You may write it in sentence case, because CSS uppercases it. For the brand descriptor, wrap each × in `<span class="ps-x">×</span>`.

- Use the source's eyebrows: THE WAY WE THINK, ABOUT US, OUR VISION, OUR CAPABILITIES, OUR APPROACH, THE SYSTEM, WHERE WE'VE WORKED, SELECTED PARTNERS, WHY PLUTOSOLVE, IS PLUTOSOLVE RIGHT FOR YOU?, OUR PRINCIPLE, LET'S BUILD.
- Use it once per section, directly above the headline.
- Don't colour it `signal` or make it longer than one line.

![Eyebrow](assets/screenshots/Eyebrow-light.png)

## Button

Use buttons for calls to action, which are always an imperative phrase in title case followed by an arrow.

**Provide:** an `<a>` (navigation) or `<button>` (action) with `ps-btn` plus one variant class, the label text, and `<span class="ps-arrow" aria-hidden="true">→</span>` as the last child.

| Class | Use |
| --- | --- |
| `ps-btn--primary` | One per view: *Build Your Growth System →*, *Start a Conversation →*. It has an `ink` fill and turns `signal` on hover. |
| `ps-btn--secondary` | The companion CTA: *Explore Our Work →*. It has a `line-strong` outline. |
| `ps-link` | An inline or tertiary CTA: *See What We've Built →*. |
| `ps-btn--sm` | Add for the 40px size used in SiteNav. |

- Do pair a primary with a secondary in the hero and final CTA.
- Don't put two primaries side by side, use a signal fill at rest, or write "Click here", "Learn more" or a CTA without an arrow.
- On `surface-inverse`, use the secondary style. Its colours follow the band's `ink-inverse`.
- Use `disabled` on `<button>` and `aria-disabled="true"` on `<a>`.

![Button](assets/screenshots/Button-light.png)

## Statement

A Statement is the bold closing line or lines that end a section, set in `heading-2` above a `line` hairline.

**Provide:** a `<p class="ps-statement">` with each line in its own `<span>`. The second line onwards is rendered in `ink-muted`.

- Source examples: *Build once. Learn continuously. Grow systematically.* · *There is no universal system. / We build the one your business needs.* · *If the problem is bigger than a single service, / that's where we do our best work.*
- Use at most one per section, and never two in a row.
- Inside a `ps-inverse` band, the text follows `ink-inverse`.

![Statement](assets/screenshots/Statement-light.png)

## FlowChain

FlowChain draws an "A → B → C" chain as outlined nodes joined by hairline edges. It is the brand's main visual metaphor of nodes, flows and connected systems.

**Provide:** an `<ol class="ps-flow">` with one `<li>` per step. Each `<li>` holds a `<span class="ps-flow__node">` with the step label. Add `ps-flow__node--outcome` to the last node only. An optional `<p class="ps-flow-caption">` goes before it, and an `aria-label` on the list names the system.

- Use it for the systems in "What a growth system can look like" and anywhere the copy chains with →.
- Keep 3–7 nodes. On narrow screens the chain wraps.
- Only the outcome node uses `signal`. Every other node stays monochrome.
- For the small inline chains in ProcessSteps, keep plain `body-strong` text with →.

![FlowChain](assets/screenshots/FlowChain-light.png)

## CapabilityBlock

A CapabilityBlock is one numbered capability area: an index, an uppercase title, a sub-headline, a description and a ruled list of capabilities.

**Provide:** an `<article class="ps-capability">` with a `ps-capability__index` ("01") and a content `<div>` holding a `ps-capability__title`, a `ps-capability__sub`, a `ps-capability__desc` and a `<ul class="ps-capability__list">`.

- There are four in the source: 01 Growth Strategy, 02 Technology & Digital Products, 03 Marketing & Customer Acquisition and 04 Data, Automation & Operations. Stack them with `space-12` between.
- Follow a block with a Statement for its highlight (*Traffic is not growth. / The system that turns attention into customers is.*).
- Reuse the same structure without the list for the "Why PlutoSolve" reasons and the Industries entries.
- Don't turn these into coloured or shadowed cards. The brief rules out "cheap-looking service cards".

![CapabilityBlock](assets/screenshots/CapabilityBlock-light.png)

## ProcessSteps

ProcessSteps shows the "How we build" sequence as columns on a shared timeline rule. Each step has an index, a title, a chain and a description.

**Provide:** an `<ol class="ps-steps">` with one `<li class="ps-step">` per step, containing a `ps-step__index`, a `ps-step__title`, a `ps-step__chain` and a `ps-step__desc`. Add `ps-step--current` to at most one step to mark its node in `signal`.

- There are five steps in the source: Understand, Strategize, Build, Launch and Optimize. Close with the Statement *Build once. Learn continuously. Grow systematically.*
- The columns wrap to rows on narrow screens, so the ↓ arrows in the copy aren't drawn.
- Keep each description to one sentence.

![ProcessSteps](assets/screenshots/ProcessSteps-light.png)

## ClientList

ClientList shows client names as a restrained monochrome strip between hairlines.

**Provide:** a `<section class="ps-clients">` with a `ps-eyebrow` and a `<ul>` of names. To show logos instead, put each as a single-ink SVG in an `<img>` 24–32px tall, recoloured to `ink-muted`.

- The developer note in the source says to keep this section minimal and use a monochrome, restrained logo treatment rather than oversized colourful logos.
- Don't animate it as a marquee, add colour or put names in cards.
- Follow it with a link CTA: *See What We've Built →*.

![ClientList](assets/screenshots/ClientList-light.png)

---

# Package contents

```
plutosolve-design-system/
  PLUTOSOLVE-DESIGN-SYSTEM.md   this file
  tokens/tokens.json            source tokens
  tokens/tokens.css             CSS variables + type classes
  components/bundle.css         component styles
  components/<Name>/            preview.html + README.md
  assets/cover-light.svg, cover-dark.svg
  assets/screenshots/           every component, light + dark
```
