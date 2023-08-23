angular
    .module('unigeNonCirculatingLabel', [])
    .controller('unigeNonCirculatingLabelController', ['$scope','$translate', function ($scope, $translate) {
        var vm = this;
        this.$onInit = function() {
            // Prepare message to be displayed
            var pleaseLogInMessage;
            var nonCirculatingDisplay;
            $translate('nui.message.itemlogin').then((translation) => {if (angular.isDefined(translation)){pleaseLogInMessage = translation}});
            $translate('unige_non_circulating').then((translation) => {if (angular.isDefined(translation)){nonCirculatingDisplay = translation}});
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
                             var itemLocations = vm.parentCtrl.loc.items;
                             for(var i = 0; i < itemLocations.length; i++){
                                 if (vm.parentCtrl.isLoggedIn()){
                                     // If a user is connected, the loanable status display is correct
                                     // except for when the display is empty.
                                     if (itemLocations[i].itemFields[1] == " "){
                                         itemLocations[i].itemFields[1] = nonCirculatingDisplay;
                                     }
                                 }
                                 else {                             
                                     // If no user is logged in, Primo displays a "not loanable" status even if this may not be the case.
                                     // Replace that status with a note asking users to log in to get more info.
                                     itemLocations[i].itemFields[1] = pleaseLogInMessage;
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