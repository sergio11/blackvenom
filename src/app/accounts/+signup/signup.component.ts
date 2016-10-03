import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ISignupRequest } from './signup.types';
import { SignupActions } from './signup.actions';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public email: FormControl;
  public fullname: FormControl;
  public username: FormControl;
  public password: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private signupActions: SignupActions
  ) {}

  ngOnInit() {
    this.email = new FormControl("", Validators.required);
    this.fullname = new FormControl("", Validators.required);
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.form = this.formBuilder.group({
      "email": this.email,
      "fullname": this.fullname,
      "username": this.username,
      "password": this.password
    });
  }

  public onSubmit(){
    const user: ISignupRequest = {
      fullname: this.fullname.value,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value
    }
    this.signupActions.signup(user);
  }

}
