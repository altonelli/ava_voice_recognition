angular
  .module('avaApp')
  .service('UserService', UserService);

UserService.$inject = ['$http', '$q', 'WitService'];
function UserService($http, $q, WitService) {
  // declare things
  var self = this;

  self.currentUser = null;

  self.text = "great";

  // prep data
  // self.getUser();



  self.getUser = function() {
    // var def = $q.defer();
    $http({
      method: 'GET',
      url: '/api/user'
  }).then(function success(res){
    // console.log("GETTING USER",res.data);
    console.log("resolving",Date.now());
    if (res.data.user !== null){
      // console.log("inif",JSON.parse(res.data.user));
      self.currentUser = JSON.parse(res.data.user);
      // return def.resolve(self.currentUser);
    }
    return self.currentUser;
  }, function error(res){
    console.log("error:",res);
    // def.reject({error: res});
  });
  // return def.promise;
};

// self.getUser();



}
