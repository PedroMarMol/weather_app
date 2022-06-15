// constantes en mayusculas
const API_KEY = "33c84682a93a3fd15895167ae69d2ff0"

let weather = {
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + API_KEY
        ).then((response) => response.json())
        .then((data) => {
          this.displayWeather(data)
          setBackgroundImage(city)
        })
        .catch(() => {
          displayError()
          updateBackground('https://d2ofqe7l47306o.cloudfront.net/games/1920x1080/death-stranding-minimalist.jpg')
        })
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".icon").style.width = "20px";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        // document.body.style.backgroundImage = "url("url-source" + name)";

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
});

document
    .querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Jaen");

const updateBackground = newBackgroundUrl => {
  const element = document.querySelector(".card")
  element.style.background = 'url(' + newBackgroundUrl + ')'
}

const setBackgroundImage = city => {
    fetch(
        "https://api.unsplash.com/search/photos?query="
        + city
        + '&client_id=DBIgdNlwTNlxB9lJ6WC-P26Ct7ePyL7hm2z9wAEfGIw'
    ).then(response => response.json())
    .then(data => {
      const nextImage = Math.floor(Math.random() * data.results.length)
      return data.results[nextImage].urls.regular
    })
    .then(url => updateBackground(url))
    .catch(() => console.log("Could not find a image of that city"))
}

const displayError = () => {
  document.querySelector(".city").innerText = "Your city does not exist";
  document.querySelector(".icon").src = ""
  document.querySelector(".description").innerText = "Two possibilities exist:\n\nEither you are alone in the Universe and your city does not exist anymore.\n\nOr maybe you simply misspelled it.\n";
  document.querySelector(".temp").innerText = "404°C";
  document.querySelector(".humidity").innerText = "Humidity: 100.0%";
  document.querySelector(".wind").innerText = "Wind speed: 420km/h";
  document.querySelector(".weather").classList.remove("loading");
}
