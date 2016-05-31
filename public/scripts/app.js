angular
  .module('avaApp', ['ui.router', 'ngMaps'])
  .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];

function config($stateProvider, $urlRouterProvider,$locationProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl"
        },
        "content": {
          templateUrl: '/public/templates/splash.html'
        }
      }
    })
    .state('main', {
      url: '/main',
      views: {
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl"
        },
        "content": {
          templateUrl: '/public/templates/main.html',
          controller: 'WitController as Wit'
        },
        "button": {
          // views: {
          //   "weather"
          // },
          templateUrl: '/public/templates/button.html',
          controller: 'ButtonController as Button'
        }
      },
    })
    .state("main.weather", {
      "weather": {
        templateUrl: '/public/templates/weather.html',
        controller: 'ButtonController as Button'
      }
    })
    .state('login', {
      url: '/login',
      views: {
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl"
        },
        "content": {
          templateUrl: '/public/templates/login.html',
          controller: "UserController as userCtrl"
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl"
        },
        "content": {
          templateUrl: '/public/templates/signup.html',
          controller: "UserController as userCtrl"
        }
      },
    });



    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });


}


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
