angular.module('listExample.controllers', [])

.controller('IndexCtrl', function ($scope, ActionSheet, Modal) {

    // "MovieService" is a service returning mock data (services.js)
    // the returned data from the service is placed into this 
    // controller's scope so the template can render the data
    $scope.leagues = angular.fromJson(window.localStorage['leagues']);

    $scope.title = "Leagues";

    // Load the modal from the given template URL
    Modal.fromTemplateUrl('modal.html', function (modal) {
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
            leagues.push({ id: 2, name: record.leagueName, avgScore: 105 });
        } else {
            leagues = [];
            leagues.push({ id: 2, name: record.leagueName, avgScore: 105 });
        }
        window.localStorage['leagues'] = angular.toJson(leagues);
        record.leagueName = "";
        $scope.leagues = angular.fromJson(window.localStorage['leagues']);
        $scope.modal.hide();
    };
})

.controller('GameDetailCtrl', function ($scope, $routeParams, MovieService) {
    // "MovieService" is a service returning mock data (services.js)
    $scope.movie = MovieService.get($routeParams.movieId);
    $scope.title = "Games";

    $scope.rightButtons = [
      {
          type: 'button-clear',
          content: '<i class="icon ion-plus"></i>',
          tap: function (e) {
              alert('Hello Game details controller');
          }
      }];
})

.controller('SeriesDetailsCtrl', function ($scope, $routeParams, MovieService, Modal) {
    // "MovieService" is a service returning mock data (services.js)
    $scope.movie = MovieService.get($routeParams.movieId);
    $scope.title = "League Summary";

    Modal.fromTemplateUrl('modal2.html', function (modal) {
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

    $scope.closeNewTask = function () {
        $scope.modal.hide();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
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
