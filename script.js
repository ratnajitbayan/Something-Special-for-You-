// ==========================================
// PERSONAL SETTINGS
// ==========================================

// নিজের WhatsApp নম্বর এখানে বসাবি।
// Country code-সহ লিখবি, কিন্তু + বা space নয়.
// Example format: 919876543210
const WHATSAPP_NUMBER = "918927100429";

// নিজের GF-এর নাম এখানে লিখতে পারিস।
const HER_NAME = "Beautiful";

// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ==========================================
// NO BUTTON RUNS AWAY
// ==========================================

const noBtn = document.getElementById("noBtn");

function moveNoButton() {
  // Move the button into a fixed position so it can
  // escape without being clipped by the proposal card.
  if (noBtn.parentElement !== document.body) {
    document.body.appendChild(noBtn);
  }

  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "1000";

  const padding = 12;
  const maxX = Math.max(
    padding,
    window.innerWidth - noBtn.offsetWidth - padding
  );
  const maxY = Math.max(
    padding,
    window.innerHeight - noBtn.offsetHeight - padding
  );

  noBtn.style.left =
    Math.random() * (maxX - padding) + padding + "px";

  noBtn.style.top =
    Math.random() * (maxY - padding) + padding + "px";
}

noBtn.addEventListener("pointerenter", moveNoButton);

noBtn.addEventListener("touchstart", event => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

noBtn.addEventListener("click", event => {
  event.preventDefault();
  moveNoButton();
});

// ==========================================
// YES BUTTON
// ==========================================

function acceptLove() {
  createHeartBurst();
  showPage("letter");

  const music = document.getElementById("loveMusic");
  music.play().then(() => {
    document.getElementById("musicBtn").textContent =
      "⏸ Pause Our Song";
  }).catch(() => {
    document.getElementById("musicBtn").textContent =
      "🎵 Play Our Song";
  });
}

// ==========================================
// BACKGROUND MUSIC
// ==========================================

function toggleMusic() {
  const music = document.getElementById("loveMusic");
  const button = document.getElementById("musicBtn");

  if (music.paused) {
    music.play().then(() => {
      button.textContent = "⏸ Pause Our Song";
    }).catch(() => {
      alert("Please add music.mp3 to the website folder.");
    });
  } else {
    music.pause();
    button.textContent = "🎵 Play Our Song";
  }
}

// ==========================================
// FOUR REASONS
// ==========================================

const reasons = {
  smile:
    "Your smile makes even an ordinary day feel special. " +
    "If I could wish for one little thing, it would be " +
    "to see you smile more often. 😊❤️",

  care:
    "The little ways you care mean more than you know. " +
    "Your kindness makes me feel lucky to have you in my life. 🫶",

  laugh:
    "Your laugh is one of my favourite sounds. " +
    "I love the moments when we laugh together for no reason. 😂💗",

  you:
    "It's not just one thing. It's the way you are, " +
    "the little things you do, and the person you are. " +
    "I like you for being YOU. ❤️"
};

document.querySelectorAll(".reason-card").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.reason;

    document.querySelectorAll(".reason-card").forEach(card => {
      card.classList.remove("selected");
    });

    button.classList.add("selected");

    const note = document.getElementById("reasonNote");
    note.textContent = reasons[key];
  });
});

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");

    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(35, 0, 15, 0.92);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 2000;
      cursor: pointer;
    `;

    const enlarged = document.createElement("img");
    enlarged.src = img.src;
    enlarged.alt = img.alt;

    enlarged.style.cssText = `
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,.3);
    `;

    overlay.appendChild(enlarged);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
  });
});

// ==========================================
// DATE FORM
// ==========================================

const dateInput = document.getElementById("dateInput");

// Do not allow selecting a past date.
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

let generatedMessage = "";

document.getElementById("dateForm").addEventListener("submit", event => {
  event.preventDefault();

  const selectedDate = dateInput.value;
  const selectedTime = document.getElementById("timeInput").value;
  const dateType = document.getElementById("dateType").value;
  const place = document.getElementById("placeInput").value.trim();
  const wish = document.getElementById("wishInput").value.trim();

  if (!selectedDate || !selectedTime || !dateType || !place) {
    alert("Please fill in all required date details. ❤️");
    return;
  }

  // Display date in a readable format.
  const readableDate = new Date(
    selectedDate + "T12:00:00"
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  generatedMessage =
`💌 OUR DREAM DATE PLAN ❤️

Hey! I picked a special date for us! 🥰

📅 Date: ${readableDate}
⏰ Time: ${selectedTime}
💖 Date Type: ${dateType}
📍 Place: ${place}
${wish ? "\n💌 My Special Wish: " + wish : ""}

Let's make a beautiful memory together! ❤️

Made with love 💗`;

  document.getElementById("dateMessage").textContent =
    generatedMessage;

  document.getElementById("dateResult").hidden = false;

  document.getElementById("dateResult").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  document.getElementById("whatsappBtn").onclick = sendWhatsApp;
});

// ==========================================
// WHATSAPP MESSAGE
// ==========================================

function sendWhatsApp() {
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER) ||
      WHATSAPP_NUMBER.includes("X")) {
    alert(
      "Please add your real WhatsApp number in script.js first."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(generatedMessage);

  window.open(url, "_blank", "noopener,noreferrer");
}

// ==========================================
// FINAL SURPRISE
// ==========================================

const envelopeBtn = document.getElementById("envelopeBtn");
const promiseLetter = document.getElementById("promiseLetter");

envelopeBtn.addEventListener("click", () => {
  promiseLetter.hidden = false;
  envelopeBtn.setAttribute("aria-expanded", "true");
  envelopeBtn.innerHTML = "💖 <span>Your letter is open!</span>";

  createHeartBurst();
});

// ==========================================
// FLOATING HEARTS
// ==========================================

const heartContainer = document.getElementById("hearts");

function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = ["❤️", "💕", "💗", "💖", "💘"][
    Math.floor(Math.random() * 5)
  ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.animationDuration = (6 + Math.random() * 6) + "s";

  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

setInterval(createFloatingHeart, 700);

function createHeartBurst() {
  for (let i = 0; i < 18; i++) {
    setTimeout(createFloatingHeart, i * 70);
  }
}

// ==========================================
// REPLAY
// ==========================================

function restartStory() {
  document.getElementById("loveMusic").pause();
  document.getElementById("loveMusic").currentTime = 0;

  document.getElementById("musicBtn").textContent =
    "🎵 Play Our Song";

  document.getElementById("promiseLetter").hidden = true;

  envelopeBtn.innerHTML = "💌 <span>Tap to open your letter</span>";
  envelopeBtn.setAttribute("aria-expanded", "false");

  document.getElementById("dateForm").reset();
  document.getElementById("dateResult").hidden = true;

  document.getElementById("reasonNote").textContent =
    "Choose a card above. ❤️";

  document.querySelectorAll(".reason-card").forEach(card => {
    card.classList.remove("selected");
  });

  // Restore the NO button to its original location.
  const proposal = document.getElementById("proposal");
  const buttonRow = proposal.querySelector(".button-row");

  buttonRow.appendChild(noBtn);

  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.zIndex = "";

  showPage("welcome");
}

// ==========================================
// PERSONALISE THE PAGE TITLE
// ==========================================

document.title = "Something Special for " + HER_NAME + " ❤️";