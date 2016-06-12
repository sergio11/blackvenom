import { Component, OnInit } from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  pipes: [TranslatePipe]
})
export class HomeComponent implements OnInit {

  param: String = "Sergio";

  constructor() {}

  ngOnInit() {
  }

}
