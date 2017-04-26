(function() {
    'use strict';
    angular.module('Sayat')
        .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider,
             $urlRouterProvider,$locationProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    views: {
                        'header': {
                            template: '<header-component></header-component>'
                        },
                        'body': {
                            template: '<login-component></login-component>'
                        }
                    },
                    controller: 'LogInController'
                })
                .state('profile', {
                    url: '/profile',
                    views: {
                        'header': {
                            template: '<header-component user="$resolve.data"></header-component>'
                        },
                        'body': {
                            template: '<profile-component user="$resolve.data"></profile-component>'
                        }
                    },
                    // controller: 'profile',
                    resolve: {
                        data: ['$http', '$state', function($http, $state) {
                                return $http.get('/user')
                                .then(function(response) {
                                    console.log(response);
                                    return response.data;
                                }, function(err) {
                                    if (err) {
                                        $state.go('login');
                                    }
                                });
                        }]
                    }
                })
                .state('feedback', {
                    url: '/feedback/:username',
                    views: {
                        'header': {
                            template: '<header-component></header-component>'
                        },
                        'body': {
                            template: '<feedback-submit></feedback-submit>'
                        }
                    }
                });


                $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
            $urlRouterProvider.otherwise('/profile');
        }]);
})();
