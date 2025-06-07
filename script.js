async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = "61ba973c1f247c24de39ab20f2d07eb9"; // 🔑 Replace this with your own API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    document.getElementById('weatherResult').innerHTML = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;
  } else {
    document.getElementById('weatherResult').innerHTML = `<p>City not found. Try again.</p>`;
  }
}
