angular
  .module('avaApp', ['ui.router', 'ngMaps', 'ngSanitize']);



var initialLocation = {};
var browserSupportFlag =  new Boolean();

initializeGeo();

function initializeGeo() {

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log(position);
      // console.log("lat:",position.coords.latitude);
      // console.log("long:",position.coords.longitude);
      initialLocation.lat = position.coords.latitude;
      initialLocation.long = position.coords.longitude;
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    console.log("NO GEOLOCATION:",errorFlag);
  }
}
