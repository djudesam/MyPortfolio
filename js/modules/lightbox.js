/* ==========================================================================
   LIGHTBOX — certificate previews in a native <dialog>.
   Triggers are ordinary links to the image (<a href="…" data-lightbox-trigger>),
   so without JavaScript they still open the image directly.
   <dialog>.showModal() provides focus trapping, Escape-to-close and
   hides the rest of the page from screen readers while open.
   ========================================================================== */

import { qs, qsa } from "./utils.js";

export function initLightbox() {
  const dialog = qs("[data-lightbox]");
  const triggers = qsa("[data-lightbox-trigger]");
  if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;

  const img = qs("[data-lightbox-img]", dialog);
  const caption = qs("[data-lightbox-caption]", dialog);
  const fullLink = qs("[data-lightbox-full]", dialog);
  const error = qs("[data-lightbox-error]", dialog);
  let lastTrigger = null;

  function open(trigger) {
    lastTrigger = trigger;
    const src = trigger.getAttribute("href");
    const text = trigger.dataset.caption || trigger.textContent.trim();

    error.hidden = true;
    img.hidden = false;
    img.alt = text;
    img.src = src;
    caption.textContent = text;
    fullLink.href = src;

    dialog.showModal();
    document.body.classList.add("no-scroll");
  }

  triggers.forEach((trigger) =>
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      open(trigger);
    })
  );

  img.addEventListener("error", () => {
    if (!img.getAttribute("src")) return;
    img.hidden = true;
    error.hidden = false;
  });

  qsa("[data-lightbox-close]", dialog).forEach((btn) =>
    btn.addEventListener("click", () => dialog.close())
  );

  // A click on the dimmed backdrop lands on the <dialog> element itself.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Runs for every way of closing: button, backdrop, Escape.
  dialog.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
    img.removeAttribute("src");
    if (lastTrigger) lastTrigger.focus();
  });
}
