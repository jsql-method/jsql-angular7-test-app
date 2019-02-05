import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {JsqlModule} from "jsql-angular7";
import {JsqlConfig} from "jsql-angular7/src/modules/jsql.module";

const jsqlConfig: JsqlConfig = {
  host: 'http://localhost:18088'
} as JsqlConfig;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsqlModule.forRoot(jsqlConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
