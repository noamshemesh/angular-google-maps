'use strict';

angular.module('angularGoogleMapsApp')
  .controller('DemoCtrl', function ($scope, $timeout, $log, MARKER_COUNT) {
    function generateRandomCoord () {
      return Math.round(Math.floor(Math.random() * 90) - 45);
    }
    
    $scope.randomMarkersCount = MARKER_COUNT;
    
    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 4,
      latitude: null,   // for clicked marker
      longitude: null,  // for clicked marker
      markers: (function () {
        var _m = [];
        
        for (var i = 0; i < MARKER_COUNT; i++) {
          _m.push({
            latitude: generateRandomCoord(),
            longitude: generateRandomCoord(),
            animation: google.maps.Animation.DROP
          });
        }
        
        return _m;
      }()),
      events: {
        drag: function () {
          if ($timeout.cancel(navigateTimeout)) {
            $log.info("Stopping automatic map randomization after used interacted with the map");
          }
        }
      },
      zoomIn: function () {        
        this.zoom++;
      },
      zoomOut: function () {
        if (this.zoom > 1) {
          this.zoom--;
        }
      }
    };
    
    var navigateTimeout = $timeout(function randomizeCoordinates() {
      $scope.map.center.latitude = generateRandomCoord();
      $scope.map.center.longitude = generateRandomCoord();
      
      for (var i = 0; i < MARKER_COUNT; i++) {
        var _m = $scope.map.markers[i];
        
        _m.latitude = generateRandomCoord();
        _m.longitude = generateRandomCoord();
      }
      
      navigateTimeout = $timeout(randomizeCoordinates, 5000);
    }, 5000);
  });
