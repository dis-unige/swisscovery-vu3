import { slspIButtonModule } from './slsp-i-button/slsp-i-button.module';
import {usiLocationOpenCloseModule} from './usi-location-open-close/usi-location-open-close.module';


export const prmLocationHoldingsAfterModule = angular
    .module('prmLocationHoldingsAfterModule', [])
    .component('prmLocationHoldingsAfter', {
        bindings: { parentCtrl: '<' },
        template: `
		
        <slsp-i-button-component after-ctrl="$ctrl"></slsp-i-button-component>
        <usi-location-open-close-component after-ctrl="$ctrl"></usi-location-open-close-component>
        <slsp-location-holdings-after parent-ctrl="$parent.$ctrl"></slsp-location-holdings-after>
        
		`
    });


prmLocationHoldingsAfterModule.requires.push(slspIButtonModule.name);
prmLocationHoldingsAfterModule.requires.push(usiLocationOpenCloseModule.name);