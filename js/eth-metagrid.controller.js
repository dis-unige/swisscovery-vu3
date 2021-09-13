export class ethMetagridController {

    constructor( ethConfigService, ethMetagridConfig, ethMetagridService ) {
        this.ethConfigService = ethConfigService;
        this.config = ethMetagridConfig;
        this.ethMetagridService = ethMetagridService;
    }

    $onInit() {
        try{
            this.parentCtrl = this.afterCtrl.parentCtrl;

            // this.persons = collection for all persons having a GND ID
            this.persons = [];

            // GND ID in local display field 03
            if(!this.parentCtrl.item.pnx.display.lds03 || this.parentCtrl.item.pnx.display.lds03.length === 0)return;
            let lds03 = this.parentCtrl.item.pnx.display.lds03;

            // array of all GND IDs
            let gndIds = [];

            for(let i = 0; i < lds03.length; i++){
                // ALMA Ressources: link in value
                if(lds03[i].indexOf('/gnd/') > -1){
                    let part = lds03[i].substring(lds03[i].indexOf('/gnd/') + 5);
                    part = part.substring(0, part.indexOf('">'));
                    if(part.indexOf('(DE-588)')>-1){
                        part = part.replace('(DE-588)','')
                    }
                    if(gndIds.indexOf(part)===-1)gndIds.push(part);
                }
                // External data: text in value
                else if (lds03[i].indexOf(': ') > -1) {
                    let part = lds03[i].substring(lds03[i].indexOf(': ') + 2);
                    if(part.indexOf('(DE-588)')>-1){
                        part = part.replace('(DE-588)','')
                    }
                    if(gndIds.indexOf(part)===-1)gndIds.push(part);
                }
            }
            for(var i = 0; i < gndIds.length; i++){
                let gndId = gndIds[i];
                if (gndId === "")continue;
                if (gndId.indexOf(')')>-1) {
                    gndId = gndId.substring(gndId.lastIndexOf(')')+1);
                }

                this.ethMetagridService.getConcordances(gndId)
                .then((data) => {
                    try{
                        if (!data)return;
                        if (!data.concordances || data.concordances.length === 0 || !data.concordances[0].resources || data.concordances[0].resources.length === 0)return;
                        let person = {};
                        let resources = data.concordances[0].resources;
                        let whitelistedMetagridLinks = [];
                        let whitelistedMetagridLinksSorted = [];

                        person.name = resources[0].metadata.last_name;
                        if(resources[0].metadata.first_name){
                            person.name += ', ' + resources[0].metadata.first_name;
                        }

                        for(var j = 0; j < resources.length; j++){
                            let resource = resources[j];
                            let slug = resource.provider.slug;
                            let url = resource.link.uri;

                            // check whitelist for Metagrid links
                            if (this.config.whitelist.indexOf(slug) === -1) {
                                continue;
                            }

                            let label = this.ethConfigService.getLabel(this.config, slug);
                            whitelistedMetagridLinks.push({'slug': slug,'url': url, 'label': label});
                        }
                        // Dodis and HLS first
                        let dodis = whitelistedMetagridLinks.filter(e => {
                            return e.slug === 'dodis';
                        });
                        whitelistedMetagridLinksSorted = whitelistedMetagridLinksSorted.concat(dodis);
                        let hls = whitelistedMetagridLinks.filter(e => {
                            return e.slug === 'hls-dhs-dss';
                        });
                        whitelistedMetagridLinksSorted = whitelistedMetagridLinksSorted.concat(hls);
                        let rest = whitelistedMetagridLinks.filter(e => {
                            return e.slug !== 'hls-dhs-dss' && e.slug !== 'dodis';
                        });
                        whitelistedMetagridLinksSorted = whitelistedMetagridLinksSorted.concat(rest);

                        person.metagridLinks = whitelistedMetagridLinksSorted;
                        this.persons.push(person);
                    }
                    catch(e){
                        console.error("an error occured: ethMetagridController: ethMetagridService.getConcordances callback:\n\n");
                        console.error(e.message);
                    }
                })
            }
        }
        catch(e){
            console.error("***ETH*** an error occured: ethMetagridController.onInit()\n\n");
            console.error(e.message);
            throw(e);
        }
    }
}

ethMetagridController.$inject = ['ethConfigService', 'ethMetagridConfig', 'ethMetagridService'];
