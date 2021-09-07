export class ethMetagridController {

    constructor( ethMetagridService ) {
        this.ethMetagridService = ethMetagridService;
    }

    $onInit() {
        try{
            this.parentCtrl = this.afterCtrl.parentCtrl;
            // collect all persons (having a GND ID)
            this.persons = [];

            // GND ID in local display field 03
            if(!this.parentCtrl.item.pnx.display.lds03 || this.parentCtrl.item.pnx.display.lds03.length === 0)return;
            let lds03 = this.parentCtrl.item.pnx.display.lds03;

            // Whitelist for Metagrid links
            let sourcesWhitelist = ["hallernet", "fotostiftung", "sikart","elites-suisses-au-xxe-siecle","bsg", "dodis", "helveticarchives", "helveticat", "hls-dhs-dss", "histoirerurale","lonsea","ssrq","alfred-escher","geschichtedersozialensicherheit"];

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
                // External data: text
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
                            if (sourcesWhitelist.indexOf(slug) === -1) {
                                continue;
                            }
                            let label = slug;
                            if (slug === 'elites-suisses-au-xxe-siecle') {
                                label = "Elites suisses au XXe siècle";
                            }
                            else if (slug === 'sikart') {
                                 label = "SIKART Lexikon zur Kunst in der Schweiz";
                            }
                            else if (slug === 'bsg') {
                                 label = "Bibliographie zur Schweizergeschichte";
                            }
                            else if (slug === 'dodis') {
                                 label = "Diplomatische Dokumente der Schweiz";
                            }
                            else if (slug === 'helveticarchives') {
                                 label = "HelveticArchives";
                            }
                            else if (slug === 'helveticat') {
                                 label = "Helveticat";
                            }
                            else if (slug === 'hls-dhs-dss') {
                                 label = "Historisches Lexikon der Schweiz";
                            }
                            else if (slug === 'hallernet') {
                                 label = "Editions- und Forschungsplattform hallerNet";
                            }
                            else if (slug === 'fotostiftung') {
                                 label = "Fotostiftung Schweiz";
                            }
                            else if (slug === 'histoirerurale') {
                                 label = "Archiv für Agrargeschichte";
                            }
                            else if (slug === 'lonsea') {
                                 label = "Lonsea";
                            }
                            else if (slug === 'ssrq') {
                                 label = "Sammlung Schweizerischer Rechtsquellen";
                            }
                            else if (slug === 'alfred-escher') {
                                 label = "Alfred Escher-Briefedition";
                            }
                            else if (slug === 'geschichtedersozialensicherheit') {
                                 label = "Geschichte der sozialen Sicherheit";
                            }
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

ethMetagridController.$inject = ['ethMetagridService'];
