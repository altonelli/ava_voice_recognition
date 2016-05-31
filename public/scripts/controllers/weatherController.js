angular
  .module('avaApp')
  .controller("WeatherController", WeatherController);

  WeatherController.$inject = ['$http', '$state'];

  function WeatherController( $http, $state ){
    console.log("called");
    var vm = this;
    vm.text = "";
    vm.info = {};
    vm.ctrl = "weather";

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
        vm.info = res.data;
      }, function error(res){
        console.log(res.data);
      });
    };

    vm.weather();


  }
