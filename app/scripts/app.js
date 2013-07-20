'use strict';

angular.module('angularGoogleMapsApp', ['ui.bootstrap', 'google-maps', 'angularMoment'])
  .value("MARKER_COUNT", 5)
  .config(function ($routeProvider, $locationProvider) {
    
    google.maps.visualRefresh = true;
    
    $locationProvider.html5Mode(false).hashPrefix('!');
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoCtrl'
      })
      .when('/getting-started', {
        templateUrl: 'views/gettingStarted.html',
        controller: 'GettingStartedCtrl'
      })
      .when('/options', {
        templateUrl: 'views/options.html',
        controller: 'OptionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location) {
    $rootScope.currentPath = $location.path();
    $rootScope.$on("$routeChangeSuccess", function () {
      $rootScope.currentPath = $location.path();
    });
  });
