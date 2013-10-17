window.app = angular.module("TicketyApp", ["firebase"]).config(["$routeProvider",
    function (a) {
        a.when("/", {
            templateUrl: "views/splash.html",
            controller: "SplashCtrl"
        }).when("/play_local", {
            templateUrl: "views/play_local.html",
            controller: "MainCtrl"
        }).when("/how_to", {
            templateUrl: "views/how_to.html",
            controller: "HowToCtrl"
        }).when("/match_player", {
            templateUrl: "views/match_player.html",
            controller: "MatchPlayerCtrl"
        }).when("/mplayer/:id/:mySymbol", {
            templateUrl: "views/mplayer.html",
            controller: "MplayerCtrl"
        }).otherwise({
            redirectTo: "/"
        })
    }
]), angular.module("TicketyApp").controller("MainCtrl", ["$scope", "$location", "$timeout", "$rootScope",
    function (a, b, c, d) {
        d.currentPage = "play_local";
        var e = ["xxx......", "...xxx...", "......xxx", "x..x..x..", ".x..x..x.", "..x..x..x", "x...x...x", "..x.x.x.."],
            f = e.map(function (a) {
                return a.replace(/x/g, "o")
            }),
            g = 0;
        a.turn = function () {
            g += 1
        }, a.squares = [" ", " ", " ", " ", " ", " ", " ", " ", " "], a.makeMove = function (b) {
            a.endGame ? window.alert("Game's over Loser!") : (a.mark = 0 === g % 2 ? "x" : "o", a.addMark(b, a.mark), a.testForWin() && c(function () {
                window.alert(a.mark.toUpperCase() + " won!")
            }, 50))
        }, a.addMark = function (b, c) {
            "x" === a.squares[b] || "o" === a.squares[b] ? g-- : a.squares[b] = c
        }, a.testForWin = function () {
            a.squaresStr = a.squares.join("");
            var b = /\s/g,
                c = a.squaresStr.replace(b, ".");
            if (0 === g % 2) var d = e;
            else var d = f;
            for (var h = 0; h < d.length; h++) {
                var i = new RegExp(d[h], "i");
                if (c.match(i)) return a.endGame = !0, !0
            }
            return 9 === g + 1 && (a.endGame = !0, a.mark = "Cat"), !1
        }
    }
]), angular.module("TicketyApp").controller("MatchPlayerCtrl", ["$scope", "$timeout", "$location", "$rootScope", "angularFire",
    function (a, b, c, d, e) {
        function f() {
            return Math.floor(16777215 * Math.random()).toString(16)
        }
        d.currentPage = "match", a.waitingRoom = {};
        var g = new Firebase("https://hkwdi1-inst.firebaseio.com/waiting_room");
        a.promise = e(g, a, "waitingRoom"), a.promise.then(function () {
            1 == a.waitingRoom.xJoined ? a.joinWaitingRoom() : a.createWaitingRoom()
        }), a.createWaitingRoom = function () {
            a.waitingRoom = {
                xJoined: !0,
                gameBoardNumber: f()
            }, a.noticeMessage = "You are x, waiting for opponent.", g.on("child_removed", function () {
                c.path("mplayer/" + a.waitingRoom.gameBoardNumber + "/x")
            })
        }, a.joinWaitingRoom = function () {
            var b = a.waitingRoom.gameBoardNumber;
            a.waitingRoom = {}, c.path("mplayer/" + b + "/o")
        }
    }
]), angular.module("TicketyApp").controller("HowToCtrl", ["$scope", "$rootScope",
    function (a, b) {
        b.currentPage = "how_to", a.homepage = function () {
            $location.path("/")
        }
    }
]), angular.module("TicketyApp").controller("SplashCtrl", ["$scope", "$location", "$rootScope",
    function (a, b, c) {
        c.currentPage = "home"
    }
]), angular.module("TicketyApp").controller("MplayerCtrl", ["$scope", "$routeParams", "angularFire", "$timeout",
    function (a, b, c, d) {
        function e(a, b) {
            return !(b > a || a > b)
        }
        a.mySymbol = b.mySymbol, a.myTurn = !1, a.turnNum = 0, a.gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        var f = new Firebase("https://hkwdi1-inst.firebaseio.com/room/" + b.id);
        a.promise = c(f, a, "gameBoard", []), a.promise.then(function () {
            a.gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "], "x" == b.mySymbol ? (console.log("I am First Move: Symbol: " + b.mySymbol), a.myTurn = !0) : (console.log("I am Second Move: Symbol: " + b.mySymbol), a.myTurn = !1)
        }), f.on("value", function (b) {
            console.log("wait received"), a.myTurn ? console.log("it is my turn but I receive ") : null != b.val() ? e(b.val(), a.gameBoard) ? console.log("same gameboard") : (console.log("diff gameboard"), a.testForWin() ? console.log("L:AKJSFL:KJASFLKJSDFL WE WONNNNN!") : (a.myTurn = !0, a.turnNum++)) : console.log("snapshot is empty")
        }), a.handleClick = function (b) {
            a.myTurn && (a.gameBoard[b] = a.mySymbol, a.turnNum++, console.log("turn # " + a.turnNum + "$scope.gameBoard: " + a.gameBoard.join("")), a.testForWin() ? d(function () {
                window.alert(a.mySymbol.toUpperCase() + " won!")
            }, 50) : a.myTurn = !1)
        }, a.testForWin = function () {
            console.log("hi testForWin has been fired!"), a.gameBoardStr = a.gameBoard.join("");
            var b = /\s/g,
                c = a.gameBoardStr.replace(b, ".");
            if (console.log("I'm gameboard string: " + c), 0 != a.turnNum % 2) var d = g;
            else var d = h;
            for (var e = 0; e < d.length; e++) {
                var f = new RegExp(d[e], "i");
                if (console.log(d[e] + " BREAK " + c.match(f)), console.log("I'm match checking " + c.match(f)), c.match(f)) return a.endGame = !0, console.log("L:AKJSFL:KJASFLKJSDFL WE WONNNNN!"), !0
            }
            return 9 === a.turnNum + 1 && (a.endGame = !0, a.mySymbol = "Cat"), !1
        };
        var g = ["xxx......", "...xxx...", "......xxx", "x..x..x..", ".x..x..x.", "..x..x..x", "x...x...x", "..x.x.x.."],
            h = g.map(function (a) {
                return a.replace(/x/g, "o")
            })
    }
]);
