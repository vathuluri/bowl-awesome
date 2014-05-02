'use strict';
angular.module('bowlawesome').constant('constants', {
    produrl: 'http://lifestream-api.azurewebsites.net/',
    testurl: "http://dev.billomatic.com/services/",
    userLoggedIn: localStorage["user.isLogged"],
    //userAuthToken : localStorage["authToken"],
    device_ios: false,
    device_android: true,
    device_bb : false,
    httpTimeout: 5000
});