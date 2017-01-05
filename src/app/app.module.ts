import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { CommonModule } from '@angular/common'
import { routing } from './app.routing';

import { AppComponent }  from './app.component';

import {
    CarouselComponent
} from './widgets';

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

export class AppModule { }
