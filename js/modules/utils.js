/* Small shared helpers used by the other modules. */

/** Shorthand for querySelector / querySelectorAll (returns a real array). */
export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/** True when the visitor asked the OS to minimize motion. */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Placeholder links (href="#") would jump to the top of the page, or open a
 * new tab of this page when they have target="_blank". Make them do nothing
 * until a real URL is filled in.
 */
export function disablePlaceholderLinks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href="#"]');
    if (link) event.preventDefault();
  });
}

/** Fills every [data-year] element with the current year (footer copyright). */
export function setCurrentYear() {
  const year = String(new Date().getFullYear());
  qsa("[data-year]").forEach((el) => {
    el.textContent = year;
  });
}
