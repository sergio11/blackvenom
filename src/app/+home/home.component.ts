import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  directives:[ROUTER_DIRECTIVES],
  styleUrls: ['home.component.css'],
  pipes: [TranslatePipe]
})
export class HomeComponent implements OnInit {

  param: String = "Sergio";

  constructor() {}

  ngOnInit() {
  }

}
