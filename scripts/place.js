function calculateWindChill(temperature, windSpeed) { return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16; }

const temperature = Number(document.querySelector("#temperature").textContent);
const windSpeed = Number(document.querySelector("#wind-speed").textContent);
const windChill = document.querySelector("#wind-chill");

if (temperature <= 10 && windSpeed > 4.8) {
  windChill.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last modified: ${document.lastModified}`;
