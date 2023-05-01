angular
    .module('unigeNonCirculatingLabel', [])
    .controller('unigeNonCirculatingLabelController', ['$scope', '$location', function ($scope,$location) {
        var vm = this;
        this.$onInit = function() {
            
            // Proceed only when holding locations details have been loaded
            $scope.$watch(
                function () {
                    if (angular.isDefined(vm.parentCtrl.loc) && angular.isDefined(vm.parentCtrl.loc.items)) {
                    return vm.parentCtrl.loc.items.length;
                  }
                  return 0;
                },
                function (newValue, oldValue) {
                     if (newValue > 0) {
                         
                         console.log(vm.parentCtrl.loc);
                         
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
                                  itemLocations[i].itemFields[1] = 'Veuillez vous connecter pour savoir si le document est empruntable et connaitre la durée de prêt';
                                  itemLocations[i]._additionalData.itemcategoryname = 'Veuillez vous connecter pour savoir si le document est empruntable et connaitre la durée de prêt';
                                  // Not sure if this is reliable...
                                  //console.log(itemLocations[i]);
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