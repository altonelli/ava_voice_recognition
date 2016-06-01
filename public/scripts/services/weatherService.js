angular.module('avaApp')
.service('WeatherService', WeatherService);

WeatherService.$inject = ['$http', '$q', 'WitService'];
function WeatherService($http, $q, WitService) {
  var self = this;
  self.location = WitService.entities.location.value;
  self.date = Date.now();

  self.weather = {};



  self.getWeather = function(){

    var def = $q.defer();

    $http({
      method: "POST",
      url: "/api/weather",
      data: {
        location: self.location,
        date: self.date
      }
    }).then(weatherSuccess,weatherError);

    return def.promise;

    function weatherSuccess(res){
      console.log("service",res.data);
      self.weather = res.data;
      def.resolve(self.weather);
    }
    function weatherError(res){
      console.log("error in service",res);
      self.weather.error = {error: res};
      def.reject(self.weather.error);
    }

  };

}
