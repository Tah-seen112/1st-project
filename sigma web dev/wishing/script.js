// Grab required elements
const generateBtn = document.getElementById("generate-btn");
const giftBox = document.getElementById("gift-box");
const celebrateBtn = document.getElementById("celebrate-btn");
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

// Sections
const setupSection = document.getElementById("setup-section");
const giftSection = document.getElementById("gift-section");
const wishSection = document.getElementById("wish-section");

// Form Inputs
const inputName = document.getElementById("input-name");
const inputWish = document.getElementById("input-wish");
const inputSender = document.getElementById("input-sender");

// Presentation Targets
const dynamicNames = document.querySelectorAll(".dynamic-name");
const displayName = document.getElementById("display-name");
const displayWish = document.getElementById("display-wish");
const displaySender = document.getElementById("display-sender");

// Trigger Transition from Form to Present
generateBtn.addEventListener("click", () => {
    // Basic validation check
    if(inputName.value.trim() === "" || inputWish.value.trim() === "") {
        alert("Please enter a name and a special birthday wish! 😊");
        return;
    }

    // Assign text updates dynamically
    dynamicNames.forEach(el => el.innerText = inputName.value.trim());
    displayName.innerText = inputName.value.trim();
    displayWish.innerText = `"${inputWish.value.trim()}"`;
    displaySender.innerText = inputSender.value.trim() || "Your Secret Admirer";

    // Advance to step 2
    setupSection.classList.add("hidden");
    giftSection.classList.remove("hidden");
    musicBtn.classList.remove("hidden"); // Reveal music toggle option
    
    // Light celebratory burst
    triggerConfettiBurst(0.2, { spread: 40 });
});

// Trigger Present Reveal
giftBox.addEventListener("click", () => {
    giftSection.classList.add("hidden");
    wishSection.classList.remove("hidden");
    
    // Start music automatically if allowed by browser settings
    bgMusic.play().catch(() => console.log("Audio waiting for user manual tap."));
    musicBtn.innerText = "⏸️ Pause Music";

    // Big confetti surprise climax
    triggerMassiveConfetti();
});

// Extra Celebration Button
celebrateBtn.addEventListener("click", triggerMassiveConfetti);

// Music Button Engine
musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = "⏸️ Pause Music";
    } else {
        bgMusic.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
});

// Confetti Engine (Helpers for canvas-confetti library)
function triggerConfettiBurst(ratio, options) {
    confetti(Object.assign({}, options, {
        particleCount: Math.floor(150 * ratio)
    }));
}

function triggerMassiveConfetti() {
    triggerConfettiBurst(0.25, { spread: 30, startVelocity: 60 });
    triggerConfettiBurst(0.2, { spread: 60 });
    triggerConfettiBurst(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    triggerConfettiBurst(0.1, { spread: 130, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    triggerConfettiBurst(0.1, { spread: 120, startVelocity: 45 });
}