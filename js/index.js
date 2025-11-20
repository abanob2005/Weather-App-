const apiKey = "def83fdc829f46c8a04223552251611"
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");
const darkModeToggle = document.querySelector("#darkModeToggle")
const inputCity = document.querySelector("#cityInput");
let dark = JSON.parse(localStorage.getItem("darkMode")) || false;
const userLocation = document.querySelector("#location");
const todayText = document.querySelector("#today");
const avgWeahter = document.querySelector("#avgWeather");
const avgWeahter1 = document.querySelector("#avgWeather1");
const avgWeahter2 = document.querySelector("#avgWeather2");
const minWeather = document.querySelector("#min");
const minWeather1 = document.querySelector("#min1");
const minWeather2 = document.querySelector("#min2");
const todayDate = document.querySelector("#todayDate");
const rainAvg = document.querySelector("#rainAvg");
const windSpeed = document.querySelector("#windSpeed");
const rainAvg1 = document.querySelector("#rainAvg1");
const windSpeed1 = document.querySelector("#windSpeed1");
const rainAvg2 = document.querySelector("#rainAvg2");
const windSpeed2 = document.querySelector("#windSpeed2");




function getDateObjectAfter(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return {
        weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "long" }),
        year: date.getFullYear(),

    };
}
const today = getDateObjectAfter(0);
const tomorrow = getDateObjectAfter(1);
const afterTomorrow = getDateObjectAfter(2);
console.log(today, tomorrow, afterTomorrow)

async function getIp() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {  // صححت الأقواس
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&aqi=no`);
        const weatherData = await res.json();

        cityName = weatherData.location.name;
        inputCity.setAttribute("placeholder", `Your City is ${cityName}`);
        console.log("weather", weatherData);
        display(weatherData);

      } catch (err) {
        console.error("Error fetching weather:", err);
      }

    }, (error) => {
      console.error("Error getting location:", error.message);
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}


let cityName = "cairo";
// async function getIp() {
//     await fetch("http://ip-api.com/json/?")
//         .then(res => res.json())
//         .then(data => {
//             cityName = data.city;
//             inputCity.setAttribute("placeholder", `Your City is ${cityName}`)
//             console.log("City:", data);
//         });
//     await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no`)
//         .then(res => res.json())
//         .then(weatherData => {
//             if (weatherData.location.name == cityName) {
//                 console.log("weather", weatherData);
//                 display(weatherData);
//             }


//         });

// }
getIp()
inputCity.nextElementSibling.addEventListener("click", function () {
    searchCity(inputCity)
});
inputCity.addEventListener("keydown", function (e) {

    if (e.key == "Enter") {
        searchCity(inputCity)
    }
});
// search function
async function searchCity(city) {
    const input = city
    try {
        const res = await fetch(
            (` https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input.value}&days=3&aqi=no`)
        );
        // validatation response 
        if (res.status === 200) {
            const weatherData = await res.json();
            console.log("✓ Success 200 - Weather Data:", weatherData);
            display(weatherData)
        }
    } catch (error) {
        console.log("⚠ Network Error:", error);
    }
}
// display weather on screen
function display(content) {
    userLocation.innerHTML = (content.location.name, content.location.name);
    userLocation.nextElementSibling.innerHTML = ` , ${content.location.name, content.location.country}`;
    avgWeahter.nextElementSibling.setAttribute("src", content.current.condition.icon);
    avgWeahter1.nextElementSibling.setAttribute("src", content.forecast.forecastday[1].day.condition.icon);
    avgWeahter2.nextElementSibling.setAttribute("src", content.forecast.forecastday[2].day.condition.icon);
    avgWeahter.innerHTML = `${content.forecast.forecastday[0].day.avgtemp_c} ℃`;
    avgWeahter1.innerHTML = `${content.forecast.forecastday[1].day.avgtemp_c} ℃`;
    avgWeahter2.innerHTML = `${content.forecast.forecastday[2].day.avgtemp_c} ℃`;
    minWeather.innerHTML = `Min ${content.forecast.forecastday[0].day.mintemp_c} ℃`;
    minWeather1.innerHTML = `Min ${content.forecast.forecastday[1].day.mintemp_c} ℃`;
    minWeather2.innerHTML = `Min ${content.forecast.forecastday[2].day.mintemp_c} ℃`;
    minWeather.nextElementSibling.innerHTML = `Max ${content.forecast.forecastday[0].day.maxtemp_c} ℃`;
    minWeather1.nextElementSibling.innerHTML = `Max ${content.forecast.forecastday[1].day.maxtemp_c} ℃`;
    minWeather2.nextElementSibling.innerHTML = `Max ${content.forecast.forecastday[2].day.maxtemp_c} ℃`;
    todayDate.innerHTML = `Today is ${today.weekday}`
    todayDate1.innerHTML = ` ${tomorrow.weekday}`
    todayDate2.innerHTML = `  ${afterTomorrow.weekday}`
    todayDate2.nextElementSibling.nextElementSibling.innerHTML = ` ${afterTomorrow.day}, ${afterTomorrow.month} ,${afterTomorrow.year}`
    todayDate1.nextElementSibling.nextElementSibling.innerHTML = ` ${tomorrow.day}, ${tomorrow.month} ,${tomorrow.year}`
    todayDate.nextElementSibling.nextElementSibling.innerHTML = ` ${today.day}, ${today.month} ,${today.year}`
    windSpeed.innerHTML = ` ${content.forecast.forecastday[0].day.maxwind_kph}kph`;
    rainAvg.innerHTML = ` ${content.forecast.forecastday[0].day.avghumidity}%`;
    windSpeed1.innerHTML = ` ${content.forecast.forecastday[1].day.maxwind_kph}kph`;
    rainAvg1.innerHTML = ` ${content.forecast.forecastday[1].day.avghumidity}%`;
    windSpeed2.innerHTML = ` ${content.forecast.forecastday[2].day.maxwind_kph}kph`;
    rainAvg2.innerHTML = ` ${content.forecast.forecastday[2].day.avghumidity}%`;

}

// dark mod and local storage mange
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        document.documentElement.style.setProperty('--weather-color', '#ff0000');
        document.documentElement.style.setProperty('--weather-color-dark', '#990000');
        document.documentElement.style.setProperty('--background-light', 'rgba(0, 0, 0, 0.7)');
        document.documentElement.style.setProperty('--background-dark', 'rgba(255, 255, 255, 0.432)');
        document.documentElement.style.setProperty('--black-color', 'black');
        document.documentElement.style.setProperty('--white-color', 'white');
    } else {
        document.body.classList.remove('dark');
        document.documentElement.style.setProperty('--weather-color', '#004b8d');
        document.documentElement.style.setProperty('--weather-color-dark', '#009dff');
        document.documentElement.style.setProperty('--background-light', 'rgba(255, 255, 255, 0.432)');
        document.documentElement.style.setProperty('--background-dark', 'rgba(0, 0, 0, 0.7)');
        document.documentElement.style.setProperty('--black-color', 'white');
        document.documentElement.style.setProperty('--white-color', 'black');
    }
}
applyDarkMode(dark);

// toggle dark mode
darkModeToggle.addEventListener("click", function () {
    dark = !dark;
    applyDarkMode(dark);
    localStorage.setItem("darkMode", JSON.stringify(dark));
})