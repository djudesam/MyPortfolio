/* ==========================================================================
   THEME — light/dark toggle.
   The initial theme is set by the small inline script in <head> (to avoid
   a flash). This module handles the button and remembers the choice.
   ========================================================================== */

import { qs } from "./utils.js";

const STORAGE_KEY = "theme";
const root = document.documentElement;
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode, etc.)
  }
}

function store(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore: the theme still applies for this visit */
  }
}

export function initTheme() {
  const button = qs("[data-theme-toggle]");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (button) {
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  apply(root.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light"));

  if (button) {
    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      store(next);
    });
  }

  // Follow OS changes until the visitor makes an explicit choice.
  darkQuery.addEventListener("change", (event) => {
    if (!getStored()) apply(event.matches ? "dark" : "light");
  });
}
