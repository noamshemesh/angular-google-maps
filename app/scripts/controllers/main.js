'use strict';

angular.module('angularGoogleMapsApp')
  .controller('MainCtrl', function ($scope, $log, $timeout, $http) {
    
	  // list contributors & collaborators
	  $http.get("https://api.github.com/repos/nlaplante/angular-google-maps/contributors")
	  	.success(function (data) {
	  		$scope.contributors = data;
	  	});
	  
	  $http.get("https://api.github.com/repos/nlaplante/angular-google-maps/collaborators")
	  	.success(function (data) {
	  		$scope.collaborators = data;
	  		$log.info(data);
	  	});
    
	  // latest commit on r1-dev branch
	  $http.get("https://api.github.com/repos/nlaplante/angular-google-maps/commits?sha=r1-dev")
	  	.success(function (data) {
	  		$scope.latestCommit = _.first(data);
	  		$log.log($scope.latestCommit);
	  	});
	  
	  $scope.contributed = function () {
		return _.sortBy(_.uniq(_.union($scope.collaborators, $scope.contributors), false, function (c) {
			return c && c.login;
		}), function (c) {
			return -c.contributions;
		});  
	  };
	  
	  $scope.isCollaborator = function (login) {
		return _.where($scope.collaborators, {
			login: login
		}).length;
	  };
  });
