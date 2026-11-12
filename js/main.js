/* ==========================================================================
   MAIN — entry point. Each feature lives in its own module under
   js/modules/ and exposes an init function that is called here.
   ========================================================================== */

import { setCurrentYear, disablePlaceholderLinks } from "./modules/utils.js";
import { initNav } from "./modules/nav.js";
import { initReveal } from "./modules/reveal.js";
import { initLightbox } from "./modules/lightbox.js";
import { initContact } from "./modules/contact.js";

// JS is running: cancel the no-JS fallback set up in <head>, and re-enable
// JS-only styles in case that fallback already fired on a slow connection.
clearTimeout(window.__jsFallback);
document.documentElement.classList.add("js");

initNav();
initReveal();
initLightbox();
initContact();
disablePlaceholderLinks();
setCurrentYear();
