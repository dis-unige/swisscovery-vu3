import { ethMetagridModule } from './eth-metagrid/eth-metagrid.module';

export const prmServiceDetailsAfterModule = angular
    .module('prmServiceDetailsAfterModule', [])
    .component('prmServiceDetailsAfter',  {
            bindings: {parentCtrl: '<'},
            template: `<eth-metagrid-component after-ctrl="$ctrl"></eth-metagrid-component>`
    });

prmServiceDetailsAfterModule.requires.push(ethMetagridModule.name);

