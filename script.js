const menuButton = document.getElementById("menuButton");
const menuButtonLabel = document.getElementById("menuButtonLabel");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

const destinationCards = Array.from(
  document.querySelectorAll(".destination-card"),
);
const destinationButtons = document.querySelectorAll(".choose-destination");

const budgetDestination = document.getElementById("budgetDestination");
const itineraryDestination = document.getElementById("itineraryDestination");

const budgetInputs = {
  totalBudget: document.getElementById("totalBudget"),
  transport: document.getElementById("transport"),
  hotel: document.getElementById("hotel"),
  food: document.getElementById("food"),
  attraction: document.getElementById("attraction"),
  shopping: document.getElementById("shopping"),
  otherExpense: document.getElementById("otherExpense"),
};

const calculateBudgetButton = document.getElementById("calculateBudget");
const resetBudgetButton = document.getElementById("resetBudget");

const summaryBudget = document.getElementById("summaryBudget");
const summaryExpense = document.getElementById("summaryExpense");
const summaryRemaining = document.getElementById("summaryRemaining");

const budgetPercentage = document.getElementById("budgetPercentage");
const budgetProgress = document.getElementById("budgetProgress");
const budgetProgressTrack = document.getElementById("budgetProgressTrack");
const budgetStatus = document.getElementById("budgetStatus");

const dayTabs = document.querySelectorAll(".day-tab");
const activeDayLabel = document.getElementById("activeDayLabel");
const activeDayTitle = document.getElementById("activeDayTitle");
const activityCount = document.getElementById("activityCount");
const timeline = document.getElementById("timeline");

const activityForm = document.getElementById("activityForm");
const openActivityFormButton = document.getElementById("openActivityForm");
const cancelActivityButton = document.getElementById("cancelActivity");

const activityTimeInput = document.getElementById("activityTime");
const activityTitleInput = document.getElementById("activityTitle");
const activityLocationInput = document.getElementById("activityLocation");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const storageKey = "tripmate-planner-v2";

const expenseFields = [
  "transport",
  "hotel",
  "food",
  "attraction",
  "shopping",
  "otherExpense",
];

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

