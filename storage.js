import {
  destinationCosts,
  itineraryTemplates,
  createDefaultItineraries,
} from "./data.js";

const storageKey = "tripmate-planner-v2";

export const state = {
  selectedDestination: "Bali",
  activeDay: 1,
  budget: {
    totalBudget: 5000000,
    ...destinationCosts.Bali,
  },
  itineraries: createDefaultItineraries(),
};

let toastTimer = null;

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function normalizeNumber(value) {
  if (value === null || value === "" || typeof value === "boolean") {
    return 0;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return Math.floor(number);
}

export function escapeHtml(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return String(value).replace(/[&<>"']/g, (character) => {
    return entities[character];
  });
}

export function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) {
    return;
  }

  toastMessage.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

export function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    return;
  }
}

export function restoreState() {
  let saved;

  try {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return;
    }

    saved = JSON.parse(raw);
  } catch (error) {
    return;
  }

  if (!saved || typeof saved !== "object") {
    return;
  }

  if (
    typeof saved.selectedDestination === "string" &&
    Object.prototype.hasOwnProperty.call(
      destinationCosts,
      saved.selectedDestination,
    )
  ) {
    state.selectedDestination = saved.selectedDestination;
  }

  if ([1, 2, 3].includes(saved.activeDay)) {
    state.activeDay = saved.activeDay;
  }

  state.budget = {
    totalBudget: 5000000,
    ...destinationCosts[state.selectedDestination],
  };

  if (saved.budget && typeof saved.budget === "object") {
    Object.keys(state.budget).forEach((field) => {
      const value = saved.budget[field];

      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        Number.isFinite(Number(value)) &&
        Number(value) >= 0
      ) {
        state.budget[field] = normalizeNumber(value);
      }
    });
  }

  if (!saved.itineraries || typeof saved.itineraries !== "object") {
    return;
  }

  Object.keys(itineraryTemplates).forEach((destination) => {
    [1, 2, 3].forEach((day) => {
      const activities = saved.itineraries[destination]?.[day];

      if (!Array.isArray(activities)) {
        return;
      }

      state.itineraries[destination][day] = activities
        .filter((activity) => {
          return (
            activity &&
            (typeof activity.id === "string" ||
              typeof activity.id === "number") &&
            typeof activity.time === "string" &&
            /^([01]\d|2[0-3]):[0-5]\d$/.test(activity.time) &&
            typeof activity.title === "string" &&
            typeof activity.location === "string"
          );
        })
        .map((activity) => ({
          id: String(activity.id),
          time: activity.time,
          title: activity.title.slice(0, 80),
          location: activity.location.slice(0, 100),
        }));
    });
  });
}
