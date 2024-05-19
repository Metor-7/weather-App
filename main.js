var container = document.querySelector(".container");
var search = document.querySelector(".search-box");
var weatherBox = document.querySelector(".weather-box");
var weatherDetails = document.getElementById("weather-details");
var error404 = document.querySelector(".not-found");

function fetchWeather() {
  var APIkey = "3b8e0cde616b76cb031b4a2d71166009";
  var city = document.getElementById("searchBox").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      var imgUr = "";
      console.log("==========");
      console.log(json.weather);
      console.log("==========");

      //       description
      // :
      // "overcast clouds"
      // icon
      // :
      // "04d"
      // id
      // :
      // 804
      // main
      // :
      // "Clouds"

      switch (json.weather[0].main) {
        case "Clear":
          imgUr = "./clear.png";
          break;

        case "Clouds":
          imgUr = "./cloud.png";
          break;

        case "Rain":
          imgUr = "./rain.png";
          break;

        case "snow":
          imgUr = "./snow.png";
          break;

        case "haze":
          imgUr = "./haze.png";
          break;

        case "sun":
          imgUr = "./sun.png";
          break;

        default:
          imgUr = "";
      }

      weatherBox.innerHTML = `
    <img src= ${imgUr}>
    <p id="temperature"></p>
    <p id="description"></p> 
    `;
      imgUr = "";

      weatherDetails.innerHTML = `
    <div id="humidity">
                <i class="fa-solid fa-water"></i> 
                <div class="text">
                    <span></span>
                    <p>humidity</p> 
                    
                </div>
                
            </div>
        <div id="wind">
                <i class="fa-solid fa-wind"></i>
                <div class="text">wind speed</div>
                
            </div>`;

      var temperature = document.getElementById("temperature");
      var description = document.getElementById("description");
      var humidity = document.getElementById("humidity");
      var wind = document.getElementById("wind");
      var Notfound = document.getElementsByClassName("not-found");

      temperature.innerHTML += `${parseInt(json.main.temp)}<span>℃</span>`;
      description.innerHTML += `${json.weather[0].description}`;
      humidity.innerHTML += `${json.main.humidity}%`;
      wind.innerHTML += `${json.wind.speed} km/h`;

      weatherBox.style.display = "Notfound";
      weatherDetails.style.display = "Notfound";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((err) => {
      container.style.height = "400px";
      weatherBox.style.display = "Notfound";
      weatherDetails.styles.display = "Notfound";
      error404.style.display = "block";
      error404.classList.add("fadeIn");
      return;

      error404.style.display = "Notfound";
      error404.classList.remove("fadeIn");
    });
}
