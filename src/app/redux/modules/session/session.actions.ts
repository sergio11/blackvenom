import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../app.types';

@Injectable()
export class SessionActions {

  static LOGIN_USER = 'LOGIN_USER';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static LOGOUT_USER = 'LOGOUT_USER';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  public loginUser(credentials: any) {
    this.ngRedux.dispatch({
      type: SessionActions.LOGIN_USER,
      payload: credentials,
    });
  };

  public logoutUser() {
    this.ngRedux.dispatch({ type: SessionActions.LOGOUT_USER });
  };
}
