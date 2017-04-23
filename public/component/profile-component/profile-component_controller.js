(function() {
    'use strict';
    angular.module('Sayat')
        .component('profileComponent', {
            templateUrl: 'component/profile-component/profile-component_template.html',
            bindings: {

            },
            controller: ProfileController
        });
    ProfileController.$inject = ['$stateParams', 'LoginService'];

    function ProfileController($stateParams, LoginService) {
        var vm = this;
        vm.$onInit = activate;

        function activate() {
            var username = $stateParams.username;
             vm.url="http://localhost:3005/#!/"+username;
            vm.username = $stateParams.username;
            LoginService.getProfileData(vm.username)
                .then(function(response) {
                    vm.feedback = response.data;
                    vm.length = vm.feedback.length;
                });

        }
    }
})();
