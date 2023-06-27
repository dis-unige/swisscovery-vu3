angular
    .module('unigeIllOpenUrl', [])
    .controller('unigeIllOpenUrlController', ['$scope', '$location', function ($scope,$location) {
        var vm = this;
        this.$onInit = function() {
            
            // For blankIll page only
            if ($location.path().toLowerCase() == '/blankill') {
                // Store OpenURL parameters in this controller
                vm.search = $location.search();
                
                // Proceed only when the request service contains the form fields
                var request_service = vm.parentCtrl.requestService;
                $scope.$watch(
                    function () {
                        if (angular.isDefined(request_service.formFields)) {
                        return request_service.formFields.length;
                      }
                      return 0;
                    },
                    function (newValue, oldValue) {
                      if (newValue > 0) {
                        var fields = request_service.formFields;
                        // Print all form fields in the console for Thomas to work through
                        //console.log(fields);
                        // Print URL parameters in the console for Thomas to compare to
                        //console.log(vm.search);
                        // Map field keys to OpenURL parameters
                        const param_map = {
                            'title': 'rft.title',
                            'articleTitle': 'rft.atitle',
                            'journalTitle': 'rft.jtitle',
                            'title' : 'rft.btitle',
                            'author': 'rft.au',
                            'publisher': 'rft.publisher',
                            'publicationDate': 'rft.pubdate',
                            'issn' : 'rft.issn',
                            'isbn' : 'rft.isbn',
                            'doi' : 'rft.doi',
                            'startPage' : 'rft.spage',
                            'endPage' : 'rft.epage',
                            'edition' : 'rft.edition',
                            'volume' : 'rft.volume',
                            'issue' : 'rft.issue',
                            'pmid' : 'rft.pmid'
                        }
                        
                        // Switch form type if the reference is for a journal article or a book chapter
                        if (angular.isDefined(vm.search['rft.genre']) && 
                           (vm.search['rft.genre'] == 'article' || (vm.search['rft.genre'] == 'book' && vm.search['rft.atitle'] != '')) ){
                            request_service.formData['citationType'] = 'CR';
                            request_service.formData['format'] = 'DIGITAL';
                            request_service.formFields[2].events.onClick();
                        }
                        
                        // Set each field value in formData
                        //console.log(request_service.formData);
                        var openurl_param;
                        angular.forEach(fields, function(field) {
                          if (angular.isDefined(param_map[field.key])) {
                            openurl_param = param_map[field.key];
                            request_service.formData[field.name] = vm.search[openurl_param];
                          }
                        });
                        
                        // Deal with special cases
                        
                        // Use rft.date if rft.pubdate is empty
                        if (angular.isDefined(vm.search['rft.date']) && vm.search['rft.date'] != '' && request_service.formData['publicationDate'] == '') {
                            request_service.formData['publicationDate'] = vm.search['rft.date'];
                        }
                        
                        // Build page range from start and end page
                        var pages_range = vm.search['rft.spage'];
                        if (angular.isDefined(vm.search['rft.epage']) && vm.search['rft.epage'] != '') {
                            pages_range = pages_range + '-' + vm.search['rft.epage'];
                        }
                        request_service.formData['pagesToPhotocopy'] = pages_range;
                        
                        // Set journal volume if the reference is of type article
                        if (vm.search['rft.genre'] == 'article'){
                            request_service.formData['journalVolume'] = vm.search['rft.volume'];
                        }
                        
                        // If rft.au is empty, try building author field from rft.aufirst and rft.aulast
                        if (!angular.isDefined(vm.search['rft.au']) || vm.search['rft.au'] == '') {
                            var author = '';
                            if (angular.isDefined(vm.search['rft.aulast']) && vm.search['rft.aulast'] != '') {
                                author = vm.search['rft.aulast'];
                            }
                            if (angular.isDefined(vm.search['rft.aufirst']) && vm.search['rft.aufirst'] != '') {
                                author = author + ', ' + vm.search['rft.aufirst'];
                            }
                            else if (angular.isDefined(vm.search['rft.auinit']) && vm.search['rft.auinit'] != '') {
                                author = author + ', ' + vm.search['rft.auinit'];
                            }
                            if (author != '') {
                                request_service.formData['author'] = author;
                            }
                        }
                        
                        // If it is a book or journal issue add additional details to the comment field
                        if (angular.isDefined(vm.search['rft.genre']) && (vm.search['rft.genre'] == 'book' || vm.search['rft.genre'] == 'journal') ){
                            var comment = '';
                            if (angular.isDefined(vm.search['rft.volume']) && vm.search['rft.volume'] != '') {
                                comment = 'Vol: ' + vm.search['rft.volume'];
                            }
                            if (angular.isDefined(vm.search['rft.issue']) && vm.search['rft.issue'] != '') {
                                comment = comment + ' N°: ' + vm.search['rft.issue'];
                            }
                            if (angular.isDefined(vm.search['rft.part']) && vm.search['rft.part'] != '') {
                                comment = comment + ' Part: ' + vm.search['rft.part'];
                            }
                            if (angular.isDefined(vm.search['rft.doi']) && vm.search['rft.doi'] != '') {
                                comment = comment + ' DOI: ' + vm.search['rft.doi'];
                            }
                            if (comment != '') {
                                request_service.formData['comment'] = comment;
                            }
                        }
                        
                        // Add place to publisher field if present
                        if (angular.isDefined(vm.search['rft.place']) && vm.search['rft.place'] != '' &&
                            angular.isDefined(vm.search['rft.publisher']) && vm.search['rft.publisher'] != '') {
                                request_service.formData['publisher'] = vm.search['rft.place'] + ': ' + vm.search['rft.publisher'];
                        }
                        
                        // If the reference is for a whole journal issue, tweak fields to be able to pass on the required information.
                        if (angular.isDefined(vm.search['rft.genre']) && vm.search['rft.genre'] == 'journal'){
                            if (angular.isDefined(vm.search['rft.jtitle']) && vm.search['rft.jtitle'] != ''){
                                request_service.formData['title'] = vm.search['rft.jtitle'];
                            }
                            // For whole isues, it's OK if no author is provided
                            if (request_service.formData['author'] == ''){
                                request_service.formData['author'] = "N/A";
                            }
                            // For journal issues, put the ISSN in the ISBN field
                            if (angular.isDefined(vm.search['rft.issn']) && vm.search['rft.issn'] != ''){
                                request_service.formData['isbn'] = vm.search['rft.issn'] + ' (ISSN)';
                            }
                        }
                        
                      }
                    }
                  );
                }
              }
        
    }])
    .component('prmBlankIllAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'unigeIllOpenUrlController',
        template: ''  
    });
