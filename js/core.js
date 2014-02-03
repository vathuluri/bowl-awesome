'use strict';
angular.module('bowlawesome').constant('constants', {
    produrl: 'http://lifestream-api.azurewebsites.net/',
    testurl: "http://dev.billomatic.com/services/",
    userLoggedIn: localStorage["user.isLogged"],
    httpTimeout: 5000
});