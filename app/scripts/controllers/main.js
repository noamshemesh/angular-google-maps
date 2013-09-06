'use strict';

angular.module('angularGoogleMapsApp')
  .controller('MainCtrl', function ($scope, $log, $timeout, $http, github) {
    
	  
	  $scope.github = github;
	  
	  $scope.contributed = function () {
		return _.sortBy(_.uniq(_.union($scope.github.collaborators, $scope.github.contributors), false, function (c) {
			return c && c.login;
		}), function (c) {
			return -c.contributions;
		});  
	  };
	  
	  $scope.isCollaborator = function (login) {
		return _.where($scope.github.collaborators, {
			login: login
		}).length;
	  };
  });
