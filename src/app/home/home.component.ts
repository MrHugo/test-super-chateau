import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
<<<<<<< HEAD
    private lat: number = 48.854;
    private lng: number = 2.2688;

=======
>>>>>>> 3857a8835fcc2d6040283b59137f5e0e2bb30418
    private listImages: Object[] = [
      { "title": "Une image...", "url": "../../assets/images/first.jpg" },
      { "title": "Hop une ptite deuxième", "url": "../../assets/images/sec.jpg" },
      { "title": "Encore la première...", "url": "../../assets/images/first.jpg" },
      { "title": "La deuxième", "url": "../../assets/images/sec.jpg" },
      { "title": "Et la dernière !", "url": "../../assets/images/third.jpg" }
    ];
}
