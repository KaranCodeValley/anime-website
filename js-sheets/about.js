/**
 * ShonenHub - About Page Interactive Engine
 * Handles:
 * 1. Animated number counters with IntersectionObserver
 * 2. Interactive Otaku Rank Calculator
 * 3. Interactive Shonen Saga Arc timeline
 * 4. Interactive Hero Character Quotes & Aura Switcher
 * 5. Interactive FAQ Accordion
 * 6. Dynamic Hero Card 3D tilt & badge interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. STATS NUMBER COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll(".counter-value");
  let animated = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const isDecimal = el.getAttribute("data-decimal") === "true";
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      if (isDecimal) {
        const currentVal = (easeProgress * (target / 10)).toFixed(1);
        el.textContent = `${prefix}${currentVal}${suffix}`;
      } else {
        const currentVal = Math.floor(easeProgress * target).toLocaleString();
        el.textContent = `${prefix}${currentVal}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ("IntersectionObserver" in window) {
    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animated) {
              animated = true;
              statNumbers.forEach((el) => countUp(el));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(statsSection);
    }
  } else {
    // Fallback if IntersectionObserver is not supported
    statNumbers.forEach((el) => countUp(el));
  }

  // ==========================================
  // 2. OTAKU POWER RANK CALCULATOR
  // ==========================================
  const animeSlider = document.getElementById("anime-slider");
  const sliderValueText = document.getElementById("slider-value-display");
  const rankTitle = document.getElementById("rank-title");
  const rankKanji = document.getElementById("rank-kanji");
  const rankTier = document.getElementById("rank-tier");
  const rankDescription = document.getElementById("rank-desc");
  const rankProgressBar = document.getElementById("rank-progress-fill");
  const rankAuraIndicator = document.getElementById("rank-aura-indicator");

  const ranks = [
    {
      min: 0,
      max: 10,
      title: "Genin Trainee",
      kanji: "下忍",
      tier: "TIER E • ROOKIE",
      desc: "Just began stepping into the world of anime. The training grounds await!",
      color: "#4ade80",
      pct: 15,
    },
    {
      min: 11,
      max: 30,
      title: "Chunin Prodigy",
      kanji: "中忍",
      tier: "TIER C • ADVENTURER",
      desc: "Mastered the essentials. You know your Shonen tropes and follow seasonal anime.",
      color: "#38bdf8",
      pct: 40,
    },
    {
      min: 31,
      max: 75,
      title: "Hashira / Jonin Elite",
      kanji: "柱 / 上忍",
      tier: "TIER A • MASTER",
      desc: "Seasoned warrior of countless arcs. You've witnessed legendary clashes and read raw manga chapters.",
      color: "#f59e0b",
      pct: 75,
    },
    {
      min: 76,
      max: 9999,
      title: "Special Grade Sorcerer",
      kanji: "特級呪術師",
      tier: "TIER S+ • LEGENDARY",
      desc: "Limit break achieved. You speak fluent Japanese anime slang and have completed the Big 3 multiple times.",
      color: "#f72459",
      pct: 100,
    },
  ];

  function updateRank(value) {
    const val = parseInt(value, 10);
    if (sliderValueText) sliderValueText.textContent = `${val} ${val === 100 ? "+" : ""} Series Watched`;

    const currentRank = ranks.find((r) => val >= r.min && val <= r.max) || ranks[0];

    if (rankTitle) rankTitle.textContent = currentRank.title;
    if (rankKanji) rankKanji.textContent = currentRank.kanji;
    if (rankTier) {
      rankTier.textContent = currentRank.tier;
      rankTier.style.color = currentRank.color;
    }
    if (rankDescription) rankDescription.textContent = currentRank.desc;
    if (rankProgressBar) {
      rankProgressBar.style.width = `${currentRank.pct}%`;
      rankProgressBar.style.backgroundColor = currentRank.color;
    }
    if (rankAuraIndicator) {
      rankAuraIndicator.style.boxShadow = `0 0 25px ${currentRank.color}88`;
      rankAuraIndicator.style.borderColor = currentRank.color;
    }
  }

  if (animeSlider) {
    animeSlider.addEventListener("input", (e) => {
      updateRank(e.target.value);
    });
    // Initialize
    updateRank(animeSlider.value);
  }

  // ==========================================
  // 3. INTERACTIVE SAGA ARC TIMELINE
  // ==========================================
  const arcTabs = document.querySelectorAll(".arc-tab");
  const arcPanels = document.querySelectorAll(".arc-panel");

  arcTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetArc = tab.getAttribute("data-arc");

      arcTabs.forEach((t) => t.classList.remove("active"));
      arcPanels.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const activePanel = document.getElementById(`panel-${targetArc}`);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });

  // ==========================================
  // 4. INTERACTIVE HERO QUOTES & AURA GENERATOR
  // ==========================================
  const quoteButtons = document.querySelectorAll(".quote-char-btn");
  const quoteText = document.getElementById("active-quote-text");
  const quoteAuthor = document.getElementById("active-quote-author");
  const quoteAnime = document.getElementById("active-quote-anime");
  const quoteSfx = document.getElementById("active-quote-sfx");
  const quoteAvatar = document.getElementById("active-quote-avatar");
  const quoteDisplayCard = document.querySelector(".quote-display-card");

  const quotesData = {
    gojo: {
      quote: "Throughout heaven and earth, I alone am the honored one.",
      author: "Satoru Gojo",
      anime: "Jujutsu Kaisen",
      sfx: "[ 領域展開 // DOMAIN EXPANSION ]",
      auraColor: "#00d2ff",
      img: "../pictures/jjk.jpeg",
    },
    naruto: {
      quote: "Hard work is worthless for those that don't believe in themselves.",
      author: "Naruto Uzumaki",
      anime: "Naruto Shippuden",
      sfx: "[ 螺旋丸 // RASENGAN ]",
      auraColor: "#ff8c00",
      img: "../pictures/naruto.webp",
    },
    eren: {
      quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win. Fight! Fight!",
      author: "Eren Yeager",
      anime: "Attack on Titan",
      sfx: "[ 戦え // TATAKAE ]",
      auraColor: "#10b981",
      img: "../pictures/aot.jpg",
    },
    ichigo: {
      quote: "If fate is a millstone, then we are the grist. There is nothing we can do. So I will shatter fate.",
      author: "Ichigo Kurosaki",
      anime: "Bleach: Thousand-Year Blood War",
      sfx: "[ 卍解 // BANKAI ]",
      auraColor: "#a855f7",
      img: "../pictures/bleach.jpg",
    },
    denji: {
      quote: "Everybody’s got some big grand dream. I just want to live good, eat toast with jam, and be happy.",
      author: "Denji",
      anime: "Chainsaw Man",
      sfx: "[ ブンブン // VROOM VROOM ]",
      auraColor: "#f43f5e",
      img: "../pictures/csm.jpg",
    },
  };

  quoteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const charKey = btn.getAttribute("data-char");
      const charData = quotesData[charKey];
      if (!charData) return;

      quoteButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Animate transition
      if (quoteDisplayCard) {
        quoteDisplayCard.classList.add("fade-switch");
        setTimeout(() => {
          if (quoteText) quoteText.textContent = `"${charData.quote}"`;
          if (quoteAuthor) quoteAuthor.textContent = charData.author;
          if (quoteAnime) quoteAnime.textContent = charData.anime;
          if (quoteSfx) quoteSfx.textContent = charData.sfx;
          if (quoteAvatar) {
            quoteAvatar.src = charData.img;
            quoteAvatar.alt = charData.author;
          }
          if (quoteDisplayCard) {
            quoteDisplayCard.style.setProperty("--aura-color", charData.auraColor);
            quoteDisplayCard.classList.remove("fade-switch");
          }
        }, 180);
      }
    });
  });

  // ==========================================
  // 5. INTERACTIVE FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close all other FAQs
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove("open");
        });

        // Toggle current FAQ
        item.classList.toggle("open", !isOpen);
      });
    }
  });

  // ==========================================
  // 6. HERO INTERACTIVE POSTER SHUFFLER
  // ==========================================
  const heroCards = document.querySelectorAll(".hero-card-stack .stack-card");
  let activeIndex = 0;

  heroCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      heroCards.forEach((c) => c.classList.remove("active", "prev", "next"));
      card.classList.add("active");
      activeIndex = index;
    });
  });

  // Auto shuffle every 5 seconds if not hovered
  const stackContainer = document.querySelector(".hero-card-stack");
  let shuffleInterval;

  function rotateCards() {
    if (!heroCards.length) return;
    activeIndex = (activeIndex + 1) % heroCards.length;
    heroCards.forEach((c, idx) => {
      c.classList.remove("active");
      if (idx === activeIndex) {
        c.classList.add("active");
      }
    });
  }

  if (stackContainer) {
    shuffleInterval = setInterval(rotateCards, 4500);

    stackContainer.addEventListener("mouseenter", () => {
      clearInterval(shuffleInterval);
    });

    stackContainer.addEventListener("mouseleave", () => {
      shuffleInterval = setInterval(rotateCards, 4500);
    });
  }
});
