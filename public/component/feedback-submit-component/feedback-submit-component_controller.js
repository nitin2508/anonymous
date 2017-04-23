(function() {
    angular.module('Sayat')
        .component('feedbackSubmit', {
            templateUrl: 'component/feedback-submit-component/feedback-submit-component_template.html',
            bindings: {

            },
            controller: FeedbackSubmitController
        });
    FeedbackSubmitController.$inject = ['LoginService', '$stateParams', 'LoaderService'];

    function FeedbackSubmitController(LoginService, $stateParams, LoaderService) {
        var vm = this;
        vm.$onInit = activate;

        function activate() {
            vm.froalaOptions = {
                toolbarButtons: ['bold', 'italic', 'underline', 'emoticons', 'fontFamily',
                 'fontSize', 'color', 'paragraphFormat', 'align', 'formatOL', 'formatUL',
                  'insertLink', 'insertImage', 'insertVideo', 'insertTable']
            };

            vm.feedback = '';
            vm.feedbackSubmit = false;
            vm.editFeedback = editFeedback;
            vm.sendFeedback = sendFeedback;
            console.log($stateParams);
            vm.username = $stateParams.username;
            LoginService.checkUser({
                username: vm.username
            }).
            then(function(response) {
                vm.userDetail = response.user[0];
                if (response.isRegister) {
                    vm.userAvailable = true;
                } else {
                    vm.userAvailable = false;
                }
            });
        }


        function editFeedback(){
            vm.feedbackSubmit = false;
        }

        function sendFeedback() {
            console.log('fghjk');
            console.log(vm.feedback);
            var feedbackJson = {
                username: vm.username,
                feedback: vm.feedback
            };
            if(vm.id){
                feedbackJson.id = vm.id;
            }

            LoaderService.showLoader();
            LoginService.sendFeedback(feedbackJson)
                .then(function(response) {
                    vm.feedbackDetails = response;
                    vm.feedbackSubmit = true;
                    vm.id = response._id;
                }).finally(function() {
                    LoaderService.hideLoader();
                });
        }



    }

})();
