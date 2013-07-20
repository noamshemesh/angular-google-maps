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
      markers: (function () {
        var _m = [];
        
        for (var i = 0; i < MARKER_COUNT; i++) {
          _m.push({
            latitude: generateRandomCoord(),
            longitude: generateRandomCoord()
          });
        }
        
        return _m;
      }()),
      route: [{
          latitude: 45,
          longitude: -73
        }, {
          latitude: 45.5,
          longitude: -80
        }, {
          latitude: 47,
          longitude: -91.4
        }, {
          latitude: 38,
          longitude: -94.2
        }
      ],
      events: {
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
    
    $scope.geolocationAvailable = navigator.geolocation;
    
    // the marker coords for the user's current location. set when clicking find me
    var here = null;
    
    // Find me
    $scope.findMe = function () {
    	if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function (position) {
    			$scope.$apply(function (s) {
    				
    				// set map center
    				s.map.center.latitude = position.coords.latitude;
        			s.map.center.longitude = position.coords.longitude;
        			
        			// add marker
        			if (!here) {
        				here = {
                				latitude: position.coords.latitude,
                				longitude: position.coords.longitude
                			};
        				
        				s.map.markers.push(here);
        			}
        			else {
        				here.latitude = position.coords.latitude;
        				here.longitude = position.coords.longitude;
        			}
    			});
    		});
    	}
    };
  });
