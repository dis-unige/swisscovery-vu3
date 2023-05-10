export const ethMetagridService = ['$http', '$sce', function($http, $sce){

    let baseurl = 'https://api.metagrid.ch/search?group=1&skip=0&take=50';

    function getConcordances(metagridService,metagridId){
        let url = baseurl + '&provider=' + metagridService + '&query=' + metagridId;
        $sce.trustAsResourceUrl(url);

        return $http.get(url)
            .then(
                function(response){
                    return response.data;
                },
                function(httpError){
                    if (httpError.status === 404)return null;
                    let error = "an error occured: ethMetagridService callback: " + httpError.status;
                    if (httpError.data && httpError.data.errorMessage) {
                        error += ' - ' + httpError.data.errorMessage;
                    }
                    console.error(error);
                    return null;
                }
            );
    }
    return {
        getConcordances: getConcordances
    };
}]
