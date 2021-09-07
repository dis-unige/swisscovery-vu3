import 'primo-explore-eth-metagrid';

var app = angular.module('viewCustom', ['ethMetagridModule']);

app.component('prmServiceLinksAfter',  {
        bindings: {parentCtrl: '<'},
        template: `<eth-metagrid-component after-ctrl="$ctrl"></eth-metagrid-component>`
    })
