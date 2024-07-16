export class bcuOffCampusController {
    constructor(ethConfigService, bcuOffCampusConfig) {
        this.config = bcuOffCampusConfig;
        this.ethConfigService = ethConfigService;
    }

    $onInit() {
        this.processDoCheck = false;
        this.deliveryCategory = [];
        if (this.afterCtrl.parentCtrl.item.pnx.addata.openaccess && this.afterCtrl.parentCtrl.itm.pnx.addata.openaccess[0] === 'true') {
            return;
        }
        let delivery = this.afterCtrl.parentCtrl.item.delivery;
        if (delivery && delivery.deliveryCategory && (delivery.deliveryCategory.indexOf('Alma-E') > -1 || delivery.deliveryCategory.indexOf('Remote Search Resource') > -1)) {
            this.deliveryCategory = delivery.deliveryCategory;
            this.processDoCheck = true;
        }
    }

    $doCheck() {
        if(!this.processDoCheck) {
            return;
        }
        let delivery = this.afterCtrl.parentCtrl.item.delivery;
        if(!delivery || !delivery.electronicServices || delivery.electronicServices.length === 0){
            return;
        }
        
        this.isOffCampusWarning = true;
        this.processDoCheck = false;
    }

}

bcuOffCampusController.$inject = [ 'ethConfigService', 'bcuOffCampusConfig' ];
