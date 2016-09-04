import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { SessionActions } from '../../redux/modules';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  directives:[ AlertComponent, REACTIVE_FORM_DIRECTIVES ],
  pipes: [ AsyncPipe ],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent{

  @select(['session', 'hasError']) hasError$: Observable<boolean>;
  @select(['session', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['session', 'user', 'firstName']) firstName$: Observable<string>;
  @select(['session', 'user', 'lastName']) lastName$: Observable<string>;
  @select(s => !!s.session.token) loggedIn$: Observable<boolean>;
  @select(s => !s.session.token) loggedOut$: Observable<boolean>;

  private email: FormControl;
  private password: FormControl;
  private group: FormGroup;

  constructor(private sessionActions: SessionActions, private builder: FormBuilder){
      this.email = new FormControl('', Validators.required);
      this.password = new FormControl('', Validators.required);
      this.group = this.builder.group({
        email: this.email,
        password: this.password
      });
  }

  public onSubmit(){
    this.password.markAsTouched();
    this.email.markAsTouched();
    if (this.password.value && this.email.value) {
      this.sessionActions.loginUser({ email: this.email.value, password: this.password.value});
      console.log("Email: " + this.email + " Password : " + this.password);
    }
  }

  public showEmailWarning() {
    return this.email.touched
      && !this.email.valid;
  }

  public showPasswordWarning() {
    return this.password.touched
      && !this.password.valid
      && this.password.hasError('required');
  }

}
