angular
  .module('avaApp')
  .controller("WeatherController", WeatherController);

  WeatherController.$inject = ['$http', '$state', 'WitService', 'WeatherService'];

  function WeatherController( $http, $state, WitService, WeatherService ){
    console.log("WeatherController called");


    var vm = this;
    vm.text = "";
    vm.info = {};
    vm.ctrl = "weather";

    vm.info = WeatherService.weather;
    vm.text = WeatherService.weather.current.text;
    if (!WeatherService.weather.current.image){
      vm.info.current.image = 'public/assets/pinpoint.png';
    }
    speak(vm.text);


  }
