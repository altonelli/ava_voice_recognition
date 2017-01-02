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
        if (!data.current.image){
          vm.info.current.image = 'public/assets/pinpoint.png';
        }
        speak(vm.text);
      });
    }

    getForecast();


  }
