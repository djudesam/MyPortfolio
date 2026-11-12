# CLAUDE.md

One-page personal portfolio. Plain HTML, CSS and vanilla JS (ES modules). No framework, no build step, no npm packages. Keep it that way: don't add dependencies, bundlers or a `package.json`.

- [DESIGN.md](DESIGN.md) holds the design rules, tokens, section patterns and quality rules. Read it before changing markup or styles. If a new element doesn't fit, change the element, not the rules.
- [README.md](README.md) is the owner's guide (customizing, images, Formspree, deploy). Update it when a change affects those steps.

## Run

ES modules need a server: `python -m http.server 8000` (or VS Code Live Server), then open http://localhost:8000. Opening `index.html` as a file shows content but no JS behavior.

There are no tests or linters. Check changes in a browser at 320px, 768px and 1280px, in both themes, and with JS disabled.

## Content

- All personal content is placeholder, marked with `<!-- EDIT: … -->` in `index.html`. Don't invent real names, emails, links, dates or achievements. Keep new content as clearly marked placeholders, and the owner fills it in.
- Name, initials, email and profile links repeat in several places (listed in README "Things that appear in more than one place"). Change them all together.
- `href="#"` links are intentional placeholders, disabled by `disablePlaceholderLinks()` in `js/modules/utils.js`.

## Code rules

- **CSS:** colors, fonts, sizes, spacing and radii come only from `css/tokens.css`. Never hard-code them elsewhere. Files load in order tokens → base → layout → components → utilities. Mobile-first `min-width` queries at 30em / 48em / 64em / 80em. BEM class names.
- **JS:** one feature per module in `js/modules/`, each exporting an `initX()` called from `js/main.js`. Progressive enhancement only: the page must be fully readable without JS. JS-only styles hang off the `.js` class on `<html>`, which the `<head>` fallback removes if `main.js` hasn't started within 3s.
- **Fonts:** only the loaded weights exist (Fraunces 400 + italic 400; Instrument Sans and JetBrains Mono 400/500). Add a weight to the Google Fonts URL before using it.
- **Icons:** inline SVG, stroke-width 1.5, `currentColor`. No icon library.
- **Motion:** `opacity`/`transform` only, runs once, off under `prefers-reduced-motion`.
- **Accessibility:** one `<h1>`, no skipped heading levels, every control named, every ARIA-referenced `id` exists, WCAG AA contrast in both themes, tap targets ≥ 44px for buttons/fields.
- **Banned visuals:** gradients, glassmorphism, glows, decorative shadows, blobs, emoji icons, large rounded cards, a second accent color.

## Contact form

Posts to Formspree via `action="https://formspree.io/f/YOUR_FORM_ID"`. While the placeholder ID remains, `contact.js` validates but sends nothing and says so. Never make it claim success without a confirmed response. Keep the `_gotcha` honeypot field.
