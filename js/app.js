// angular.module is a global place for creating, registering and retrieving Angular modules
// 'listExample' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'listExample.services' is found in services.js
// 'listExample.controllers' is found in controllers.js
angular.module('listExample', ['ionic', 'ngRoute', 'ngAnimate', 'listExample.services', 'listExample.controllers'])

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

    // Set up the initial routes that our app will respond to.
    // These are then tied up to our nav router which animates and
    // updates a navigation bar
    $routeProvider.when('/', {
        templateUrl: '/index.html',
        controller: 'IndexCtrl'
    });

    // if the url matches something like /movie/88 then this route
    // will fire off the MovieDetailCtrl (controllers.js)
    $routeProvider.when('/gameDetails/', {
        templateUrl: '/gameDetails.html',
        controller: 'GameDetailCtrl'
    });

    // if the url matches something like /movie/88 then this route
    // will fire off the MovieDetailCtrl (controllers.js)
    $routeProvider.when('/seriesDetails/', {
        templateUrl: '/seriesDetails.html',
        controller: 'SeriesDetailsCtrl'
    });

    // if none of the above routes are met, use this fallback
    $routeProvider.otherwise({
        redirectTo: '/'
    });

});

