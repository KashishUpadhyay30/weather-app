const apiKey = "61ba973c1f247c24de39ab20f2d07eb9"; // Your API key

document.addEventListener("DOMContentLoaded", () => {
  applyDarkModeFromStorage();
  getWeatherByLocation();

  document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

function applyDarkModeFromStorage() {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  await fetchWeather(city);
}

async function getWeatherByLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      await fetchWeather(null, latitude, longitude);
    });
  }
}

async function fetchWeather(city, lat = null, lon = null) {
  const loading = document.getElementById("loading");
  const result = document.getElementById("weatherResult");
  loading.style.display = "block";
  result.innerHTML = "";

  let url = city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      result.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      `;
    } else {
      result.innerHTML = `<p>City not found. Try again.</p>`;
    }
  } catch (error) {
    result.innerHTML = `<p>Error fetching data.</p>`;
  } finally {
    loading.style.display = "none";
  }
}
