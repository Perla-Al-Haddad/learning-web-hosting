$('document').ready(function() {
  bindCurrentWeatherData();
});

function bindCurrentWeatherData() {
  getLocation(getPositionForCurrentWeatherData);
}

function getPositionForCurrentWeatherData(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  showCurrentWeatherData(lat, long);
}

function showCurrentWeatherData(lat, long) {
  $.getJSON(url_base + 'weather?lat=' + lat + '&lon=' + long + '&units=metric&appid=' + API_key, function(data) {
    let weather_data = data['weather'][0];
    let temp_data = data['main'];

    $("#weatherLocation").html(data['name']);
    $(".mainTemp").html(Math.round(temp_data['temp']) + '°C');
    $("#minTemp").html("Min: " + Math.round(temp_data['temp_min']) + '°C');
    $("#maxTemp").html("Max: " + Math.round(temp_data['temp_max']) + '°C');
    $(".weatherIcon").addClass(convertIconCode(weather_data['icon']));
    $("#weatherDesc").html(weather_data['description']);
    $("#humidityTemp").html(temp_data['humidity'] + "%");
    $("#pressureTemp").html(temp_data['pressure'] + "  hPa");
    $("#windSpeed").html(data['wind']['speed'] + " m/s");
  })
}
