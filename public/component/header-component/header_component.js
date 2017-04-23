(function(){
    angular.module('Sayat')
    .component('headerComponent',{
        templateUrl: 'component/header-component/header_template.html',
        bindings:{

        },
        controller:HeaderController
    });

    HeaderController.$inject = [];
    function HeaderController(){
        
    }
})();
