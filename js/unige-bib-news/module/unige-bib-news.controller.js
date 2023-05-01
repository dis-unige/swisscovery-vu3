export class unigeBibNewsController {

    constructor( $sce, unigeConfigService, unigeBibNewsConfig, unigeBibNewsService ) {
        this.$sce = $sce;
        this.unigeConfigService = unigeConfigService;
        this.config = unigeBibNewsConfig;
        this.unigeBibNewsService = unigeBibNewsService;
        this.lang = this.unigeConfigService.getLanguage();
    }

    $onInit() {
        try{
            this.unigeBibNewsService.getNews(this.lang)
                .then((data) => {
                    try{
                        this.allNewsUrl = 'https://www.unige.ch/biblio/fr/actus/';
                        this.news = data.entries;
                    }
                    catch(e){
                        console.error("***UNIGE*** an error occured: unigeBibNewsController unigeBibNewsService.getNews(): \n\n");
                        console.error(e.message);
                    }
                });
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeBibNewsController.onInit()\n\n");
            console.error(e.message);
        }
    }
    decodeHtmlEntities(text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        return this.$sce.trustAsHtml(div.textContent);
 		//return  text ? String(text).replace(/&nbsp;/gm, ' ') : '';
    };
}

unigeBibNewsController.$inject = ['$sce', 'unigeConfigService', 'unigeBibNewsConfig', 'unigeBibNewsService' ];
