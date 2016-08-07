import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { SessionActions } from '../../redux/modules';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  directives:[AlertComponent],
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
  public email: string
  public password: string

  constructor(private sessionActions: SessionActions){}

  public onSubmit(){
    this.sessionActions.loginUser({ email: this.email, password: this.password });
    console.log("Email: " + this.email + " Password : " + this.password);
  }

}
