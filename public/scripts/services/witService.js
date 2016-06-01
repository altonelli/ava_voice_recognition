angular.module('avaApp')
  .service('WitService', WitService);

WitService.$inject = ['$http', '$q'];
function WitService($http, $q) {
  var self = this;
  
  self.intent = null;
  self.entities = null;
  self.res = null;


}
