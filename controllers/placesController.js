var request = require('request');
var googleKey = process.env['GOOGLE_SECRET_KEY'];


function places(req, taco){
  var search = req.body.search;
  var location = "location="+req.body.location.lat+","+req.body.location.long;
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+location+"&radius=500&name="+search+"&key="+googleKey;
  var topList = [];
  request(url,function(err,res,body){
    // console.log(body);
    var allResults = JSON.parse(body).results;
    allResults.forEach(function(result,idx){
      if (idx < 5){
        var obj = {}
        obj.name = result.name;
        obj.id = result.place_id;
        obj.address = result.vicinity;
        obj.price = result.price_level;
        obj.rating = result.rating;
        obj.geometry = {
          lat: result.geometry.location.lat,
          long: result.geometry.location.long
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
    response.text = "Here is your route.";
    response.waypoints = result.geocoded_waypoints;
    response.distance = result.routes[0].legs[0].distance.text;
    response.duration = result.routes[0].legs[0].duration.text;
    response.steps = [];
    result.routes[0].legs[0].steps.forEach(function(step,idx){
      var obj = {
        distance: step.distance.text,
        duration: step.duration.text,
        text: step.html_instructions
      };
      response.steps.push(obj);
    });
    taco.json(response);
  });


}


module.exports = {
  places: places,
  directions: directions
};
