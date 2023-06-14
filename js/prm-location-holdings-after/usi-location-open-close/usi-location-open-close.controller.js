export class usiLocationOpenCloseController {

    constructor( ethConfigService, usiLocationOpenCloseConfig, $element ) {
        console.log("***USI*** usiLocationOpenCloseController.constructor\n\n");
        this.usilocation = {};
        this.ethConfigService = ethConfigService;
        this.config = usiLocationOpenCloseConfig;
    }

    $onInit() {
        if ( typeof this.afterCtrl.parentCtrl.currLoc === "undefined" ) {
            return;
        }
        try {
            console.log("***USI*** usiLocationOpenCloseController.$onInit\n\n");
            this.usilocation.isopen = (this.config.closedLocations.includes( this.afterCtrl.parentCtrl.currLoc.location.subLocationCode ) ) ? false : true;
            this.usilocation.isuge = ( this.afterCtrl.parentCtrl.currLoc.location.organization == '41SLSP_UGE' ) ? true : false;
        }
        catch (e) {
            console.error("***USI*** an error occured: usiLocationOpenCloseController.$onInit\n\n");
            console.error(e.message);
            throw(e)
        }
    }
}

usiLocationOpenCloseController.$inject = [ 'ethConfigService', 'usiLocationOpenCloseConfig', '$element' ];