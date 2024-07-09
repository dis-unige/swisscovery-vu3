angular
    .module('unigeLoanPolicyLabelFix', [])
    .controller('unigeLoanPolicyLabelFixController', ['$scope', function ($scope) {
        var vm = this;
        this.$onInit = function() {
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
                                 // Remove the first 3 charachters from the loan policy display (internal codes)
                                 // if they are indeed numerical only
                                 if(angular.isDefined(itemLocations[i].itemFields[3])){
                                     if(itemLocations[i].itemFields[3].match(/^\d{2}\s/)){
                                         itemLocations[i].itemFields[3] = itemLocations[i].itemFields[3].substring(3);
                                     }   
                                 }
                             }
                         }
                    }
            );
        }
    }])
    .component('slspLocationItemsAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeLoanPolicyLabelFixController',
        template: ''  
    });