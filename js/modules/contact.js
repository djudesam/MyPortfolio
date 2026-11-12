/* ==========================================================================
   CONTACT — copy-email button + contact form.

   Form behaviour:
   - Validates on submit, then live as the visitor fixes each field.
   - Errors are shown under each field and linked via aria-describedby.
   - If the Formspree ID is still the placeholder, NOTHING is sent: the
     visitor is told so and offered a pre-filled email instead.
   - Otherwise the form is POSTed to Formspree with fetch(), and the real
     response decides the success or error message.
   ========================================================================== */

import { qs, qsa } from "./utils.js";

const PLACEHOLDER_ID = "YOUR_FORM_ID";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

const RULES = {
  name: (v) => (!v ? "Please enter your name." : v.length < 2 ? "Your name looks too short." : ""),
  email: (v) =>
    !v ? "Please enter your email address."
    : !EMAIL_PATTERN.test(v) ? "Enter a valid email address, like name@example.com."
    : "",
  subject: (v) => (!v ? "Please add a subject." : ""),
  message: (v) =>
    !v ? "Please write a message."
    : v.length < 10 ? "Your message is a little short. Please write at least 10 characters."
    : "",
};

export function initContact() {
  initCopyEmail();
  initForm();
}

/* ---------- Copy email ---------- */
function initCopyEmail() {
  const button = qs("[data-copy]");
  if (!button) return;
  const label = qs("[data-copy-label]", button);
  const status = qs("[data-copy-status]");
  let timer;

  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = false; // clipboard blocked (e.g. opened as a file:// page)
    }
    label.textContent = ok ? "Copied" : "Copy failed";
    if (status) status.textContent = ok ? `Email address copied: ${text}` : "Couldn't copy. Please select the address instead.";
    clearTimeout(timer);
    timer = setTimeout(() => {
      label.textContent = "Copy";
      if (status) status.textContent = "";
    }, 2000);
  });
}

/* ---------- Form ---------- */
function initForm() {
  const form = qs("[data-contact-form]");
  if (!form) return;

  form.noValidate = true; // we show our own, clearer messages
  const fields = qsa("input[name], textarea[name]", form).filter((el) => RULES[el.name]);
  const submit = qs("[data-submit]", form);
  const submitLabel = qs("[data-submit-label]", form);
  const status = qs("[data-form-status]", form);
  const emailLink = qs("[data-contact-email]");
  const ownerEmail = emailLink ? emailLink.getAttribute("href").replace(/^mailto:/, "") : "";

  function validate(field) {
    const message = RULES[field.name](field.value.trim());
    const errorEl = document.getElementById(field.getAttribute("aria-describedby"));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message;
    return !message;
  }

  fields.forEach((field) => {
    // Check when leaving a field the visitor has typed in
    field.addEventListener("blur", () => {
      if (field.value.trim() || field.getAttribute("aria-invalid") === "true") validate(field);
    });
    // Once a field is flagged, clear the error as soon as it's fixed
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    });
  });

  function showStatus(type, text, link) {
    status.className = `form-status form-status--${type}`;
    status.textContent = text;
    if (link) {
      status.append(" ");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      status.append(a, ".");
    }
  }

  function mailtoLink() {
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get("subject") || "");
    const body = encodeURIComponent(`${data.get("message") || ""}\n\n${data.get("name") || ""}\n${data.get("email") || ""}`);
    return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  }

  function setBusy(busy) {
    submit.disabled = busy;
    submit.setAttribute("aria-busy", String(busy));
    submitLabel.textContent = busy ? "Sending…" : "Send message";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      showStatus("error", invalid.length === 1
        ? "One field needs your attention."
        : `${invalid.length} fields need your attention.`);
      invalid[0].focus();
      return;
    }

    // Spam trap filled in: quietly do nothing.
    const trap = form.elements.namedItem("_gotcha");
    if (trap && trap.value) return;

    // Not connected to a form service yet: be honest about it.
    if (form.action.includes(PLACEHOLDER_ID)) {
      showStatus(
        "info",
        "This form isn't connected to a sending service yet, so your message was not sent.",
        { href: mailtoLink(), text: "Send it from your email app instead" }
      );
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        const name = form.elements.namedItem("name").value.trim().split(" ")[0];
        form.reset();
        fields.forEach((f) => f.removeAttribute("aria-invalid"));
        showStatus("success", `Thanks, ${name}. Your message was sent and I'll get back to you soon.`);
      } else {
        const data = await response.json().catch(() => ({}));
        const detail = Array.isArray(data.errors) ? data.errors.map((e) => e.message).join(" ") : "";
        showStatus("error", `Your message couldn't be sent${detail ? `: ${detail}` : "."}`,
          { href: mailtoLink(), text: "Try your email app instead" });
      }
    } catch {
      showStatus("error", "Couldn't reach the server. Check your connection and try again, or",
        { href: mailtoLink(), text: "send it from your email app" });
    } finally {
      setBusy(false);
    }
  });
}
