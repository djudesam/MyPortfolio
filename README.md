# Personal Portfolio

A one-page personal portfolio with seven parts: Home, About Me, Skills, Projects, Achievements, Contact and a footer. It's built with plain HTML, CSS and JavaScript: no frameworks, no build step and no npm packages.

The design direction is "editorial print": warm paper and ink colors, a serif display face, numbered sections and hairline rules instead of cards. It has a light and a dark theme. The design rules are documented in [DESIGN.md](DESIGN.md).

> **All personal content is placeholder text.** Every spot to replace is marked with an `<!-- EDIT -->` comment in `index.html`. See [Customize your information](#customize-your-information).

---

## Features

- Sticky navigation that highlights the current section, with a full-screen menu on phones
- Smooth scrolling, which turns off when the visitor's system asks for reduced motion
- Light and dark theme toggle that remembers the visitor's choice and starts from their system setting
- Hero, about section with an education timeline, skills with three defined levels (no fake percentages), alternating project rows, and an achievements list
- Certificate previews in an accessible dialog (Escape, close button or a click outside closes it)
- Contact form with clear validation, ready for Formspree, and honest about whether a message was actually sent
- "Copy email" button, and a footer with quick links and Back to top
- SEO and sharing tags (title, description, Open Graph, Twitter card), a favicon and an Apple touch icon
- Accessibility: keyboard support, visible focus, skip link, labelled form fields, and WCAG AA contrast in both themes
- Works without JavaScript: all content stays visible and the nav becomes plain links

## Technologies

| What | Used |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, grid, `clamp()` fluid type). No preprocessor |
| Scripts | Vanilla JavaScript (ES modules). No libraries |
| Fonts | Google Fonts: Fraunces, Instrument Sans, JetBrains Mono |
| Icons | Two inline SVGs (theme toggle, close). No icon library |
| Contact form | [Formspree](https://formspree.io) (optional, free tier) |

## Folder structure

```
Porfolio/
├── index.html                  ← the whole page; all content lives here
├── README.md                   ← this file
├── DESIGN.md                   ← design rules, tokens, patterns, quality rules
├── robots.txt                  ← lets search engines index the site
├── assets/
│   ├── icons/
│   │   ├── favicon.svg         ← browser-tab icon (your initials)
│   │   └── apple-touch-icon.png← home-screen icon on iPhone/iPad (180×180)
│   ├── images/
│   │   ├── og-image.png        ← link-preview image (1200×630), placeholder
│   │   ├── certificates/       ← certificate images (contains a sample)
│   │   └── projects/           ← project screenshots go here
│   └── docs/                   ← optional: put a résumé PDF here
├── css/                        ← loaded in this order:
│   ├── tokens.css              ← colors, fonts, sizes, spacing (change the look here)
│   ├── base.css                ← reset + default element styles
│   ├── layout.css              ← container, sections, numbered headings
│   ├── components.css          ← buttons, tags, and one block per section
│   └── utilities.css           ← small helpers + scroll fade-in
└── js/
    ├── main.js                 ← starts every module
    └── modules/
        ├── nav.js              ← mobile menu + active link
        ├── theme.js            ← light/dark toggle
        ├── reveal.js           ← fade-in on scroll
        ├── lightbox.js         ← certificate preview dialog
        ├── contact.js          ← copy email, form validation, sending
        └── utils.js            ← small shared helpers
```

## Run it locally

The scripts are ES modules, which browsers only run from a web server, not from a file you double-click. If you double-click `index.html`, the page still shows all content, but the menu, theme toggle, form checks and previews won't work.

Pick one of these options:

- **VS Code (easiest):** install the **Live Server** extension, right-click `index.html`, then choose **Open with Live Server**.
- **Python:** in this folder, run `python -m http.server 8000` and open http://localhost:8000
- **Node.js:** in this folder, run `npx serve` and open the address it prints.

## Customize your information

Open `index.html` and search for **`EDIT`**. Each comment sits right above the content it describes. In order:

| Where | What to change |
|---|---|
| `<head>` | Page title, meta description, author, Open Graph title/description/alt text |
| Header | Initials in the logo square and your name |
| Home | Name (one line per `<span>`), professional title, tagline, introduction, portrait, quick facts (Based in, Focus, GitHub/LinkedIn) |
| About | Statement, biography, Background / Current interests / Aspirations, education entries |
| Skills | Skill names and levels (see below) |
| Projects | One `<article>` per project (see [Add a project](#add-a-project)) |
| Achievements | One `<li>` per item (see [Add an achievement](#add-an-achievement)) |
| Contact | Invitation text, email address, profile links, location |
| Footer | Initials, name, tagline, profile links, copyright name |

**Things that appear in more than one place.** Update them all:

- **Name and initials:** `<title>`, meta tags, header logo, hero, footer logo, copyright, `favicon.svg`, `apple-touch-icon.png`, `og-image.png`
- **Email:** the contact link (`href` and text), the Copy button's `data-copy`, and the footer "Email" link
- **GitHub / LinkedIn:** hero quick facts, contact rows and footer

**Links:** a link with `href="#"` is a placeholder and does nothing when clicked. Put the real URL in its `href` and it starts working immediately. Profile and project links already open in a new tab.

**Skill levels:** set `data-level="3"` (Proficient), `"2"` (Working knowledge) or `"1"` (Learning). Change the word next to it to match. The legend above the list explains what each level means, so keep the levels honest. Rows in "Other Skills" can leave the level out.

**Education:** newest entry first. Add `data-current` to the entry you're still enrolled in, which gives it a filled orange marker.

**Changing the look:** colors, fonts and spacing all live in `css/tokens.css`. Change a value there and it updates everywhere, in both themes.

## Replace images

| Image | File | Size | Notes |
|---|---|---|---|
| Portrait | `assets/images/portrait.webp` | 4:5, about 800×1000 | Replace the placeholder `<div>` in the hero with the `<img>` shown in its comment. Keep `fetchpriority="high"` and **don't** add `loading="lazy"`: it's the first big image on screen. |
| Project screenshots | `assets/images/projects/project-01.webp` … | 16:10, about 1600×1000 | Replace the placeholder `<div>` inside each `.project__media` with the `<img>` from the comment. Keep `loading="lazy"` and write alt text that describes what the screenshot shows. |
| Certificates | `assets/images/certificates/…` | any | Point the "View certificate" link's `href` at the file. Delete `sample-certificate.svg` once you have real ones. |
| Link preview | `assets/images/og-image.png` | exactly 1200×630 | Currently a placeholder card that says "Placeholder: replace this image". Make your own (Canva, Figma, or a screenshot) and keep the same file name. |
| Favicon | `assets/icons/favicon.svg` | — | Edit the `FL` text inside the SVG. |
| Touch icon | `assets/icons/apple-touch-icon.png` | 180×180 PNG | Replace with your initials (any image editor). |

**Keep images light.** Convert photos to **WebP**, for example by dragging them into [squoosh.app](https://squoosh.app), choosing WebP, and setting quality to about 75. Aim for under 200 KB per image. Always include `width` and `height` on `<img>`, which stops the page jumping while images load.

## Add a project

1. In `index.html`, find `<div class="projects__list">`.
2. Copy a whole `<article class="project reveal" …> … </article>` block and paste it where you want it in the list.
3. Give it a unique `aria-labelledby` / `id` pair (e.g. `project-4-title`) and the next number in its meta line (`03.4`).
4. Fill in the title, description, role, features and technology tags. Then add the screenshot and links (delete the GitHub link if there's no public repository).

The image side alternates automatically, so you don't need any extra classes.

## Add an achievement

1. Find `<ol class="achievement-list" role="list">`.
2. Copy an `<li class="achievement reveal"> … </li>` block. Keep the list newest first.
3. Set the date, type tag (Certificate, Academic or your own word), title, issuing organization and one-line description.
4. **Certificate image (optional):** keep the `.achievement__action` block, set the link's `href` to your image, and set `data-caption`. It opens in the preview window. No image? Delete that block.

Only list real certificates and awards. Delete any sample rows you don't need.

## Configure the contact form

The form sends through **Formspree**, which is free for low volume. Until you configure it, the form checks the fields but **sends nothing**. It tells the visitor so and offers to open their email app with the message filled in.

1. Sign up at [formspree.io](https://formspree.io) and create a new form that sends to your email address.
2. Copy your form's endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace `YOUR_FORM_ID` with your ID (`abcdwxyz`).
4. Deploy the site, send yourself a test message, and confirm it in Formspree if asked.

The form ID is designed to be public, so it's fine to commit and publish it; no secret keys are involved. After setup, "Your message was sent" only appears once Formspree confirms delivery. Errors are shown along with an email fallback. The hidden `_gotcha` field is Formspree's spam trap, so leave it in place.

## Deploy

The site is plain static files, so any static host works. Upload the whole folder with `index.html` at the top level.

**Netlify (no account setup beyond sign-in):** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this folder onto the page. You get a live URL in seconds.

**GitHub Pages:**
1. Create a repository and push this folder (with `index.html` at the root).
2. In the repository, open **Settings → Pages**, set **Source** to "Deploy from a branch", choose `main` and `/ (root)`, then save.
3. The site appears at `https://<your-username>.github.io/<repository-name>/` within a minute or two.

**Vercel / Cloudflare Pages:** import the repository and choose the "Other / no framework" preset. There's no build command, and the output directory is the root.

**After your first deploy:**
- In `<head>`, uncomment `og:url` and `canonical` and set them to your live address.
- Change `og:image` to the full URL, e.g. `https://your-site/assets/images/og-image.png`, since some platforms ignore relative paths.
- Check the link preview with [opengraph.xyz](https://www.opengraph.xyz) or LinkedIn's Post Inspector.
- If you used Formspree, send a test message from the live site.

## Checklist before publishing

- [ ] Searched `index.html` for `EDIT` and replaced every placeholder
- [ ] Searched for `Firstname`, `Lastname`, `FL`, `your.email@example.com`, `username`, `20XX`, `Skill name` and `Technology`, and none are left
- [ ] No `href="#"` left (except intentionally)
- [ ] Portrait, project screenshots, certificates, `og-image.png` and icons replaced
- [ ] Sample certificate removed
- [ ] Formspree ID set and a test message received
- [ ] `og:url`, `canonical` and an absolute `og:image` set after deploying
