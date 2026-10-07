const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const destinationCards = document.querySelectorAll(".destination-card");
const destinationButtons = document.querySelectorAll(".choose-destination");
const selectedDestination = document.getElementById("selectedDestination");
const itineraryDestination = document.getElementById("itineraryDestination");

const totalBudgetInput = document.getElementById("totalBudget");
const transportInput = document.getElementById("transport");
const hotelInput = document.getElementById("hotel");
const foodInput = document.getElementById("food");
const attractionInput = document.getElementById("attraction");
const shoppingInput = document.getElementById("shopping");
const otherExpenseInput = document.getElementById("otherExpense");

const calculateBudgetButton = document.getElementById("calculateBudget");
const summaryBudget = document.getElementById("summaryBudget");
const summaryExpense = document.getElementById("summaryExpense");
const summaryRemaining = document.getElementById("summaryRemaining");
const remainingBudgetCircle = document.getElementById("remainingBudgetCircle");
const budgetCircle = document.getElementById("budgetCircle");
const budgetStatus = document.getElementById("budgetStatus");

const dayTabs = document.querySelectorAll(".day-tab");
const activeDayLabel = document.getElementById("activeDayLabel");
const activeDayTitle = document.getElementById("activeDayTitle");
const timeline = document.getElementById("timeline");

const openActivityFormButton = document.getElementById("openActivityForm");
const activityForm = document.getElementById("activityForm");
const activityTimeInput = document.getElementById("activityTime");
const activityTitleInput = document.getElementById("activityTitle");
const activityLocationInput = document.getElementById("activityLocation");
const saveActivityButton = document.getElementById("saveActivity");
const cancelActivityButton = document.getElementById("cancelActivity");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let activeDay = 1;
let toastTimer;

