const url_base = "https://api.openweathermap.org/data/2.5/";
const API_key = "b533307f7499889502d396e6615a0332";

$('document').ready(function(){
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) 
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  else 
    console.log("The Browser Does not Support Geolocation");
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  $.getJSON(url_base + 'weather?lat=' + lat + '&lon=' + long + '&units=metric&appid=' + API_key, function(data) {
    console.log(url_base + 'onecall?lat=' + lat + '&lon=' + long + '&units=metric&appid=' + API_key);
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

function convertIconCode(code) {
  switch(code) {
    case '01d':
    case '01n':
      return "fa-solid fa-sun";
    case '02d':
    case '02n':
      return "fa-regular fa-cloud-sun";
    case '03d':
    case '03n':
      return "fa-solid fa-cloud";
    case '04d':
    case '04n':
      return "fa-solid fa-cloud";
    case '09d':
    case '09n':
      return "fa-solid fa-cloud-showers-heavy";
    case '10d':
    case '10n':
      return "fa-solid fa-cloud-sun-rain";
    case '11d':
    case '11n':
      return "fa-solid fa-bolt";
    case '13d':
    case '13n':
      return "fa-solid fa-snowflake";
    case '50d':
    case '50n':
      return "fa-solid fa-smog";
  }
}

function showError(error) {
  if(error.PERMISSION_DENIED){
      console.log("The User have denied the request for Geolocation.");
  }
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

window.onscroll = function (e) {
  let navigationCoords = getCoords(document.getElementById("mainNavigation"));
  let headerDOM = document.getElementsByTagName("header");
  if (headerDOM[0].offsetHeight < navigationCoords.top) {
    $("#navigationPageIcon").removeClass("opacity-0");
  } else {
    $("#navigationPageIcon").addClass("opacity-0");
  }
}