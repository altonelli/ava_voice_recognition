console.log("in btn ctrl");

angular
  .module('avaApp')
  .controller("ButtonController", ButtonController);

  ButtonController.$inject = ['$http'];

  function ButtonController( $http ){
    vm = this;

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
          start: "Berkeley",
          end: "San Francisco"
        }
      }).then(function success(res){
        console.log(res.data);
      }, function error(res){
        console.log(res.data);
      });
    };

    vm.weather = function(){
      $http({
        method: "POST",
        url: "/api/weather",
        data: {
          location: "Berkeley, ca",
          date: Date.now()
        }
      }).then(function success(res){
        console.log(res.data);
      }, function error(res){
        console.log(res.data);
      });
    };



  }
