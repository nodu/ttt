'use strict';

window.app = angular.module('TicketyApp', ['firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      })
       .when('/play_local', {
        templateUrl: 'views/play_local.html',
        controller: 'MainCtrl'
      })
      .when('/how_to', {
        templateUrl: 'views/how_to.html',
        controller: 'HowToCtrl'
      })
      .when('/match_player', {
        templateUrl: 'views/match_player.html',
        controller: 'MatchPlayerCtrl'
      })
      .when('/mplayer/:id/:mySymbol', {
        templateUrl: 'views/mplayer.html',
        controller: 'MplayerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


