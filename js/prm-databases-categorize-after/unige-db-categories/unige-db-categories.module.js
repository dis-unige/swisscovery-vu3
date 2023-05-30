import {unigeDbCategoriesHtml} from './unige-db-categories.template.html';
import {unigeDbCategoriesConfig} from './unige-db-categories.config.js';

angular
    .module('unigeDbCategories', [])
    .factory('unigeDbCategoriesConfig', unigeDbCategoriesConfig)
    .controller('unigeDbCategoriesController', ['$scope', '$location', '$translate', function ($scope, $location, $translate) {
        var vm = this;
        this.$onInit = function() {
            
            // Only run on dbsearch page
            if ($location.path().toLowerCase() == '/dbsearch') {
                
                // Fetch display label translations
                var encSearchLabel, oreSearchLabel;
                $translate('unige.databasesearch.enc').then((translation) => {if (angular.isDefined(translation)){encSearchLabel = translation}});
                $translate('unige.databasesearch.ore').then((translation) => {if (angular.isDefined(translation)){oreSearchLabel = translation}});
                
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
                            // Load list of reference work codes
                            let dbRefCodes = unigeDbCategoriesConfig.refcode;
                            let dbRefSearchUrl = unigeDbCategoriesConfig.baseurl;
                            let currentViewId = vm.parentCtrl.$stateParams.vid;
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
                                    
                                    // Check if reference works codes were defined for this topic. If yes, display them.
                                    let refWorksLinks = dbRefCodes[originalCategory.name];
                                    if(angular.isDefined(refWorksLinks)){
                                        if(angular.isDefined(refWorksLinks.enc)){
                                            newMenuEntry.subcategories.push({
                                                term:encSearchLabel,link:dbRefSearchUrl + refWorksLinks.enc + ',AND&vid=' + currentViewId
                                            });
                                        }
                                        if(angular.isDefined(refWorksLinks.ore)){
                                            newMenuEntry.subcategories.push({
                                                term:oreSearchLabel,link:dbRefSearchUrl + refWorksLinks.ore + ',AND&vid=' + currentViewId
                                            });
                                        }
                                    }
                                
                                    // Add any subcategories if present
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