import { Component } from '@angular/core';
import {JsqlService} from "jsql-angular7";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jsql-angular7-test-app';
  test:string = "check";

  constructor(private jsqlService: JsqlService) {
    jsqlService.select("NJiE0YnGZJcXsE1cOnFGKg")
      .rx.subscribe((result: any) => {
      if(result === undefined || result === null) {
        this.test = "error";
        throw Error('JSQL Error');

      } else {
        this.test = "success";
        console.log(result);
      }
    }, (error: any) => {
      this.test = "error";
      throw Error('JSQL Error');
    });
  }
}
