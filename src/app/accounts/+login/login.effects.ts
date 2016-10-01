import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ILoginState } from './login.state';
import { LoginActions } from './login.actions';
import { ICredentials } from './login.types';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { environment } from '../../environment';

@Injectable()
export class SessionEffects {

  private options: RequestOptions;
  constructor(
     private actions$: Actions,
     private sessionActions: LoginActions,
     private http: Http
   ) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     this.options = new RequestOptions({ headers: headers });
   }

  @Effect() signin$ = this.actions$
    .ofType(LoginActions.SIGNIN)
    .map<ICredentials>(a => a.payload)
    .map<string>(credentials => JSON.stringify(credentials))
    .switchMap(credentials => this.http.post(`${environment.baseURL}accounts/signin`, credentials, this.options)
       // If successful, dispatch success action with result
      .map(res => ({ type: LoginActions.SIGNIN_SUCCESS, payload: res.json() }))
      // If request fails, dispatch failed action
      .catch(res => {
        console.log(res.json);
        return Observable.of({ type: LoginActions.SIGNIN_ERROR });
      })
    );
}
