/* ==========================================================================
   REVEAL — fades .reveal elements up once, the first time they scroll
   into view. CSS for the effect lives in utilities.css and only applies
   when JS is running, so content is never hidden without it.
   ========================================================================== */

import { qsa, prefersReducedMotion } from "./utils.js";

export function initReveal() {
  const items = qsa(".reveal");
  if (!items.length) return;

  const showAll = () => items.forEach((el) => el.classList.add("is-visible"));

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate once only
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}
