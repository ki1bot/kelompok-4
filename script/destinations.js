import { destinationCosts, expenseFields } from "./data.js";
import { state, saveState, showToast } from "./storage.js";
import { updateBudgetForm, calculateBudget } from "./budget.js";
import { renderItinerary, hideActivityForm } from "./itinerary.js";

export function updateDestinationCards() {
  const cards = document.querySelectorAll(".destination-card");

  cards.forEach((card) => {
    const selected = card.dataset.destination === state.selectedDestination;

    const button = card.querySelector(".choose-destination");

    if (!button) {
      return;
    }

    card.classList.toggle("is-selected", selected);
    button.classList.toggle("is-selected", selected);

    button.textContent = selected ? "Dipilih" : "Pilih destinasi";

    button.setAttribute("aria-pressed", String(selected));
  });
}

export function updateDestinationLabels() {
  const budgetDestination = document.getElementById("budgetDestination");
  const itineraryDestination = document.getElementById("itineraryDestination");

  if (budgetDestination) {
    budgetDestination.textContent = state.selectedDestination;
  }

  if (itineraryDestination) {
    itineraryDestination.textContent = state.selectedDestination;
  }
}

export function selectDestination(destination) {
  if (!Object.prototype.hasOwnProperty.call(destinationCosts, destination)) {
    return;
  }

  const hasChanged = destination !== state.selectedDestination;

  state.selectedDestination = destination;

  if (hasChanged) {
    expenseFields.forEach((field) => {
      state.budget[field] = destinationCosts[destination][field];
    });

    state.activeDay = 1;
    hideActivityForm();
  }

  updateDestinationCards();
  updateDestinationLabels();
  updateBudgetForm();
  calculateBudget();
  renderItinerary();
  saveState();

  showToast(`${destination} berhasil dipilih sebagai tujuan perjalanan.`);

  document.getElementById("budget").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function initializeDestinations() {
  updateDestinationCards();
  updateDestinationLabels();

  document.querySelectorAll(".choose-destination").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".destination-card");

      if (!card) {
        return;
      }

      selectDestination(card.dataset.destination);
    });
  });
}
