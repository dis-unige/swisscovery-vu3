export class usiLocationOpenCloseController {

    constructor( ethConfigService, usiLocationOpenCloseConfig, $scope, $translate) {
        //console.log("***USI*** usiLocationOpenCloseController.constructor\n\n");
        this.usilocation = {};
        this.ethConfigService = ethConfigService;
        this.config = usiLocationOpenCloseConfig;
        this.$scope = $scope;
        this.$translate = $translate;
    }
    
    $onInit(){
        
        //console.log("***USI*** usiLocationOpenCloseController.$onInit\n\n");
        var vm = this;
        
        this.$scope.$watch(
            function () {
                if (angular.isDefined(vm.afterCtrl) && angular.isDefined(vm.afterCtrl.parentCtrl.currLoc)) {
                    // As soon as there are location details, watch for changes in the list of location items
                    
                    return vm.afterCtrl.parentCtrl.currLoc;
                }
                return 0;
            },
            function () {
                // This listener function is called both during initial run and whenever the watched variable changes.

                if (angular.isDefined(vm.afterCtrl.parentCtrl.currLoc)){
                    // Prevent the listener from running when the locations list hasn't been defined yet (initial run)
                    
                    if ( typeof vm.afterCtrl.parentCtrl.currLoc === "undefined" ) {
                        return;
                    }
                    // By default, display locations as open unless indicated otherwise
                    vm.usilocation.isopen = true;
                    try {
                        if (vm.config.closedLocations.length > 0){
                            // A list of locations is provided in the config file
                            vm.usilocation.isopen = (vm.config.closedLocations.includes( vm.afterCtrl.parentCtrl.currLoc.location.subLocationCode ) ) ? false : true;
                        }
                        else if (angular.isDefined(vm.config.closedLocationsLabelCode) && angular.isDefined(vm.config.closedLocationsLabelLanguage)){
                            // Get the list via label value
                            // Store the current language
                            var currentLanguage = vm.$translate.use();
                            // Use the specified language to get the list of fields
                            vm.$translate.use(vm.config.closedLocationsLabelLanguage).then(
                                vm.$translate(vm.config.closedLocationsLabelCode).then((translation) => {
                                if (angular.isDefined(translation)){
                                    let closedLocationsList = translation.split(',');
                                    vm.usilocation.isopen = (closedLocationsList.includes( vm.afterCtrl.parentCtrl.currLoc.location.subLocationCode ) ) ? false : true;
                                }
                            }));
                            // Reset translation language
                            vm.$translate.use(currentLanguage);
                        }
                        
                        
                        vm.usilocation.isuge = ( vm.afterCtrl.parentCtrl.currLoc.location.organization == vm.config.libraryId ) ? true : false;
                    }
                    catch (e) {
                        console.error("***USI*** an error occured: usiLocationOpenCloseController.$onInit\n\n");
                        console.error(e.message);
                        throw(e)
                    }
                }
             }   
        );
    }
}

usiLocationOpenCloseController.$inject = [ 'ethConfigService', 'usiLocationOpenCloseConfig', '$scope', '$translate'];