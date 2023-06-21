angular
    .module('unigeTargetBlankFix', [])
    .controller('unigeTargetBlankFixController', ['$scope', function ($scope) {
        var vm = this;
        this.$onInit = function() {
                $scope.$watch(
                    function () {
                        if (angular.isDefined(vm.parentCtrl.mainView)){
                            // Wait until the mainView array has been fully created before going further
                            return vm.parentCtrl.mainView;
                        }
                        return 0;
                    },
                    function () {
                            // Set target="_self" for all items in the top menu
                            vm.parentCtrl.mainView.forEach((menuItem) => {
                                menuItem.target = '_self'; 
                            });
                            
                            // Add another watcher for the overlay menu
                            $scope.$watch(
                                function () {
                                    if (document.getElementsByClassName('custom-links-container').length > 0){
                                        // Wait until the overlay menu has been created
                                        return document.getElementsByClassName('custom-links-container').length;
                                    }
                                    return 0;
                                },
                                function () {
                                        // This function is called upon init too. Only process case when the overlay menu has been created
                                        if (document.getElementsByClassName('custom-links-container').length > 0){
                                            
                                            let overlayLinks = document.getElementsByClassName('custom-links-container')[0].children;
                                            
                                            for (let i = 0; i < overlayLinks.length; i++) {
                                                overlayLinks[i].firstElementChild.target = '_self'; 
                                            }
                                        }
                                    }
                            );
                        }
                );
                
            }
    }])
    .component('prmTopNavBarLinksAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeTargetBlankFixController'
    });