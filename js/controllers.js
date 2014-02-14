angular.module('bowlawesome.controllers', [])
    .controller('IndexCtrl', function ($scope, $ionicActionSheet, $ionicModal, $location) {
        $scope.leagues = angular.fromJson(window.localStorage['leagues']);
        $scope.title = "Leagues";
        $ionicModal.fromTemplateUrl('modal.html', function (modal) {
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

        $scope.editLeague = function (record) {
            var leagues;

            if (typeof localStorage["leagues"] != 'undefined') {
                leagues = angular.fromJson(window.localStorage['leagues']);
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

        $scope.doActions = function (leagueIndex, league) {

            // Show the action sheet
            $ionicActionSheet.show({
                buttons: [
             { text: 'Edit' },
                ],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    console.log('BUTTON CLICKED', index);
                    //$scope.editmodal.show();
                    //$scope.editLeague(league);
                    return true;
                },
                destructiveButtonClicked: function () {
                    //var id = league.id;
                    var r = confirm("Are you sure you want to delete ?");
                    if (r == true) {
                        var leagues = angular.fromJson(window.localStorage['leagues']);
                        if (leagues.length != null) {
                            leagues.splice(leagueIndex, 1);
                            window.localStorage['leagues'] = angular.toJson(leagues);
                        }

                    }
                    else {
                        alert("You pressed Cancel!");
                    }
                    $scope.leagues = angular.fromJson(window.localStorage['leagues']);
                    return true;
                }
            });

        };

        $scope.leftButtons = [
           {
               type: 'button-clear',
               content: '<i class="icon ion-navicon"></i>',
               tap: function (e) {
                   $scope.sideMenuController.toggleLeft();
               }
           }];
        
        ionic.Platform.ready(function () {
            var device = ionic.Platform.device();
            alert("Hey, I'm an", device.platform);
        });

    })
    .controller('GameDetailCtrl', function ($scope, $routeParams, GameService, $ionicModal, AvgScoreService, $location, GameNumberService) {
        $scope.selectables = [
        { id: '1', value: 1 },
        { id: '2', value: 2 },
        { id: '3', value: 3 },
        { id: '4', value: 4 },
        { id: '5', value: 5 }
        ];

        // this is the model that's used for the data binding in the select directive
        // the default selected item
        $scope.selectedItem = $scope.selectables[0];

        $scope.games = GameService.get($routeParams.leagueId, $routeParams.seriesId);
        $scope.title = "Games";
        $scope.records = GameNumberService.records();
        $scope.rightButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-ios7-plus-outline"></i>',
                tap: function (e) {
                    $scope.modal.show();
                }
            }];

        $ionicModal.fromTemplateUrl('gameModal.html', function (modal) {
            $scope.modal = modal;
        }, {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope,
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });

        $scope.createNewGame = function (record, selectedItem) {
            var game;
            if (typeof localStorage['game'] != 'undefined') {
                game = angular.fromJson(window.localStorage['game']);
                ;
                game.push({ id: Math.floor((Math.random() * 1000) + 1), game: selectedItem.value, score: record.gameScore, leagueId: $routeParams.leagueId, seriesId: $routeParams.seriesId });
            } else {
                game = new Array();
                game.push({ id: Math.floor((Math.random() * 1000) + 1), game: selectedItem.value, score: record.gameScore, leagueId: $routeParams.leagueId, seriesId: $routeParams.seriesId });
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

        $scope.leftButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-navicon"></i>',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }];

    })
    .controller('SeriesDetailsCtrl', function ($scope, $ionicActionSheet, $routeParams, SeriesService, $ionicModal, $location) {
        $scope.serieses = SeriesService.get($routeParams.id);
        $scope.leagueId = $routeParams.id;
        $scope.title = "League Summary";
        $scope.record = {
            seriesName: new XDate().toString("MMM d, yyyy")
        };

        $ionicModal.fromTemplateUrl('seriesModal.html', function (modal) {
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
            record.seriesName = new XDate().toString("MMM d, yyyy");
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

        $scope.leftButtons = [
           {
               type: 'button-clear',
               content: '<i class="icon ion-navicon"></i>',
               tap: function (e) {
                   $scope.sideMenuController.toggleLeft();
               }
           }];

        $scope.doActions = function (seriesIndex, seriesObj) {

            // Show the action sheet
            $ionicActionSheet.show({
                //   buttons: [
                //{ text: 'Edit' },
                //   ],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    console.log('BUTTON CLICKED', index);
                    $scope.editLeague(seriesObj);
                    return true;
                },
                destructiveButtonClicked: function () {
                    //var id = league.id;
                    var r = confirm("Are you sure you want to delete ?");
                    if (r == true) {
                        var series = angular.fromJson(window.localStorage['series']);
                        if (series.length != null) {
                            series.splice(seriesIndex, 1);
                            window.localStorage['series'] = angular.toJson(series);
                        }

                    }
                    else {
                        alert("You pressed Cancel!");
                    }
                    $scope.serieses = SeriesService.get($routeParams.id);
                    return true;
                }
            });
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
    .controller('footerCtrl', function ($scope, $location, constants) {
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

        if (typeof constants.userLoggedIn !== 'undefined' && constants.userLoggedIn !== null) {
            $scope.IsUserLoggedIn = constants.userLoggedIn;
        } else {
            $scope.IsUserLoggedIn = 'false';
        }

        $scope.showSettings = function () {
            $location.path("/settings");
        };

        $scope.showNotifications = function () {
            $location.path("/notifications");
        };

        $scope.showFriends = function () {
            $location.path("/friends");
        };
    })
    .controller('LoginCtrl', function ($scope, $location, constants, $http, $ionicLoading) {
        $scope.doLogin = function (user) {
            // Show the loading overlay and text
            $scope.loading = $ionicLoading.show({

                // The text to display in the loading indicator
                content: 'Loading',

                // The animation to use
                animation: 'fade-in',

                // Will a dark overlay or backdrop cover the entire view
                showBackdrop: true,

                // The maximum width of the loading indicator
                // Text will be wrapped if longer than maxWidth
                maxWidth: 200,

                // The delay in showing the indicator
                showDelay: 500
            });

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
                    $scope.loading.hide();
                    if (data.status) {
                        localStorage["user.isLogged"] = 'true';
                        user.isLogged = true;
                        user.username = data.username;
                        localStorage["authToken"] = data.token;
                        $location.path("/");
                    } else {
                        $scope.loading.hide();
                        user.isLogged = false;
                        user.username = '';
                        $scope.errorMessage = '<div class="form-group" style="margin-top: 6px;"><div class="alert alert-danger">' + data.errors + '</div></div>';
                    }
                })
                .error(function (data, status, headers, config) {
                    $scope.loading.hide();
                    user.isLogged = false;
                    user.username = '';
                    $('.js-loading-bar').modal('hide');
                    $scope.errorMessage = '<div class="form-group" style="margin-top: 6px;"><div class="alert alert-danger">' + data.errors + '</div></div>';
                });
        };
    })
    .controller('TestCtrl', function ($scope, $ionicActionSheet, $location, constants, $http) {
        $scope.show = function () {

            // Show the action sheet
            $ionicActionSheet.show({

                // The various non-destructive button choices
                buttons: [
                  { text: 'Share' },
                  { text: 'Move' },
                ],

                // The text of the red destructive button
                destructiveText: 'Delete',

                // The title text at the top
                titleText: 'Modify your album',

                // The text of the cancel button
                cancelText: 'Cancel',

                // Called when the sheet is cancelled, either from triggering the
                // cancel button, or tapping the backdrop, or using escape on the keyboard
                cancel: function () {
                },

                // Called when one of the non-destructive buttons is clicked, with
                // the index of the button that was clicked. Return
                // "true" to tell the action sheet to close. Return false to not close.
                buttonClicked: function (index) {
                    return true;
                },

                // Called when the destructive button is clicked. Return true to close the
                // action sheet. False to keep it open
                destructiveButtonClicked: function () {
                    return true;
                }
            });

        };
    })
    .controller('SettingsCtrl', function ($scope, $location, constants, $http) {

        $scope.Logout = function () {
            var logOut = confirm("Are You Sure you want to Logout ?");
            if (logOut) {
                localStorage["user.isLogged"] = 'false';
                localStorage["authToken"] = '';
                $location.path('/');
            };
        };

        $scope.LovethisApp = function () {
            var ref = window.open('https://play.google.com/store/apps/details?id=com.ionic.bowlAwesome', '_blank', 'location=yes');
        };

        $scope.title = "Settings";
        $scope.leftButtons = [
              {
                  type: 'button-clear',
                  content: '<i class="icon ion-navicon"></i>',
                  tap: function (e) {
                      $scope.sideMenuController.toggleLeft();
                  }
              }];

        //$scope.rightButtons = [
        //    {
        //        type: 'button-clear',
        //        content: '<i class="icon ion-ios7-people-outline"></i>',
        //        tap: function (e) {
        //            $scope.modal.show();
        //        }
        //    }];
    })
    .controller('NotificationsCtrl', function ($scope, $location, constants, $http) {
        $scope.title = "Notifications";
        $scope.leftButtons = [
              {
                  type: 'button-clear',
                  content: '<i class="icon ion-navicon"></i>',
                  tap: function (e) {
                      $scope.sideMenuController.toggleLeft();
                  }
              }];

        $scope.rightButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-ios7-people-outline"></i>',
                tap: function (e) {
                    $scope.modal.show();
                }
            }];
    })
    .controller('FriendsCtrl', function ($scope, $location, constants, $http) {
        $scope.title = "Friends";
        $scope.leftButtons = [
              {
                  type: 'button-clear',
                  content: '<i class="icon ion-navicon"></i>',
                  tap: function (e) {
                      $scope.sideMenuController.toggleLeft();
                  }
              }];

        $scope.rightButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-ios7-people-outline"></i>',
                tap: function (e) {
                    $scope.modal.show();
                }
            }];

    })
    .controller('leftNavCtrl', function ($scope, $location, contactsService) {
        $scope.items = [{
            id: 1,
            title: 'Leagues'
        }, {
            id: 2,
            title: 'Friends'
        }];
        $scope.selectNavItem = function (item, $index) {
            if ($index == 0) {
                $location.path("/");
                $scope.sideMenuController.close();
            }
            else {
                $location.path("/friends");
                $scope.sideMenuController.close();
            }
        };
    })