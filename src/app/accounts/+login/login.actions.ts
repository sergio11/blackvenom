import { Injectable } from '@angular/core';
import { ICredentials } from './login.types';
import { Store } from '@ngrx/store';
/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class LoginActions {

  constructor(private store: Store<any>){}

  static SIGNIN = "[SESSION] Signin user";
  public signin(credentials: ICredentials){
    this.store.dispatch({
      type: LoginActions.SIGNIN,
      payload: credentials
    });
  }

  static SIGNIN_SUCCESS = "[SESSION] Signin user success";
  static SIGNIN_ERROR = "[SESSION] Signin user error";
  static LOGOUT_USER = "[SESSION] Logout user";
  public logoutUser() {
    this.store.dispatch({ type: LoginActions.LOGOUT_USER });
  };

  static SESSION_EXPIRED = "[SESSION] Session expired";
  public sessionExpired(){
    this.store.dispatch({ type: LoginActions.SESSION_EXPIRED });
  }
}
