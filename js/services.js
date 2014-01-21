angular.module('listExample.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('SeriesService', function () {
    var serieses = angular.fromJson(localStorage['series']);

    return {
        all: function () {
            return serieses;
        },
        get: function (leagueId) {
            // Simple index lookup
            serieses = angular.fromJson(localStorage['series']);
            var seriesesByLeague = [];
            if (typeof serieses != 'undefined') {
                for (var i = 0, l = serieses.length; i < l; i++) {
                    if (serieses[i].leagueId == leagueId) {
                        seriesesByLeague.push(serieses[i]);
                    }
                }
            }
            return seriesesByLeague;
        }
    };
})

.factory('GameService', function () {
    var games = angular.fromJson(localStorage['game']);

    return {
        all: function () {
            return serieses;
        },
        get: function (leagueId, seriesId) {
            // Simple index lookup
            games = angular.fromJson(localStorage['game']);
            var gamesBySeries = [];
            if (typeof games != 'undefined') {
                for (var i = 0, l = games.length; i < l; i++) {
                    if (games[i].leagueId == leagueId && games[i].seriesId == seriesId) {
                        gamesBySeries.push(games[i]);
                    }
                }
            }
            return gamesBySeries;
        }
    };
})
    .factory('AvgScoreService', function (leagueId, seriesId) {
        $scope.leagues = leagueId;
        $scope.seriesId = seriesId;
        var games = angular.fromJson(localStorage['game']);

        return {
            all: function () {
                return serieses;
            },
            leagueAvg: function (leagueId, seriesId) {
                games = angular.fromJson(localStorage['game']);
                if (typeof games != 'undefined') {
                    for (var i = 0, l = games.length; i < l; i++) {
                        if (games[i].leagueId == leagueId && games[i].seriesId == seriesId) {
                            //gamesBySeries.push(games[i]);
                        }
                    }
                }
                return gamesBySeries;
            },
            seriesAvg: function () {
                return null;
            }
        };
    });
