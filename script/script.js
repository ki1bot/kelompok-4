import { restoreState } from "./storage.js";
import { initializeNavigation, requestNavigationUpdate } from "./navigation.js";
import { initializeDestinations } from "./destinations.js";
import { initializeBudget } from "./budget.js";
import { initializeItinerary } from "./itinerary.js";

const sections = [
  {
    file: new URL("../view/destinasi.html", import.meta.url),
    slot: "destinasi-slot",
    id: "destinasi",
  },
  {
    file: new URL("../view/budget.html", import.meta.url),
    slot: "budget-slot",
    id: "budget",
  },
  {
    file: new URL("../view/itinerary.html", import.meta.url),
    slot: "itinerary-slot",
    id: "itinerary",
  },
];

async function loadSection(config) {
  const response = await fetch(config.file);

  if (!response.ok) {
    throw new Error(`Gagal memuat ${config.file.pathname}: ${response.status}`);
  }

  const html = await response.text();
  const parser = new DOMParser();
  const page = parser.parseFromString(html, "text/html");

  const section = page.getElementById(config.id);

  if (!section || section.tagName !== "SECTION") {
    throw new Error(`Section ${config.id} tidak ditemukan.`);
  }

  const elements = Array.from(page.body.children).filter((element) => {
    return element.tagName === "SECTION";
  });

  const slot = document.getElementById(config.slot);

  if (!slot) {
    throw new Error(`Slot ${config.slot} tidak ditemukan.`);
  }

  const importedElements = elements.map((element) => {
    return document.importNode(element, true);
  });

  slot.replaceWith(...importedElements);
}

async function loadAllSections() {
  await Promise.all(sections.map(loadSection));
}

function navigateToInitialSection() {
  const sectionId = decodeURIComponent(window.location.hash.slice(1));

  if (!sectionId) {
    requestNavigationUpdate();
    return;
  }

  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({
      behavior: "instant",
      block: "start",
    });

    requestAnimationFrame(requestNavigationUpdate);
  });
}

async function initializeApp() {
  restoreState();

  await loadAllSections();

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  initializeNavigation();
  initializeDestinations();
  initializeBudget();
  initializeItinerary();

  navigateToInitialSection();
}

initializeApp().catch((error) => {
  console.error("TripMate gagal dimuat:", error);

  const main = document.querySelector("main");

  if (main) {
    const message = document.createElement("p");
    message.className = "mx-auto max-w-7xl px-5 py-8 text-sm text-red-700";
    message.textContent =
      "Sebagian halaman gagal dimuat. Pastikan folder view, style, dan script berada di root proyek serta website dijalankan melalui Live Server.";

    main.appendChild(message);
  }
});
