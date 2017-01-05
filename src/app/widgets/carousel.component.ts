import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CarouselComponent {
  @Input() images: Object[] = null;
}
