'use strict';

angular.module('angularGoogleMapsApp', ['ui.bootstrap', 'google-maps', 'angularMoment'])
  .value("MARKER_COUNT", 25)
  .config(function ($routeProvider, $locationProvider) {
    
    google.maps.visualRefresh = true;
    
    $locationProvider.html5Mode(false).hashPrefix('!');
    
    // keep github api data in memory to avoid calling the api each time the homepage is displayed
    var githubCachedData = null;
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
        	
        	github: function ($http, $q) {
        		
        		var gitHubDeferred = $q.defer();
        		
        		if (githubCachedData === null) {
        		
	        		var API_PATH = 'https://api.github.com/repos/nlaplante/angular-google-maps';
	        		var DEV_BRANCH = 'r1-dev';
	        		
	        		var collaboratorsDeferred = $q.defer(),
	        			contributorsDeferred = $q.defer(),
	        			latestCommitDeferred = $q.defer();
	        		
	        		var promises = [collaboratorsDeferred.promise,
	        		                contributorsDeferred.promise,
	        		                latestCommitDeferred.promise];
	        		
	        		$http.get(API_PATH + '/collaborators')
	        	  	.success(function (data) {
	        	  		collaboratorsDeferred.resolve(data);
	        	  	});
	        		
	        		$http.get(API_PATH + '/contributors')
	        	  	.success(function (data) {
	        	  		contributorsDeferred.resolve(data);
	        	  	});
	        		
	        		$http.get(API_PATH + '/commits?sha=' + DEV_BRANCH)
	        	  	.success(function (data) {
	        	  		latestCommitDeferred.resolve(_.first(data));
	        	  	});
	        		
	        		$q.all(promises).then(function (values) {
	        			
	        			githubCachedData = {
		        				collaborators: values[0],
		        				contributors: values[1],
		        				latestCommit: values[2]
		        			};
	        			
	        			gitHubDeferred.resolve(githubCachedData);
	        			
	        		}, function (values) {
	        			gitHubDeferred.reject('could not fetch github information');
	        		});
        		}
        		else {
        			gitHubDeferred.resolve(githubCachedData);
        		}
        		
        		return gitHubDeferred.promise;
        	}
        }
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
