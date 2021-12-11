/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here

  window.getWeather = getWeather;
  function getWeather() {
    let url = "https://api.weatherbit.io/v2.0/current?";
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;
    let key = "e4af176ce2f44ddd99524772c0eb8000";

    //create url for weather api
    let fullUrl = url + "lat=" + lat + "&lon=" + lon + "&key=" + key;

    //get country/region names
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

    //get data from weather api
    axios.get(fullUrl).then(response => {
      const results = response.data;

      let city = results.data[0].city_name;
      let country = regionNames.of(results.data[0].country_code);
      let temp = results.data[0].temp;
      let weatherDescription = results.data[0].weather.description;
      let weatherIcon = results.data[0].weather.icon;

      let dayNight = weatherIcon.slice(-1);
      let background = "bg-light";
      let color = "text-dark";

      if (dayNight == "n") {
        background = "bg-dark";
        color = "text-light";
      }

      document.querySelector(
        "#main-result"
      ).innerHTML = `<div class="widget d-flex col-3 mx-auto card shadow p-3 mb-5 rounded border-primary ${background}">
      <div class="card-header">
        <h3 class="card-title ${color}">${city}</h3>
        <h6 class="card-subtitle ${color}">${country}</h6>
        </div>
        <div class="card-body">
        <img src="https://www.weatherbit.io/static/img/icons/${weatherIcon}.png" width="25%" class="mx-auto">
        <p class="${color}">${weatherDescription}</p>
        </div>
        <div class="card-footer ${background} border-primary">
          <h1 class="text-primary ${color}">${temp} cº</h1>
        </div>
      </div>`;
    });
  }
};
