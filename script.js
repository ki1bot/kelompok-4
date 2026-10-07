const storageKey = "tripmate-planner-v2";

const destinationCosts = {
  Bali: {
    transport: 1000000,
    hotel: 1500000,
    food: 650000,
    attraction: 350000,
    shopping: 0,
    otherExpense: 0,
  },
  Yogyakarta: {
    transport: 650000,
    hotel: 900000,
    food: 550000,
    attraction: 400000,
    shopping: 0,
    otherExpense: 0,
  },
  Bandung: {
    transport: 500000,
    hotel: 750000,
    food: 450000,
    attraction: 300000,
    shopping: 0,
    otherExpense: 0,
  },
  Tokyo: {
    transport: 4000000,
    hotel: 2000000,
    food: 1200000,
    attraction: 800000,
    shopping: 0,
    otherExpense: 0,
  },
};

const itineraryTemplates = {
  Bali: {
    1: [
      ["08:00", "Berangkat menuju Bali", "Bandara Soekarno-Hatta"],
      ["11:00", "Check-in penginapan", "Seminyak, Bali"],
      ["13:00", "Makan siang", "Seminyak"],
      ["16:00", "Menikmati suasana pantai", "Pantai Kuta"],
      ["19:00", "Makan malam", "Seminyak"],
    ],
    2: [
      ["07:30", "Sarapan", "Penginapan"],
      ["09:00", "Mengunjungi Pura Tanah Lot", "Tabanan, Bali"],
      ["13:00", "Makan siang", "Canggu"],
      ["15:30", "Jalan-jalan di Canggu", "Canggu, Bali"],
      ["19:30", "Kembali ke penginapan", "Seminyak"],
    ],
    3: [
      ["08:00", "Sarapan pagi", "Penginapan"],
      ["10:00", "Belanja oleh-oleh", "Kuta"],
      ["12:00", "Check-out penginapan", "Seminyak"],
      ["15:00", "Menuju bandara", "Bandara Ngurah Rai"],
    ],
  },
  Yogyakarta: {
    1: [
      ["07:00", "Berangkat menuju Yogyakarta", "Jakarta"],
      ["12:00", "Makan siang", "Yogyakarta"],
      ["14:00", "Check-in hotel", "Pusat Kota Yogyakarta"],
      ["16:00", "Jalan-jalan di Malioboro", "Jalan Malioboro"],
      ["19:00", "Wisata kuliner malam", "Kawasan Malioboro"],
    ],
    2: [
      ["07:00", "Sarapan", "Hotel"],
      ["08:30", "Mengunjungi Candi Prambanan", "Prambanan"],
      ["12:30", "Makan siang", "Sekitar Prambanan"],
      ["15:00", "Wisata Taman Sari", "Kraton, Yogyakarta"],
      ["19:00", "Makan malam", "Pusat Kota"],
    ],
    3: [
      ["08:00", "Sarapan pagi", "Hotel"],
      ["10:00", "Belanja oleh-oleh", "Kawasan Malioboro"],
      ["12:00", "Check-out hotel", "Yogyakarta"],
      ["14:00", "Perjalanan pulang", "Yogyakarta"],
    ],
  },
  Bandung: {
    1: [
      ["07:00", "Berangkat menuju Bandung", "Jakarta"],
      ["10:00", "Jalan-jalan di Braga", "Jalan Braga"],
      ["12:30", "Makan siang", "Pusat Kota Bandung"],
      ["14:00", "Check-in hotel", "Bandung"],
      ["17:00", "Menikmati suasana kota", "Kawasan Dago"],
    ],
    2: [
      ["07:30", "Sarapan", "Hotel"],
      ["09:00", "Wisata alam Lembang", "Lembang"],
      ["12:30", "Makan siang", "Lembang"],
      ["15:00", "Mengunjungi tempat wisata", "Lembang"],
      ["19:00", "Makan malam", "Bandung"],
    ],
    3: [
      ["08:00", "Sarapan", "Hotel"],
      ["10:00", "Belanja oleh-oleh", "Kartika Sari"],
      ["12:00", "Check-out hotel", "Bandung"],
      ["14:00", "Kembali ke Jakarta", "Bandung"],
    ],
  },
  Tokyo: {
    1: [
      ["09:00", "Tiba di Tokyo", "Bandara Haneda"],
      ["12:00", "Makan siang", "Shinjuku"],
      ["14:00", "Check-in hotel", "Shinjuku, Tokyo"],
      ["16:00", "Jalan-jalan di Shibuya", "Shibuya Crossing"],
      ["19:00", "Makan malam", "Shibuya"],
    ],
    2: [
      ["08:00", "Sarapan", "Hotel"],
      ["09:30", "Mengunjungi Senso-ji", "Asakusa"],
      ["12:30", "Makan siang", "Asakusa"],
      ["15:00", "Menjelajahi Akihabara", "Akihabara"],
      ["19:30", "Kembali ke hotel", "Shinjuku"],
    ],
    3: [
      ["08:00", "Sarapan", "Hotel"],
      ["10:00", "Belanja oleh-oleh", "Shinjuku"],
      ["12:00", "Check-out hotel", "Shinjuku"],
      ["15:00", "Menuju bandara", "Bandara Haneda"],
    ],
  },
};

