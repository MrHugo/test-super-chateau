import { Component, Input } from '@angular/core';

// Compoent Decorator
@Component({
  //Name of our tag
  selector: 'carousel',
  //Template for the tag
  templateUrl: './carousel.component.html',
  //Styles for the tag
  styleUrls: ['./carousel.component.scss']
})
//Carousel Component itself
export class CarouselComponent {
    //images data to be bound to the template
  @Input() images: Object[] = null;
}
