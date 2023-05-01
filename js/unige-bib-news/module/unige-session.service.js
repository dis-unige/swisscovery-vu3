/**
* @ngdoc service
* @name unigeSessionService
*
* @description
*
* Service to get library news
*
 */
export const unigeSessionService = ['jwtHelper', function( jwtHelper ){

    function getDecodedToken(){
        try{
            if (!sessionStorage){
                console.error("***UNIGE*** no session storage")
                return null;
            }
            let jwt = sessionStorage.getItem('primoExploreJwt');
            if (!jwt){
                return null;
            }
            return jwtHelper.decodeToken(jwt);
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeSessionService.getDecodedToken:");
            console.error(e.message);
        }
    }

    function isOnCampus(){
        try{
            let decodedToken = getDecodedToken();
            if (!decodedToken) {
                return null;
            }
            if (decodedToken.onCampus === 'true') {
                return true;
            }
            else{
                return false;
            }
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeSessionService.isOnCampus:");
            console.error(e.message);
        }
    }

    function getViewId(){
        try{
            let decodedToken = getDecodedToken();
            if (!decodedToken) {
                return null;
            }
            return decodedToken.viewId;
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeSessionService.getViewId:");
            console.error(e.message);
        }
    }

    function isGuest(){
        try{
            let decodedToken = getDecodedToken();
            if (!decodedToken) {
                return null;
            }
            let userName= decodedToken.userGroup !== 'GUEST'? decodedToken.userName : '';
            if (userName){
                return false;
            }
            else{
                return true;
            }
        }
        catch(e){
            console.error("***UNIGE*** an error occured: unigeSessionService.isGuest:");
            console.error(e.message);
        }
    }

    return {
        isGuest: isGuest,
        isOnCampus: isOnCampus,
        getDecodedToken: getDecodedToken,
        getViewId: getViewId
    };
}]
