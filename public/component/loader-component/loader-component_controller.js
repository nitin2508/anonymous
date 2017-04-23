(function() {
    angular.module('Sayat')
        .component('loaderComponent', {
            templateUrl: 'component/loader-component/loader-component_template.html',
            bindings: {

            },
            controller: LoaderController
        });

    LoaderController.$inject = ['$rootScope'];

    function LoaderController($rootScope) {
        var vm = this;

        $rootScope.$on('SHOW_LOADER',function(){
            vm.loader = true;
        });
        $rootScope.$on('HIDE_LOADER',function(){
            vm.loader = false;
        });
    }
})();
