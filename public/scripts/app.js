angular
  .module('avaApp', ['ui.router'])
  .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];

function config($stateProvider, $urlRouterProvider,$locationProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        "content": {
          templateUrl: '/public/templates/splash.html'
        }
      }
    })
    .state('active', {
      url: '/main',
      views: {
        "content": {
          templateUrl: '/public/templates/main.html'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        "content": {
          templateUrl: '/public/templates/login.html'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        "content": {
          templateUrl: '/public/templates/signup.html'
        }
      }
    });



    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });


}
