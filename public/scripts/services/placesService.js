angular.module('avaApp')
.service('PlacesService', PlacesService);

PlacesService.$inject = ['$http', '$q', 'WitService'];
function PlacesService($http, $q, WitService) {
var self = this;
self.query = WitService.entities.local_search_query.value;
self.location = initialLocation;
self.text = "";
self.places = {};
self.markers = [];
self.currentLocation = {
    position: [initialLocation.lat,initialLocation.long],
    decimals: 4,
    events: {
      click: function(e, p, map, points){
        var infowindow = new google.maps.InfoWindow({
          content: '<h5>Current Location</h5>'
        });
        infowindow.open(map, p);
      },
    },
    options: function(){
      return {
        label: "!",
        cursor: "Current Location",
      };
    },
  };

  self.map = {
    center: [initialLocation.lat,initialLocation.long],
    zoom: 16,
    events: {
      idle: function (e,p,map,points){
        var bounds = new google.maps.LatLngBounds();
        self.markers.forEach(function(marker){
          console.log(marker.position[0],marker.position[1]);
          bounds.extend(new google.maps.LatLng(marker.position[0],marker.position[1]));
        });
        p.fitBounds(bounds);
      }
    }
  };


  self.getPlaces = function(){
    var defPlaces = $q.defer();

    $http({
      method: "POST",
      url: "/api/places",
      data: {
        search: self.query,
        location: {
          lat: self.location.lat,
          long: self.location.long
        }
      }
    }).then(placesSuccess,placesError);

    return defPlaces.promise;

    function placesSuccess(res){
      console.log(res.data);
      self.text = res.data.text;
      self.places = res.data;
      defPlaces.resolve(self.places);
    }
    function placesError(res){
      console.log("error in places service",res);
      self.places.error = {error:res};
      defPlaces.reject(self.places.error);
    }
  };

  self.getMarkers = function(){
    console.log("get markers called");
    var defMarkers = $q.defer();

    self.getPlaces().then(markersSuccess,markersError);

    return defMarkers.promise;

    function markersSuccess(res){

      self.places.array.forEach(function(place,idx){
        marker = {
          position: [place.geometry.lat,place.geometry.long],
          decimals: 4,
          events: {
            click: function(e, p, map, points){
              var infowindow = new google.maps.InfoWindow({
                content: '<a target="_blank" href="'+place.link+'">'+
                '<h5>' + place.name + '</h5>' +
                '<p>'+place.address+'</p></a>'
              });
              infowindow.open(map, p);
            },
          },
          options: function(){
            return {
              title: place.name,
              label: place.name,
              cursor: place.name,
            };
          },
        };
        self.markers.push(marker);
      });
      defMarkers.resolve(self.markers);
    }

    function markersError(res){
      defMarkers.reject({error:res});
    }


  };



}
