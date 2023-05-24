angular
    .module('unigeNonCirculatingLabel', [])
    .controller('unigeNonCirculatingLabelController', ['$scope','$translate', function ($scope, $translate) {
        var vm = this;
        this.$onInit = function() {
            // Prepare message to be displayed
            var displayMessage;
            $translate('nui.message.itemlogin').then((translation) => {if (angular.isDefined(translation)){displayMessage = translation}});
            $scope.$watch(
                function () {
                    if (angular.isDefined(vm.parentCtrl.loc) && angular.isDefined(vm.parentCtrl.loc.items)) {
                        // As soon as there are location details, watch for changes in the list of location items
                        return vm.parentCtrl.loc.items;
                    }
                    return 0;
                },
                function () {
                    // This listener function is called both during initial run and whenever the watched variable changes.
                    if (angular.isDefined(vm.parentCtrl.loc)){
                        // Prevent the listener from running when the locations list hasn't been defined yet (initial run)

                             // If a user is connected, the loanable status display is correct
                             if (vm.parentCtrl.isLoggedIn()){
                                 // Do nothing for now. Could possibly edit 
                                 console.log('User is logged in, loanable status display correct.');
                             }
                             else {                             
                                 // If no user is logged in, Primo displays a "not loanable" status even if this may not be the case.
                                 // Replace that status with a note asking users to log in to get more info.
                             
                                 console.log('Found some holdings to correct');
                             
                                 var itemLocations = vm.parentCtrl.loc.items;
                             
                                  for(var i = 0; i < itemLocations.length; i++){
                                      itemLocations[i].itemFields[1] = displayMessage;
                                  }
                             }
                         }
                    }
            );
        }
    }])
    .component('slspLocationItemsAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeNonCirculatingLabelController',
        template: ''  
    });