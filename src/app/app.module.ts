<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
=======
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { CommonModule } from '@angular/common'
import { routing } from './app.routing';

import { AppComponent }  from './app.component';
>>>>>>> 3857a8835fcc2d6040283b59137f5e0e2bb30418

import {
    CarouselComponent
} from './widgets';

<<<<<<< HEAD
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
=======
import {
    HomeComponent
} from './home';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        TranslateModule.forRoot(),
        routing
    ],
    declarations: [
        AppComponent,
        CarouselComponent,
        HomeComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

>>>>>>> 3857a8835fcc2d6040283b59137f5e0e2bb30418
export class AppModule { }
