'use strict';

angular.module('TicketyApp')
 .controller('SplashCtrl', function ($scope, $location, $rootScope) {
 	$rootScope.currentPage = 'home';
    // $scope.randomMatch = function() { // depricated?
      // $location.path("/waiting");
    // };
  });