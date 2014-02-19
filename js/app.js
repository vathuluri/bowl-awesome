// angular.module is a global place for creating, registering and retrieving Angular modules
// 'listExample' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'listExample.services' is found in services.js
// 'listExample.controllers' is found in controllers.js
angular.module('bowlawesome', ['ionic', 'ngRoute', 'ngAnimate', 'bowlawesome.services', 'bowlawesome.controllers', 'bowlawesome.directives'])

.factory('Projects', function () {
    return {
        all: function () {
            var projectString = window.localStorage['projects'];
            if (projectString) {
                return angular.fromJson(projectString);
            }
            return [];
        },
        save: function (projects) {
            window.localStorage['projects'] = angular.toJson(projects);
        },
        newProject: function (projectTitle) {
            // Add a new project
            return {
                title: projectTitle,
                tasks: []
            };
        },
        getLastActiveIndex: function () {
            return parseInt(window.localStorage['lastActiveProject']) || 0;
        },
        setLastActiveIndex: function (index) {
            window.localStorage['lastActiveProject'] = index;
        }
    };
})

.config(function ($compileProvider) {
    // Needed for routing to work
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {templateUrl: 'partials/home.html',controller: 'IndexCtrl'});
    $routeProvider.when('/league/:leagueId/series/:seriesId/gameDetails/', { templateUrl: 'partials/gameDetails.html', controller: 'GameDetailCtrl' });
    $routeProvider.when('/editLeague/:id', { templateUrl: 'partials/editLeagueInfo.html', controller: 'EditLeagueCtrl' });
    $routeProvider.when('/editSeries/:id', { templateUrl: 'partials/editSeriesInfo.html', controller: 'EditSeriesCtrl' });
    $routeProvider.when('/seriesDetails/:id', { templateUrl: 'partials/seriesDetails.html', controller: 'SeriesDetailsCtrl' });
    $routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl' });
    $routeProvider.when('/friends', { templateUrl: 'partials/friends.html', controller: 'FriendsCtrl' });
    $routeProvider.when('/settings', { templateUrl: 'partials/settings.html', controller: 'SettingsCtrl' });
    $routeProvider.when('/notifications', { templateUrl: 'partials/notifications.html', controller: 'NotificationsCtrl' });
    $routeProvider.when('/test', { templateUrl: 'partials/test.html', controller: 'TestCtrl' });

    // if none of the above routes are met, use this fallback
    $routeProvider.otherwise({redirectTo: '/'});

});

