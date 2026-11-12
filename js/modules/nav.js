/* ==========================================================================
   NAV — mobile menu toggle + active-link highlighting.
   Smooth scrolling itself is handled by CSS (scroll-behavior: smooth),
   and the sticky-header offset by scroll-padding-top in base.css.
   ========================================================================== */

import { qs, qsa } from "./utils.js";

const desktopQuery = window.matchMedia("(min-width: 64em)");

export function initNav() {
  const header = qs("[data-header]");
  const toggle = qs("[data-menu-toggle]");
  if (!header || !toggle) return;

  const label = qs("[data-menu-label]", toggle);
  const navLinks = qsa("[data-nav-link]");
  const headerLinks = qsa('a[href^="#"]', header); // nav links + brand
  const backgroundRegions = qsa("main, footer");

  const isOpen = () => header.classList.contains("is-open");

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("no-scroll", open);
    // Content behind the open menu can't be focused or read by screen readers
    backgroundRegions.forEach((el) => { el.inert = open; });
  }

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Picking a destination closes the menu; the browser then scrolls to it.
  headerLinks.forEach((link) => link.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // If the window grows to desktop size while open, reset the menu.
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
  trackActiveSection(navLinks);
}

/** Highlights the nav link of whichever section crosses the middle of the viewport. */
function trackActiveSection(links) {
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  function setActive(id) {
    links.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  // A thin band across the middle of the screen: a section is "current"
  // while it overlaps that band.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -54% 0px" }
  );
  sections.forEach((section) => observer.observe(section));

  // The last section may be too short to ever reach the middle band,
  // so mark it active once the page is scrolled to the bottom.
  const lastId = sections[sections.length - 1].id;
  window.addEventListener(
    "scroll",
    () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(lastId);
    },
    { passive: true }
  );
}
