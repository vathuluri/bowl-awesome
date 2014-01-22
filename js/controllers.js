angular.module('listExample.controllers', [])

.controller('IndexCtrl', function ($scope, ActionSheet, Modal, $location, AvgScoreService) {

    $scope.leagues = angular.fromJson(window.localStorage['leagues']);
    $scope.title = "Leagues";

    Modal.fromTemplateUrl('modal.html', function (modal) {
        $scope.modal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });


    $scope.rightButtons = [
  {
      type: 'button-clear',
      content: '<i class="icon ion-plus"></i>',
      tap: function (e) {
          $scope.modal.show();
      }
  }];

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.closeNewTask = function () {
        $scope.modal.hide();
    };

    $scope.createNewLeague = function (record) {
        var leagues;

        if (typeof localStorage["leagues"] != 'undefined') {
            leagues = angular.fromJson(window.localStorage['leagues']);;
            leagues.push({ id: Math.floor((Math.random() * 1000) + 1), name: record.leagueName, avgScore: 0 });
        } else {
            leagues = new Array();
            leagues.push({ id: Math.floor((Math.random() * 1000) + 1), name: record.leagueName, avgScore: 0 });
        }
        window.localStorage['leagues'] = angular.toJson(leagues);
        record.leagueName = "";
        $scope.leagues = angular.fromJson(window.localStorage['leagues']);
        $scope.modal.hide();
    };

    $scope.doRedirect = function (league) {
        var id = league.id;
        $location.path('/seriesDetails/' + id);
    };


})

.controller('GameDetailCtrl', function ($scope, $routeParams, GameService, Modal, AvgScoreService) {
    // "MovieService" is a service returning mock data (services.js)
    $scope.games = GameService.get($routeParams.leagueId, $routeParams.seriesId);
    $scope.title = "Games";

    $scope.rightButtons = [
      {
          type: 'button-clear',
          content: '<i class="icon ion-plus"></i>',
          tap: function (e) {
              $scope.modal.show();
          }
      }];

    Modal.fromTemplateUrl('gameModal.html', function (modal) {
        $scope.modal = modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.createNewGame = function (record) {
        var game;
        if (typeof localStorage['game'] != 'undefined') {
            game = angular.fromJson(window.localStorage['game']);;
            game.push({ id: Math.floor((Math.random() * 1000) + 1), game: record.gameNumber, score: record.gameScore, leagueId: $routeParams.leagueId, seriesId: $routeParams.seriesId });
        } else {
            game = new Array();
            game.push({ id: Math.floor((Math.random() * 1000) + 1), game: record.gameNumber, score: record.gameScore, leagueId: $routeParams.leagueId, seriesId: $routeParams.seriesId });
        }
        window.localStorage['game'] = angular.toJson(game);
        record.gameNumber = "";
        record.gameScore = "";
        $scope.games = GameService.get($routeParams.leagueId, $routeParams.seriesId);
        $scope.modal.hide();
        AvgScoreService.updateLeagueAvg($routeParams.leagueId);
        AvgScoreService.updateSeriesAvg($routeParams.seriesId);
    };
})

.controller('SeriesDetailsCtrl', function ($scope, $routeParams, SeriesService, Modal, $location) {
    //var series = localStorage['series'].get($routeParams.id);
    $scope.serieses = SeriesService.get($routeParams.id);
    $scope.leagueId = $routeParams.id;
    $scope.title = "League Summary";

    Modal.fromTemplateUrl('seriesModal.html', function (modal) {
        $scope.modal = modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.rightButtons = [
     {
         type: 'button-clear',
         content: '<i class="icon ion-plus"></i>',
         tap: function (e) {
             $scope.modal.show();
             //alert('Hello Series details controller');
         }
     }];

    $scope.createNewSeries = function (record) {
        var series;
        if (typeof localStorage['series'] != 'undefined') {
            series = angular.fromJson(window.localStorage['series']);;
            series.push({ id: Math.floor((Math.random() * 1000) + 1), name: record.seriesName, avgScore: 0, leagueId: $scope.leagueId });
        } else {
            series = new Array();
            series.push({ id: Math.floor((Math.random() * 1000) + 1), name: record.seriesName, avgScore: 0, leagueId: $scope.leagueId });
        }
        window.localStorage['series'] = angular.toJson(series);
        record.seriesName = "";
        $scope.series = angular.fromJson(window.localStorage['series']);
        $scope.serieses = SeriesService.get($routeParams.id);
        $scope.modal.hide();
    };

    $scope.closeNewTask = function () {
        $scope.modal.hide();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.doRedirect = function (seriesObj) {
        $location.path('/league/' + seriesObj.leagueId + '/series/' + seriesObj.id + '/gameDetails/');

    };
})

.controller('ModalCtrl', function ($scope, Modal) {

    // Load the modal from the given template URL
    Modal.fromTemplateUrl('modal.html', function (modal) {
        $scope.modal = modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
});
