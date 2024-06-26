import {ethConfigService} from '../../services/eth-config.service';
import {unigeUseridService} from '../../services/unige-userid.service';
import {bcuOnlineFeedbackController} from './bcu-online-feedback.controller';
import {bcuOnlineFeedbackConfig} from './bcu-online-feedback.config';
import {bcuOnlineFeedbackHtml} from './bcu-online-feedback.html';

export const bcuOnlineFeedbackModule = angular
    .module('bcuOnlineFeedbackModule', [])
        .factory('ethConfigService', ethConfigService)
        .factory('unigeUseridService', unigeUseridService)
        .factory('bcuOnlineFeedbackConfig', bcuOnlineFeedbackConfig)
        .controller('bcuOnlineFeedbackController', bcuOnlineFeedbackController)
        .component('bcuOnlineFeedback',{
            bindings: {afterCtrl: '<'},
            controller: 'bcuOnlineFeedbackController',
            template: bcuOnlineFeedbackHtml

        })
