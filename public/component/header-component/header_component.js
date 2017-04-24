(function(){
    angular.module('Sayat')
    .component('headerComponent',{
        templateUrl: 'component/header-component/header_template.html',
        bindings:{

        },
        controller:HeaderController
    });

    HeaderController.$inject = ['$window','$scope'];
    function HeaderController($window,$scope){
        var vm =this;
        vm.showHeader = false;
        $window.onscroll = function(){
            console.log(document.body.scrollTop);
            if(document.body.scrollTop>200){
                vm.showHeader = true;
                 $scope.$apply();
            }else{
                vm.showHeader = false;
                 $scope.$apply();
            }
            // /console.log(document.documentElement.scrollTop);
            // $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
            // $scope.$apply(); //or simply $scope.$digest();
        };
    }
})();
