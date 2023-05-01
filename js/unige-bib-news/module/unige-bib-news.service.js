/**
* @ngdoc service
* @name unigeBibNewsService
*
* @description
* Service to get UNIGE Library News
*
*
* <b>Used by</b><br>
** Module {@link UNIGE.unigeBibNewsModule}<br>
*
*
 */

export const unigeBibNewsService = ['$http', '$sce', function($http, $sce){

    function getNews(lang){
        if(!lang){
            lang = 'en';
        }
        if(lang == 'fr' || lang == 'it'){
            lang = 'en';
        }

        let url = 'https://dis.unige.ch/slsp/unige_bib_news.php';
        $sce.trustAsResourceUrl(url);

        return $http.get(url,{headers:{ "X-From-ExL-API-Gateway": undefined }})
            .then(
                function(response){
                    console.log('lang = ' + lang);
                    return response.data;
                },
                function(httpError){
                    let error = "***UNIGE*** an error occured: unigeBibNewsService.get(): " + httpError.status;
                    if (httpError.data && httpError.data.errorMessage) {
                        error += ' - ' + httpError.data.errorMessage;
                        
                    }
                    console.error(error);
                    return null;
                }
            );
    }


    return {
        getNews: getNews
    };
}];
