(function() {
    'use strict';
    angular.module('Sayat')
        .service('LoginService', LoginService);
    LoginService.$inject = ['$http'];

    function LoginService($http) {
        var baseUrl ='';

        this.doRegistration = function(data) {
            console.log(data);
            return $http.post(baseUrl + '/register', data)
                .then(function(response) {
                    return response.data;
                });
        };

        this.doLogin = function(data) {
            console.log(data);
            return $http.post(baseUrl + '/login', data)
                .then(function(response) {
                    return response.data;
                });
        };

        this.getProfileData = function(username) {
            return $http.get(baseUrl + '/feedback/read/' + username)
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        };

        this.checkUser = function(username) {
            console.log(username);
            return $http.post(baseUrl+'/checkusername',username)
            .then(function(response){
                console.log(response);
                return response.data;
            });
        };

        this.sendFeedback = function(feedbackJson){
            return $http.post(baseUrl+'/feedback/write',feedbackJson)
            .then(function(response){
                console.log(response);
                return response.data;
            });
        };

    }
})();
