import {usiLocationOpenCloseConfig} from './usi-location-open-close.config';
import {usiLocationOpenCloseController} from './usi-location-open-close.controller';
import {usiLocationOpenCloseHtml} from './usi-location-open-close.html';
import {ethConfigService} from '../../services/eth-config.service';

export const usiLocationOpenCloseModule = angular
    .module('usiLocationOpenCloseModule', [])
        .factory('ethConfigService', ethConfigService)
        .factory('usiLocationOpenCloseConfig', usiLocationOpenCloseConfig)
        .controller('usiLocationOpenCloseController', usiLocationOpenCloseController)
        .component('usiLocationOpenCloseComponent',{
            controller: 'usiLocationOpenCloseController',
            bindings: {afterCtrl: '<'},
            template: usiLocationOpenCloseHtml
        })

