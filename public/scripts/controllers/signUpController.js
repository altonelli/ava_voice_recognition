console.log("in sign up ctrl");

angular
  .module('avaApp')
  .controller("SignUpController", SignUpController);

  SignUpController.$inject = ['$http'];

  function SignUpController( $http ){
    console.log("in sign up ctrl function");
    vm = this;

    vm.user = {};

    vm.createUser = function(){
      console.log("Sign up reached");
      console.log(vm.user);
      $http({
        method: 'POST',
        url: '/api/users',
        data: vm.user
      }).then(function success(res){
        console.log("Success!");
      }, function error(res){
        console.log("Error:", res);
      });
    };

  }
