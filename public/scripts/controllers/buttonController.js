angular
  .module('avaApp')
  .controller("ButtonController", ButtonController);

  ButtonController.$inject = ['$http', '$state'];

  function ButtonController( $http, $state ){
    vm = this;
    vm.list = [];
    vm.text = "";
    vm.test = null;

    vm.map = {
      center: [37.5,-122.5],
      zoom: 10,
      options: function(){
        return {
          control: {}
        };
      }
    };

    vm.changeStateToWeather = function(){
      console.log("changeing from state",$state.current);
      $state.go('main.weather', {}, { inherit: true });
      console.log("to",$state.transition);
    };

    vm.changeStateToPlaces = function(){
      console.log("changeing from state",$state.current);
      $state.go('main.places', {}, { inherit: true });
      console.log("to",$state.transition);
    };

    vm.directionMarkers = [];

    vm.directionsInfo = {
      text: "Here is your route.",
      distance: "13.9 mi",
      duration: "26 mins",
      start: "Berkeley, CA, USA",
      end: "San Francisco, CA, USA",
      waypoints: [{
           "geocoder_status" : "OK",
           "place_id" : "ChIJ00mFOjZ5hYARk-l1ppUV6pQ",
           "types" : [ "locality", "political" ]
        },
        {
           "geocoder_status" : "OK",
           "place_id" : "ChIJIQBpAG2ahYAR_6128GcTUEo",
           "types" : [ "locality", "political" ]
        }],
      steps: [
      { distance: '1.4 mi',
       duration: '6 mins',
       text: 'Head <b>west</b> on <b>University Ave</b> toward <b>M.L.K. Jr Way</b>' },
     { distance: '0.4 mi',
       duration: '1 min',
       text: 'Keep <b>left</b> to stay on <b>University Ave</b>' },
     { distance: '0.2 mi',
       duration: '1 min',
       text: 'Turn <b>right</b> onto the <b>I-80 W</b>/<b>I-580 E</b> ramp to <b>San Francisco</b>' },
     { distance: '2.4 mi',
       duration: '3 mins',
       text: 'Keep <b>left</b> at the fork and merge onto <b>I-580 E</b>/<b>I-80 W</b>' },
     { distance: '8.1 mi',
       duration: '11 mins',
       text: 'Keep <b>right</b> to continue on <b>I-80 W</b>, follow signs for <b>San Francisco</b><div style="font-size:0.9em">Partial toll road</div>' },
     { distance: '1.1 mi',
       duration: '3 mins',
       text: 'Take exit <b>1B</b> to merge onto <b>US-101 N</b> toward <b>Golden Gate Bridge</b>' },
     { distance: '0.3 mi',
       duration: '2 mins',
       text: 'Turn <b>right</b> onto <b>Market St</b>' } ]
    };

    var request = {
      origin: vm.directionsInfo.start,
      destination: vm.directionsInfo.end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    vm.polylines = {
      coords: getCoords(request),
      options: function(){
        return {
          strokeColor: "#d35400"
        };
      }
    };

    function getCoords(request){
      directionsService.route(request, function(res,status){
        var coords = [];
        console.log(res);
        var steps = res.routes[0].legs[0].steps;
        steps.forEach(function(step,idx){
          // var polyPath = [];
          step.path.forEach(function(el){
            var lat = el.lat();
            var long = el.lng();
            var polyPoint = [lat,long];
            // console.log(polyPoint);
            var previousPoint = coords[coords.length-1][1];
            var polyLine = [previousPoint,polyPoint];
            coords.push(polyLine);
          });
        });
        return coords;
      });
    }

    vm.directions = function(){
      $http({
        method: "POST",
        url: "/api/directions",
        data: {
          locationStart: "Berkeley",
          locationEnd: "San Francisco"
        }
      }).then(function success(res){
        console.log(res.data);
      }, function error(res){
        console.log(res.data);
      });
    };



  }
