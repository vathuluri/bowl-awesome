// angular.module is a global place for creating, registering and retrieving Angular modules
// 'listExample' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'listExample.services' is found in services.js
// 'listExample.controllers' is found in controllers.js
angular.module('bowlawesome', ['ionic', 'ngRoute', 'ngAnimate', 'bowlawesome.services', 'bowlawesome.controllers'])

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
    $routeProvider.when('/seriesDetails/:id', { templateUrl: 'partials/seriesDetails.html', controller: 'SeriesDetailsCtrl' });
    $routeProvider.when('/login', {templateUrl: 'partials/login.html',controller: 'LoginCtrl'});

    // if none of the above routes are met, use this fallback
    $routeProvider.otherwise({redirectTo: '/'});

});

