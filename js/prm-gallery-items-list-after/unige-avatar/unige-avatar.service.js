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
            pnx: {
                display: {
                    source: ["Avatar"],
                    type: [data.materialtype.toLowerCase()],
                    language: [data.language],
                    title: [data.title],
                    format: [],
                    identifier: [data.id],
                    creationdate: [data.pubdate],
                    creator: [data.author],
                    publisher: [data.publisher],
                    mms: [data.mmsid],
                    vertitle: [],
                    series: [],
                    genre: [],
                    place: [data.pubplace],
                    version: [],
                    lds02: [],
                    lds11: [],
                    lds56: []
                },
                control: {
                    sourcerecordid: [data.id],
                    recordid: ['avatar' + data.id],
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
                }
            },
            delivery: {
                link: [{
                    linkType: 'thumbnail',
                    linkUrl: data.image,
                    displayLabel: 'thumbnail'
                }]
            } 
        };
    }
    
    return {
        getAvatarData: getAvatarData,
        buildJson: buildJson
    };
}]