const expenseFields = [
  "transport",
  "hotel",
  "food",
  "attraction",
  "shopping",
  "otherExpense",
];

function createDefaultItineraries() {
  const result = {};

  Object.entries(itineraryTemplates).forEach(([destination, days]) => {
    result[destination] = {};

    Object.entries(days).forEach(([day, activities]) => {
      result[destination][day] = activities.map((activity, index) => {
        return {
          id: `${destination}-${day}-${index + 1}`,
          time: activity[0],
          title: activity[1],
          location: activity[2],
        };
      });
    });
  });

  return result;
}

const state = {
  selectedDestination: "Bali",
  activeDay: 1,
  budget: {
    totalBudget: 5000000,
    ...destinationCosts.Bali,
  },
  itineraries: createDefaultItineraries(),
};

let toastTimer = null;

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeNumber(value) {
  if (value === null || value === "" || typeof value === "boolean") {
    return 0;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return Math.floor(number);
}

function escapeHtml(value) {
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

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    return;
  }
}

function restoreState() {
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
        .map((activity) => {
          return {
            id: String(activity.id),
            time: activity.time,
            title: activity.title.slice(0, 80),
            location: activity.location.slice(0, 100),
          };
        });
    });
  });
}

function showToast(message) {
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

function initializeNavigation() {
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  const label = document.getElementById("menuButtonLabel");

  if (!menu || !button || !label) {
    return;
  }

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

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

function updateDestinationCards() {
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

function selectDestination(destination) {
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
  }

  saveState();
  updateDestinationCards();

  window.location.assign("budget.html");
}

function initializeDestinations() {
  const buttons = document.querySelectorAll(".choose-destination");

  if (buttons.length === 0) {
    return;
  }

  updateDestinationCards();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".destination-card");

      if (!card) {
        return;
      }

      selectDestination(card.dataset.destination);
    });
  });
}

function getBudgetInputs() {
  const inputs = {
    totalBudget: document.getElementById("totalBudget"),
    transport: document.getElementById("transport"),
    hotel: document.getElementById("hotel"),
    food: document.getElementById("food"),
    attraction: document.getElementById("attraction"),
    shopping: document.getElementById("shopping"),
    otherExpense: document.getElementById("otherExpense"),
  };

  if (Object.values(inputs).some((input) => !input)) {
    return null;
  }

  return inputs;
}

