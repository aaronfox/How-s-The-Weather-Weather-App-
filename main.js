// see https://api.wunderground.com/api/1bb64d426cfb80d8/geolookup/conditions/q/38.9989499,-84.62661109999999.json for example json
function getGeoData(fn) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        latLongObject = {
          latitude: lat,
          longitude: long
        };
        fn(latLongObject);
      });
  }
};

$(document).ready(function() {
  getGeoData(function(latLongObject) {
    latitude = latLongObject.latitude;
    longitude = latLongObject.longitude;
    $.getJSON("https://api.wunderground.com/api/1bb64d426cfb80d8/geolookup/conditions/q/" + latitude + "," + longitude + ".json", function(weatherJSONObject) {

      function changeTemp(type) {
        if (type == "celsius") {
          $("#temperature").html(weatherJSONObject.current_observation.temp_c + " &#8451");
        } else {
          $("#temperature").html(weatherJSONObject.current_observation.temp_f + " &#8457");
        }
      };

      function changeFeelsLikeTemp(type) {
        if (type == "celsius") {
          $("#feelslike-temperature").html(weatherJSONObject.current_observation.feelslike_c + " &#8451");
        } else {
          $("#feelslike-temperature").html(weatherJSONObject.current_observation.feelslike_f + " &#8457");
        }
      };

      $("#temperature").html(weatherJSONObject.current_observation.temp_f + " &#8457");
      $("#feelslike-temperature").html(weatherJSONObject.current_observation.feelslike_f + " &#8457");
      $("#city").html(weatherJSONObject.location.city);
      $("#country").html(weatherJSONObject.location.country_name);
      $("#state").html(weatherJSONObject.location.state);
      $(".weather-state").html(weatherJSONObject.current_observation.weather);
      $("#wind").html(weatherJSONObject.current_observation.wind_string);
      var icon_url = weatherJSONObject.current_observation.icon_url;
      var icon_url_array = icon_url.split("");
      icon_url_array.splice(4, 0, "s")
      icon_url_array = icon_url_array.join("");
      $(".icon").attr("src", icon_url_array);
      // explore why these functions don't work but the two after them do
      /*$(".celsius").on("click", getTemp("celsius"));
      $(".fahrenheit").on("click", getTemp("fahrenheit"));*/
      $(".fahrenheit").on("click", function() {
        changeTemp("fahrenheit");
        changeFeelsLikeTemp("fahrenheit");
      });
      //$(".fahrenheit").on("click", changeTemp("fahrenheit");
      $(".celsius").on("click", function() {
        changeTemp("celsius");
        changeFeelsLikeTemp("celsius");
      });

    });
  });
});