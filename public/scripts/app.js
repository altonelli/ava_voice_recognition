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
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl"
        },
        "content": {
          templateUrl: '/public/templates/splash.html'
        }
      }
    })
    .state('active', {
      url: '/main',
      views: {
        "navbar": {
          templateUrl: "/public/templates/nav.html",
          controller: "UserController as userCtrl"
        },
        "content": {
          templateUrl: '/public/templates/main.html'
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
