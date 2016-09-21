import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent{

  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;

  constructor(formBuilder: FormBuilder){
    this.email = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.form = formBuilder.group({
      "email": this.email,
      "password": this.password
    });
  }

}
