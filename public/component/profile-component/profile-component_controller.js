(function() {
    'use strict';
    angular.module('Sayat')
        .component('profileComponent', {
            templateUrl: 'component/profile-component/profile-component_template.html',
            bindings: {
                user:'<'
            },
            controller: ProfileController
        });
    ProfileController.$inject = ['$stateParams', 'LoginService'];

    function ProfileController($stateParams, LoginService) {
        var vm = this;
        vm.$onInit = activate;

        function activate() {
            vm.username = vm.user.user.username;
             vm.url="http://nitinnagarlab/"+vm.username;
            LoginService.getProfileData(vm.username)
                .then(function(response) {
                    vm.feedback = response.data;
                    vm.length = vm.feedback.length;
                });

        }
    }
})();
