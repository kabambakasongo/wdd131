const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");

yearElement.textContent = currentYear;
lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
