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
      strokeColor: "#41c4f4"
    };
  }
};
self.startMarker = {};
self.endMarker = {};


self.map = {
  center: [37.8236,-122.3706],
  zoom: 10,
  options: function(){
    return {
      control: {}
    };
  },
  events: {
    idle: function (e,p,map,points){
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(self.polyLines.coords[0][0][0],self.polyLines.coords[0][0][1]));
      bounds.extend(new google.maps.LatLng(self.polyLines.coords[self.polyLines.coords.length-1][1][0],self.polyLines.coords[self.polyLines.coords.length-1][1][1]));
      p.fitBounds(bounds);
    }
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
    self.result.text = "Here is your route. It will be "+res.routes[0].legs[0].distance.text+"les and take about "+res.routes[0].legs[0].duration.text+".";
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
    self.startMarker = {
      position: [self.polyLines.coords[0][0][0],self.polyLines.coords[0][0][1]],
      decimals: 4,
      options: function(){
        return {
          label: "A",
          cursor: self.result.start,
        };
      },
    };
    self.endMarker = {
        position: [self.polyLines.coords[self.polyLines.coords.length-1][1][0],self.polyLines.coords[self.polyLines.coords.length-1][1][1]],
        decimals: 4,
        options: function(){
          return {
            label: "B",
            cursor: self.result.end,
          };
        },
      };
    console.log(self.result);
    console.log(self.polyLines.coords);
    // self.map.events.resize();
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
