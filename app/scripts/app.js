'use strict';

angular.module('angularGoogleMapsApp', ['ui.bootstrap', 'google-maps'])
  .config(function ($routeProvider) {
    
    google.maps.visualRefresh = true;
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
