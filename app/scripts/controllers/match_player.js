'use strict';

angular.module('TicketyApp')
.controller('MatchPlayerCtrl', function ($scope, $timeout, $location, $rootScope, angularFire) {
   $rootScope.currentPage = "match";
    

    // $scope.wait = angular.element(document.getElementById('wait'));
    // for (var i = 0; i < 4; i++) {
    //   $timeout(function(){
    //   $scope.wait.append('.');
    //   }, i + "000");
    // };
    
    // $timeout(function(){ $scope.wait.append("Found! It's you!  Or ... that dashing individual next to you!");}, 4000);
    // $timeout(function(){ $location.path("/play_local");}, 6000);



    $scope.waitingRoom = {};
    var waitingRoomRef = new Firebase("https://hkwdi1-inst.firebaseio.com/waiting_room");
    $scope.promise = angularFire(waitingRoomRef, $scope, "waitingRoom");


        $scope.promise.then (function () {
      if ($scope.waitingRoom.xJoined == true) {
        $scope.joinWaitingRoom();
      } else {        
        $scope.createWaitingRoom();
      }
    });
    
    $scope.createWaitingRoom = function() {
      $scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
      $scope.noticeMessage = "You are x, waiting for opponent.";
      
      waitingRoomRef.on('child_removed', function(snapshot) {
        // TODO should double check if the I am paired
        
        $location.path('mplayer/' + $scope.waitingRoom.gameBoardNumber + '/x');
      });
    }

    $scope.joinWaitingRoom = function() {
      var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
      $scope.waitingRoom = {};
      
      $location.path('mplayer/' + gameBoardNumber + '/o');
    }


     function generateGameBoardNumber() {
      // 2 ^ 23 - 1
      return Math.floor(Math.random() * 16777215).toString(16);
    }
    

  });