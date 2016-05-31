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




    // vm.map = {center: [37.8716, -122.2727],
    //   zoom: 12 };

      vm.placesInfo = {
        text: "Here are the top results",
        array: [
          { name: 'Nico\'s Hideaway',
         id: 'ChIJjYHG16B-hYAR0idDoWkw-Gk',
         address: '1508 Walnut Street, Berkeley',
         price: 3,
         rating: 3.9,
         geometry: {
           lat: 37.871652,
           long: -122.268533
         },
         link: 'http://nicoshideaway.com/',
         open: false
        },
       { name: 'PIQ Berkeley',
         id: 'ChIJR1nqfZ5-hYARjXKsKfImu2c',
         address: '91 Shattuck Avenue, Berkeley',
         price: 2,
         rating: 4.4,
         geometry: {
           lat: 37.8728838,
           long: -122.2733821
         },
         link: 'http://www.piqberkeley.com/',
         open: true
         },
       { name: 'Nino\'s Pizzeria and Brazilian Restaurant',
         id: 'ChIJ51vG8ph-hYARb_C6YTwdPl0',
         address: '1916 Martin Luther King Junior Way, Berkeley',
         price: 2,
         rating: 4.1,
         geometry: {
           lat: 37.87513200000001,
           long: -122.2690164
         },
         link: 'https://ninosbrazilianpizzas.com/',
         open: false
         },
       { name: 'Corso',
         id: 'ChIJE5H8ep9-hYARYpxLSzekYjQ',
         address: '1788 Shattuck Avenue, Berkeley',
         price: 2,
         rating: 4,
         geometry: {
           lat: 37.87135809999999,
           long: -122.2680894
         },
         link: 'http://www.corsoberkeley.com/',
         open: true
         },
       { name: 'Belli Osteria',
         id: 'ChIJq21AiZ5-hYAR0xBVMKmQWSE',
         address: '2016 Shattuck Avenue, Berkeley',
         price: undefined,
         rating: 4,
         geometry: {
           lat: 37.8800004,
           long: -122.2684004
         },
         link: 'http://www.belliosteria.com/',
         open: false
         }
        ]
      };

    vm.markers = [];

    vm.marker = {
      position: [vm.placesInfo.array[0].geometry.lat,vm.placesInfo.array[0].geometry.long],
      decimals: 4,
      options: function(){
        return {
          title: vm.placesInfo.array[0].name,
        };
      }
    };

    vm.getMarkers = function(){
      vm.markers = [];
      vm.placesInfo.array.forEach(function(place,idx){
        marker = {
          position: [place.geometry.lat,place.geometry.long],
          decimals: 4,
          events: {
            click: function(e, p, map, points){
              var infowindow = new google.maps.InfoWindow({
                content: '<a target="_blank" href="'+place.link+'">'+
                '<h5>' + place.name + '</h5>' +
                '<p>'+place.address+'</p></a>'
              });
              infowindow.open(map, p);
            },
          },
          options: function(){
            return {
              title: place.name,
              label: place.name,
              // clickable: true,
              cursor: place.name,
            };
          },
        };
        vm.markers.push(marker);
      });
    };

    vm.getMarkers();

    vm.weatherInfo = {
      current: {
        image: "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
        link: "http://www.wunderground.com/US/CA/Berkeley.html",
        text: "It is currenty 61.0 F (16.1 C) and mostly cloudy in Berkeley"
      },
      forecast: {
        text: "Here is the forecast.",
        array: [
          {
            image: "http://icons.wxug.com/i/c/k/clear.gif",
            text: "A mix of clouds and sun. High 74F. Winds W at 10 to 15 mph.",
            title: "Monday"
          },
          {
            image: "http://icons.wxug.com/i/c/k/clear.gif",
            text: "A mix of clouds and sun. High 74F. Winds W at 10 to 15 mph.",
            title: "Monday"
          },
          {
            image: "http://icons.wxug.com/i/c/k/clear.gif",
            text: "A mix of clouds and sun. High 74F. Winds W at 10 to 15 mph.",
            title: "Monday"
          },
          {
            image: "http://icons.wxug.com/i/c/k/clear.gif",
            text: "A mix of clouds and sun. High 74F. Winds W at 10 to 15 mph.",
            title: "Monday"
          },
          {
            image: "http://icons.wxug.com/i/c/k/clear.gif",
            text: "A mix of clouds and sun. High 74F. Winds W at 10 to 15 mph.",
            title: "Monday"
          },
        ]
      }
    };

    vm.places = function(){
      console.log("btn ctrl",initialLocation);
      $http({
        method: "POST",
        url: "/api/places",
        data: {
          search: "Italian food",
          location: {
            lat: initialLocation.lat,
            long: initialLocation.long
          }
        }
      }).then(function success(res){
        console.log(res.data);
      }, function error(res){
        console.log(res.data);
      });
    };

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

    vm.weather = function($state){
      $http({
        method: "POST",
        url: "/api/weather",
        data: {
          location: "Berkeley, ca",
          date: Date.now()
        }
      }).then(function success(res){
        console.log(res.data);
        vm.text = res.data.current.text;
        vm.test = res.data;
      }, function error(res){
        console.log(res.data);
      });
    };



  }
