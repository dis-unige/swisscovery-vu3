/**
* @ngdoc service
* @key unigeConfigService
*
* @description
*
* Service to get and handle informations from a module config:
* - getLabel()
* - getUrl()
* - getLanguage()
*
 */
export const unigeConfigService = ['$rootScope', function( $rootScope ){

    function getLanguage(){
        try{
            let sms = $rootScope.$$childHead.$ctrl.userSessionManagerService;
            if (!sms) {
                console.error("***UNIGE*** unigeConfigService: userSessionManagerService not available");
                return 'en';
            }
            else{
                return sms.getUserLanguage() || $window.appConfig['primo-view']['attributes-map'].interfaceLanguage;
            }
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeConfigService.getLanguage():");
            console.error(e.message);
            return 'en';
        }
    }


    function getLabel(config, key) {
        try{
            let lang = this.getLanguage();
            if (!config.label[key]) {
                console.error("***UNIGE*** unigeConfigService.getLabel: '" + key + "' not in config");
                return key;
            }
            if(config.label[key][lang]){
                return config.label[key][lang];
            }
            else{
                return config.label[key]['en'];
            }
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeConfigService.getLabel():");
            console.error(e.message);
            return '';
        }
    }

    function getUrl(config, key) {
        try{
            let lang = this.getLanguage();
            if (!config.url[key]) {
                console.error("***UNIGE*** unigeConfigService.getUrl: '" + key + "' not in config");
                return '';
            }
            if(config.url[key][lang]){
                return config.url[key][lang];
            }
            else{
                return config.url[key]['en'];
            }
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeConfigService.getUrl():");
            console.error(e.message);
            return '';
        }
    }

    return {
        getLanguage: getLanguage,
        getLabel: getLabel,
        getUrl: getUrl
    };
}]
