(function(){
    angular.module('Sayat')
    .service('LoaderService',LoaderService);

    LoaderService.$inject = ['$rootScope'];

    function LoaderService($rootScope){
        this.showLoader = function(){
            $rootScope.$emit('SHOW_LOADER');
        };
        this.hideLoader = function(){
            $rootScope.$emit('HIDE_LOADER');
        };
    }
})();
