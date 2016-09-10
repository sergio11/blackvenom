import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

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
  static SIGNIN = "[SESSION] Signin user";
  public signin(credentials: any): Action {
    return {
      type: LoginActions.SIGNIN,
      payload: credentials
    };
  }

  static SIGNIN_SUCCESS = "[SESSION] Signin user success";
  static SIGNIN_ERROR = "[SESSION] Signin user error";
  static LOGOUT_USER = "[SESSION] Logout user";
  public logoutUser() {
    return { type: LoginActions.LOGOUT_USER };
  };
}
