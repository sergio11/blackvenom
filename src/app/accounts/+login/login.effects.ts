import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Http } from '@angular/http';
import { ILoginState } from './login.state';
import { LoginActions } from './login.actions';
import { ICredentials } from './login.types';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class SessionEffects {

  public static SIGNIN_ENDPOINT: string = "/api/accounts/signin";

   constructor(
     private actions$: Actions,
     private sessionActions: LoginActions,
     private http: Http
   ) { }

  @Effect() signin$ = this.actions$
    .ofType(LoginActions.SIGNIN)
    .map<ICredentials>(a => a.payload)
    .switchMap(credentials => this.http.post(SessionEffects.SIGNIN_ENDPOINT, credentials)
       // If successful, dispatch success action with result
      .map(res => ({ type: LoginActions.SIGNIN_SUCCESS, payload: res.json() }))
      // If request fails, dispatch failed action
      .catch(() => Observable.of({ type: LoginActions.SIGNIN_ERROR }))
    );
}
