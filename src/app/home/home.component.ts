import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent {
    private listImages: Object[] = [
      { "title": "We are covered", "url": "../../assets/images/first.jpg" },
      { "title": "Generation Gap", "url": "../../assets/images/sec.jpg" },
      { "title": "We are covered", "url": "../../assets/images/first.jpg" },
      { "title": "Generation Gap", "url": "../../assets/images/sec.jpg" },
      { "title": "Potter Me", "url": "../../assets/images/third.jpg" }
  ];
}
