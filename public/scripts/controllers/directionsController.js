angular
  .module('avaApp')
  .controller("DirectionsController", DirectionsController);

  DirectionsController.$inject = ['$http', '$state'];

  function DirectionsController( $http, $state ){

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
