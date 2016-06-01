angular
  .module('avaApp')
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
          templateUrl: '/public/templates/button.html',
          controller: 'ButtonController as Button'
        },
      },
    })
    .state("main.weather", {
      views:{
        "result@": {
          templateUrl: '/public/templates/weather.html',
          controller: 'WeatherController as Weather',
        }
      },
    })
    .state("main.places", {
      views:{
        "result@": {
          templateUrl: '/public/templates/places.html',
          controller: 'PlacesController as Places',
          resolve: {
            PlacesService: 'PlacesService',
            markers: function(PlacesService){
              return PlacesService.getMarkers();
            }
          }
        }
      },
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
