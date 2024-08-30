import {unigeAvatarService} from './unige-avatar.service';

angular
    .module('unigeAvatar', [])
    .factory('unigeAvatarService', unigeAvatarService)
    .controller('unigeAvatarController', ['$scope', 'unigeAvatarService', function ($scope, unigeAvatarService) {
        var vm = this;
        this.$onInit = function() {
            
                $scope.$watch(
                    function () {
                        if (angular.isDefined(vm.parentCtrl.$scope.$parent.$ctrl.currentCollection.description)){
                            // Wait until the collection description has been rendered before going further
                            return vm.parentCtrl.$scope.$parent.$ctrl.currentCollection.description;
                        }
                        return 0;
                    },
                    function () {
                        // This listener function is called both during initial run and whenever the watched variable changes.
                        var currentCollection = vm.parentCtrl.$scope.$parent.$ctrl.currentCollection;
                        if (angular.isDefined(currentCollection.description) && currentCollection.description.includes('https://dis.unige.ch/avatar/')){
                            
                            // If this is the first time this particular collection is loaded, store the Avatar URL in a new property
                            // and clean up the link in the description.
                            if (!angular.isDefined(currentCollection.avatarUrl)){
                                [currentCollection.avatarUrl, currentCollection.description] = unigeAvatarService.cleanDescription(currentCollection.description);
                            }
                            else {
                                // Since changing the description triggers the listener function again, only run the API call after the URL cleanup step.
                                
                                // Remove search bar since it won't work with a custom collection
                                let searchBarElements = document.getElementsByTagName('prm-collection-search');
                                if (searchBarElements.length > 0){
                                    searchBarElements[0].remove()
                                }
                                
                                // Run the API call and build item objects
                                unigeAvatarService.getAvatarData(currentCollection.avatarUrl)
                                 .then((data) => {
                                     console.log('Avatar data received, processing...');
                                     vm.parentCtrl.items = data.map(x=>unigeAvatarService.buildJson(x));
                                     vm.parentCtrl.totalItems = data.length;
                                     vm.searchQueryFilter = "Collection externe";
                                     console.log(vm.parentCtrl.items);
                                 
                                 })
                                
                            }
                        }
                    }
                );
            }
        }
    ])
    .controller('unigeAvatarCollectionCleanup', ['$scope', 'unigeAvatarService', function ($scope, unigeAvatarService) {
        var vm = this;
        this.$onInit = function() {
            
                $scope.$watch(
                    function () {
                        if (angular.isDefined(vm.parentCtrl.finalCollections)){
                            // Wait until the collection description has been rendered before going further
                            return vm.parentCtrl.finalCollections;
                        }
                        return 0;
                    },
                    function () {
                        // Go through the list of displayed collections and clean up descriptions that include an Avatar URL.
                        var collectionsList = vm.parentCtrl.finalCollections;
                        
                        if (angular.isDefined(collectionsList)){
                            var avatarCollections = collectionsList.filter(item => item.description.includes('https://dis.unige.ch/avatar/'));

                                avatarCollections.forEach(item => {
                                    if (!angular.isDefined(item.avatarUrl)){
                                        [item.avatarUrl, item.description] = unigeAvatarService.cleanDescription(item.description);
                                    }
                                });
                        }
                    }
                );
            }
        }
    ])
    .component('prmGalleryItemsListAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeAvatarController',
        template: '<div ng-if="$parent.$ctrl.items.length < 1">Fetching data from Avatar service, please wait...</div>'
    })
    .component('prmGalleryCollectionsListAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeAvatarCollectionCleanup'
    });
    