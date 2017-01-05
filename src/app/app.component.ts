import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>'
})

export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
