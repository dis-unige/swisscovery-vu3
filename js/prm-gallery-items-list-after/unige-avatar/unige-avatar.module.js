import {unigeAvatarService} from './unige-avatar.service';

angular
    .module('unigeAvatar', [])
    .factory('unigeAvatarService', unigeAvatarService)
    .controller('unigeAvatarController', ['$scope', 'unigeAvatarService', function ($scope, unigeAvatarService) {
        var vm = this;
        this.$onInit = function() {
            
                $scope.$watch(
                    function () {
                        if (angular.isDefined(vm.parentCtrl.collectionId)){
                            // Wait until the collection description has been rendered before going further
                            return vm.parentCtrl.collectionId;
                        }
                        return 0;
                    },
                    function () {
                        // This listener function is called both during initial run and whenever the watched variable changes.
                        var currentCollection = vm.parentCtrl.$scope.$parent.$ctrl.currentCollection;
                        
                        if (angular.isDefined(currentCollection.description) && currentCollection.description.includes('https://dis.unige.ch/avatar/')){
                            
                            // Extract the Avatar URL from the description
                            let avatarUrl = currentCollection.description.match(/(https:\/\/dis\.unige\.ch\/avatar\/\S*)/)[0];
                            
                            // Remove the found Avatar URL from the description
                            currentCollection.description = currentCollection.description.replace(avatarUrl, '');
                            
                            // Remove search bar since it won't work with a custom collection
                            document.getElementsByTagName('prm-collection-search')[0].remove()
                            
                            unigeAvatarService.getAvatarData(avatarUrl)
                             .then((data) => {
                                 console.log('Avatar data received, processing...');
                                 vm.parentCtrl.items = data.map(x=>unigeAvatarService.buildJson(x));
                                 vm.parentCtrl.totalItems = data.length;
                                 vm.searchQueryFilter = "Collection externe";
                                 console.log(vm.parentCtrl.items);
                                 
                             })
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
    });