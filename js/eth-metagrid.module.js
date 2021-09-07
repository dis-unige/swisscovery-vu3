/**
* @ngdoc module
* @name ethMetagridModule
*
* @description
*
* - checks beacon.findbuch, Metagrid, Entityfacts (DNB), Wikidata for person informations (by GND ID)
*
* <b>CSS/Image Dependencies</b><br>
* CSS eth-person-card.css
*
*
*/
import {ethMetagridService} from './eth-metagrid.service';
import {ethMetagridHtml} from './eth-metagrid.html';
import {ethMetagridController} from './eth-metagrid.controller';


export const ethMetagridModule = angular
    .module('ethMetagridModule', [])
        .factory('ethMetagridService', ethMetagridService)
        .controller('ethMetagridController', ethMetagridController)
        .component('ethMetagridComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'ethMetagridController',
            template: ethMetagridHtml
        })
