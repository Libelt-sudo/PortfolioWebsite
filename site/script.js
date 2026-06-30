// ===== Portfolio interactions (vanilla JS, no dependencies) =====

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after tapping a link (mobile)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero typing effect ---------- */
  const typed = document.querySelector(".typed");
  if (typed) {
    const text = typed.getAttribute("data-typed") || "";
    if (reduceMotion) {
      typed.textContent = text;
    } else {
      let i = 0;
      (function type() {
        if (i <= text.length) {
          typed.textContent = text.slice(0, i);
          i++;
          setTimeout(type, 55);
        }
      })();
    }
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id], header[id]");
  const navLinks = menu ? menu.querySelectorAll("a") : [];

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const linkFor = {};
    navLinks.forEach(function (link) {
      linkFor[link.getAttribute("href")] = link;
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const link = linkFor["#" + entry.target.id];
            if (link) {
              navLinks.forEach(function (l) { l.classList.remove("is-active"); });
              link.classList.add("is-active");
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
