'use strict';

angular.module('TicketyApp')
 .controller('MainCtrl', function($scope, $location, $timeout, $rootScope) {
  $rootScope.currentPage = 'play_local';
  not

    var turnNum = 0;
    $scope.turn = function () {
      turnNum += 1;
    };
    
    $scope.squares = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    
    $scope.makeMove = function(square) {
      if (!$scope.endGame){
        $scope.mark = (turnNum % 2 === 0) ? 'x' : 'o';
        $scope.addMark(square, $scope.mark);
              
        if ($scope.testForWin()) {
          $timeout(function() {window.alert($scope.mark.toUpperCase() + ' won!');}, 50);
        } 
        // else if ($scope.testForScrewed()) {
          // window.alert(mark.toUpperCase() + ' has you now!');}
      } else {
        window.alert("Game's over Loser!");
      };
  };
    $scope.addMark = function(square, mark){
      if ($scope.squares[square] === 'x' || $scope.squares[square] === 'o') {
        turnNum --;
      } else {
        $scope.squares[square] = mark;
      };
    };
  
    $scope.testForWin = function() {
      $scope.squaresStr = $scope.squares.join("");
      var patt1=/\s/g;
      var properStr = $scope.squaresStr.replace(patt1, '.');
      
      if (turnNum % 2 === 0) {
        var patterns = X_WIN_PATTERNS;
      } else {
        var patterns = O_WIN_PATTERNS;
      };

      for (var i = 0; i < patterns.length; i++) {
        var re = new RegExp(patterns[i], "i");
        if (properStr.match(re)){
          $scope.endGame = true;
          return true;
        };
      };

      if (turnNum+1 === 9) { 
        $scope.endGame = true;
        $scope.mark = 'Cat';
      }

      return false;
  }
});