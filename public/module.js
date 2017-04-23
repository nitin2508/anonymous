(function() {
    angular.module('Sayat', ['ui.router', 'froala', 'ngSanitize','ngclipboard']).
    config(['$sceProvider', function($sceProvider) {
        $sceProvider.enabled(false);
    }]);
    // value('froalaConfig', {
    //      toolbarInline: false,
    //      placeholderText: 'Enter Text Here'
    //  });
})();
