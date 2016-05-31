console.log("in sign up ctrl");

angular
  .module('avaApp')
  .controller("UserController", UserController);

  UserController.$inject = ['$http', '$state'];

  function UserController( $http, $state ){
    console.log("in sign up ctrl function");
    vm = this;

    vm.current_user = {};

    vm.user = {};

    vm.signUp = function(){
      console.log("Sign up reached");
      console.log(vm.user);
      $http({
        method: 'POST',
        url: '/signup',
        data: vm.user
      }).then(function success(res){
        console.log("Success sign up!");
        console.log(res.data);
        vm.current_user = res.data;
        console.log(vm.current_user);
      }, function error(res){
        console.log("Error in client side:", res);
      });
    };

    vm.logIn = function(){
      $http({
        method: 'POST',
        url: '/login',
        data: vm.user
      }).then(function success(res){
        console.log("Successfull login!");
        // console.log(res);
        vm.current_user = res.data;
        console.log(vm.current_user);
      }, function error(res){
        console.log("Error in client side:", res);
      });
    };

    vm.logOut = function(){
      console.log("hit log out function");
      $http({
        method: 'GET',
        url: '/logout'
      }).then(function success(res){
        console.log("Successful log out");
        vm.current_user = {};
      }, function error(res){
        console.log("Error on log out.");
      })
    }

  }
