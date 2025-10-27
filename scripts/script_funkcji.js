document.addEventListener("DOMContentLoaded", () => {
  // Pobranie elementów DOM
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const slideCounter = document.getElementById("slide-counter");
  const progressBar = document.getElementById("progress-bar");

  // Zmienne stanu
  let currentSlide = 0;
  const totalSlides = slides.length;
  let chartInstance = null; // Przechowuje instancję wykresu

  // Dane do wykresu
  const chartData = {
    labels: ["Żywność", "Transport", "Rozrywka", "Rachunki", "Inne"],
    datasets: [
      {
        label: "Wrzesień",
        data: [1200, 500, 400, 800, 300],
        backgroundColor: "rgba(20, 184, 166, 0.7)", // Teal
        borderColor: "rgba(15, 118, 110, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Październik",
        data: [1350, 450, 600, 820, 250],
        backgroundColor: "rgba(245, 158, 11, 0.7)", // Amber/Gold
        borderColor: "rgba(180, 83, 9, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  /**
   * Renderuje wykres na slajdzie 5 (indeks 4).
   * Niszczy poprzednią instancję, jeśli istnieje, aby uniknąć błędów.
   */
  function renderChart() {
    const ctx = document.getElementById("expensesChart").getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#4B5563" },
            grid: { color: "rgba(0, 0, 0, 0.05)" },
          },
          x: {
            ticks: { color: "#4B5563" },
            grid: { display: false },
          },
        },
        plugins: {
          legend: { labels: { color: "#1F2937" } },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    });
  }

  /**
   * Główna funkcja aktualizująca interfejs użytkownika.
   * @param {number} index - Indeks slajdu do wyświetlenia.
   */
  function updateUI(index) {
    // Pokaż aktywny slajd, ukryj resztę
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // Zaktualizuj licznik
    slideCounter.textContent = `${index + 1} / ${totalSlides}`;

    // Zaktualizuj pasek postępu
    progressBar.style.width = `${((index + 1) / totalSlides) * 100}%`;

    // Zablokuj/odblokuj przyciski nawigacyjne
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;
    prevBtn.classList.toggle("opacity-50", index === 0);
    prevBtn.classList.toggle("cursor-not-allowed", index === 0);
    nextBtn.classList.toggle("opacity-50", index === totalSlides - 1);
    nextBtn.classList.toggle("cursor-not-allowed", index === totalSlides - 1);

    // WAŻNA ZMIANA: Wykres jest teraz na slajdzie 5 (indeks 4)
    if (index === 4) {
      setTimeout(renderChart, 100);
    }
  }

  // Funkcje nawigacyjne
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateUI(currentSlide);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateUI(currentSlide);
    }
  }

  // Przypisanie event listenerów
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Nawigacja klawiaturą
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  // Inicjalizacja
  updateUI(currentSlide);
});
