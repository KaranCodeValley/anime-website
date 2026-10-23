document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("anime-search");
  const clearBtn = document.getElementById("clear-search");
  const filterPills = document.querySelectorAll(".filter-pill");
  const cards = document.querySelectorAll("#anime-grid .card");
  const resultsCount = document.getElementById("results-count");
  const noResults = document.getElementById("no-results");
  const resetBtn = document.getElementById("reset-filters-btn");

  let currentGenre = "all";
  let searchQuery = "";

  function filterCards() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const genres = (card.getAttribute("data-genres") || "").toLowerCase();
      const descElement = card.querySelector(".description");
      const desc = descElement ? descElement.textContent.toLowerCase() : "";

      const matchesSearch =
        !searchQuery ||
        title.includes(searchQuery) ||
        genres.includes(searchQuery) ||
        desc.includes(searchQuery);

      const matchesGenre =
        currentGenre === "all" || genres.includes(currentGenre);

      if (matchesSearch && matchesGenre) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update result counter
    if (resultsCount) {
      resultsCount.textContent = `Showing ${visibleCount} of ${cards.length} anime`;
    }

    // Handle empty state
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "flex" : "none";
    }

    // Toggle clear search button
    if (clearBtn) {
      clearBtn.style.display = searchQuery.length > 0 ? "block" : "none";
    }
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  // Clear search button handler
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
        filterCards();
        searchInput.focus();
      }
    });
  }

  // Filter pills handler
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentGenre = pill.getAttribute("data-genre") || "all";
      filterCards();
    });
  });

  // Reset filters button handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      currentGenre = "all";
      filterPills.forEach((p) => p.classList.remove("active"));
      const allPill = document.querySelector('.filter-pill[data-genre="all"]');
      if (allPill) allPill.classList.add("active");
      filterCards();
    });
  }

  // Initial filter run
  filterCards();
});
