import { slspCollapseDetailsModule } from './slsp-collapse-details/slsp-collapse-details.module';
import { ethMetagridModule } from './eth-metagrid/eth-metagrid.module';

export const prmServiceDetailsAfterModule = angular
    .module('prmServiceDetailsAfterModule', [])
    .component('prmServiceDetailsAfter', {
        bindings: { parentCtrl: '<' },
        template: `
            <slsp-collapse-details-component after-ctrl="$ctrl"></slsp-collapse-details-component>
            <slsp-service-details-after parent-ctrl="$parent.$ctrl"></<slsp-service-details-after>
            <eth-metagrid-component after-ctrl="$ctrl"></eth-metagrid-component>`
    });


prmServiceDetailsAfterModule.requires.push(slspCollapseDetailsModule.name);
prmServiceDetailsAfterModule.requires.push(ethMetagridModule.name);