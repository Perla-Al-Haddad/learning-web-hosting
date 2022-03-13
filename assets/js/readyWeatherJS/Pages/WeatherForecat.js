$('documnent').ready(function () {
  bindForecastWeatherData();
}); 

function bindForecastWeatherData() {
  getLocation(getPositionForForecastWeatherData);
}

function getPositionForForecastWeatherData(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  showForecastWeatherData(lat, long);
}

function showForecastWeatherData(lat, long) {
  $.getJSON(url_base + 'forecast?lat=' + lat + '&lon=' + long + '&units=metric&appid=' + API_key, function(data) {
    console.log(data);
    let forecastList = data['list']

    listHTML = "";
    listHTML += "<ol>"
    for (let i = 0; i < (forecastList.length > 15 ? 15 : forecastList.length); i++) {
      let dateStr = forecastList[i].dt_txt.split(" ");
      let dateObj = new Date(forecastList[i].dt_txt);
      listHTML += "<li>" + 
        convertNbToWeekDay(dateObj.getDay()) + " " + 
        convert(dateStr[1]) + " " + 
        forecastList[i].main.temp + " " +
        forecastList[i].main.temp_min + "/" +
        forecastList[i].main.temp_max + " " +
        forecastList[i].weather[0].description + ' ' +
        "<i class='fa-2x " + convertIconCode(forecastList[i].weather[0]['icon']) + "'></i>"
        "</li>";
    }
    listHTML += "</ol>";

    $("#responseList").html(listHTML);
  })
}
