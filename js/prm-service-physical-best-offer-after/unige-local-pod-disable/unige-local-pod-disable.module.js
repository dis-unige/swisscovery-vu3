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
                    // if (angular.isDefined(document.querySelector('#get_it_btn_physical'))) {
                    if (typeof document.querySelector('#get_it_btn_physical') === "undefined") {
                        return;
                    }
                    try {
                        // As soon as there the button is OK
                        // console.log('*UNIGE* Button OK');
                        if (angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer) && angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer.supplyTime) && (vm.afterCtrl.parentCtrl.bestoffer.supplyTime == 1)) {
                            // As soon all is OK 
                            // console.log('*UNIGE* Local pod resource identified, disabling ordering function.');
                            let requestButton = document.querySelector('#get_it_btn_physical');
                            var myAlertPodGe = document.querySelector('#alertpodge');
                            // var myAlertPodGe = document.getElementById('alertpodge');
                            // Display info message
                            if ((!myAlertPodGe) && (typeof requestButton !== "undefined") && (requestButton != null)) {
                                // console.log('*UNIGE* message added');
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
                },

            );
        }
    }])
    .component('unigeLocalPodDisableComponent', {
        bindings: {afterCtrl: `<`},
        controller: 'unigeLocalPodDisableController',
        template: ''  
    });