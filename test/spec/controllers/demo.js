'use strict';

describe('Controller: DemoCtrl', function () {

  // load the controller's module
  beforeEach(module('angularGoogleMapsApp'));

  var DemoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DemoCtrl = $controller('DemoCtrl', {
      $scope: scope
    });
  }));

  it('should attach an object with map parameters to the scope', function () {
    expect(angular.isDefined(scope.map)).toBe(true);
  });
});
