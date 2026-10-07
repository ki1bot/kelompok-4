let scrollFrameRequested = false;

function updateActiveNavigation() {
  const sections = document.querySelectorAll("main section[id]");
  const header = document.querySelector("header");

  if (sections.length === 0) {
    return;
  }

  const headerHeight = header ? header.offsetHeight : 0;
  const threshold = headerHeight + 120;

  let currentSection = sections[0].id;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= threshold) {
      currentSection = section.id;
    }
  });

  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4;

  if (atBottom) {
    currentSection = sections[sections.length - 1].id;
  }

  document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateBackToTop() {
  const button = document.getElementById("backToTop");

  if (!button) {
    return;
  }

  const isVisible = window.scrollY > 400;

  button.classList.toggle("is-visible", isVisible);
  button.setAttribute("aria-hidden", String(!isVisible));
  button.tabIndex = isVisible ? 0 : -1;
}

export function requestNavigationUpdate() {
  if (scrollFrameRequested) {
    return;
  }

  scrollFrameRequested = true;

  requestAnimationFrame(() => {
    updateActiveNavigation();
    updateBackToTop();
    scrollFrameRequested = false;
  });
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  const label = document.getElementById("menuButtonLabel");

  if (!menu || !button || !label) {
    return;
  }

  menu.classList.add("hidden");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Buka menu navigasi");
  label.textContent = "Menu";
}

function initializeBackToTop() {
  const button = document.getElementById("backToTop");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#home`,
    );

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });

    requestNavigationUpdate();
  });

  updateBackToTop();
}

export function initializeNavigation() {
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  const label = document.getElementById("menuButtonLabel");

  if (menu && button && label) {
    button.addEventListener("click", () => {
      const willOpen = menu.classList.contains("hidden");

      menu.classList.toggle("hidden", !willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      button.setAttribute(
        "aria-label",
        willOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
      );
      label.textContent = willOpen ? "Tutup" : "Menu";
    });
  }

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
      requestNavigationUpdate();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("scroll", requestNavigationUpdate, {
    passive: true,
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }

    requestNavigationUpdate();
  });

  window.addEventListener("hashchange", requestNavigationUpdate);
  window.addEventListener("load", requestNavigationUpdate);

  initializeBackToTop();
  requestNavigationUpdate();
}
