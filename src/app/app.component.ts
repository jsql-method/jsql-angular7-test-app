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

