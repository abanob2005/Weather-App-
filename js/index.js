
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");
const darkModeToggle = document.querySelector("#darkModeToggle")
const inputCity = document.querySelector("#cityInput");
let dark = JSON.parse(localStorage.getItem("darkMode")) || false;







//get the user name city by api 	
let cityName = "";
async function getIp() {
    await fetch('http://ip-api.com/json/?')
        .then(res => res.json())
        .then(data => {
            cityName = data.city;
            inputCity.setAttribute("placeholder",`Your City is ${cityName}`)
            console.log("City:", data);
        });
           await fetch(`http://api.weatherapi.com/v1/forecast.json?key=def83fdc829f46c8a04223552251611&q=${cityName}`)
        .then(res => res.json())
        .then(weatherData => {
           if(weatherData.location.name==cityName){
            console.log("weather", weatherData);
         }});
        }
getIp()
inputCity.addEventListener("input",async function(e){
    const input= e.target
       await fetch(`http://api.weatherapi.com/v1/forecast.json?key=def83fdc829f46c8a04223552251611&q=${input.value}`)
        .then(res => res.json())
        .then(inputWeater => {
          
            console.log("weather", inputWeater);
         });
})

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
    navbarToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("show");
    });
    // toggle dark mode
    darkModeToggle.addEventListener("click", function () {
        dark = !dark;
        applyDarkMode(dark);
        localStorage.setItem("darkMode", JSON.stringify(dark));
    });



