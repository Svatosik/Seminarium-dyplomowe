document.addEventListener("DOMContentLoaded", () => {

  // --- 1. POBRANIE ELEMENTÓW ---
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const slideCounter = document.getElementById("slide-counter");
  const progressBar = document.getElementById("progress-bar");

  // Sprawdzenie czy elementy istnieją (dla pewności)
  if (!prevBtn || !nextBtn) {
    console.error("BŁĄD: Nie znaleziono przycisków w HTML!");
    return;
  }

  // Zmienne stanu
  let currentSlide = 0;
  const totalSlides = slides.length;

  // --- 2. FUNKCJA AKTUALIZUJĄCA WIDOK ---
  function updateUI() {
    // Ukryj/Pokaż slajdy
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Aktualizuj licznik (np. 1 / 7)
    if (slideCounter) {
      slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }

    // Aktualizuj pasek postępu
    if (progressBar) {
      const progress = ((currentSlide + 1) / totalSlides) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Blokowanie przycisków na początku i końcu
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    // Zmiana przezroczystości (wizualna blokada)
    prevBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? "0.5" : "1";
  }

  // --- 3. OBSŁUGA KLIKNIĘĆ ---
  nextBtn.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateUI();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateUI();
    }
  });

  // Obsługa klawiatury (Strzałki)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateUI();
      }
    } else if (e.key === "ArrowLeft") {
      if (currentSlide > 0) {
        currentSlide--;
        updateUI();
      }
    }
  });

  // Start
  updateUI();
});
