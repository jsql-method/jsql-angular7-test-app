import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {JsqlModule} from "jsql-angular7";
import {JsqlConfig} from "jsql-angular7/src/modules/jsql.module";
import {environment} from "../environments/environment";
import {CasesService} from "./cases.service";

const jsqlConfig: JsqlConfig = {
  host: environment.host,
  apiKey: environment.apiKey,
  devKey: environment.devKey
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
  providers: [CasesService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