const defaultItineraries = {
  Bali: {
    1: [
      {
        id: "bali-1",
        time: "08:00",
        title: "Berangkat menuju Bali",
        location: "Bandara Soekarno-Hatta",
      },
      {
        id: "bali-2",
        time: "11:00",
        title: "Check-in penginapan",
        location: "Seminyak, Bali",
      },
      {
        id: "bali-3",
        time: "13:00",
        title: "Makan siang",
        location: "Seminyak",
      },
      {
        id: "bali-4",
        time: "16:00",
        title: "Menikmati suasana pantai",
        location: "Pantai Kuta",
      },
      {
        id: "bali-5",
        time: "19:00",
        title: "Makan malam",
        location: "Seminyak",
      },
    ],
    2: [
      {
        id: "bali-6",
        time: "07:30",
        title: "Sarapan",
        location: "Penginapan",
      },
      {
        id: "bali-7",
        time: "09:00",
        title: "Mengunjungi Pura Tanah Lot",
        location: "Tabanan, Bali",
      },
      {
        id: "bali-8",
        time: "13:00",
        title: "Makan siang",
        location: "Canggu",
      },
      {
        id: "bali-9",
        time: "15:30",
        title: "Jalan-jalan di Canggu",
        location: "Canggu, Bali",
      },
      {
        id: "bali-10",
        time: "19:30",
        title: "Kembali ke penginapan",
        location: "Seminyak",
      },
    ],
    3: [
      {
        id: "bali-11",
        time: "08:00",
        title: "Sarapan pagi",
        location: "Penginapan",
      },
      {
        id: "bali-12",
        time: "10:00",
        title: "Belanja oleh-oleh",
        location: "Kuta",
      },
      {
        id: "bali-13",
        time: "12:00",
        title: "Check-out penginapan",
        location: "Seminyak",
      },
      {
        id: "bali-14",
        time: "15:00",
        title: "Menuju bandara",
        location: "Bandara Ngurah Rai",
      },
    ],
  },

  Yogyakarta: {
    1: [
      {
        id: "yogya-1",
        time: "07:00",
        title: "Berangkat menuju Yogyakarta",
        location: "Jakarta",
      },
      {
        id: "yogya-2",
        time: "12:00",
        title: "Makan siang",
        location: "Yogyakarta",
      },
      {
        id: "yogya-3",
        time: "14:00",
        title: "Check-in hotel",
        location: "Pusat Kota Yogyakarta",
      },
      {
        id: "yogya-4",
        time: "16:00",
        title: "Jalan-jalan di Malioboro",
        location: "Jalan Malioboro",
      },
      {
        id: "yogya-5",
        time: "19:00",
        title: "Wisata kuliner malam",
        location: "Kawasan Malioboro",
      },
    ],
    2: [
      {
        id: "yogya-6",
        time: "07:00",
        title: "Sarapan",
        location: "Hotel",
      },
      {
        id: "yogya-7",
        time: "08:30",
        title: "Mengunjungi Candi Prambanan",
        location: "Prambanan",
      },
      {
        id: "yogya-8",
        time: "12:30",
        title: "Makan siang",
        location: "Sekitar Prambanan",
      },
      {
        id: "yogya-9",
        time: "15:00",
        title: "Wisata Taman Sari",
        location: "Kraton, Yogyakarta",
      },
      {
        id: "yogya-10",
        time: "19:00",
        title: "Makan malam",
        location: "Pusat Kota",
      },
    ],
    3: [
      {
        id: "yogya-11",
        time: "08:00",
        title: "Sarapan pagi",
        location: "Hotel",
      },
      {
        id: "yogya-12",
        time: "10:00",
        title: "Belanja oleh-oleh",
        location: "Kawasan Malioboro",
      },
      {
        id: "yogya-13",
        time: "12:00",
        title: "Check-out hotel",
        location: "Yogyakarta",
      },
      {
        id: "yogya-14",
        time: "14:00",
        title: "Perjalanan pulang",
        location: "Yogyakarta",
      },
    ],
  },

  Bandung: {
    1: [
      {
        id: "bandung-1",
        time: "07:00",
        title: "Berangkat menuju Bandung",
        location: "Jakarta",
      },
      {
        id: "bandung-2",
        time: "10:00",
        title: "Jalan-jalan di Braga",
        location: "Jalan Braga",
      },
      {
        id: "bandung-3",
        time: "12:30",
        title: "Makan siang",
        location: "Pusat Kota Bandung",
      },
      {
        id: "bandung-4",
        time: "14:00",
        title: "Check-in hotel",
        location: "Bandung",
      },
      {
        id: "bandung-5",
        time: "17:00",
        title: "Menikmati suasana kota",
        location: "Kawasan Dago",
      },
    ],
    2: [
      {
        id: "bandung-6",
        time: "07:30",
        title: "Sarapan",
        location: "Hotel",
      },
      {
        id: "bandung-7",
        time: "09:00",
        title: "Wisata alam Lembang",
        location: "Lembang",
      },
      {
        id: "bandung-8",
        time: "12:30",
        title: "Makan siang",
        location: "Lembang",
      },
      {
        id: "bandung-9",
        time: "15:00",
        title: "Mengunjungi tempat wisata",
        location: "Lembang",
      },
      {
        id: "bandung-10",
        time: "19:00",
        title: "Makan malam",
        location: "Bandung",
      },
    ],
    3: [
      {
        id: "bandung-11",
        time: "08:00",
        title: "Sarapan",
        location: "Hotel",
      },
      {
        id: "bandung-12",
        time: "10:00",
        title: "Belanja oleh-oleh",
        location: "Kartika Sari",
      },
      {
        id: "bandung-13",
        time: "12:00",
        title: "Check-out hotel",
        location: "Bandung",
      },
      {
        id: "bandung-14",
        time: "14:00",
        title: "Kembali ke Jakarta",
        location: "Bandung",
      },
    ],
  },

  Tokyo: {
    1: [
      {
        id: "tokyo-1",
        time: "09:00",
        title: "Tiba di Tokyo",
        location: "Bandara Haneda",
      },
      {
        id: "tokyo-2",
        time: "12:00",
        title: "Makan siang",
        location: "Shinjuku",
      },
      {
        id: "tokyo-3",
        time: "14:00",
        title: "Check-in hotel",
        location: "Shinjuku, Tokyo",
      },
      {
        id: "tokyo-4",
        time: "16:00",
        title: "Jalan-jalan di Shibuya",
        location: "Shibuya Crossing",
      },
      {
        id: "tokyo-5",
        time: "19:00",
        title: "Makan malam",
        location: "Shibuya",
      },
    ],
    2: [
      {
        id: "tokyo-6",
        time: "08:00",
        title: "Sarapan",
        location: "Hotel",
      },
      {
        id: "tokyo-7",
        time: "09:30",
        title: "Mengunjungi Senso-ji",
        location: "Asakusa",
      },
      {
        id: "tokyo-8",
        time: "12:30",
        title: "Makan siang",
        location: "Asakusa",
      },
      {
        id: "tokyo-9",
        time: "15:00",
        title: "Menjelajahi Akihabara",
        location: "Akihabara",
      },
      {
        id: "tokyo-10",
        time: "19:30",
        title: "Kembali ke hotel",
        location: "Shinjuku",
      },
    ],
    3: [
      {
        id: "tokyo-11",
        time: "08:00",
        title: "Sarapan",
        location: "Hotel",
      },
      {
        id: "tokyo-12",
        time: "10:00",
        title: "Belanja oleh-oleh",
        location: "Shinjuku",
      },
      {
        id: "tokyo-13",
        time: "12:00",
        title: "Check-out hotel",
        location: "Shinjuku",
      },
      {
        id: "tokyo-14",
        time: "15:00",
        title: "Menuju bandara",
        location: "Bandara Haneda",
      },
    ],
  },
};

