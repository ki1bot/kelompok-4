import { state, saveState, showToast, escapeHtml } from "./storage.js";

function getDayTitle(day) {
  const titles = {
    1: "Hari Pertama",
    2: "Hari Kedua",
    3: "Hari Ketiga",
  };

  return titles[day] || "Hari Pertama";
}

function updateDayTabs() {
  document.querySelectorAll(".day-tab").forEach((tab) => {
    const isActive = Number(tab.dataset.day) === state.activeDay;

    tab.setAttribute("aria-pressed", String(isActive));

    tab.classList.toggle("border-teal-200", isActive);
    tab.classList.toggle("bg-teal-50", isActive);
    tab.classList.toggle("border-transparent", !isActive);
    tab.classList.toggle("hover:bg-slate-100", !isActive);

    tab.querySelectorAll("span").forEach((span) => {
      span.classList.toggle("text-teal-800", isActive);
      span.classList.toggle("text-teal-700", isActive);
      span.classList.toggle("text-slate-700", !isActive);
      span.classList.toggle("text-slate-500", !isActive);
    });
  });
}

export function renderItinerary() {
  const timeline = document.getElementById("timeline");

  if (!timeline) {
    return;
  }

  const destination = state.selectedDestination;
  const day = state.activeDay;

  const activities = [...state.itineraries[destination][day]].sort(
    (first, second) => {
      return first.time.localeCompare(second.time);
    },
  );

  const destinationLabel = document.getElementById("itineraryDestination");
  const dayLabel = document.getElementById("activeDayLabel");
  const dayTitle = document.getElementById("activeDayTitle");
  const countLabel = document.getElementById("activityCount");

  if (destinationLabel) {
    destinationLabel.textContent = destination;
  }

  if (dayLabel) {
    dayLabel.textContent = `Hari ke-${day}`;
  }

  if (dayTitle) {
    dayTitle.textContent = getDayTitle(day);
  }

  if (countLabel) {
    countLabel.textContent = `${activities.length} kegiatan terjadwal`;
  }

  updateDayTabs();

  if (activities.length === 0) {
    timeline.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                    +
                </div>
                <h5 class="text-base font-semibold text-slate-800">
                    Belum ada kegiatan
                </h5>
                <p class="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Klik tombol Tambah kegiatan untuk membuat jadwal perjalanan.
                </p>
            </div>
        `;

    return;
  }

  timeline.innerHTML = activities
    .map((activity) => {
      return `
            <div class="grid grid-cols-[58px_minmax(0,1fr)_34px] items-start gap-3 border-b border-slate-100 py-5 last:border-b-0 sm:grid-cols-[76px_minmax(0,1fr)_38px] sm:gap-5">
                <div class="pt-0.5">
                    <span class="text-sm font-bold text-teal-700">
                        ${activity.time}
                    </span>
                </div>

                <div class="min-w-0 border-l-2 border-teal-100 pl-4 sm:pl-5">
                    <h5 class="wrap-break-word text-sm font-bold text-slate-800 sm:text-base">
                        ${escapeHtml(activity.title)}
                    </h5>

                    <div class="mt-2 flex items-start gap-2 text-sm text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
                            <circle cx="12" cy="10" r="2.5"/>
                        </svg>

                        <span class="wrap-break-word">
                            ${escapeHtml(activity.location)}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    data-delete-id="${escapeHtml(activity.id)}"
                    aria-label="Hapus kegiatan ${escapeHtml(activity.title)}"
                    class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 10v7M14 10v7"/>
                    </svg>
                </button>
            </div>
        `;
    })
    .join("");
}

function deleteActivity(activityId) {
  const destination = state.selectedDestination;
  const day = state.activeDay;

  const activities = state.itineraries[destination][day];

  const remainingActivities = activities.filter((activity) => {
    return String(activity.id) !== String(activityId);
  });

  if (remainingActivities.length === activities.length) {
    return;
  }

  state.itineraries[destination][day] = remainingActivities;

  saveState();
  renderItinerary();

  showToast("Kegiatan berhasil dihapus dari itinerary.");
}

export function hideActivityForm() {
  const form = document.getElementById("activityForm");
  const button = document.getElementById("openActivityForm");

  if (!form || !button) {
    return;
  }

  form.classList.add("hidden");
  form.reset();
  button.setAttribute("aria-expanded", "false");
}

function toggleActivityForm() {
  const form = document.getElementById("activityForm");
  const button = document.getElementById("openActivityForm");
  const timeInput = document.getElementById("activityTime");

  if (!form || !button) {
    return;
  }

  const shouldOpen = form.classList.contains("hidden");

  if (!shouldOpen) {
    hideActivityForm();
    return;
  }

  form.classList.remove("hidden");
  button.setAttribute("aria-expanded", "true");

  if (timeInput) {
    timeInput.focus();
  }
}

function saveActivity(event) {
  event.preventDefault();

  const timeInput = document.getElementById("activityTime");
  const titleInput = document.getElementById("activityTitle");
  const locationInput = document.getElementById("activityLocation");

  if (!timeInput || !titleInput || !locationInput) {
    return;
  }

  const time = timeInput.value.trim();
  const title = titleInput.value.trim();
  const location = locationInput.value.trim();

  if (!time || !title || !location) {
    showToast("Lengkapi jam, nama kegiatan, dan lokasi.");
    return;
  }

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    showToast("Format waktu tidak valid.");
    return;
  }

  const newActivity = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    time,
    title: title.slice(0, 80),
    location: location.slice(0, 100),
  };

  state.itineraries[state.selectedDestination][state.activeDay].push(
    newActivity,
  );

  saveState();
  renderItinerary();
  hideActivityForm();

  showToast("Kegiatan baru berhasil ditambahkan.");
}

function setActiveDay(day) {
  if (![1, 2, 3].includes(day)) {
    return;
  }

  state.activeDay = day;

  hideActivityForm();
  renderItinerary();
  saveState();
}

export function initializeItinerary() {
  const timeline = document.getElementById("timeline");

  if (!timeline) {
    return;
  }

  document.querySelectorAll(".day-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveDay(Number(tab.dataset.day));
    });
  });

  const openButton = document.getElementById("openActivityForm");
  const cancelButton = document.getElementById("cancelActivity");
  const activityForm = document.getElementById("activityForm");

  if (openButton) {
    openButton.addEventListener("click", toggleActivityForm);
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", hideActivityForm);
  }

  if (activityForm) {
    activityForm.addEventListener("submit", saveActivity);
  }

  timeline.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-id]");

    if (!deleteButton) {
      return;
    }

    deleteActivity(deleteButton.dataset.deleteId);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideActivityForm();
    }
  });

  renderItinerary();
}
