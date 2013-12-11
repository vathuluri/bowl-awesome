angular.module('listExample.controllers', [])


// Controller that fetches a list of data
.controller('IndexCtrl', function ($scope, MovieService, Modal) {

    // "MovieService" is a service returning mock data (services.js)
    // the returned data from the service is placed into this 
    // controller's scope so the template can render the data
    $scope.movies = MovieService.all();

    $scope.title = "Bowl-Awesome";

    // Load the modal from the given template URL
    Modal.fromTemplateUrl('modal.html', function (modal) {
        $scope.modal = modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.leftButtons = [
    {
        type: 'button-positive',
        content: '<i class="icon ion-navicon"></i>',
        tap: function (e) {
        }
    }];

    $scope.rightButtons = [
  {
      type: 'button-clear',
      content: '<i class="icon ion-plus"></i>',
      tap: function (e) {
          $scope.modal.show();
          //$scope.gameNumber = 10;
      }
  }];
    
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.closeNewTask = function() {
        $scope.modal.hide();
    };

    $scope.createNewRecord = function (record) {
        var score = record.gameNumber;
        alert(record.gameScore);
        $scope.modal.hide();
    };
})

// Controller that shows more detailed info about a movie
.controller('MovieDetailCtrl', function ($scope, $routeParams, MovieService) {
    // "MovieService" is a service returning mock data (services.js)
    $scope.movie = MovieService.get($routeParams.movieId);
    $scope.title = "Movie Info";
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

    // Test data
    $scope.contacts = [
      { name: 'Gordon Freeman' },
      { name: 'Barney Calhoun' },
      { name: 'Lamarr the Headcrab' }
    ];

    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
});
