'use strict';

describe('Controller: MplayerCtrl', function () {

  // load the controller's module
  beforeEach(module('TicketyApp'));

  var MplayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MplayerCtrl = $controller('MplayerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
