const form = document.querySelector("#travel-form");
const statusBox = document.querySelector("#form-status");
const savedBox = document.querySelector("#saved-preferences");
const STORAGE_KEY = "drc-travel-preferences";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildSummary(data) {
  return `
    <strong>Your saved preferences</strong>
    Name: ${data.name} · Interest: ${data.interest}
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

function validateForm(data) {
  if (data.name.length < 2) {
    return "Please enter your full name.";
  }
  if (!isValidEmail(data.email)) {
    return "Please enter a valid email address.";
  }
  if (data.interest === "") {
    return "Please choose a travel interest.";
  }
  if (data.message.length < 10) {
    return "Please tell us a little more (at least 10 characters).";
  }
  return "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    interest: form.elements.interest.value,
    message: form.elements.message.value.trim(),
  };

  const errorMessage = validateForm(data);

  if (errorMessage !== "") {
    statusBox.textContent = errorMessage;
    statusBox.className = "form-status error";
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  statusBox.textContent = `Thank you, ${data.name}. Your travel preferences have been saved.`;
  statusBox.className = "form-status success";
  form.reset();
  showSavedPreferences();
});

showSavedPreferences();
