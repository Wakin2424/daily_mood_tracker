// ===================================
// SCRIPT.JS — Daily Mood Tracker App
// A real-world use case with smooth UX
// ===================================


// -----------------------------
// PART 1: VARIABLES & CONDITIONALS
// -----------------------------
let userName = "Friend";
let isLoggedIn = true;
let currentMood = "";
let moodHistory = []; // Stores last 5 moods

// Welcome message based on login status
if (isLoggedIn) {
  document.querySelector("header p").textContent = `Hello, ${userName}! How are you today?`;
}

// -----------------------------
// PART 2: CUSTOM FUNCTIONS
// -----------------------------

// Function 1: Show encouragement message
function showEncouragement() {
  const messages = [
    "You're doing great! 💪",
    "Every day is a fresh start. 🌅",
    "You've got this! ✨",
    "Progress, not perfection. 🌱"
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("action-output").textContent = randomMsg;
  document.getElementById("action-output").style.color = "#e94560";
}

// Function 2: Calculate average mood score (happy=5, calm=4, etc.)
function calculateMoodScore() {
  const scoreMap = { happy: 5, energetic: 4, calm: 3, tired: 2, sad: 1 };
  let total = 0;
  moodHistory.forEach(mood => {
    total += scoreMap[mood] || 0;
  });
  const avg = moodHistory.length > 0 ? (total / moodHistory.length).toFixed(1) : 0;
  document.getElementById("action-output").textContent = `📊 Average Mood Score: ${avg}/5`;
  document.getElementById("action-output").style.color = "#2980b9";
}


// -----------------------------
// PART 3: LOOPS
// -----------------------------

// Update mood history list
function updateMoodList() {
  const list = document.getElementById("mood-list");
  list.innerHTML = ""; // Clear

  // Use for...of to loop through history
  for (const mood of moodHistory) {
    const li = document.createElement("li");
    li.textContent = formatMood(mood);
    list.appendChild(li);
  }

  // Animate list items
  setTimeout(() => {
    document.querySelectorAll("#mood-list li").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`;
    });
  }, 100);
}

// Helper: Format mood with emoji
function formatMood(mood) {
  const emojis = {
    happy: "😊 Happy",
    sad: "😢 Sad",
    energetic: "⚡ Energetic",
    tired: "😴 Tired",
    calm: "🧘‍♂️ Calm"
  };
  return emojis[mood] || mood;
}

//  clear history of the mood currently stored
function clearHistory() {
  moodHistory = [];
  document.getElementById("mood-list").innerHTML = "";
}

// -----------------------------
// PART 4: DOM INTERACTIONS
// -----------------------------

// 1. Log mood and give feedback
function logMood() {
  const select = document.getElementById("mood-select");
  currentMood = select.value;

  if (!currentMood) {
    document.getElementById("mood-message").textContent = "Please select a mood!";
    document.getElementById("mood-message").style.color = "red";
    return;
  }

  // Add to history (max 5)
  moodHistory.unshift(currentMood);
  if (moodHistory.length > 5) moodHistory.pop();

  // Give feedback based on mood
  const messageEl = document.getElementById("mood-message");
  const advice = {
    happy: "That's wonderful! Keep spreading joy! 🌟",
    sad: "I'm here for you. It's okay to feel this way. 🤍",
    energetic: "Great energy! Use it wisely! 💥",
    tired: "Rest is important. Take it easy. 🛌",
    calm: "Peaceful mind, peaceful life. 🕊️"
  };
  messageEl.textContent = advice[currentMood];
  messageEl.style.color = "#27ae60";

  // Reset selection
  select.value = "";

  // Update history
  updateMoodList();
}

// 2. Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// 3. Reset all data
function resetApp() {
  moodHistory = [];
  document.getElementById("mood-list").innerHTML = "";
  document.getElementById("mood-message").textContent = "";
  document.getElementById("action-output").textContent = "";
  document.getElementById("mood-select").value = "";
  alert("All data reset. Start fresh! 🌿");
}