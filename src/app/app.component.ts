import { Component } from '@angular/core';
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
=======
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
>>>>>>> 3857a8835fcc2d6040283b59137f5e0e2bb30418
}
