import {ethConfigService} from '../../services/eth-config.service';
import {unigeUseridService} from '../../services/unige-userid.service';
import {bcuOffCampusController} from './bcu-off-campus.controller';
import {bcuOffCampusConfig} from './bcu-off-campus.config';
import {bcuOffCampusHtml} from './bcu-off-campus.html';

export const bcuOffCampusModule = angular
    .module('bcuOffCampusModule', [])
        .factory('ethConfigService', ethConfigService)
        .factory('unigeUseridService', unigeUseridService)
        .factory('bcuOffCampusConfig', bcuOffCampusConfig)
        .controller('bcuOffCampusController', bcuOffCampusController)
        .component('bcuOffCampus',{
            bindings: {afterCtrl: '<'},
            controller: 'bcuOffCampusController',
            template: bcuOffCampusHtml

        })
