console.log("in sign up ctrl");

angular
  .module('avaApp')
  .controller("UserController", UserController);

  UserController.$inject = ['$http', '$state', 'UserService'];

  function UserController( $http, $state, UserService ){
    console.log("in user ctrl",Date.now());
    vm = this;

    vm.currentUser = UserService.currentUser;

    vm.text = UserService.text;

    vm.user = {};

    vm.signUp = function(){
      // console.log("Sign up reached");
      // console.log(vm.user);
      $http({
        method: 'POST',
        url: '/signup',
        data: vm.user
      }).then(function success(res){
        console.log("Success sign up!");
        console.log(UserService.currentUser);
        $state.go('main', {},{reload:true});
      }, function error(res){
        console.log("Error in client side:", res);
      });
    };

    vm.logIn = function(){
      // console.log("in log in func");
      // console.log(vm.user);
      $http({
        method: 'POST',
        url: '/login',
        data: vm.user
      }).then(function success(res){
        // console.log("Successfull login!");
        // console.log(res);
        // console.log(UserService.currentUser);
        $state.go('main', {},{reload:true});
      }, function error(res){
        console.log("Error in client side:", res);
      });
    };

    vm.logOut = function(){
      // console.log("hit log out function");
      $http({
        method: 'GET',
        url: '/logout'
      }).then(function success(res){
        // console.log("Successful log out");
        // console.log(UserService.currentUser);
        $state.go('main', {},{reload:true});
      }, function error(res){
        console.log("Error on log out.");
      });
    };

  }
