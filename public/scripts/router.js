angular
  .module('avaApp')
  .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];

function config($stateProvider, $urlRouterProvider,$locationProvider,$state){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      views: {
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl",
        },
        "content": {
          templateUrl: '/public/templates/main.html',
          controller: 'WitController as Wit'
        },
        "button": {
          templateUrl: '/public/templates/button.html',
          controller: 'ButtonController as Button'
        }
      },
      resolve:{
        getUser: function(UserService){
          return UserService.getUser();
        }
      }
    })
    .state("main.weather", {
      views:{
        "result@": {
          templateUrl: '/public/templates/weather.html',
          controller: 'WeatherController as Weather',
          reload: true,
          resolve: {
            WeatherService: 'WeatherService',
            weather: function(WeatherService){
              return WeatherService.getWeather();
            }
          },
          onExit: function (){
            console.log("WOOOOOOO!!!!!");
            // console.log("finished the switching state" + JSON.stringify($state.current));
          }
        }
      },
    })
    .state("main.places", {
      views:{
        "result@": {
          templateUrl: '/public/templates/places.html',
          controller: 'PlacesController as Places',
          reload: true,
          resolve: {
            PlacesService: 'PlacesService',
            markers: function(PlacesService){
              return PlacesService.getMarkers();
            }
          }
        }
      },
    })
    .state("main.directions", {
      views:{
        "result@": {
          templateUrl: '/public/templates/directions.html',
          controller: 'DirectionsController as Directions',
          reload: true,
          resolve: {
            DirectionsService: 'DirectionsService',
            directions: function(DirectionsService){
              return DirectionsService.directions();
            }
          }
        }
      },
    })
    .state('main.rendering',{
      views: {
        "result@": {
          templateUrl: '/public/templates/rendering.html'
        }
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
