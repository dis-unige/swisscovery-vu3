export const unigeAvatarService = ['$http', '$sce', function($http, $sce){

    function getAvatarData(url){
        
        $sce.trustAsResourceUrl(url);

        return $http.get(url)
            .then(
                function(response){
                    return response.data;
                },
                function(httpError){
                    if (httpError.status === 404)return null;
                    let error = "an error occured: unigeAvatarService callback: " + httpError.status;
                    if (httpError.data && httpError.data.errorMessage) {
                        error += ' - ' + httpError.data.errorMessage;
                    }
                    console.error(error);
                    return null;
                }
            );
    }
    
    function buildJson(data){
        return {
            context: "SP",
            pnx: {
                display: {
                    source: ["Avatar"],
                    type: [data.materialtype.toLowerCase()],
                    language: [data.language],
                    title: [data.title],
                    identifier: ["$$CAvatar$$V" + data.id],
                    creationdate: [data.pubdate],
                    creator: [data.author || " "], // this value can't be null otherwise it breaks the translation function
                    publisher: [data.publisher],
                    mms: [data.mmsid],
                    place: [data.pubplace],
                    lds11: [data.author]
                },
                control: {
                    sourcerecordid: [data.id],
                    recordid: ['alma' + data.mmsid],
                    sourcid: 'avatar',
                    originalsourceid: [data.id],
                    sourcesystem: ['Avatar API']
                },
                addata: {
                    au: [data.author],
                    date: [data.pubdate],
                    isbn: [data.isbn],
                    cop: [data.pubplace],
                    pub: [data.publisher],
                    format: [data.materialtype.toLowerCase()],
                    ristype: [data.materialtype.toLowerCase()],
                    btitle: [data.title]
                },
                sort: {
                    title: [data.title],
                    author: [data.author],
                    creationdate: [data.pubdate]
                },
                facets: {
                    frbrgroupid: "dummy"
                }
            },
            delivery: {
                deliveryCategory: [data.format == 'P' ? "Alma-P" : "Alma-E"],
                link: [
                    {
                        '@id': ":_0",
                        displayLabel: "thumbnail",
                        linkType: "thumbnail",
                        linkURL: data.image_proxy
                    }
                ]
            } 
        };
    }
    
    return {
        getAvatarData: getAvatarData,
        buildJson: buildJson
    };
}]