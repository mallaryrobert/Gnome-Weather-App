/* ---------------------------------------------------------
   Connect to Weather API to access weather information
   --------------------------------------------------------- */

function weatherBalloon() {
  fetch('http://api.weatherapi.com/v1/forecast.json?key=30a12de67adf46c2ab5125216231110&q=02828&days=6&aqi=no&alerts=no')
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      drawWeather(data);
      console.log(data);
    })
    .catch(function () {
      // catch any errors
    });
}

/* ---------------------------------------------------------
   Display weather information
   --------------------------------------------------------- */

function drawWeather(d) {

  // Current weather

  $('.current h2').html(makeRoundNumber(d.current.temp_f));
  $('.current .high').html(makeRoundNumber(d.forecast.forecastday[0].day.maxtemp_f));
  $('.current .low').html(makeRoundNumber(d.forecast.forecastday[0].day.mintemp_f));
  $('.current .graphic').html(printGnomeGraphic(d.current.condition.text));
  $('.current h3').html(printWordGraphic(d.current.condition.text));

  // // Extra Info for current weather

  $('.extrainfo .details .humidity').html(d.forecast.forecastday[0].day.avghumidity);
  $('.extrainfo .details .soil').html(checkSoil(d.forecast.forecastday[0].day.totalpercip_in));
  $('.extrainfo .details .wind').html(d.forecast.forecastday[0].day.maxwind_mph);

  // // Hourly forecast
  
  $('.hourly').html(displayHourlyWeather(d));

  

  


  // // Daily forecast

  $('.extended li:nth-child(1) .day').html(displayDay(1));
  $('.extended li:nth-child(1) .high').html(makeRoundNumber(d.forecast.forecastday[1].day.maxtemp_f));
  $('.extended li:nth-child(1) .low').html(makeRoundNumber(d.forecast.forecastday[1].day.mintemp_f));
  $('.extended li:nth-child(1) .icon').html(printGraphic(d.forecast.forecastday[1].day.condition.text));

  $('.extended li:nth-child(2) .day').html(displayDay(2));
  $('.extended li:nth-child(2) .high').html(makeRoundNumber(d.forecast.forecastday[2].day.maxtemp_f));
  $('.extended li:nth-child(2) .low').html(makeRoundNumber(d.forecast.forecastday[2].day.mintemp_f));
  $('.extended li:nth-child(2) .icon').html(printGraphic(d.forecast.forecastday[2].day.condition.text));

  // $('.extended li:nth-child(3) .day').html(displayDay(3));
  // $('.extended li:nth-child(3) .high').html(makeRoundNumber(d.forecast.forecastday[3].day.maxtemp_f));
  // $('.extended li:nth-child(3) .low').html(makeRoundNumber(d.forecast.forecastday[3].day.mintemp_f));
  // $('.extended li:nth-child(3) .icon').html(printGraphic(d.forecast.forecastday[3].day.condition.text));

  // $('.extended li:nth-child(4) .day').html(displayDay(4));
  // $('.extended li:nth-child(4) .high').html(makeRoundNumber(d.forecast.forecastday[4].day.maxtemp_f));
  // $('.extended li:nth-child(4) .low').html(makeRoundNumber(d.forecast.forecastday[4].day.mintemp_f));
  // $('.extended li:nth-child(4) .icon').html(printGraphic(d.forecast.forecastday[4].day.condition.text));

  // $('.extended li:nth-child(5) .day').html(displayDay(5));
  // $('.extended li:nth-child(5) .high').html(makeRoundNumber(d.forecast.forecastday[5].day.maxtemp_f));
  // $('.extended li:nth-child(5) .low').html(makeRoundNumber(d.forecast.forecastday[5].day.mintemp_f));
  // $('.extended li:nth-child(5) .icon').html(printGraphic(d.forecast.forecastday[5].day.condition.text));

  // $('.extended li:nth-child(6) .day').html(displayDay(6));
  // $('.extended li:nth-child(6) .high').html(makeRoundNumber(d.forecast.forecastday[5].day.maxtemp_f));
  // $('.extended li:nth-child(6) .low').html(makeRoundNumber(d.forecast.forecastday[5].day.mintemp_f));
  // $('.extended li:nth-child(6) .icon').html(printGraphic(d.forecast.forecastday[5].day.condition.text));

  changeTheme(d.current.condition.text);

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function () {
  weatherBalloon();
}

/* -----------------------------------------------------------
   Event to enter the main content display from the Home page
   ----------------------------------------------------------- */

$('.cover button').click(function () {
  $('.cover').addClass('open');
})