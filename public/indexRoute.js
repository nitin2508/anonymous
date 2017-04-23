(function() {
    'use strict';
    angular.module('Sayat')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
                    url: '/profile/:username',
                    views: {
                        'header': {
                            template: '<header-component></header-component>'
                        },
                        'body': {
                            template: '<profile-component></profile-component>'
                        }
                    },
                    controller: 'profile'
                })
                .state('feedback', {
                    url: '/:username',
                    views: {
                        'header': {
                            template: '<header-component></header-component>'
                        },
                        'body': {
                            template: '<feedback-submit></feedback-submit>'
                        }
                    }
                });

                
            $urlRouterProvider.otherwise('/login');
        }]);
})();
