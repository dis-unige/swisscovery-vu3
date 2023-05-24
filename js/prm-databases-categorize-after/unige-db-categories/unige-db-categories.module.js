import {unigeDbCategoriesHtml} from './unige-db-categories.template.html';

angular
    .module('unigeDbCategories', [])
    .controller('unigeDbCategoriesController', ['$scope', '$location', function ($scope, $location) {
        var vm = this;
        this.$onInit = function() {
            
            // Only run on dbsearch page
            if ($location.path().toLowerCase() == '/dbsearch') {
            
                $scope.$watch(
                    function () {
                        if (angular.isDefined(vm.parentCtrl.dbCategories) && angular.isDefined(vm.parentCtrl.dbCategories.dbcategory[0].path)){
                            // Wait until the dbCategories array has been fully created before going further
                            return vm.parentCtrl.dbCategories.dbcategory;
                        }
                        return 0;
                    },
                    function () {
                        // This listener function is called both during initial run and whenever the watched variable changes.
                        
                        vm.parentCtrl.dbOverrideCategories = [];
                        
                        let baseUrl = $location.$$absUrl.substring(0, $location.$$absUrl.indexOf('databases=category')+18);
                        
                        if (angular.isDefined(vm.parentCtrl.dbCategories)){
                            
                            vm.parentCtrl.dbCategories.dbcategory.forEach( (originalCategory) => {
                                let newMenuEntry = new Object();
                                newMenuEntry.link = baseUrl + ',' + originalCategory.path;
                                if (angular.isDefined(originalCategory.displayValue)){
                                    newMenuEntry.term = originalCategory.displayValue;
                                }
                                else {
                                    newMenuEntry.term = originalCategory.name;
                                }
                                if (originalCategory.dbcategories[0].dbcategory.length > 0){
                                    newMenuEntry.subcategories = [];
                                    originalCategory.dbcategories[0].dbcategory.forEach( (subCategory) => {
                                        let newSubMenuEntry = new Object();
                                        if (angular.isDefined(subCategory.path)){
                                            newSubMenuEntry.link = baseUrl + ',' + subCategory.path;
                                        }
                                        else {
                                            newSubMenuEntry.link = baseUrl + ',' + originalCategory.name + '─' + subCategory.name;
                                        }
                                        if (angular.isDefined(subCategory.displayValue)){
                                            newSubMenuEntry.term = subCategory.displayValue;
                                        }
                                        else {
                                            newSubMenuEntry.term = subCategory.name;
                                        }
                                        newMenuEntry.subcategories.push(newSubMenuEntry);
                                    })
                                }
                                vm.parentCtrl.dbOverrideCategories.push(newMenuEntry);
                            });
                            //console.log(vm.parentCtrl.dbOverrideCategories);
                            // Remove original categories menu
                            document.getElementById('stickyDB').remove();
                        }
                    }
                );
            }
        }
    }])
    .component('prmDatabasesCategorizeAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeDbCategoriesController',
        template: unigeDbCategoriesHtml
    });