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
                            console.log(vm.parentCtrl);
                        }
                );
            }
    }])
    .component('prmTopNavBarLinksAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeTargetBlankFixController'
    });