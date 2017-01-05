import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    private listImages: Object[] = [
      { "title": "Une image...", "url": "../../assets/images/first.jpg" },
      { "title": "Hop une ptite deuxième", "url": "../../assets/images/sec.jpg" },
      { "title": "Encore la première...", "url": "../../assets/images/first.jpg" },
      { "title": "La deuxième", "url": "../../assets/images/sec.jpg" },
      { "title": "Et la dernière !", "url": "../../assets/images/third.jpg" }
    ];
}
