import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

enum LoginStatus {
    NO_SUBMITED,
    LOGING,
    LOGIN_FAILED,
    LOGIN_SUCCESS
}

@Component({
  moduleId: module.id,
  selector: 'app-login',
  directives:[AlertComponent],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent{
  public static DISMISS_TIMEOUT: number = 3000;
  public email: string
  public password: string
  private _loginStatus: LoginStatus = LoginStatus.NO_SUBMITED

  public onSubmit(){
    console.log("Email: " + this.email + " Password : " + this.password);
    this._loginStatus = LoginStatus.LOGIN_FAILED;
    setTimeout(() => this._loginStatus = LoginStatus.NO_SUBMITED, LoginComponent.DISMISS_TIMEOUT);
  }

  public isLoginSuccess(){
    return this._loginStatus == LoginStatus.LOGIN_SUCCESS;
  }

  public isLoginFailed(){
    return this._loginStatus == LoginStatus.LOGIN_FAILED;
  }

}
