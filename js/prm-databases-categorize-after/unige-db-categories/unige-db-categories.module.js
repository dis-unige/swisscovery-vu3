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
                        if (angular.isDefined(vm.parentCtrl.dbCategories)){
                            
                            vm.parentCtrl.dbOverrideCategories = [];                   
                            let baseUrl = $location.$$absUrl.replace(/^(.*)query=[^&]*(\&.*databases=).*/, "$1query=contains,dbcategory$2");
                            let currentSelection = vm.parentCtrl.dbParamArray;
                            vm.parentCtrl.dbCategories.dbcategory.forEach( (originalCategory) => {
                                
                                    let newMenuEntry = new Object();
                                    newMenuEntry.link = baseUrl + 'category,' + originalCategory.path;
                                    if (angular.isDefined(originalCategory.displayValue)){
                                        newMenuEntry.term = originalCategory.displayValue;
                                    }
                                    else {
                                        newMenuEntry.term = originalCategory.name;
                                    }
                                    if (originalCategory.name === currentSelection[0]){
                                        newMenuEntry.selected = 'selected';
                                    }
                                    newMenuEntry.subcategories = [];
                                    newMenuEntry.subcategories.push({term:'Ouvrages de référence',link:'#'});
                                
                                    if (originalCategory.dbcategories[0].dbcategory.length > 0){
                                        originalCategory.dbcategories[0].dbcategory.forEach( (subCategory) => {
                                            let newSubMenuEntry = new Object();
                                            if (angular.isDefined(subCategory.path)){
                                                newSubMenuEntry.link = baseUrl + 'category,' + subCategory.path;
                                            }
                                            else {
                                                newSubMenuEntry.link = baseUrl + 'category,' + originalCategory.name + '─' + subCategory.name;
                                            }
                                            if (angular.isDefined(subCategory.displayValue)){
                                                newSubMenuEntry.term = subCategory.displayValue;
                                            }
                                            else {
                                                newSubMenuEntry.term = subCategory.name;
                                            }
                                            if (subCategory.name === currentSelection[1]){
                                                newSubMenuEntry.selected = 'selected';
                                            }
                                            newMenuEntry.subcategories.push(newSubMenuEntry);
                                        })
                                    }
                                    vm.parentCtrl.dbOverrideCategories.push(newMenuEntry);
                                    
                            });
                            console.log(vm.parentCtrl);
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