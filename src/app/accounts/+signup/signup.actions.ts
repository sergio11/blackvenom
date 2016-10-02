import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISignupRequest } from './signup.types';
import { IAppState } from '../../app.state';
/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class SignupActions {

  constructor(private store: Store<IAppState>){}

  static SIGNUP = "[SIGNUP] signup user";
  static SIGNUP_SUCCESS = "[SIGNUP] signup user success";
  static SIGNUP_ERROR = "[SIGNUP] signup user error";
  public signup(user: ISignupRequest){
    this.store.dispatch({
      type: SignupActions.SIGNUP,
      payload: user
    });
  }
}
