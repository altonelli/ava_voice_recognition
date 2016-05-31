angular
  .module('avaApp')
  .controller("PlacesController", PlacesController);

  PlacesController.$inject = ['$http', '$state'];

  function PlacesController( $http, $state ){

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


  }
