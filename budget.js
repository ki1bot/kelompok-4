import { destinationCosts, expenseFields } from "./data.js";
import {
  state,
  normalizeNumber,
  formatRupiah,
  saveState,
  showToast,
} from "./storage.js";

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

export function updateBudgetForm() {
  const inputs = getBudgetInputs();

  if (!inputs) {
    return;
  }

  Object.entries(inputs).forEach(([field, input]) => {
    input.value = state.budget[field];
  });

  const destinationLabel = document.getElementById("budgetDestination");

  if (destinationLabel) {
    destinationLabel.textContent = state.selectedDestination;
  }
}

export function calculateBudget() {
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

  budgetStatus.classList.add("budget-status");
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

export function initializeBudget() {
  const inputs = getBudgetInputs();

  if (!inputs) {
    return;
  }

  updateBudgetForm();

  Object.entries(inputs).forEach(([field, input]) => {
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
        state.budget[field] =
          destinationCosts[state.selectedDestination][field];
      });

      updateBudgetForm();
      calculateBudget();
      saveState();

      showToast("Estimasi pengeluaran berhasil dikembalikan ke nilai awal.");
    });
  }

  calculateBudget();
}
