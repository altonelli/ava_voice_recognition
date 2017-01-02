angular
  .module('avaApp')
  .controller("ButtonController", ButtonController);

  ButtonController.$inject = ['$http', '$state','WitService'];

  function ButtonController( $http, $state, WitService ){
    vm = this;

    vm.testing = function(){
      WitService.entities = {
        intent: {
          value: "weather"
        },
        location: {
          value: "Berkeley"
        },
        // end: {
        //   value: "San Francisco"
        // },
      };
      $state.go('main.weather');
      console.log("exit test btn",WitService.entities);
    };



    // vm.directionsInfo = {
    //   text: "Here is your route.",
    //   distance: "13.9 mi",
    //   duration: "26 mins",
    //   start: "Berkeley, CA, USA",
    //   end: "San Francisco, CA, USA",
    //   waypoints: [{
    //        "geocoder_status" : "OK",
    //        "place_id" : "ChIJ00mFOjZ5hYARk-l1ppUV6pQ",
    //        "types" : [ "locality", "political" ]
    //     },
    //     {
    //        "geocoder_status" : "OK",
    //        "place_id" : "ChIJIQBpAG2ahYAR_6128GcTUEo",
    //        "types" : [ "locality", "political" ]
    //     }],
    //   steps: [
    //   { distance: '1.4 mi',
    //    duration: '6 mins',
    //    text: 'Head <b>west</b> on <b>University Ave</b> toward <b>M.L.K. Jr Way</b>' },
    //  { distance: '0.4 mi',
    //    duration: '1 min',
    //    text: 'Keep <b>left</b> to stay on <b>University Ave</b>' },
    //  { distance: '0.2 mi',
    //    duration: '1 min',
    //    text: 'Turn <b>right</b> onto the <b>I-80 W</b>/<b>I-580 E</b> ramp to <b>San Francisco</b>' },
    //  { distance: '2.4 mi',
    //    duration: '3 mins',
    //    text: 'Keep <b>left</b> at the fork and merge onto <b>I-580 E</b>/<b>I-80 W</b>' },
    //  { distance: '8.1 mi',
    //    duration: '11 mins',
    //    text: 'Keep <b>right</b> to continue on <b>I-80 W</b>, follow signs for <b>San Francisco</b><div style="font-size:0.9em">Partial toll road</div>' },
    //  { distance: '1.1 mi',
    //    duration: '3 mins',
    //    text: 'Take exit <b>1B</b> to merge onto <b>US-101 N</b> toward <b>Golden Gate Bridge</b>' },
    //  { distance: '0.3 mi',
    //    duration: '2 mins',
    //    text: 'Turn <b>right</b> onto <b>Market St</b>' } ]
    // };


  }
