var request = require('request');
var q = require('q');
var googleKey = process.env['GOOGLE_SECRET_KEY'];
var weatherKey = process.env['WEATHER_SECRET_KEY'];


function forecast(req,taco){
  var location = req.body.location;


  var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+ location +"&key=" + googleKey;

  var coordinates = {};
  var formattedAddress = "";

  var current = {};
  var future = {};

  request(geocodeUrl,function(err,res,body){
    if(err || JSON.parse(body).results.length === 0){
      console.log("Error:",err);
      current.text = "I'm sorry I could not find that location.";
      current.link = "https://www.wunderground.com/";
      var obj = {
        current: current
      };
      console.log("return obj: " + obj.current.text);
      taco.json(obj);
    }
    else{
    console.log("geolocation return: "+body);
    coordinates = JSON.parse(body).results[0].geometry.location;
    formattedAddress = JSON.parse(body).results[0].formatted_address;
    console.log(coordinates);
    geolocate(coordinates);
    }
  });



  function geolocate(coords){
    var url = "http://api.wunderground.com/api/" + weatherKey + "/geolookup/q/"+ coords.lat+","+coords.lng+".json";
    request(url, function(err,res,body){
      if(err){console.log("error in geolocate",err);}
      var urlStr = JSON.parse(body).location.l;
      var currentUrl = "http://api.wunderground.com/api/" + weatherKey + "/conditions" + urlStr + ".json";
      var futureUrl = "http://api.wunderground.com/api/" + weatherKey + "/forecast10day" + urlStr + ".json";
      request(currentUrl, function(err,res,body){
        if(err){console.log("Error in current forcast:",err);}
        var result = JSON.parse(body);
        current.text = "It is currently "+result.current_observation.temperature_string+" and "+result.current_observation.weather.toLowerCase()+" in "+result.current_observation.display_location.city;
        current.image = result.current_observation.icon_url;
        current.link = result.current_observation.forecast_url;
        return resolve();
      });

      request(futureUrl, function(err,res,body){
        if(err){console.log("Error in current forcast:",err);}
        var result = JSON.parse(body).forecast.txt_forecast.forecastday;
        future.text = "Here is the forecast.";
        future.array = [];
        result.forEach(function(period,idx){
          if (idx % 2 != 1) {
            var day = {};
            day.title = period.title;
            day.text = period.fcttext;
            day.image = period.icon_url;
            future.array.push(day);
          }
        });
        return resolve();
      });

      function resolve(){
        if (current.text && future.text){
          var obj = {
            current: current,
            forecast: future
          };
          taco.json(obj);
        }
      }

    });
  }

}



  module.exports = {
    forecast: forecast
  };
