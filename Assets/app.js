$(document).ready(function () {
  console.log("ready!");

  var iconsUrl = "https://openweathermap.org/img/w/04d.png";

  var weatherData = [];

  var searchInput = $("#s_input");
  var getWeatherBtn = $("#search_btn");

  var readyHistory = [];

  if (localStorage.getItem("History")) {
    var data = JSON.parse(localStorage.getItem("History"));
    console.log(data);
    for (i = 0; i < data.length; i++) {
      $("#history_container").append(
        '<button class="btn" data-city="' +
          data[i] +
          '" id="s_history_btn">' +
          data[i] +
          "</button>"
      );
    }
  }

  getWeatherBtn.on("click", function () {
    var cityName = searchInput.val();
    console.log(cityName);

    var nameUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial&cnt=8";

    fetch(nameUrl)
      .then(function (response) {
        if (!response.ok) {
          throw Error("Error");
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var cityNameText = data.city.name;
        readyHistory.push(cityNameText);
        console.log(readyHistory);
        console.log(cityNameText);
        $("#selected_city").text(cityNameText + " ");

        $("#history_container").append(
          '<button class="btn" data-city="' +
            cityNameText +
            '" id="s_history_btn">' +
            cityNameText +
            "</button>"
        );

        var lat = data.city.coord.lat;
        console.log(lat);
        var lon = data.city.coord.lon;
        console.log(lon);

        var requestUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial";
        fetch(requestUrl)
          .then(function (response) {
            if (!response.ok) {
              throw Error("There's been a boo on ONECALL");
            }
            return response.json();
          })
          .then(function (data) {
            var userCitySearch = {
              city: cityNameText,
              wind: data.daily[0].wind_speed,
              temp: data.daily[0].temp.day,
              humidity: data.daily[0].humidity,
              uv: data.daily[0].uvi,
            };

            localStorage.setItem("City", JSON.stringify(userCitySearch));

            localStorage.setItem("History", JSON.stringify(readyHistory));

            console.log(userCitySearch);
            $(".container").empty();

            $("s_input").text("");

            var date = new Date(data.daily[0].dt * 1000);

            var dayDigit = date.getDate();
            var monthDigit = date.getMonth();
            var yearDigit = date.getFullYear();

            $("#current_date").text(date.toLocaleString());

            console.log(data);
            $("#temp").text(data.daily[0].temp.day + "°F");
            $("#wind").text(data.daily[0].wind_speed + " MPH");
            $("#humidity").text(data.daily[0].humidity + " %");
            $("#uv").text(data.daily[0].uvi + "+");

            $("section.hide").removeClass("hide");

            console.log(data.daily[2].dt);

            for (i = 1; i <= 5; i++) {
              var iconcode = data.daily[i].weather[0].icon;
              var milliseconds = new Date(data.daily[i].dt * 1000);

              var futureDate = milliseconds.toLocaleString().substr(-21, 9);

              console.log(data.daily[i].weather[0].icon);

              var futureIcon =
                "http://openweathermap.org/img/w/" + iconcode + ".png";

              var futureTemp = data.daily[i].temp.day;
              var futureWindSpeed = data.daily[i].wind_speed;
              var futureHumidity = data.daily[i].humidity;

              $(".container").append(
                '<div class="card"><h4 id="fd">' +
                  futureDate +
                  '</h4><img id="' +
                  i +
                  '" src=""><p id="ft">' +
                  futureTemp +
                  '°F</p><p id="fw">' +
                  futureWindSpeed +
                  ' MPH</p><p id="fh">' +
                  futureHumidity +
                  "%</p></div>"
              );

              $("#" + i).attr("src", futureIcon);
            }
          });
      });
  });

  function getHistoryWeather() {
    console.log("hello");
    var cityName = $(this).text();
    console.log(cityName);

    var nameUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial&cnt=8";

    fetch(nameUrl)
      .then(function (response) {
        if (!response.ok) {
          throw Error("Error");
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var cityNameText = data.city.name;

        console.log(cityNameText);
        $("#selected_city").text(cityNameText + " ");

        $("#history_container").append(
          '<button class="btn" data-city="' +
            cityNameText +
            '" id="s_history_btn">' +
            cityNameText +
            "</button>"
        );

        var lat = data.city.coord.lat;
        console.log(lat);
        var lon = data.city.coord.lon;
        console.log(lon);

        var requestUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial";
        fetch(requestUrl)
          .then(function (response) {
            if (!response.ok) {
              throw Error("There's been a boo on ONECALL");
            }
            return response.json();
          })
          .then(function (data) {
            var userCitySearch = {
              city: cityNameText,
              wind: data.daily[0].wind_speed,
              temp: data.daily[0].temp.day,
              humidity: data.daily[0].humidity,
              uv: data.daily[0].uvi,
            };

            localStorage.setItem("City", JSON.stringify(userCitySearch));

            console.log(userCitySearch);
            $(".container").empty();

            $("s_input").text("");

            var date = new Date(data.daily[0].dt * 1000);

            var dayDigit = date.getDate();
            var monthDigit = date.getMonth();
            var yearDigit = date.getFullYear();

            $("#current_date").text(date.toLocaleString());

            console.log(data);
            $("#temp").text(data.daily[0].temp.day + "°F");
            $("#wind").text(data.daily[0].wind_speed + " MPH");
            $("#humidity").text(data.daily[0].humidity + " %");
            $("#uv").text(data.daily[0].uvi + "+");

            $("section.hide").removeClass("hide");

            console.log(data.daily[2].dt);

            for (i = 1; i <= 5; i++) {
              var iconcode = data.daily[i].weather[0].icon;
              var milliseconds = new Date(data.daily[i].dt * 1000);

              var futureDate = milliseconds.toLocaleString().substr(-21, 9);

              console.log(data.daily[i].weather[0].icon);

              var futureIcon =
                "http://openweathermap.org/img/w/" + iconcode + ".png";

              var futureTemp = data.daily[i].temp.day;
              var futureWindSpeed = data.daily[i].wind_speed;
              var futureHumidity = data.daily[i].humidity;

              $(".container").append(
                '<div class="card"><h4 id="fd">' +
                  futureDate +
                  '</h4><img id="' +
                  i +
                  '" src=""><p id="ft">' +
                  futureTemp +
                  '°F</p><p id="fw">' +
                  futureWindSpeed +
                  ' MPH</p><p id="fh">' +
                  futureHumidity +
                  "%</p></div>"
              );

              $("#" + i).attr("src", futureIcon);
            }
          });
      });
    $("#s_input").val("");
  }

  $(document.body).on("click", "#s_history_btn", getHistoryWeather);

  //event listener and a function of the entire program
});
