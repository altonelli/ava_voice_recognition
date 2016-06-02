angular
  .module('avaApp')
  .service('DirectionsService', DirectionsService);

DirectionsService.$inject = ['$http', '$q', 'WitService'];
function DirectionsService($http, $q, WitService) {
var self = this;
self.start = WitService.entities.start.value;
self.end = WitService.entities.end.value;

self.result = {};
self.polyLines = {
  coords: [],
  options: function(){
    return {
      strokeColor: "#d35400"
    };
  }
};
self.map = {
  center: [37.5,-122.5],
  zoom: 10,
  options: function(){
    return {
      control: {}
    };
  }
};


var request = {
  origin: self.start,
  destination: self.end,
  travelMode: google.maps.DirectionsTravelMode.DRIVING
};

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

self.directions = function(){
  console.log("directions being called from within driections service");
  var def = $q.defer();

  directionsService.route(request, function(res,status){
    console.log("LOOOK HERE, heard back from request");
    console.log(res);
    if(status !== google.maps.DirectionsStatus.OK) {
      def.reject({error: res});
    } else {
    self.result.text = "Here is your route. It will be "+res.routes[0].legs[0].distance.text+"les and take about "+(res.routes[0].legs[0].duration.text).slice(0,-1)+"utes.";
    self.result.waypoints = res.geocoded_waypoints;
    self.result.distance = res.routes[0].legs[0].distance.text;
    self.result.duration = res.routes[0].legs[0].duration.text;
    self.result.start = res.routes[0].legs[0].start_address;
    self.result.end = res.routes[0].legs[0].end_address;
    self.result.steps = [];
    res.routes[0].legs[0].steps.forEach(function(step,idx){
      var obj = {
        distance: step.distance.text,
        duration: step.duration.text,
        text: step.instructions
      };
      self.result.steps.push(obj);

      step.path.forEach(function(el){
        var lat = el.lat();
        var long = el.lng();
        var polyPoint = [lat,long];
        // console.log(polyPoint);
        var previousPoint;
        if (self.polyLines.coords[self.polyLines.coords.length-1] !== undefined){
          previousPoint = self.polyLines.coords[self.polyLines.coords.length-1][1];
        } else {
          previousPoint = polyPoint;
        }
        var line = [previousPoint,polyPoint];

        self.polyLines.coords.push(line);
      });
    });
    console.log(self.result);
    console.log(self.polyLines.coords);
    def.resolve(res);
  }
  });


  console.log("BUT WAIT THERE MORE");

  return def.promise;


  // function directionsSuccess(res){
  //   def.resolve(res);
  // }
  //
  // function directionsError(res){
  //   def.reject({error: res});
  // }






};


}
