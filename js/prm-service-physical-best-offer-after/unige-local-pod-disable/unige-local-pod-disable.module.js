export const unigeLocalPodDisableModule = angular
    .module('unigeLocalPodDisableModule', [])
    .controller('unigeLocalPodDisableController', ['$scope','$translate', function ($scope, $translate) {
        var vm = this;
        this.$onInit = function() {
            // Prepare message to be displayed
            var podInfoMsg;
            $translate('unige_rapido_pod').then((translation) => {if (angular.isDefined(translation)){podInfoMsg = translation}});
            $scope.$watch(
                function () {
                    // Watch for the request button in the Rapido ILL box to be defined, this should
                    // mean that the box is ready.
                    if (angular.isDefined(document.querySelector('#get_it_btn_physical'))) {
                    //if (typeof document.querySelector('#get_it_btn_physical') === "undefined") {
                        return document.querySelector('#get_it_btn_physical');
                    }
                    return 0;
                },
                function(){
                    // This listener function is called both during initial run and whenever the watched variable changes.
                    if (angular.isDefined(document.querySelector('#get_it_btn_physical'))){
                        // Prevent the listener from running when the Rapido box hasn't been defined yet (initial run)
                        try {
                            // This is run once the Rapido request button has been defined
                            if (angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer) && angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer.supplyTime) && (vm.afterCtrl.parentCtrl.bestoffer.supplyTime == 1)) {
                                // Check if the best offer supply time is 1 day. This means the document is from within
                                // the Geneva POD and we want to prevent users from requesting it.
                                let requestButton = document.querySelector('#get_it_btn_physical');
                                var myAlertPodGe = document.querySelector('#alertpodge');

                                // Display info message, but only if it hasn't been displayed eariler.
                                // This can happen if the Rapido box is updated and the code runs again.
                                if ((!myAlertPodGe) && (typeof requestButton !== "undefined") && (requestButton != null)) {
                                    // Insert the info message
                                    requestButton.insertAdjacentHTML("beforebegin", podInfoMsg);

                                    // Disable button
                                    angular.element(requestButton).attr('disabled', 'disabled');
                                }
                            }
                        }
                        catch (e) {
                            console.error("***UNIGE*** an error occured: unigeLocalPodDisableModule\n\n");
                            console.error(e.message);
                            throw(e)
                        }
                    }
                }
            );
        }
    }])
    .component('unigeLocalPodDisableComponent', {
        bindings: {afterCtrl: `<`},
        controller: 'unigeLocalPodDisableController',
        template: ''  
    });