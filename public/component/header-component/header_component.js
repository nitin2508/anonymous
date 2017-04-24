(function(){
    angular.module('Sayat')
    .component('headerComponent',{
        templateUrl: 'component/header-component/header_template.html',
        bindings:{
            user:'<'
        },
        controller:HeaderController
    });

    HeaderController.$inject = ['$window','$scope','LoginService','$state'];
    function HeaderController($window,$scope,LoginService,$state){
        var vm =this;

        vm.showHeader = false;
        $window.onscroll = function(){
            if(document.body.scrollTop>200){
                vm.showHeader = true;
                 $scope.$apply();
            }else{
                vm.showHeader = false;
                 $scope.$apply();
            }
        };
        vm.goToHome = function(){
            $state.go('profile');
        };
        vm.logout = function(){
            vm.user = null;
            LoginService.logout()
            .then(function(response){
                if($state.current.name ==='profile'){
                    $state.go('login');
                }
            });
        };
    }
})();