function calculateBudget() {
  const totalBudget = normalizeNumber(state.budget.totalBudget);

  const expenses = expenseFields.reduce((total, field) => {
    return total + normalizeNumber(state.budget[field]);
  }, 0);

  const remaining = totalBudget - expenses;

  const percentage =
    totalBudget > 0 ? Math.round((expenses / totalBudget) * 100) : null;

  const progress =
    percentage === null ? 0 : Math.max(0, Math.min(100, percentage));

  const summaryBudget = document.getElementById("summaryBudget");
  const summaryExpense = document.getElementById("summaryExpense");
  const summaryRemaining = document.getElementById("summaryRemaining");

  const budgetPercentage = document.getElementById("budgetPercentage");
  const budgetProgress = document.getElementById("budgetProgress");
  const budgetProgressTrack = document.getElementById("budgetProgressTrack");
  const budgetStatus = document.getElementById("budgetStatus");

  if (
    !summaryBudget ||
    !summaryExpense ||
    !summaryRemaining ||
    !budgetPercentage ||
    !budgetProgress ||
    !budgetProgressTrack ||
    !budgetStatus
  ) {
    return;
  }

  summaryBudget.textContent = formatRupiah(totalBudget);
  summaryExpense.textContent = formatRupiah(expenses);
  summaryRemaining.textContent = formatRupiah(remaining);

  summaryRemaining.classList.toggle("is-negative", remaining < 0);

  budgetPercentage.textContent = percentage === null ? "—" : `${percentage}%`;

  budgetProgress.style.width = `${progress}%`;
  budgetProgressTrack.setAttribute("aria-valuenow", String(progress));

  budgetStatus.classList.remove("is-safe", "is-warning", "is-danger");

  if (totalBudget === 0) {
    budgetStatus.classList.add("is-warning");

    if (expenses > 0) {
      budgetStatus.textContent =
        "Belum ada anggaran tersedia. Masukkan total budget terlebih dahulu.";
      budgetProgress.style.backgroundColor = "#e11d48";
    } else {
      budgetStatus.textContent =
        "Masukkan jumlah budget untuk mulai menghitung.";
      budgetProgress.style.backgroundColor = "#f59e0b";
    }

    return;
  }

  if (remaining < 0) {
    budgetStatus.classList.add("is-danger");

    budgetStatus.textContent = `Pengeluaran melebihi budget sebesar ${formatRupiah(Math.abs(remaining))}. Coba kurangi beberapa biaya.`;

    budgetProgress.style.backgroundColor = "#e11d48";

    return;
  }

  if (percentage >= 85) {
    budgetStatus.classList.add("is-warning");

    budgetStatus.textContent =
      "Anggaran hampir habis. Sebaiknya siapkan dana cadangan.";

    budgetProgress.style.backgroundColor = "#f59e0b";

    return;
  }

  budgetStatus.classList.add("is-safe");

  budgetStatus.textContent =
    "Budget masih mencukupi untuk rencana perjalanan ini.";

  budgetProgress.style.backgroundColor = "#0d9488";
}

function initializeBudget() {
  const inputs = getBudgetInputs();

  if (!inputs) {
    return;
  }

  const destinationLabel = document.getElementById("budgetDestination");

  if (destinationLabel) {
    destinationLabel.textContent = state.selectedDestination;
  }

  Object.entries(inputs).forEach(([field, input]) => {
    input.value = state.budget[field];

    input.addEventListener("input", () => {
      state.budget[field] = normalizeNumber(input.value);

      calculateBudget();
      saveState();
    });

    input.addEventListener("change", () => {
      input.value = normalizeNumber(input.value);
      state.budget[field] = normalizeNumber(input.value);

      calculateBudget();
      saveState();
    });
  });

  const calculateButton = document.getElementById("calculateBudget");
  const resetButton = document.getElementById("resetBudget");

  if (calculateButton) {
    calculateButton.addEventListener("click", () => {
      calculateBudget();
      saveState();
      showToast("Ringkasan anggaran sudah diperbarui.");
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      expenseFields.forEach((field) => {
        const value = destinationCosts[state.selectedDestination][field];

        state.budget[field] = value;
        inputs[field].value = value;
      });

      calculateBudget();
      saveState();

      showToast("Estimasi pengeluaran berhasil dikembalikan ke nilai awal.");
    });
  }

  calculateBudget();
}

function getDayTitle(day) {
  const titles = {
    1: "Hari Pertama",
    2: "Hari Kedua",
    3: "Hari Ketiga",
  };

  return titles[day] || "Hari Pertama";
}

function updateDayTabs() {
  const tabs = document.querySelectorAll(".day-tab");

  tabs.forEach((tab) => {
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

function renderItinerary() {
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

function hideActivityForm() {
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

function initializeItinerary() {
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

function initializeApp() {
  restoreState();

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  initializeNavigation();
  initializeDestinations();
  initializeBudget();
  initializeItinerary();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
