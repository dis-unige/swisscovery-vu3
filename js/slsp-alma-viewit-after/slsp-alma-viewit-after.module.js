import { bcuOnlineFeedbackModule } from './bcu-online-feedback/bcu-online-feedback.module';
import { bcuOffCampusModule } from './bcu-off-campus/bcu-off-campus.module';

export const slspAlmaViewitAfterModule = angular
    .module('slspAlmaViewitAfterModule', [])
    .component('slspAlmaViewitAfter', {
        bindings: { parentCtrl: '<' },
        template: `<bcu-off-campus after-ctrl="$ctrl"></bcu-off-campus>
                   <bcu-online-feedback after-ctrl="$ctrl"></bcu-online-feedback>`
    });

slspAlmaViewitAfterModule.requires.push(bcuOnlineFeedbackModule.name);
slspAlmaViewitAfterModule.requires.push(bcuOffCampusModule.name);