let selectedDestinationName = "Bali";
let activeDay = 1;
let itineraries = JSON.parse(JSON.stringify(defaultItineraries));
let toastTimer = null;

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getNumber(input) {
  const value = Number(input.value);

  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.floor(value);
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

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

function saveState() {
  const budget = {};

  Object.entries(budgetInputs).forEach(([key, input]) => {
    budget[key] = getNumber(input);
  });

  const state = {
    selectedDestination: selectedDestinationName,
    activeDay,
    budget,
    itineraries,
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    return;
  }
}

function loadState() {
  let savedState;

  try {
    const savedData = localStorage.getItem(storageKey);

    if (!savedData) {
      return false;
    }

    savedState = JSON.parse(savedData);
  } catch (error) {
    return false;
  }

  if (!savedState || typeof savedState !== "object") {
    return false;
  }

  const savedDestination = savedState.selectedDestination;

  if (
    typeof savedDestination === "string" &&
    Object.prototype.hasOwnProperty.call(destinationCosts, savedDestination)
  ) {
    selectedDestinationName = savedDestination;
  }

  if ([1, 2, 3].includes(savedState.activeDay)) {
    activeDay = savedState.activeDay;
  }

  if (savedState.itineraries && typeof savedState.itineraries === "object") {
    Object.keys(defaultItineraries).forEach((destination) => {
      [1, 2, 3].forEach((day) => {
        const savedActivities = savedState.itineraries[destination]?.[day];

        if (!Array.isArray(savedActivities)) {
          return;
        }

        itineraries[destination][day] = savedActivities
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

  setDestinationCosts(selectedDestinationName);

  if (savedState.budget && typeof savedState.budget === "object") {
    Object.entries(budgetInputs).forEach(([key, input]) => {
      const savedValue = Number(savedState.budget[key]);

      if (Number.isFinite(savedValue) && savedValue >= 0) {
        input.value = Math.floor(savedValue);
      }
    });
  }

  return true;
}

function setDestinationCosts(destination) {
  const costs = destinationCosts[destination];

  if (!costs) {
    return;
  }

  expenseFields.forEach((field) => {
    budgetInputs[field].value = costs[field];
  });
}

function updateSelectedDestination() {
  destinationCards.forEach((card) => {
    const selected = card.dataset.destination === selectedDestinationName;
    const button = card.querySelector(".choose-destination");

    card.classList.toggle("ring-2", selected);
    card.classList.toggle("ring-teal-500", selected);
    card.classList.toggle("border-teal-300", selected);
    card.classList.toggle("border-slate-200", !selected);

    button.classList.toggle("bg-teal-700", selected);
    button.classList.toggle("border-teal-700", selected);
    button.classList.toggle("text-white", selected);
    button.classList.toggle("hover:bg-teal-800", selected);

    button.classList.toggle("bg-white", !selected);
    button.classList.toggle("border-slate-200", !selected);
    button.classList.toggle("text-slate-700", !selected);
    button.classList.toggle("hover:bg-teal-50", !selected);

    button.textContent = selected ? "Dipilih" : "Pilih destinasi";
    button.setAttribute("aria-pressed", String(selected));
  });

  budgetDestination.textContent = selectedDestinationName;
  itineraryDestination.textContent = selectedDestinationName;
}

function selectDestination(destination) {
  if (!destinationCosts[destination]) {
    return;
  }

  const destinationChanged = selectedDestinationName !== destination;

  selectedDestinationName = destination;

  if (destinationChanged) {
    setDestinationCosts(destination);
    activeDay = 1;
    hideActivityForm();
  }

  updateSelectedDestination();
  calculateBudget();
  renderItinerary();
  saveState();

  showToast(`${destination} berhasil dipilih sebagai tujuan perjalanan.`);

  document.getElementById("budget").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function calculateBudget() {
  const totalBudget = getNumber(budgetInputs.totalBudget);

  const totalExpense = expenseFields.reduce((total, field) => {
    return total + getNumber(budgetInputs[field]);
  }, 0);

  const remainingBudget = totalBudget - totalExpense;

  const percentage =
    totalBudget > 0 ? Math.round((totalExpense / totalBudget) * 100) : null;

  const progressValue =
    percentage === null ? 0 : Math.max(0, Math.min(100, percentage));

  summaryBudget.textContent = formatRupiah(totalBudget);
  summaryExpense.textContent = formatRupiah(totalExpense);
  summaryRemaining.textContent = formatRupiah(remainingBudget);

  budgetPercentage.textContent = percentage === null ? "—" : `${percentage}%`;

  budgetProgress.style.width = `${progressValue}%`;
  budgetProgressTrack.setAttribute("aria-valuenow", String(progressValue));

  summaryRemaining.classList.toggle("text-rose-700", remainingBudget < 0);

  summaryRemaining.classList.toggle("text-teal-800", remainingBudget >= 0);

  budgetProgress.classList.remove("bg-teal-600", "bg-amber-500", "bg-rose-600");

  if (totalBudget === 0) {
    budgetStatus.className =
      "mt-7 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800";

    if (totalExpense > 0) {
      budgetStatus.textContent =
        "Belum ada anggaran tersedia. Masukkan total budget terlebih dahulu.";

      budgetProgress.classList.add("bg-rose-600");
    } else {
      budgetStatus.textContent =
        "Masukkan jumlah budget untuk mulai menghitung.";

      budgetProgress.classList.add("bg-amber-500");
    }
  } else if (remainingBudget < 0) {
    budgetStatus.className =
      "mt-7 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800";

    budgetStatus.textContent = `Pengeluaran melebihi budget sebesar ${formatRupiah(Math.abs(remainingBudget))}. Coba kurangi beberapa biaya.`;

    budgetProgress.classList.add("bg-rose-600");
  } else if (percentage >= 85) {
    budgetStatus.className =
      "mt-7 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800";

    budgetStatus.textContent =
      "Anggaran hampir habis. Sebaiknya siapkan dana cadangan.";

    budgetProgress.classList.add("bg-amber-500");
  } else {
    budgetStatus.className =
      "mt-7 rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-teal-800";

    budgetStatus.textContent =
      "Budget masih mencukupi untuk rencana perjalanan ini.";

    budgetProgress.classList.add("bg-teal-600");
  }
}

function resetBudget() {
  setDestinationCosts(selectedDestinationName);
  calculateBudget();
  saveState();

  showToast("Estimasi pengeluaran berhasil dikembalikan ke nilai awal.");
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
  dayTabs.forEach((tab) => {
    const isActive = Number(tab.dataset.day) === activeDay;

    tab.setAttribute("aria-pressed", String(isActive));

    tab.classList.toggle("border-teal-200", isActive);
    tab.classList.toggle("bg-teal-50", isActive);

    tab.classList.toggle("border-transparent", !isActive);
    tab.classList.toggle("hover:bg-slate-100", !isActive);

    const labels = tab.querySelectorAll("span");

    labels.forEach((label) => {
      label.classList.toggle("text-teal-800", isActive);
      label.classList.toggle("text-teal-700", isActive);
      label.classList.toggle("text-slate-700", !isActive);
      label.classList.toggle("text-slate-500", !isActive);
    });
  });
}

function renderItinerary() {
  const activities = [...itineraries[selectedDestinationName][activeDay]].sort(
    (first, second) => {
      return first.time.localeCompare(second.time);
    },
  );

  activeDayLabel.textContent = `Hari ke-${activeDay}`;
  activeDayTitle.textContent = getDayTitle(activeDay);
  activityCount.textContent = `${activities.length} kegiatan terjadwal`;

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
  const activities = itineraries[selectedDestinationName][activeDay];

  const updatedActivities = activities.filter((activity) => {
    return String(activity.id) !== String(activityId);
  });

  if (updatedActivities.length === activities.length) {
    return;
  }

  itineraries[selectedDestinationName][activeDay] = updatedActivities;

  renderItinerary();
  saveState();

  showToast("Kegiatan berhasil dihapus dari itinerary.");
}

function showActivityForm() {
  activityForm.classList.remove("hidden");
  openActivityFormButton.setAttribute("aria-expanded", "true");
  activityTimeInput.focus();
}

function hideActivityForm() {
  activityForm.classList.add("hidden");
  openActivityFormButton.setAttribute("aria-expanded", "false");
  activityForm.reset();
}

function saveActivity(event) {
  event.preventDefault();

  const time = activityTimeInput.value.trim();
  const title = activityTitleInput.value.trim();
  const location = activityLocationInput.value.trim();

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

  itineraries[selectedDestinationName][activeDay].push(newActivity);

  renderItinerary();
  saveState();
  hideActivityForm();

  showToast("Kegiatan baru berhasil ditambahkan.");
}

function setActiveDay(day) {
  if (![1, 2, 3].includes(day)) {
    return;
  }

  activeDay = day;

  hideActivityForm();
  renderItinerary();
  saveState();
}

function toggleMobileMenu() {
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden", isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));

  menuButtonLabel.textContent = isOpen ? "Menu" : "Tutup";
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Buka menu navigasi" : "Tutup menu navigasi",
  );
}

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Buka menu navigasi");

  menuButtonLabel.textContent = "Menu";
}

function initializeApp() {
  const hasSavedState = loadState();

  if (!hasSavedState) {
    setDestinationCosts(selectedDestinationName);
  }

  updateSelectedDestination();
  calculateBudget();
  renderItinerary();

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  menuButton.addEventListener("click", toggleMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

  destinationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".destination-card");

      if (!card) {
        return;
      }

      selectDestination(card.dataset.destination);
    });
  });

  Object.values(budgetInputs).forEach((input) => {
    input.addEventListener("input", () => {
      calculateBudget();
      saveState();
    });

    input.addEventListener("change", () => {
      input.value = getNumber(input);

      calculateBudget();
      saveState();
    });
  });

  calculateBudgetButton.addEventListener("click", () => {
    calculateBudget();
    saveState();

    showToast("Ringkasan anggaran sudah diperbarui.");
  });

  resetBudgetButton.addEventListener("click", resetBudget);

  dayTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveDay(Number(tab.dataset.day));
    });
  });

  openActivityFormButton.addEventListener("click", () => {
    const isHidden = activityForm.classList.contains("hidden");

    if (isHidden) {
      showActivityForm();
    } else {
      hideActivityForm();
    }
  });

  cancelActivityButton.addEventListener("click", hideActivityForm);

  activityForm.addEventListener("submit", saveActivity);

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
      closeMobileMenu();
    }
  });
}

initializeApp();
