import {unigeConfigService} from './module/unige-config.service';
import {unigeBibNewsConfig} from './module/unige-bib-news.config';
import {unigeBibNewsController} from './module/unige-bib-news.controller';
import {unigeBibNewsHtml} from './module/unige-bib-news.html';
import {unigeBibNewsService} from './module/unige-bib-news.service';

export const unigeBibNewsModule = angular
    .module('unigeBibNewsModule', [])
        .factory('unigeConfigService', unigeConfigService)
        .factory('unigeBibNewsConfig', unigeBibNewsConfig)
        .factory('unigeBibNewsService', unigeBibNewsService)
        .controller('unigeBibNewsController', unigeBibNewsController)
        .component('unigeBibNewsComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'unigeBibNewsController',
            template: unigeBibNewsHtml
        })

unigeBibNewsModule.requires.push(unigeBibNewsModule.name);
