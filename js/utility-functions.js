/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

   function changeTheme(d){
  
    // if the description includes the word "rain"
    if( d.indexOf('rain') > 0 ) {
      $('body').addClass('rainy');
  
    // if the description includes the word "cloud"
    } else if( d.indexOf('cloud') > 0 ) {
      $('body').addClass('cloudy');
  
    // if the description includes the word "sunny"  
    } else if( d.indexOf('sunny') > 0 ) {
      $('body').addClass('sunny');
  
    // if none of those cases are true, assume it's clear
    } else {
      $('body').addClass('clear');
    }
  
  }
  
  
  /* -----------------------------------------------
     Function for printing weather-specific graphic
     ----------------------------------------------- */
  
  function printGraphic(d){
    
    // if the description includes the word "rain"
    if( d.indexOf('rain') > 0 || d === 'Rain') {
      return '<i class="fa-solid fa-cloud-showers-heavy"></i>';
    
    // if the description includes the word "cloud"
    } else if( d.indexOf('cloud') > 0 || d === 'Cloudy' ) {
      return '<i class="fa-solid fa-cloud"></i>';
    
    // if the description includes the word "sunny"
    } else if( d.indexOf('sunny') > 0 || d === 'Sunny') {
      return '<i class="fa-solid fa-sun"></i>';
  
    // if none of those cases are true, assume it's clear
    } else {
      return '<i class="fa-solid fa-cloud"></i>';
    }
  
  }

  function printGnomeGraphic(d){
    
    // if the description includes the word "rain"
    if( d.indexOf('rain') > 0 ) {
      return '<img src="img/RainyGnome.png" alt="Cloud icon">';
    
    // if the description includes the word "cloud"
    } else if( d.indexOf('cloud') > 0 ) {
      return '<img src="img/CloudyGnome.png" alt="Cloud icon">';
    
    // if the description includes the word "sunny"
    } else if( d.indexOf('sunny') > 0 ) {
      return '<img src="img/SunnyGnome.png" alt="Cloud icon">';
    
    // if none of those cases are true, assume it's clear
    } else {
      return '<img src="img/ClearGnome.png" alt="Cloud icon">';
    }
  
  }
  
  function printWordGraphic(d){
    
    // if the description includes the word "rain"
    if( d.indexOf('rain') > 0  ) {
      return 'Gnomes are taking the day off and so should you. The Earth can water your garden today.';
    
    // if the description includes the word "cloud"
    } else if( d.indexOf('cloud') > 0  ) {
      return 'The gnomes are sad. The cloudy weather puts a damper on garden work today.';
    
    // if the description includes the word "sunny"
    } else if( d.indexOf('sunny') > 0  ) {
      return "It's a Gnome-Tastic day! Perfect conditions to take care of your garden!";
    
    // if none of those cases are true, assume it's clear
    } else {
      return 'Us garden gnomes are sad, we are not sure what the conditions will hold today.';
    }
  
  }
  
  
  /* -----------------------------------------------
     Function for converting time to hours/minutes
     ----------------------------------------------- */
  
  function convertTime(t){
  
    var unixTimestamp = t;
    // since javascript works in milliseconds, you should convert 
    // the time into milliseconds by multiplying it by 1000.
    var date = new Date(unixTimestamp * 1000);
    // hours part from the timestamp (extra code needed to convert from military)
    var hours = (date.getHours() + 24) % 12 || 12;;
    // minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // will display time in 11:10 format
    var formatTime = hours + ':' + minutes.substr(-2);
    // send formatted date back
    return formatTime;
  
  }
  
  
  /* -----------------------------------------------
     Function for creating day of the week
     ----------------------------------------------- */
  
  // based on a system where 0 = today, 1 = tomorrow, etc.
  // note: the number system below does not immediately correlate
  // for example, 0 for today does not line up with 0 for Sunday below
  
  // how this works – in the return statement, d.getDay() gets today's date
  // as a number (if today is Thursday, d.getDay() will be 4)
  // adding "n" to this number gives you how many days from today.
  // n is passed as an argument to the displayDay() function
  // in the main body of the code above.
  // if today is Thursday, the 4th day of the week,
  // and the number 2 is passed as an argument, 
  // the function will return the number 6. 6 maps to Saturday in the 
  // weekday array below.
  
  function displayDay(n){
  
    var d = new Date();
    var weekday = new Array();
  
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
  
    var dispDay = d.getDay() + n;
  
    // adjust number system for numbers over 6
    // subtract 7 from totals higher than 6
    // to keep the day numbers in the array range above
    if(dispDay > 6){
      dispDay = dispDay - 7;
    }
  
    return weekday[ dispDay ];
  
  }

  // Function for making a round number 

  function makeRoundNumber(n){
    return Math.round(n);
  }

  function checkSoil(n){
    
    if (n > .5){
      return'<i class="fa-solid fa-thumbs-up"></i>';
    
    } else {
      return '<i class="fa-solid fa-thumbs-down"></i>';
    }
  }

  function getHour(t){
    var unixTimestamp = t;
    var date = new Date(unixTimestamp * 1000);
    var hour = date.getHours();
    return hour;
  }

  function getNextTenHours(t) {
    // get the current hour
    const n = getHour(t);
    // array to collect next hours
    let a = [];
    // generate next hours
    for (let i = 0; i < 10; i++) {
      let forecastedHour = i + n;
      if (forecastedHour > 24) {
        forecastedHour = forecastedHour - 24;
      }

      let time;
      if (forecastedHour < 13) {
        time = `${forecastedHour} am`;
      } else {
        time = `${forecastedHour - 12} pm`;
      }
      a.push(time);
    }
    return a;
  }

  function displayHourlyWeather(d){
    // get the next 10 hours
    let hours = getNextTenHours(d.current.last_updated_epoch);
    // array to collect hours and weather info
    let a = [];

    // generate data and markup
    hours.forEach(function(hourString){
      const hour = hourString.split(" ")[0];
      const graphic = printGraphic(d.forecast.forecastday[0].day.condition.text);
      const temp = makeRoundNumber(d.forecast.forecastday[0].hour[hour].temp_f);
      a.push(`<div><h3>${hourString}</h3>${graphic}<p>${temp}</p></div>`);
    })

    return a;
  }
    