document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("manga-search");
  const clearBtn = document.getElementById("clear-search");
  const genrePills = document.querySelectorAll(".genre-pill");
  const statusPills = document.querySelectorAll(".status-pill");
  const cards = document.querySelectorAll("#manga-grid .manga-card");
  const resultsCount = document.getElementById("results-count");
  const noResults = document.getElementById("no-results");
  const resetBtn = document.getElementById("reset-filters-btn");
  const bookmarkButtons = document.querySelectorAll(".bookmark-btn");

  let currentGenre = "all";
  let currentStatus = "all";
  let searchQuery = "";

  function filterCards() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const author = (card.getAttribute("data-author") || "").toLowerCase();
      const genres = (card.getAttribute("data-genres") || "").toLowerCase();
      const status = (card.getAttribute("data-status") || "").toLowerCase();
      const descElement = card.querySelector(".manga-desc");
      const desc = descElement ? descElement.textContent.toLowerCase() : "";

      const matchesSearch =
        !searchQuery ||
        title.includes(searchQuery) ||
        author.includes(searchQuery) ||
        genres.includes(searchQuery) ||
        desc.includes(searchQuery);

      const matchesGenre =
        currentGenre === "all" || genres.includes(currentGenre);

      const matchesStatus =
        currentStatus === "all" || status === currentStatus;

      if (matchesSearch && matchesGenre && matchesStatus) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update result counter
    if (resultsCount) {
      resultsCount.textContent = `Showing ${visibleCount} of ${cards.length} manga`;
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

  // Genre filter pills
  genrePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      genrePills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentGenre = pill.getAttribute("data-genre") || "all";
      filterCards();
    });
  });

  // Status filter pills
  statusPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      statusPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentStatus = pill.getAttribute("data-status") || "all";
      filterCards();
    });
  });

  // Bookmark toggle on cards
  bookmarkButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.classList.toggle("bookmarked");
      if (btn.classList.contains("bookmarked")) {
        btn.innerHTML = "✓ Saved";
      } else {
        btn.innerHTML = "🔖 Save";
      }
    });
  });

  // Reset filters button handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      currentGenre = "all";
      currentStatus = "all";

      genrePills.forEach((p) => p.classList.remove("active"));
      const allGenre = document.querySelector('.genre-pill[data-genre="all"]');
      if (allGenre) allGenre.classList.add("active");

      statusPills.forEach((p) => p.classList.remove("active"));
      const allStatus = document.querySelector('.status-pill[data-status="all"]');
      if (allStatus) allStatus.classList.add("active");

      filterCards();
    });
  }

  // Initial filter run
  filterCards();
});
