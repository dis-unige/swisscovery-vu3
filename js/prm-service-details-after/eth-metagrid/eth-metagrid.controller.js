// Modified ETH Metagrid lookup module
// Added support for IdRef in addition to GND
// T. Guignard for UNIGE - April 2023

export class ethMetagridController {

    constructor( ethConfigService, ethMetagridConfig, ethMetagridService ) {
        this.ethConfigService = ethConfigService;
        this.config = ethMetagridConfig;
        this.ethMetagridService = ethMetagridService;
    }
    
    buildMetalinkLinks(provider,id){
        this.ethMetagridService.getConcordances(provider, id)
        .then((data) => {
            try{
                if (!data)return;
                if (!data.concordances || data.concordances.length === 0 || !data.concordances[0].resources || data.concordances[0].resources.length === 0)return;
                
                // Use Metagrid unique identifiers to avoid duplicates
                let metagridId = data.concordances[0].id;
                if (this.persons.find(x => x.id == metagridId))return;          
                
                let person = {};
                person.id = metagridId;
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
                    if (angular.isDefined(this.config.whitelist)){
                        if (this.config.whitelist.indexOf(slug) === -1) {
                            continue;
                        }
                    }
                    else if (angular.isDefined(this.config.blacklist)){
                        if (this.config.blacklist.indexOf(slug) > -1) {
                            continue;
                        }
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

    $onInit() {
        try{
            this.parentCtrl = this.afterCtrl.parentCtrl;

            // this.persons = collection for all persons having a GND or IdRef ID
            this.persons = [];

            // Only run the rest of the code once the local fields have been loaded
            if(!this.parentCtrl.item.pnx.display.lds03 && !this.parentCtrl.item.pnx.display.lds90)return;
            
            // array of all GND IDs
            let gndIds = [];
            
            // array of all IdRef IDs
            let idrefIds = [];
            
            if(angular.isDefined(this.parentCtrl.item.pnx.display.lds03)){
                
                // Look up any GND IDs found (in local field lds03)
                let lds03 = this.parentCtrl.item.pnx.display.lds03;
            
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
                //console.log('Authorités GND:')
                //console.log(gndIds);
            }
            
            
            if(this.parentCtrl.item.pnx.display.lds90){
                
                // Look up any IdRef IDs found (in local field lds90)
                let lds90 = this.parentCtrl.item.pnx.display.lds90;
            
                for(let i = 0; i < lds90.length; i++){
                    // Catch IdRef links provided as URLs
                    if(lds90[i].indexOf('idref.fr/') > -1){
                        let part = lds90[i].substring(lds90[i].indexOf('idref.fr/') + 9);
                        part = part.substring(0, part.indexOf('">'));
                        // Remove any (IdRef) prefix
                        if(part.indexOf('(IdRef)')>-1){
                            part = part.replace('(IdRef)','')
                        }
                        if(idrefIds.indexOf(part)===-1)idrefIds.push(part);
                    }
                    // Catch identifiers provided with (IdRef) prefix
                    else if (lds90[i].indexOf(': ') > -1) {
                        let part = lds90[i].substring(lds90[i].indexOf(': ') + 2);
                        if(part.indexOf('(IdRef)')>-1){
                            part = part.replace('(IdRef)','')
                        }
                        if(idrefIds.indexOf(part)===-1)idrefIds.push(part);
                    }
                }
                //console.log('Authorités IdRef:')
                //console.log(idrefIds);
            }
            
 
                for(var i = 0; i < gndIds.length; i++){
                    let gndId = gndIds[i];
                    if (gndId === "")continue;
                    if (gndId.indexOf(')')>-1) {
                        gndId = gndId.substring(gndId.lastIndexOf(')')+1);
                    }
                
                    this.buildMetalinkLinks('gnd', gndId);
                }
            
                for(var i = 0; i < idrefIds.length; i++){
                    let idrefId = idrefIds[i];
                    if (idrefId === "")continue;
                    if (idrefId.indexOf(')')>-1) {
                        idrefId = idrefId.substring(idrefId.lastIndexOf(')')+1);
                    }
                
                    this.buildMetalinkLinks('sudoc', idrefId);
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
