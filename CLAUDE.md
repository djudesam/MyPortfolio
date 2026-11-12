# CLAUDE.md

One-page personal portfolio. Plain HTML, CSS and vanilla JS (ES modules). No framework, no build step, no npm packages. Keep it that way: don't add dependencies, bundlers or a `package.json`.

- [DESIGN.md](DESIGN.md) holds the design rules, tokens, section patterns and quality rules. Read it before changing markup or styles. If a new element doesn't fit, change the element, not the rules.
- [README.md](README.md) is the owner's guide (customizing, images, Formspree, deploy). Update it when a change affects those steps.

## Run

ES modules need a server: `python -m http.server 8000` (or VS Code Live Server), then open http://localhost:8000. Opening `index.html` as a file shows content but no JS behavior.

There are no tests or linters. Check changes in a browser at 320px, 768px and 1280px and with JS disabled.

## Content

- All personal content is placeholder, marked with `<!-- EDIT: … -->` in `index.html`. Don't invent real names, emails, links, dates or achievements. Keep new content as clearly marked placeholders, and the owner fills it in.
- Name, initials, email and profile links repeat in several places (listed in README "Things that appear in more than one place"). Change them all together.
- `href="#"` links are intentional placeholders, disabled by `disablePlaceholderLinks()` in `js/modules/utils.js`.

## Code rules

- **Three designs, one switch:** `index.html` links exactly one stylesheet. `css/style-v3.css` (current) is dark with an animated glowing background and a large glowing hero photo. `css/style-v2.css` is the same layout in a light theme. `css/style-v1.css` only `@import`s the original dark design (tokens → base → layout → components → utilities). Each is self-contained with its tokens at the top. Make new design work in a new or the current file, and never edit the older ones so switching back keeps working.
- **CSS:** colors, fonts, sizes and spacing come from the token block at the top of the active design. Never hard-code them elsewhere. Mobile-first `min-width` queries (v2: 48em tablet, 64em desktop). BEM class names. Don't rename HTML classes: both designs depend on them.
- **JS:** one feature per module in `js/modules/`, each exporting an `initX()` called from `js/main.js`. Progressive enhancement only: the page must be fully readable without JS. JS-only styles hang off the `.js` class on `<html>`, which the `<head>` fallback removes if `main.js` hasn't started within 3s.
- **Fonts:** only the loaded weights exist (Fraunces 400 + italic 400; Instrument Sans and JetBrains Mono 400/500). Add a weight to the Google Fonts URL before using it.
- **Icons:** inline SVG, stroke-width 1.5, `currentColor`. No icon library.
- **Motion:** `opacity`/`transform` only, runs once, off under `prefers-reduced-motion`.
- **Accessibility:** one `<h1>`, no skipped heading levels, every control named, every ARIA-referenced `id` exists, WCAG AA contrast, tap targets ≥ 44px for buttons/fields.
- **Banned visuals:** gradients, glassmorphism, glows, decorative shadows, blobs, emoji icons, large rounded cards, a second accent color.

## Contact

There is no contact form: the owner removed it on 2026-11-13 (no backend). Contact is the email (with a Copy button), GitHub and Facebook links. Don't re-add a form unless asked. `contact.js` still holds the old form code, which skips safely when no form is present.
