angular
  .module('avaApp')
  .controller("WeatherController", WeatherController);

  WeatherController.$inject = ['$http', '$state', 'WitService', 'WeatherService'];

  function WeatherController( $http, $state, WitService, WeatherService ){
    console.log("called");
    var vm = this;
    vm.text = "";
    vm.info = {};
    vm.ctrl = "weather";

    function getForecast(){
      WeatherService.getWeather().then(function(data){
        console.log("Controller",data);
        vm.info = data;
        vm.text = data.current.text;
        speak(vm.text);
      });
    }

    getForecast();

    // vm.weather = function($state){
    //   $http({
    //     method: "POST",
    //     url: "/api/weather",
    //     data: {
    //       location: "Berkeley, ca",
    //       date: Date.now()
    //     }
    //   }).then(function success(res){
    //     console.log(res.data);
    //     vm.text = res.data.current.text;
    //     vm.info = res.data;
    //   }, function error(res){
    //     console.log(res.data);
    //   });
    // };
    //
    // vm.weather();


  }
