/**
* @ngdoc service
* @key unigeSearchService
*
* @description
*
* Service to get context informations of the current search (tab, scope etc).
*
* <b>Used by</b><br>
*
* UNIGE Component {@link UNIGE.unigeAltmetricModule}<br>
*
*/
export const unigeSearchService = ['$rootScope', function( $rootScope ){

    function getTab(searchService) {
        return searchService.searchFieldsService._tab;
    }

    function getScope(searchService) {
        return searchService.searchFieldsService._scope;
    }

    function getMainSearch (searchService) {
        return searchService.searchFieldsService._mainSearch;
    }

    return {
        getTab: getTab,
        getScope: getScope,
        getMainSearch: getMainSearch
    }
}]
