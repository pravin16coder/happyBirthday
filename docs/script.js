// =========================
// ELEMENTS
// =========================

const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const smokeContainer = document.getElementById("smoke");

const balloonContainer = document.getElementById("balloons");
const messagesGrid = document.getElementById("messages");
const centralBalloonContainer = document.getElementById("centralBalloonContainer");
const centralBalloon = document.getElementById("centralBalloon");
const finalMessage = document.getElementById("finalMessage");

const messageCards = document.querySelectorAll(".message-card");

let balloonInterval = null;
let candleBlown = false;
let currentMessageIndex = 0;

// =========================
// CANDLE DOUBLE CLICK
// =========================

candle.addEventListener("dblclick", () => {
    if (candleBlown) return;
    candleBlown = true;

    flame.style.display = "none";

    // Smoke effect
    for (let i = 0; i < 6; i++) {
        const smoke = document.createElement("div");
        smoke.classList.add("smoke");
        smoke.style.left = (Math.random() * 10 - 5) + "px";
        smokeContainer.appendChild(smoke);
        setTimeout(() => smoke.remove(), 2000);
    }

    startBalloons();

    // Show messages grid (empty at first)
    messagesGrid.classList.add("show");

    // Show central balloon after a short delay
    setTimeout(() => {
        centralBalloonContainer.classList.add("show");
    }, 800);
});

// =========================
// BALLOON FALLING BACKGROUND
// =========================

function startBalloons() {
    if (balloonInterval) return;

    balloonInterval = setInterval(() => {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.style.left = Math.random() * 100 + "vw";

        const colors = ["#ff6b81", "#ff9f43", "#1dd1a1", "#54a0ff", "#f368e0"];
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

        balloonContainer.appendChild(balloon);
        setTimeout(() => balloon.remove(), 6000);
    }, 400);
}

// =========================
// CENTRAL BALLOON CLICK - REVEAL NEXT CARD
// =========================

centralBalloon.addEventListener("click", () => {
    // Burst animation
    centralBalloon.style.transform = "scale(0)";
    centralBalloon.style.opacity = "0";

    setTimeout(() => {
        // Reveal next card in grid
        if (currentMessageIndex < messageCards.length) {
            messageCards[currentMessageIndex].classList.add("visible");
            currentMessageIndex++;

            // Reset balloon for next click
            if (currentMessageIndex < messageCards.length) {
                setTimeout(() => {
                    centralBalloon.style.transform = "scale(1)";
                    centralBalloon.style.opacity = "1";
                }, 300);
            } else {
                // All 8 cards revealed, hide balloon and show final message
                setTimeout(() => {
                    centralBalloonContainer.style.display = "none";
                    finalMessage.classList.add("show");
                }, 500);
            }
        }
    }, 400);
});

// =========================
// GIFT REVEAL BUTTON
// =========================

const giftRevealBtn = document.getElementById("giftRevealBtn");
const giftCardSection = document.getElementById("giftCardSection");

if (giftRevealBtn) {
    giftRevealBtn.addEventListener("click", () => {
        // Hide button
        giftRevealBtn.style.display = "none";

        // Show gift card section with animation
        setTimeout(() => {
            giftCardSection.classList.add("show");
        }, 100);
    });
}

// =========================
// COPY VOUCHER CODE BUTTON
// =========================

const copyCodeBtn = document.getElementById("copyCodeBtn");
const voucherCode = document.getElementById("voucherCode");

if (copyCodeBtn && voucherCode) {
    copyCodeBtn.addEventListener("click", () => {
        // Get the voucher code text
        const code = voucherCode.textContent;

        // Copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            // Change button text to show success
            const originalText = copyCodeBtn.textContent;
            copyCodeBtn.textContent = "✅ Copied!";
            copyCodeBtn.style.background = "linear-gradient(135deg, #ff6b81 0%, #ff4d6d 100%)";

            // Reset button after 2 seconds
            setTimeout(() => {
                copyCodeBtn.textContent = originalText;
                copyCodeBtn.style.background = "linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)";
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy code:", err);
            alert("Code: " + code);
        });
    });
}


const correctPassword = "28-02"; // change this

function checkPassword() {

    const enteredPassword = document.getElementById("passwordInput").value;

    if (enteredPassword === correctPassword) {

        document.getElementById("passwordScreen").style.display = "none";
        document.getElementById("mainContent").style.display = "block";

    } else {

        document.getElementById("errorMsg").innerText = "Wrong password 😅";

    }
}

