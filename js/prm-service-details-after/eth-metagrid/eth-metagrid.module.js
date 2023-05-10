/**
* @ngdoc module
* @name ethMetagridModule
*
* @description
*
* - checks beacon.findbuch, Metagrid, Entityfacts (DNB), Wikidata for person informations (by GND ID)
*
* <b>AngularJS Dependencies</b><br>
* Service /services {@link ETH.ethConfigService}<br>
*
*
* <b>CSS/Image Dependencies</b><br>
* CSS /css/eth-metagrid.css
*
*
*/
import {ethConfigService} from './eth-config.service';
import {ethMetagridConfig} from './eth-metagrid.config';
import {ethMetagridService} from './eth-metagrid.service';
import {ethMetagridHtml} from './eth-metagrid.html';
import {ethMetagridController} from './eth-metagrid.controller';


export const ethMetagridModule = angular
    .module('ethMetagridModule', [])
        .factory('ethConfigService', ethConfigService)
        .factory('ethMetagridConfig', ethMetagridConfig)
        .factory('ethMetagridService', ethMetagridService)
        .controller('ethMetagridController', ethMetagridController)
        .component('ethMetagridComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'ethMetagridController',
            template: ethMetagridHtml
        })
