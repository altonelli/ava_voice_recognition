angular
.module('avaApp')
.controller("DirectionsController", DirectionsController);

DirectionsController.$inject = ['$http', '$state', 'DirectionsService'];

function DirectionsController( $http, $state, DirectionsService ){
  vm = this;
  vm.start = DirectionsService.start;
  vm.end = DirectionsService.end;

  vm.polyLines = DirectionsService.polyLines;
  vm.map = DirectionsService.map;
  vm.result = DirectionsService.result;

  vm.text = "hello world";

  console.log(vm.polyLines);
  console.log("end of drections controller");
  console.log($state.current);
  speak(vm.result.text);

}
