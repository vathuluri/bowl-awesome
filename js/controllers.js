angular.module('bowlawesome.controllers', [])
    .controller('IndexCtrl', function ($scope, ActionSheet, Modal, $location, AvgScoreService, constants) {

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
                content: '<i class="icon ion-ios7-plus-outline"></i>',
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
                leagues = angular.fromJson(window.localStorage['leagues']);
                ;
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
    .controller('GameDetailCtrl', function ($scope, $routeParams, GameService, Modal, AvgScoreService, $location) {
        // "MovieService" is a service returning mock data (services.js)
        $scope.games = GameService.get($routeParams.leagueId, $routeParams.seriesId);
        $scope.title = "Games";

        $scope.rightButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-ios7-plus-outline"></i>',
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
                game = angular.fromJson(window.localStorage['game']);
                ;
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

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.doRedirect = function (seriesObj) {
            $location.path('/test');

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
                content: '<i class="icon ion-ios7-plus-outline"></i>',
                tap: function (e) {
                    $scope.modal.show();
                    //alert('Hello Series details controller');
                }
            }];

        $scope.createNewSeries = function (record) {
            var series;
            if (typeof localStorage['series'] != 'undefined') {
                series = angular.fromJson(window.localStorage['series']);
                ;
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
    })
    .controller('footerCtrl', function ($scope, $location) {
        OAuth.initialize('hkfEWjkRun-sqqYo2SCPSn035S8');
        $scope.googlePlusLogin = function () {

            OAuth.popup('google', function (error, result) {
                var xhr = new XMLHttpRequest();
                //var oauthToken = gapi.auth.getToken();
                xhr.open('GET',
                    'https://www.googleapis.com/plus/v1/people/rain2showers@gmail.com/people/visible');
                xhr.setRequestHeader('Authorization',
                    'Bearer ' + result.access_token);
                xhr.send();
                $scope.$apply(function () {
                    $scope.username = "Timeout called!";
                });
                var token = result.access_token;
                alert(xhr.responseText);
                //handle error with error
                //use result.access_token in your API request
            });

        };
        $scope.facebookLogin = function () {
            OAuth.popup('facebook', function (err, result) { // or OAuth.callback
                // handle error with err
                // call the API with the jQuery's $.ajax style:
                result.get('/me').done(function (data) {
                    // data is the API call's response. e.g. data.name for your facebook's fullname.
                    $scope.$apply(function () {
                        $scope.username = data.name;
                    });
                });
            });
        };
        $scope.login = function () {
            $location.path('/login');
        };
    })
    .controller('LoginCtrl', function ($scope, $location, constants, $http) {
        $scope.doLogin = function (user) {
            var username = user.username;
            var password = user.password;
            var xsrf = $.param({ UserName: username, Password: password, RememberMe: true });
            $http({
                method: 'POST',
                url: constants.produrl + '/account/jsonlogin',
                data: xsrf,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .success(function (data, status, headers, config) {
                    if (data.status) {
                        localStorage["user.isLogged"] = 'true';
                        user.isLogged = true;
                        user.username = data.username;
                        localStorage["authToken"] = data.token;
                        $location.path("/dashboard");
                    } else {
                        user.isLogged = false;
                        user.username = '';
                        $scope.errorMessage = '<div class="form-group" style="margin-top: 6px;"><div class="alert alert-danger">' + data.errors + '</div></div>';
                    }
                })
                .error(function (data, status, headers, config) {
                    user.isLogged = false;
                    user.username = '';
                    $('.js-loading-bar').modal('hide');
                    $scope.errorMessage = '<div class="form-group" style="margin-top: 6px;"><div class="alert alert-danger">' + data.errors + '</div></div>';
                });
        };
    });
