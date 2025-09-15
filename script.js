const inputCity = document.getElementById('W_country');
const btn = document.querySelector('.search button');
const infoBox = document.querySelector('.info_weather');
const cityNameEl = document.getElementById('cityName');
const tempEl = document.getElementById('temperature');
const iconEl = document.getElementById('weatherIcon');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

const API_KEY = "7bed4789164ca6112a0faa8cbe8dcd5a";


async function Search_Weather() {
    const city = inputCity.value.trim();
    if(!city){
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try{
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        const res = await fetch(url);
        if(!res.ok) throw new Error("City not found");

        const data = await res.json();

        cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        iconEl.alt = data.weather[0].description || "weather icon";

        humidityEl.textContent = (data.main.humidity ?? "--") + "%";
        windEl.textContent = Math.round(data.wind.speed * 3.6) + " km/h";

        infoBox.classList.add("active");
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    }
}

btn.addEventListener("click", Search_Weather);
inputCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") Search_Weather();
});
