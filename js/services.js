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
.factory('AvgScoreService', function () {
    var games = angular.fromJson(localStorage['game']);
    var leagues = angular.fromJson(window.localStorage['leagues']);
    var series = angular.fromJson(window.localStorage['series']);
    return {
        all: function () {
            return serieses;
        },
        leagueAvg: function (leagueId) {
            var leagueAvg = 0;
            games = angular.fromJson(localStorage['game']);
            if (typeof games != 'undefined') {
                for (var i = 0, l = games.length; i < l; i++) {
                    if (games[i].leagueId == leagueId) {
                        leagueAvg += games[i].score;
                    }
                }
            }
            return leagueAvg;
        },
        seriesAvg: function () {
            return null;
        },
        updateLeagueAvg: function (leagueId) {
            var leagueAvg = 0;
            var gameCount = 0;
            if (typeof games != 'undefined') {
                for (var i = 0, l = games.length; i < l; i++) {
                    if (games[i].leagueId == leagueId) {
                        leagueAvg += games[i].score;
                        gameCount++;
                    }
                }
            }
            if (typeof leagues != 'undefined') {
                for (var j = 0; j < leagues.length; j++) {
                    if (leagues[j].id == leagueId) {
                        leagues[j].avgScore = Math.floor((leagueAvg / gameCount) * 100) / 100;
                        break;
                    }
                }
                window.localStorage['leagues'] = angular.toJson(leagues);
            }

        },
        updateSeriesAvg: function (seriesId) {
            var seriesAvg = 0;
            var gameCount = 0;
            if (typeof games != 'undefined') {
                for (var i = 0, l = games.length; i < l; i++) {
                    if (games[i].seriesId == seriesId) {
                        seriesAvg += games[i].score;
                        gameCount++;
                    }
                }
            }
            if (typeof series != 'undefined') {
                for (var j = 0; j < leagues.length; j++) {
                    if (series[j].id == seriesId) {
                        series[j].avgScore = Math.floor((seriesAvg / gameCount) * 100) / 100;
                        break;
                    }
                }
                window.localStorage['series'] = angular.toJson(series);
            }


        }
    };
})
