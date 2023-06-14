export class usiLocationOpenCloseController {

    constructor( ethConfigService, usiLocationOpenCloseConfig, $element ) {
        console.log("***USI*** usiLocationOpenCloseController.constructor\n\n");
        this.usilocation = {};
    }

    $onInit() {
        if ( typeof this.afterCtrl.parentCtrl.currLoc === "undefined" ) {
            return;
        }
        try {
            console.log("***USI*** usiLocationOpenCloseController.$onInit\n\n");
            let openLocations = [ '610800001' ];
            this.usilocation.isopen = ( openLocations.includes( this.afterCtrl.parentCtrl.currLoc.location.subLocationCode ) ) ? true : false;
            this.usilocation.isusi = ( this.afterCtrl.parentCtrl.currLoc.location.organization == '41SLSP_UGE' ) ? true : false;
        }
        catch (e) {
            console.error("***USI*** an error occured: usiLocationOpenCloseController.$onInit\n\n");
            console.error(e.message);
            throw(e)
        }
    }
}

usiLocationOpenCloseController.$inject = [ 'ethConfigService', 'usiLocationOpenCloseConfig', '$element' ];