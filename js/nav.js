(() => {
  // Cache nav elements
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  const dropdownToggles = document.querySelectorAll(".nav-dropdown > .nav-item-dropdown");
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  const mqMobile = window.matchMedia("(max-width: 720px)");

  if (!nav || !toggle || !links) return;

  // Close all dropdowns except an optional one to keep open
  const closeDropdowns = (except) => {
    dropdowns.forEach((item) => {
      if (item !== except) {
        item.classList.remove("is-open");
        const trigger = item.querySelector(".nav-item-dropdown");
        trigger?.setAttribute("aria-expanded", "false");
      }
    });
  };

  // Close entire nav and reset dropdowns
  const closeMenu = () => {
    nav.classList.remove("is-open");
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    closeDropdowns();
  };

  // Mobile menu toggle
  toggle.addEventListener("click", () => {
    const willOpen = !nav.classList.contains("is-open");
    if (willOpen) {
      nav.classList.add("is-open");
      links.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    } else {
      closeMenu();
    }
  });

  // Mobile-only dropdown toggle
  dropdownToggles.forEach((link) => {
    link.addEventListener("click", (evt) => {
      if (!mqMobile.matches) return; // ignore on desktop
      evt.preventDefault();

      const parent = link.closest(".nav-dropdown");
      const isOpen = parent.classList.toggle("is-open");
      link.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) {
        closeDropdowns(parent); // close others
      } else {
        parent.classList.remove("is-open");
      }
    });
  });

  // Close nav on outside click
  document.addEventListener("click", (evt) => {
    if (!nav.contains(evt.target)) closeMenu();
  });

  // Close nav on Escape
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closeMenu();
  });

  // Reset states when crossing the mobile breakpoint
  mqMobile.addEventListener("change", (evt) => {
    closeDropdowns();
    dropdownToggles.forEach((link) => link.setAttribute("aria-expanded", "false"));
    if (!evt.matches) closeMenu();
  });
})();
