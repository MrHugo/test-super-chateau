import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';

import {
    CarouselComponent
} from './widgets';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HomeComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCMcP7TzZf4RbGhkoGYQpS2zyrT--4Tsd4'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
