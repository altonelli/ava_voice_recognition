angular
  .module('avaApp')
  .controller("PlacesController", PlacesController);

  PlacesController.$inject = ['$http', '$state', 'PlacesService'];

  function PlacesController( $http, $state, PlacesService ){
    var vm = this;

    vm.currentLocation = PlacesService.currentLocation;
    vm.markers = PlacesService.markers;

    vm.map = PlacesService.map;

    vm.places = PlacesService.places;

    vm.text = PlacesService.text;
    speak(vm.text);
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
