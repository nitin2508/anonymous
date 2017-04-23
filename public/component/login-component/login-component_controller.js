(function() {
    'use strict';
    var ngModule = angular.module('Sayat');
    ngModule.component('loginComponent', {
        bindings: {

        },
        templateUrl: 'component/login-component/login-component_template.html',
        controller: LoginController
    });

    LoginController.$inject = ['LoginService', '$state', 'LoaderService', '$timeout'];

    function LoginController(LoginService, $state, LoaderService, $timeout) {
        var vm = this;
        vm.$onInit = activate;

        function activate() {
            $('#signUp').click(function() {
                $('.ui.small.modal')
                    .modal('show');
            });

            //varibles
            vm.email = '';
            vm.username = '';
            vm.registerPasswords = '';
            vm.loginUsername = '';
            vm.loginPassword = '';
            vm.usernameNotavailable = false;
            vm.registrationSuccessful = false;
            //functions
            vm.register = register;
            vm.login = login;
            vm.checkUsename = checkUsename;
        }

        function register(e) {
            e.stopPropagation();
            var param = {
                username: vm.username,
                email: vm.email,
                password: vm.registerPassword
            };
            vm.showLoader = true;
            LoginService.doRegistration(param)
                .then(function(response) {
                    if (response.status === 'Registration Sucessful') {
                        vm.registrationSuccessful = true;
                    }
                    $timeout(function() {
                        $('.ui.small.modal').modal('refresh');
                        $('.ui.small.modal').modal('hide');

                    }, 3000);


                }).finally(function() {
                    vm.showLoader = false;
                });
        }

        function checkUsename() {
            if (vm.username) {
                var param = {
                    username: vm.username
                };
                LoginService.checkUser(param)
                    .then(function(response) {
                        if (response.isRegister) {
                            vm.usernameNotavailable = true;
                        } else {
                            vm.usernameNotavailable = false;
                        }
                        console.log(response);
                    });
            }

        }

        function login() {
            var loginParam = {
                username: vm.loginUsername,
                password: vm.loginPassword
            };
            LoaderService.showLoader();
            LoginService.doLogin(loginParam)
                .then(function(response) {
                    console.log(response.user.username);
                    $state.go('profile', {
                        username: response.user.username
                    });
                }, function(err) {
                    console.log(err);
                }).finally(function() {
                    LoaderService.hideLoader();
                });
        }

    }
})();
