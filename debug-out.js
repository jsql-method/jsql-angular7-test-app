import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { Component } from '@angular/core';
import {CasesService} from "./cases.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  results = [];

  constructor(private casesService: CasesService) {

     casesService.init(this);
     casesService[casesService.cases.names['caseName1']]();

  }

  getResults(map){
    return Array.from(map.values());
  }

}

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
import {JsqlService} from "jsql-angular7";
import {Injectable} from "@angular/core";

@Injectable()
export class CasesService {

  cases = {
    fn: {},
    cases: {},
    names: {},
    resultCase: function (reference, status, duration, caseName) {
      reference.results.unshift({
        status: status,
        duration: duration,
        caseName: caseName
      });
    }
  };

  constructor(private jsqlService: JsqlService) {
  }

  init(reference) {

    let self = this;

    self.cases.names['caseName1'] = 'Insert person';
    self[self.cases.names['caseName1']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName1']);
        self[self.cases.names['caseName2']]();

      };
      try {

        self.jsqlService.insert("@sql insert into person (id, name, surname, age) values (nextval('person_id_seq'), :name, :surname, :age)")
          .params({
            name: 'Mirek',
            surname: 'Wo??y??ski',
            age: 38
          })
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName1'], result);
              resultCallback('SUCCESS');
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };


    self.cases.names['caseName2'] = 'Insert car';
    self[self.cases.names['caseName2']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName2']);
        self[self.cases.names['caseName3']]();

      };

      try {

        self.jsqlService.insert("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)")
          .params([19.500, 2000, 'Audi A3'])
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName2'], result);
              resultCallback('SUCCESS');
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };


    self.cases.names['caseName3'] = 'Update persons';
    self[self.cases.names['caseName3']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName3']);
        self[self.cases.names['caseName4']]();

      };

      try {

        self.jsqlService.update("@sql update person set salary = 4000 where age > :age")
          .param('age', 30)
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName3'], result);
              resultCallback('SUCCESS');
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };


    self.cases.names['caseName4'] = 'Update cars';
    self[self.cases.names['caseName4']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName4']);
        self[self.cases.names['caseName5']]();

      };

      try {

        // self.jsqlService.update("update car set created_at = ?")
        //     .params([ new Date().getTime() ])
        self.jsqlService.update("@sql update car set type = ?")
          .params(['osobowy'])
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName4'], result);
              resultCallback('SUCCESS');
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };


    self.cases.names['caseName5'] = 'Select person';
    self[self.cases.names['caseName5']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName5']);
        self[self.cases.names['caseName6']]();

      };

      try {


        self.jsqlService.selectOne("@sql select * from person where age > :ageMin and age < :ageMax limit 1")
          .param('ageMin', 30)
          .param('ageMax', 50)
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName5'], result);

              if (result instanceof Array) {
                resultCallback('FAILED');
              } else {
                resultCallback('SUCCESS');
              }
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );


      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };

    self.cases.names['caseName6'] = 'Select cars';
    self[self.cases.names['caseName6']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName6']);
        self[self.cases.names['caseName7']]();

      };

      try {

        self.jsqlService.select("@sql select id, price from car")
          .observe()
          .subscribe(
            result => {

              console.log(self.cases.names['caseName6'], result);

              if (result instanceof Array) {
                resultCallback('SUCCESS');
              } else {
                resultCallback('FAILED');
              }

            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );


      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };

    self.cases.names['caseName7'] = 'Delete persons';
    self[self.cases.names['caseName7']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName7']);
        self[self.cases.names['caseName8']]();

      };

      try {

        self.jsqlService.remove("@sql delete from person where age > 30")
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName7'], result);
              resultCallback('SUCCESS');
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };

    self.cases.names['caseName8'] = 'Delete cars';
    self[self.cases.names['caseName8']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName8']);
        self[self.cases.names['caseName9']]();

      };

      try {

        self.jsqlService.remove("@sql delete from car where price <> :price")
          .params({
            price: 10.000
          })
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName8'], result);
              resultCallback('SUCCESS');
            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };


    self.cases.names['caseName9'] = 'Transaction insert and rollback';
    self[self.cases.names['caseName9']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName9']);
        self[self.cases.names['caseName10']]();

      };

      try {

        let transaction = self.jsqlService.tx();

        transaction.insert("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)")
          .params([180000, 2018, 'Audi A6'])
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName9'], result);

              transaction.rollback()
                .observe()
                .subscribe(
                  result => {
                    console.log(self.cases.names['caseName9'], result);
                    resultCallback('SUCCESS');
                  });

            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }


    };

    self.cases.names['caseName10'] = 'Transaction insert and commit';
    self[self.cases.names['caseName10']] = function () {

      let start = new Date().getTime();

      let resultCallback = function (status) {
        let end = new Date().getTime();
        let duration = end - start;

        self.cases.resultCase(reference, status, duration, self.cases.names['caseName10']);
        // self[self.cases.names['caseName1']1]();

      };

      try {


        let transaction = self.jsqlService.tx();

        transaction.insert("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)")
          .params([200000, 2019, 'Volkswagen Variant'])
          .observe()
          .subscribe(
            result => {
              console.log(self.cases.names['caseName10'], result);

              transaction.commit().observe();

                // .subscribe(
                //   result => {
                //     console.log(self.cases.names['caseName10'], result);
                //     resultCallback('SUCCESS');
                //   });

            },
            error => {
              console.error(error);
              resultCallback('FAILED');
            }
          );

      } catch (error) {
        console.error(error);
        resultCallback('FAILED');
      }

    };

  }

}
