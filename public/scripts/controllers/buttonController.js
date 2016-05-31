console.log("in btn ctrl");

angular
  .module('avaApp')
  .controller("ButtonController", ButtonController);

  ButtonController.$inject = ['$http'];

  function ButtonController( $http ){
    vm = this;
    vm.list = [];
    vm.text = "";
    vm.test = null;

    vm.map = {center: [37.8716, -122.2727],
      zoom: 12 };

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
      map = vm.map;
      console.log(map);
      vm.markers = [];
      vm.placesInfo.array.forEach(function(place,idx){
        marker = {
          position: [place.geometry.lat,place.geometry.long],
          decimals: 4,
          options: function(){
            return {
              title: place.name,
              label: place.name,
              // clickable: true,
              cursor: place.name,
            };
          },
          events: {
            click: function(){
              console.log("in click");
              // var infowindow = new google.maps.InfoWindow({
              //   content: ""
              // });
              // infowindow.setContent(place.name);
              // infowindow.open(map, this);
            }
          }
        };

      //   console.log("logging idx",idx);
      //  google.maps.event.addListener(marker,'click', function() {
      //    console.log("in func");
      //    infowindow.setContent(place.name);
      //    infowindow.open(vm.map, marker);
      //  });
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
