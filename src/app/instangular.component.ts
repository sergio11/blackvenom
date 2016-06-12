import { Component } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'instangular-app',
  templateUrl: 'instangular.component.html',
  directives: [AlertComponent, CORE_DIRECTIVES],
  styleUrls: ['instangular.component.css']
})
export class InstangularAppComponent {
  public alerts:Array<Object> = [
    {
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.'
    },
    {
      type: 'success',
      msg: 'Well done! You successfully read this important alert message.',
      closable: true
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

  public addAlert():void {
    this.alerts.push({msg: 'Another alert!', type: 'warning', closable: true});
  }
}
