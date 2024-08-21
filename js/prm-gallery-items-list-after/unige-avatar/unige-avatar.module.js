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
                            
                            let avatarUrl = currentCollection.description;
                            
                            
                            
                            currentCollection.description = "Description générique à modifier";
                            unigeAvatarService.getAvatarData(avatarUrl)
                             .then((data) => {
                                 console.log('Avatar data received, processing...');
                                 vm.parentCtrl.items = data.map(x=>unigeAvatarService.buildJson(x));
                                 vm.parentCtrl.totalItems = data.length;
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
        controller: 'unigeAvatarController'
    });