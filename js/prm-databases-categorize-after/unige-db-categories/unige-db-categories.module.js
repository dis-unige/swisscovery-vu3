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
                            
                            // Rebuild the base db search base URL in case we're displaying the menu after a custom search           
                            let baseUrl = $location.$$absUrl.replace(/^(.*\?).*/,"$1") + 'query=contains,dbcategory,&tab=jsearch_slot';
                            
                            if (angular.isDefined(vm.parentCtrl.$stateParams.sortby)){
                                baseUrl = baseUrl + '&sortby=' + vm.parentCtrl.$stateParams.sortby;
                            }
                            if (angular.isDefined(vm.parentCtrl.$stateParams.lang)){
                                baseUrl = baseUrl + '&lang=' + vm.parentCtrl.$stateParams.lang;
                            }
                            if (angular.isDefined(vm.parentCtrl.$stateParams.offset)){
                                baseUrl = baseUrl + '&offset=' + vm.parentCtrl.$stateParams.offset;
                            }
                            baseUrl = baseUrl + '&vid=' + vm.parentCtrl.$stateParams.vid + '&databases=';
                            
                            let currentSelection = [];
                            // If on the original dbsearch page, the currently selected item is present in the dbParamArray object
                            if (angular.isDefined(vm.parentCtrl.dbParamArray)){
                                currentSelection = vm.parentCtrl.dbParamArray;
                            }
                            // Otherwise we're passing it through the dbCustomSearch URI parameter
                            else {
                                currentSelection = $location.search().dbCustomSearch.split('─');
                            }
                            
                            
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
                                                term:encSearchLabel,
                                                link:dbRefSearchUrl + refWorksLinks.enc + ',AND&vid=' + currentViewId + '&dbCustomSearch=' + encodeURIComponent(newMenuEntry.term) + '─' + encodeURIComponent(encSearchLabel),
                                                selected:(newMenuEntry.selected == 'selected') && (currentSelection[1] == encSearchLabel) ? 'selected' : false
                                            });
                                        }
                                        if(angular.isDefined(refWorksLinks.ore)){
                                            newMenuEntry.subcategories.push({
                                                term:oreSearchLabel,
                                                link:dbRefSearchUrl + refWorksLinks.ore + ',AND&vid=' + currentViewId + '&dbCustomSearch=' + encodeURIComponent(newMenuEntry.term) + '─' + encodeURIComponent(oreSearchLabel),
                                                selected:(newMenuEntry.selected == 'selected') && (currentSelection[1] == oreSearchLabel) ? 'selected' : false
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