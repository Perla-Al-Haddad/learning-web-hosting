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

function getLocation(bindFunc) {
  if (navigator.geolocation) 
    navigator.geolocation.getCurrentPosition(bindFunc, showError);
  else 
    console.log("The Browser Does not Support Geolocation");
}

function showError(error) {
  if(error.PERMISSION_DENIED){
      console.log("The User have denied the request for Geolocation.");
  }
}

function convert(input) {
  return moment(input, 'HH:mm:ss').format('h:mm A');
}

function convertNbToWeekDay(nb) {
  switch(nb) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tueday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saterday";
  }
}