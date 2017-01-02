var request = require('request');
var googleKey = process.env['GOOGLE_SECRET_KEY'];


function places(req, taco){
  var search = req.body.search;
  console.log(search);
  var location = "location="+req.body.location.lat+","+req.body.location.long;
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+location+"&radius=5000&keyword="+search+"&key="+googleKey;
  console.log("url:",url);
  var topList = [];
  request(url,function(err,res,body){
    console.log(body);
    var allResults = JSON.parse(body).results;
    if (err || allResults.length === 0){
      var response = {
        text: "No results found.",
      };
      console.log(response);
      taco.json(response);
    }

    allResults.forEach(function(result,idx){
      if (idx < 5){
        var obj = {};
        obj.name = result.name;
        obj.id = result.place_id;
        obj.address = result.vicinity;
        obj.price = result.price_level;
        obj.rating = result.rating;
        if (result.opening_hours){
          obj.open = result.opening_hours.open_now;
        }
        obj.geometry = {
          lat: result.geometry.location.lat,
          long: result.geometry.location.lng
        };
        var detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+obj.id+"&key="+googleKey;
        request(detailsUrl, function(err,res,body){
          // console.log(body);
          // console.log(obj);
          var details = JSON.parse(body).result;
          if (details.website){
            obj.link = details.website;
          }
          topList.push(obj);
          if(topList.length === 5 || topList.length === allResults.length){
            var response = {
              text: "Here are the top results.",
              array: topList
            };
            console.log(response);
            taco.json(response);
          }
        });
      }
    });
  });



}



function directions(req, taco){
  var start = req.body.locationStart;
  var end = req.body.locationEnd;
  console.log(start);
  console.log(end);

  var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+start+"&destination="+end+"&key=" + googleKey;

  request(url, function(err,res,body){
    console.log(body);
    var result = JSON.parse(body);
    var response = {};
    response.text = "Here is your route. It will be "+result.routes[0].legs[0].distance.text+"les and take about "+(result.routes[0].legs[0].duration.text).slice(0,-1)+"utes.";
    response.waypoints = result.geocoded_waypoints;
    response.distance = result.routes[0].legs[0].distance.text;
    response.duration = result.routes[0].legs[0].duration.text;
    response.start = result.routes[0].legs[0].start_address;
    response.end = result.routes[0].legs[0].end_address;
    response.steps = [];
    result.routes[0].legs[0].steps.forEach(function(step,idx){
      var obj = {
        distance: step.distance.text,
        duration: step.duration.text,
        text: step.html_instructions
      };
      response.steps.push(obj);
    });
    console.log(response);
    taco.json(response);
  });


}


module.exports = {
  places: places,
  directions: directions
};
