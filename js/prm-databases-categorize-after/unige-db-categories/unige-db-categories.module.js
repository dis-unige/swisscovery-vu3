angular
    .module('unigeDbCategories', [])
    .controller('unigeDbCategoriesController', ['$scope', '$location', function ($scope, $location) {
        var vm = this;
        this.$onInit = function() {
            
            // Only run on dbsearch page
            if ($location.path().toLowerCase() == '/dbsearch') {
            
                $scope.$watch(
                    function () {
                        if (angular.isDefined(vm.parentCtrl.dbCategories) && angular.isDefined(vm.parentCtrl.dbCategories.dbcategory)){
                            // As soon as there are location details, watch for changes in the list of location items
                            return vm.parentCtrl.dbCategories.dbcategory;
                        }
                        return 0;
                    },
                    function () {
                        // This listener function is called both during initial run and whenever the watched variable changes.
                        if (angular.isDefined(vm.parentCtrl.dbCategories)){
                            console.log(vm.parentCtrl.dbCategories.dbcategory);
                            let newDatabaseObject = new Object();
                            newDatabaseObject.dbcategory = [{name:'Ouvrages de référence'}];
                            vm.parentCtrl.dbCategories.dbcategory[9].dbcategories[0] = newDatabaseObject;
                            console.log(vm.parentCtrl.dbCategories.dbcategory[9]);
                            console.log(vm.parentCtrl.dbCategories.dbcategory[10]);
                        }
                    }
                );
            }
        }
    }])
    .component('prmDatabasesCategorizeAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeDbCategoriesController',
        template: ''  
    });