const itineraryData = {
  1: [
    {
      id: 1,
      time: "08:00",
      title: "Berangkat",
      location: "Bandara Soekarno-Hatta",
    },
    {
      id: 2,
      time: "11:00",
      title: "Check-in Hotel",
      location: "Seminyak, Bali",
    },
    {
      id: 3,
      time: "13:00",
      title: "Makan Siang",
      location: "Warung lokal",
    },
    {
      id: 4,
      time: "16:00",
      title: "Menikmati Sunset",
      location: "Pantai Kuta",
    },
    {
      id: 5,
      time: "19:30",
      title: "Makan Malam",
      location: "Seminyak",
    },
  ],
  2: [
    {
      id: 6,
      time: "07:30",
      title: "Sarapan",
      location: "Hotel",
    },
    {
      id: 7,
      time: "09:00",
      title: "Mengunjungi Pura",
      location: "Tanah Lot",
    },
    {
      id: 8,
      time: "13:00",
      title: "Makan Siang",
      location: "Canggu",
    },
    {
      id: 9,
      time: "15:30",
      title: "Eksplorasi Pantai",
      location: "Canggu",
    },
    {
      id: 10,
      time: "20:00",
      title: "Kembali ke Hotel",
      location: "Seminyak",
    },
  ],
  3: [
    {
      id: 11,
      time: "08:00",
      title: "Sarapan",
      location: "Hotel",
    },
    {
      id: 12,
      time: "10:00",
      title: "Belanja Oleh-oleh",
      location: "Kuta",
    },
    {
      id: 13,
      time: "12:00",
      title: "Check-out Hotel",
      location: "Seminyak",
    },
    {
      id: 14,
      time: "15:00",
      title: "Menuju Bandara",
      location: "Bandara Ngurah Rai",
    },
  ],
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getNumber(input) {
  const value = Number(input.value);

  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return value;
}

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function calculateBudget() {
  const totalBudget = getNumber(totalBudgetInput);

  const expenses =
    getNumber(transportInput) +
    getNumber(hotelInput) +
    getNumber(foodInput) +
    getNumber(attractionInput) +
    getNumber(shoppingInput) +
    getNumber(otherExpenseInput);

  const remaining = totalBudget - expenses;

  let percentage = 0;

  if (totalBudget > 0) {
    percentage = Math.round((remaining / totalBudget) * 100);
  }

  const circlePercentage = Math.max(0, Math.min(100, percentage));

  summaryBudget.textContent = formatRupiah(totalBudget);
  summaryExpense.textContent = formatRupiah(expenses);
  summaryRemaining.textContent = formatRupiah(remaining);

  remainingBudgetCircle.textContent = `${Math.max(0, percentage)}%`;
  budgetCircle.style.setProperty("--progress", `${circlePercentage}%`);

  budgetStatus.classList.remove("safe", "warning", "danger");

  if (remaining < 0) {
    budgetStatus.classList.add("danger");
    budgetStatus.textContent = `Budget kurang ${formatRupiah(Math.abs(remaining))}. Kurangi pengeluaran.`;
  } else if (totalBudget > 0 && percentage <= 15) {
    budgetStatus.classList.add("warning");
    budgetStatus.textContent =
      "Sisa budget cukup kecil. Pertimbangkan dana cadangan.";
  } else {
    budgetStatus.classList.add("safe");
    budgetStatus.textContent = "Budget kamu masih aman.";
  }
}

function selectDestination(card) {
  const destination = card.dataset.destination;
  const transport = Number(card.dataset.transport);
  const hotel = Number(card.dataset.hotel);
  const food = Number(card.dataset.food);
  const attraction = Number(card.dataset.attraction);

  destinationCards.forEach((destinationCard) => {
    destinationCard.classList.remove("selected");

    const button = destinationCard.querySelector(".choose-destination");

    if (button) {
      button.textContent = "Pilih";
    }
  });

  card.classList.add("selected");

  const selectedButton = card.querySelector(".choose-destination");

  if (selectedButton) {
    selectedButton.textContent = "Dipilih";
  }

  selectedDestination.textContent = destination;
  itineraryDestination.textContent = `${destination} Trip`;

  transportInput.value = transport;
  hotelInput.value = hotel;
  foodInput.value = food;
  attractionInput.value = attraction;

  calculateBudget();

  showToast(`${destination} berhasil dipilih.`);

  document.getElementById("budget").scrollIntoView({
    behavior: "smooth",
  });
}

function getDayTitle(day) {
  if (day === 1) {
    return "Hari Pertama";
  }

  if (day === 2) {
    return "Hari Kedua";
  }

  return "Hari Ketiga";
}

function renderItinerary() {
  const activities = [...itineraryData[activeDay]].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  activeDayLabel.textContent = `HARI ${String(activeDay).padStart(2, "0")}`;
  activeDayTitle.textContent = getDayTitle(activeDay);

  if (activities.length === 0) {
    timeline.innerHTML = `
            <div class="empty-itinerary">
                <strong>Belum ada aktivitas</strong>
                <span>Tambahkan aktivitas pertama untuk hari ini.</span>
            </div>
        `;

    return;
  }

  timeline.innerHTML = activities
    .map((activity) => {
      return `
                <div class="timeline-item">
                    <div class="timeline-time">${activity.time}</div>

                    <div class="timeline-dot"></div>

                    <div class="timeline-details">
                        <h4>${escapeHtml(activity.title)}</h4>
                        <p>${escapeHtml(activity.location)}</p>
                    </div>

                    <button
                        class="delete-activity"
                        type="button"
                        data-id="${activity.id}"
                        aria-label="Hapus aktivitas"
                    >
                        ×
                    </button>
                </div>
            `;
    })
    .join("");

  document.querySelectorAll(".delete-activity").forEach((button) => {
    button.addEventListener("click", () => {
      deleteActivity(Number(button.dataset.id));
    });
  });
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function deleteActivity(id) {
  const activityIndex = itineraryData[activeDay].findIndex(
    (activity) => activity.id === id,
  );

  if (activityIndex === -1) {
    return;
  }

  itineraryData[activeDay].splice(activityIndex, 1);

  renderItinerary();
  showToast("Aktivitas berhasil dihapus.");
}

function resetActivityForm() {
  activityTimeInput.value = "";
  activityTitleInput.value = "";
  activityLocationInput.value = "";
}

function hideActivityForm() {
  activityForm.classList.add("hidden");
  resetActivityForm();
}

function saveActivity() {
  const time = activityTimeInput.value;
  const title = activityTitleInput.value.trim();
  const location = activityLocationInput.value.trim();

  if (!time || !title || !location) {
    showToast("Waktu, aktivitas, dan lokasi harus diisi.");
    return;
  }

  const newActivity = {
    id: Date.now(),
    time,
    title,
    location,
  };

  itineraryData[activeDay].push(newActivity);

  renderItinerary();
  hideActivityForm();

  showToast("Aktivitas berhasil ditambahkan.");
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("main section[id]");
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function handleScroll() {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  updateActiveNavigation();
}

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

destinationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".destination-card");

    if (card) {
      selectDestination(card);
    }
  });
});

calculateBudgetButton.addEventListener("click", () => {
  calculateBudget();
  showToast("Perhitungan budget berhasil diperbarui.");
});

[
  totalBudgetInput,
  transportInput,
  hotelInput,
  foodInput,
  attractionInput,
  shoppingInput,
  otherExpenseInput,
].forEach((input) => {
  input.addEventListener("input", calculateBudget);
});

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeDay = Number(tab.dataset.day);

    dayTabs.forEach((dayTab) => {
      dayTab.classList.remove("active");
    });

    tab.classList.add("active");
    hideActivityForm();
    renderItinerary();
  });
});

openActivityFormButton.addEventListener("click", () => {
  activityForm.classList.toggle("hidden");

  if (!activityForm.classList.contains("hidden")) {
    activityTimeInput.focus();
  }
});

cancelActivityButton.addEventListener("click", hideActivityForm);

saveActivityButton.addEventListener("click", saveActivity);

activityLocationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveActivity();
  }
});

window.addEventListener("scroll", handleScroll);

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  }
});

calculateBudget();
renderItinerary();
handleScroll();
