import { bcuOnlineFeedbackModule } from './bcu-online-feedback/bcu-online-feedback.module';

export const slspAlmaViewitAfterModule = angular
    .module('slspAlmaViewitAfterModule', [])
    .component('slspAlmaViewitAfter', {
        bindings: { parentCtrl: '<' },
        template: `<bcu-online-feedback after-ctrl="$ctrl"></bcu-online-feedback>`
    });

slspAlmaViewitAfterModule.requires.push(bcuOnlineFeedbackModule.name);