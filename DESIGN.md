# Portfolio: design direction

The reference document for all seven development stages. If a new element doesn't fit these rules, change the element, not the rules.

## Direction: "Editorial print"

The site should read like a well-set magazine or monograph, not a SaaS landing page.

- **Paper and ink.** Warm off-white paper, near-black ink, and **one** accent (burnt vermilion). The dark theme inverts this to ink and paper.
- **Type does the work.** A large display serif for headlines, a quiet grotesque for reading, and monospace for metadata. Hierarchy comes from size, weight and spacing, not from color or boxes.
- **Rules, not cards.** Content is separated by 1px hairlines and whitespace. Lists of projects and awards are *ruled rows*, not grids of rounded cards.
- **Numbered sections.** Each section opens with a mono index (`01 — About`) and a serif title on a shared grid. This gives the page one continuous, intentional sequence.
- **Asymmetric 12-column grid.** Left-aligned and off-center (e.g. a 2/7/3 split), never everything centered.
- **Restrained motion.** Hover states plus a single subtle fade-up on scroll. Nothing loops, glows or follows the cursor. `prefers-reduced-motion` is respected.

**Banned:** gradients on text or backgrounds, glassmorphism, glowing borders, drop shadows used for decoration, blob shapes, emoji as icons, large rounded cards, and more than one accent color.

## Typography

| Role | Font | Use |
|---|---|---|
| Display | Fraunces (variable, opsz 144) | h1–h4, big numbers |
| Body | Instrument Sans | paragraphs, buttons, nav |
| Mono | JetBrains Mono | `.label`, section indexes, dates, tags |

The fluid scale runs from `--step--2` to `--step-6` in `css/tokens.css` (ratio about 1.2 on mobile and about 1.33 on desktop). Paragraphs are capped at 65ch.

## Color tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#f4f1ea` | `#13120f` | background |
| `--paper-2` | `#ebe6db` | `#1d1b17` | inset / hover surface |
| `--ink` | `#17150f` | `#ece7dc` | primary text, strong rules |
| `--ink-2` | `#4a463d` | `#aaa497` | secondary text |
| `--ink-3` | `#7d786c` | `#757064` | large meta and decoration only (low contrast) |
| `--rule` | `#d5cebf` | `#2f2c26` | hairlines |
| `--accent` | `#b83d0a` | `#ee7a45` | links, key marks; use sparingly |
| `--danger` | `#a3201b` | `#f28b82` | form errors only |

## Spacing and layout

- 4px-based scale: `--space-1` (4px) to `--space-10` (128px).
- Container: `--container` 1200px; side gutter `--gutter` is fluid from 16 to 40px. Section grids use 12 columns, with content edges at columns 1, 5 or 7.
- Section padding: `--section-pad` is fluid from 64 to 128px.
- Breakpoints (mobile-first, `min-width`): **sm 480px · md 768px · lg 1024px · xl 1280px**.
- Radii: 2px and 4px only.

## File structure

```
Porfolio/
├── index.html
├── README.md              setup, customization, deployment
├── DESIGN.md              ← this file
├── robots.txt
├── assets/
│   ├── images/            og-image.png, certificates/, projects/ (WebP preferred)
│   ├── icons/             favicon.svg, apple-touch-icon.png
│   └── docs/              optional résumé PDF
├── css/                   loaded in this order:
│   ├── tokens.css         variables only
│   ├── base.css           reset + element defaults
│   ├── layout.css         .container, .section, .section-head, shared index-label style
│   ├── components.css     .btn, .tag, .label, … then one block per section
│   └── utilities.css      .visually-hidden, .text-accent, .reveal
└── js/
    ├── main.js            entry point; imports and initializes modules
    └── modules/
        ├── utils.js       qs/qsa helpers, setCurrentYear
        ├── nav.js         mobile menu, active-section highlighting
        ├── theme.js       light/dark toggle (saved in localStorage)
        ├── reveal.js      one-time fade-up for .reveal elements on scroll
        ├── lightbox.js    certificate preview dialog
        └── contact.js     copy-email button, form validation, Formspree submit
```

## Conventions

- Personal content you need to replace is marked with `<!-- EDIT: … -->` comments in `index.html`.
- Class names use BEM: `.block__element--modifier`.
- Never hard-code a color, font or size outside `tokens.css`.
- Icons: inline SVG at stroke-width 1.5 in `currentColor`. No icon library, so no extra dependency. Use icons only where they replace a word (theme toggle, close).
- JS is progressive enhancement: the page must be fully readable without it. If `main.js` fails to load or hasn't started within 3s, the `js` class is removed (set up in `<head>`), so JS-only styles never hide content.
- ES modules need a local server. Open the site with VS Code's **Live Server** rather than double-clicking the file.
- Fonts: only the styles in use are requested (Fraunces 400 and italic 400; Instrument Sans and JetBrains Mono 400/500). Add a weight to the Google Fonts URL before using it in CSS.

## Stages

1. **Setup and design system** (done)
2. **Header/navigation (mobile menu, theme toggle) and the Home hero** (done)
3. **About Me and Skills** (done)
4. **Projects and Achievements** (done)
5. **Contact, footer and interactions** (done)
6. **Responsive, accessibility and quality audit** (done)
7. **Final QA, optimization, SEO and deployment prep** (done). See README.md for setup and deployment.

## Quality rules (checked in the Stage 6 audit; keep them true)

- No horizontal scroll from 320px up. Long words and paths wrap (`overflow-wrap`).
- Text is never smaller than 12.5px (`--step--2` minimum).
- Tap targets are at least 24px for list links and 44px for buttons and fields.
- Text contrast meets WCAG AA in both themes. Field borders are at least 3:1.
- Exactly one `<h1>`, and no skipped heading levels. Every control has a name. Every `id` referenced by ARIA attributes or links exists.
- Only top-level sections are landmarks. Sub-groups use plain `<div>`s with headings.
- Motion uses only `opacity` and `transform`, runs once, and is switched off under `prefers-reduced-motion`.

## Connecting the contact form (Formspree)

1. Create a free account at formspree.io and add a new form that sends to your email address.
2. Copy the form's endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` with your ID (`abcdwxyz`).

The ID is meant to be public, so it's fine in HTML; no secret keys are involved. While the placeholder is still there, the form validates input but sends nothing. It tells visitors that plainly and offers a pre-filled email instead. Once the ID is set, it posts to Formspree, shows success only after Formspree confirms, and otherwise shows the error with an email fallback. The hidden `_gotcha` field is Formspree's spam trap.

## Section patterns (reuse these, don't invent new ones)

- **Labelled rows** (`.about__fact`, `.hero__meta`): mono label on the left, text from column 7.
- **Timeline** (`.timeline`): outlined square = finished, filled accent square = current.
- **Ruled table** (`.skill-group`): category heading in columns 1–4, rows of items from column 5.
- **Tinted band** (`.section--inset`): use on at most every other section, to separate content types.
- **Alternating feature rows** (`.project`): a 16:10 image on 7 columns and text on 5, switching sides on each row.
- **Dated ruled list** (`.achievement`): date, type tag, details from column 5, and an optional action on the right.
- **Lightbox** (`[data-lightbox-trigger]` links plus `<dialog data-lightbox>`): for any image preview.
- **Placeholder links**: `href="#"` links do nothing when clicked, until a real URL is set.
- **Skill levels**: three defined steps only (Proficient, Working knowledge, Learning). No percentages or bars.
