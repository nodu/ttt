'use strict';

angular.module('TicketyApp')
  .controller('MplayerCtrl', function ($scope, $routeParams, angularFire) {
    $scope.mySymbol = $routeParams.mySymbol;    
    $scope.myTurn = false;
    
    $scope.gameBoard = [];
    var gameBoardRef = new Firebase("https://hkwdi1-inst.firebaseio.com/room/" + $routeParams.id);
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard", []);

    $scope.promise.then (function () {
      $scope.gameBoard = [];
      if ($routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        $scope.myTurn = true;
      } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
        $scope.myTurn = false;
      }
    });
    
    gameBoardRef.on('value', function(snapshot) {
      console.log("wait received");
      if (!$scope.myTurn) {
        if (snapshot.val() != null) {
          if (!arrays_equal(snapshot.val(), $scope.gameBoard)) {
            console.log("diff gameboard");
            if ($scope.isLosing()) {
              // print losing
              // redirect to match player if play again
            } else if ($scope.isDraw()) {
              // print draw
              // redirect to match player if play again
            } else {
              $scope.myTurn = true;
            }
          } else {
            console.log("same gameboard"); 
          }
        } else {
          console.log("snapshot is empty");
        }
      } else {
        console.log("it is my turn but I receive ");
      }
    });
    

            
    $scope.handleClick = function(index) {
      if ($scope.myTurn) {
        $scope.gameBoard[index] = $scope.mySymbol;
      
        if ($scope.isWinning()) {
          // print winning
          // redirect to match player if play again
        } else if ($scope.isDraw()) {
          // print draw
          // redirect to match player if play again
        } else {
          $scope.myTurn = false;
        }
      }
    }
    
    $scope.isLosing = function() {
      return false; 
    }
    
    $scope.isWinning = function() {
      return false; 
    }
    
    $scope.isDraw = function() {
      return false; 
    }    
    
    function arrays_equal(a,b) { return !(a<b || b<a); }
  });


//////////////////////////// Shared functions => service!
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