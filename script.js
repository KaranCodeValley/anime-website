// ========================================================
// SHONENHUB - HOMEPAGE INTERACTIVE SCRIPT
// ========================================================

// 1. Mayhem Video Hover & Click Interactions
const video = document.querySelector("#video");
const mayhemBtn = document.querySelector("#mayhem-btn") || document.querySelector("#ftext button");

if (video && mayhemBtn) {
    // Play video and make it visible on hover
    mayhemBtn.addEventListener("mouseenter", () => {
        video.classList.add("active");
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.warn("Video playback was interrupted or prevented:", error);
            });
        }
    });

    // Pause video and hide it when mouse leaves
    mayhemBtn.addEventListener("mouseleave", () => {
        video.classList.remove("active");
        video.pause();
    });

    // Unmute/toggle sound on click
    mayhemBtn.addEventListener("click", () => {
        video.classList.add("active");
        video.muted = !video.muted;
        if (video.paused) {
            video.play();
        }
        showToast(video.muted ? "Audio Muted 🔇" : "Domain Expansion Audio Unleashed! 🔊");
    });
}

// 2. Card Watch Buttons (▶ Watch Now)
const watchButtons = document.querySelectorAll(".watch-btn");
watchButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".card");
        const title = card ? card.querySelector("h2")?.textContent.trim() : "Anime";
        
        showToast(`Loading ${title} stream...`);
        
        setTimeout(() => {
            window.location.href = "./pages/toprated.html";
        }, 600);
    });
});

// 3. Card Play Buttons (▶ on card image)
const playButtons = document.querySelectorAll(".play-btn");
playButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".card");
        const title = card ? card.querySelector("h2")?.textContent.trim() : "Anime";
        
        showToast(`Launching ${title} player...`);
        
        setTimeout(() => {
            window.location.href = "./pages/toprated.html";
        }, 600);
    });
});

// 4. Card Add to List Buttons (+ Add to List / + Add)
const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".card");
        const title = card ? card.querySelector("h2")?.textContent.trim() : "Anime";
        
        const isAdded = btn.classList.toggle("added");
        
        if (isAdded) {
            btn.innerHTML = "✓ &nbsp; Added";
            showToast(`Added ${title} to your Watchlist!`);
        } else {
            const hasLongText = btn.textContent.toLowerCase().includes("list");
            btn.innerHTML = hasLongText ? "+ &nbsp; Add to List" : "+ Add";
            showToast(`Removed ${title} from Watchlist`);
        }
    });
});

// 5. Toast Notification Helper
let toastTimeout;
function showToast(message) {
    let toast = document.getElementById("toast-popup");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-popup";
        toast.className = "toast-popup";
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add("show");
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// 6. User Auth State Check (Display "Hello Username" & Logout button)
const storedUserName = localStorage.getItem("userName");
const navButtons = document.querySelector("nav .buttons");

if (storedUserName && navButtons) {
    navButtons.innerHTML = `
        <span class="user-greeting">Hello, <span>${storedUserName}</span></span>
        <button id="logout-btn">Logout</button>
    `;

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await fetch("http://localhost:3000/logout", {
                    method: "POST"
                });
            } catch (err) {
                console.warn("Backend logout request failed:", err);
            }

            localStorage.removeItem("userName");
            showToast("Logged out successfully");
            
            setTimeout(() => {
                window.location.reload();
            }, 600);
        });
    }
}