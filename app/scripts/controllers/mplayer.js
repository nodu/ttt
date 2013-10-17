'use strict';

angular.module('TicketyApp')
  .controller('MplayerCtrl', function ($scope, $routeParams, angularFire, $timeout) {
    $scope.mySymbol = $routeParams.mySymbol;    
    $scope.myTurn = false;
    $scope.turnNum = 0;
    
    $scope.gameBoard = [" "," "," "," "," "," "," "," "," "];
    var gameBoardRef = new Firebase("https://hkwdi1-inst.firebaseio.com/room/" + $routeParams.id);
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard", []);

    $scope.promise.then (function () {
      // $scope.gameBoard = [];
      $scope.gameBoard = [" "," "," "," "," "," "," "," "," "];
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
            if ($scope.testForWin()) {
            		//do some stuff?
            		console.log("L:AKJSFL:KJASFLKJSDFL WE WONNNNN!")
            } else {
              $scope.myTurn = true;
              $scope.turnNum++;
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
      	$scope.turnNum++;
      	console.log("turn # " + $scope.turnNum + "$scope.gameBoard: " + $scope.gameBoard.join(""))
         if ($scope.testForWin()) {
          $timeout(function() {window.alert($scope.mySymbol.toUpperCase() + ' won!');}, 50);
        }  else {
          $scope.myTurn = false;
        }
      }
    }
    
    
    function arrays_equal(a,b) { return !(a<b || b<a); }



//////////////////////////// Shared functions => service!
 $scope.testForWin = function() {
 			console.log("hi testForWin has been fired!")
      $scope.gameBoardStr = $scope.gameBoard.join("");
      var patt1=/\s/g;
      var properStr = $scope.gameBoardStr.replace(patt1, '.');
      console.log("I'm gameboard string: " + properStr)
      if ($scope.turnNum % 2 != 0) {
        var patterns = X_WIN_PATTERNS;
      } else {
        var patterns = O_WIN_PATTERNS;
      };

      for (var i = 0; i < patterns.length; i++) {
        var re = new RegExp(patterns[i], "i");
        console.log(patterns[i] + " BREAK " + properStr.match(re))
        console.log("I'm match checking " + properStr.match(re));
        if (properStr.match(re)){

          $scope.endGame = true;
          console.log("L:AKJSFL:KJASFLKJSDFL WE WONNNNN!")
          return true;
        };
      };

      if ($scope.turnNum+1 === 9) { 
        $scope.endGame = true;
        $scope.mySymbol = 'Cat';

      }

      return false;
  }

  var X_WIN_PATTERNS = [
          'xxx......',
          '...xxx...',
          '......xxx',
          'x..x..x..',
          '.x..x..x.',
          '..x..x..x',
          'x...x...x',
          '..x.x.x..'
        ];
    var O_WIN_PATTERNS = X_WIN_PATTERNS.map(function(str){ return str.replace(/x/g, 'o');});


    });