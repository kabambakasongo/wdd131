const form = document.querySelector("#path-form");
const statusBox = document.querySelector("#form-status");
const savedBox = document.querySelector("#saved-preferences");
const STORAGE_KEY = "tech-atlas-path";

const recommendations = {
  web: { topic: "How a web page loads", reason: "Start with the path from browser to server." },
  computing: { topic: "What an operating system does", reason: "Learn what happens behind every app." },
  ai: { topic: "Machine learning in plain language", reason: "Build intuition before the technical details." },
  security: { topic: "Passwords and two-factor authentication", reason: "Protect your accounts first." },
  data: { topic: "How data is stored and protected", reason: "Understand where your information lives." },
};

const htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm(data) {
  if (data.name.length < 2) {
    return `Please enter your name using at least two characters.`;
  }
  if (!isValidEmail(data.email)) {
    return `Please enter a valid email address.`;
  }
  if (data.experience === "" || data.interest === "") {
    return `Please choose both a level and a subject.`;
  }
  if (data.goal.length < 10) {
    return `Please describe your goal in at least ten characters.`;
  }
  return ``;
}

function buildSummary(data) {
  const suggestion = recommendations[data.interest];
  return `
    <strong>Your saved learning path</strong>
    ${escapeHtml(data.name)} · ${escapeHtml(data.email)} · ${escapeHtml(data.experience)}
    <br>
    First guide: ${suggestion.topic}. ${suggestion.reason}
    <br>
    Your goal: ${escapeHtml(data.goal)}
    ${data.newsletter ? `<br>You are subscribed to the weekly guide email.` : ``}
  `;
}

function showSavedPreferences() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return;
  }
  const data = JSON.parse(stored);
  savedBox.innerHTML = buildSummary(data);
  savedBox.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    experience: form.elements.experience.value,
    interest: form.elements.interest.value,
    goal: form.elements.goal.value.trim(),
    newsletter: form.elements.newsletter.checked,
  };

  const errorMessage = validateForm(data);

  if (errorMessage !== ``) {
    statusBox.textContent = errorMessage;
    statusBox.className = `form-status error`;
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  statusBox.textContent = `Thank you, ${data.name}. Your learning path has been saved.`;
  statusBox.className = `form-status success`;
  form.reset();
  showSavedPreferences();
});

showSavedPreferences();
