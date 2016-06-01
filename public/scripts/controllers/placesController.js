angular
  .module('avaApp')
  .controller("PlacesController", PlacesController);

  PlacesController.$inject = ['$http', '$state'];

  function PlacesController( $http, $state ){
    var vm = this;


    vm.placesInfo = {};

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
        vm.placesInfo = res.data;
        vm.map = {
          center: [37.8716, -122.2727],
          zoom: 16 };
        vm.getMarkers();


        console.log("DONE");
      }, function error(res){
        console.log(res.data);
      });
    };

    vm.places();

    vm.markers = [
      {
        position: [initialLocation.lat,initialLocation.long],
        decimals: 4,
        events: {
          click: function(e, p, map, points){
            var infowindow = new google.maps.InfoWindow({
              content: '<h5>Current Location</h5>'
            });
            infowindow.open(map, p);
          },
        },
        options: function(){
          return {
            label: "!",
            cursor: "Current Location",
          };
        },
      }
    ];

    vm.getMarkers = function(){
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

  }



  //////////////// SEED DATA ///////////////
  //   vm.placesInfo = {
  //     text: "Here are the top results",
  //     array: [
  //       { name: 'Nico\'s Hideaway',
  //      id: 'ChIJjYHG16B-hYAR0idDoWkw-Gk',
  //      address: '1508 Walnut Street, Berkeley',
  //      price: 3,
  //      rating: 3.9,
  //      geometry: {
  //        lat: 37.871652,
  //        long: -122.268533
  //      },
  //      link: 'http://nicoshideaway.com/',
  //      open: false
  //     },
  //    { name: 'PIQ Berkeley',
  //      id: 'ChIJR1nqfZ5-hYARjXKsKfImu2c',
  //      address: '91 Shattuck Avenue, Berkeley',
  //      price: 2,
  //      rating: 4.4,
  //      geometry: {
  //        lat: 37.8728838,
  //        long: -122.2733821
  //      },
  //      link: 'http://www.piqberkeley.com/',
  //      open: true
  //      },
  //    { name: 'Nino\'s Pizzeria and Brazilian Restaurant',
  //      id: 'ChIJ51vG8ph-hYARb_C6YTwdPl0',
  //      address: '1916 Martin Luther King Junior Way, Berkeley',
  //      price: 2,
  //      rating: 4.1,
  //      geometry: {
  //        lat: 37.87513200000001,
  //        long: -122.2690164
  //      },
  //      link: 'https://ninosbrazilianpizzas.com/',
  //      open: false
  //      },
  //    { name: 'Corso',
  //      id: 'ChIJE5H8ep9-hYARYpxLSzekYjQ',
  //      address: '1788 Shattuck Avenue, Berkeley',
  //      price: 2,
  //      rating: 4,
  //      geometry: {
  //        lat: 37.87135809999999,
  //        long: -122.2680894
  //      },
  //      link: 'http://www.corsoberkeley.com/',
  //      open: true
  //      },
  //    { name: 'Belli Osteria',
  //      id: 'ChIJq21AiZ5-hYAR0xBVMKmQWSE',
  //      address: '2016 Shattuck Avenue, Berkeley',
  //      price: undefined,
  //      rating: 4,
  //      geometry: {
  //        lat: 37.8800004,
  //        long: -122.2684004
  //      },
  //      link: 'http://www.belliosteria.com/',
  //      open: false
  //      }
  //     ]
  //   };
