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
                    if (angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer)) {
                        // As soon as there are Rapido offers displayed, watch the bestoffer object
                        return vm.afterCtrl.parentCtrl.bestoffer;
                    }
                    return 0;
                },
                function () {
                    // This listener function is called both during initial run and whenever the watched variable changes.
                    if (angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer) && angular.isDefined(vm.afterCtrl.parentCtrl.bestoffer.supplyTime)){
                        // Prevent the listener from running when the best offer hasn't been defined yet (initial run)
                        
                        // Find the request button element
                        let requestButton = document.querySelector('#get_it_btn_physical');
                        
                        if(requestButton && vm.afterCtrl.parentCtrl.bestoffer.supplyTime == 1){
                            // If a ressource can be supplied in 1 day (local pod), disable ordering function
                            //console.log('*UNIGE* Local pod resource identified, disabling ordering function.');
                            
                            // Disable button
                            angular.element(requestButton).attr('disabled', 'disabled');
                            
                            // Display info message
                            requestButton.insertAdjacentHTML("beforebegin", podInfoMsg);
                            
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