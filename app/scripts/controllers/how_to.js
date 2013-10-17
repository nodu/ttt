'use strict';

angular.module('TicketyApp')
.controller('HowToCtrl', function($scope, $rootScope) {
    $rootScope.currentPage = 'how_to';
    $scope.homepage = function() {  // depricate?
    $location.path("/");
    };
  });