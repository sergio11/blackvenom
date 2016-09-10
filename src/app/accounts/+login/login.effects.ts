import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Http } from '@angular/http';
import ILoginState from 'login.state';
import LoginActions from 'login.actions';
import ICredentials from 'login.types';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class SessionEffects {

  public static SIGNIN_ENDPOINT: string = "/api/accounts/signin";

  constructor(
    private updates$: StateUpdates<ILoginState>,
    private sessionActions: LoginActions,
    private http: Http
  ) { }

  @Effect() signin$ = this.updates$
    .whenAction(LoginActions.SIGNIN)
    .map<ICredentials>(toPayload)
    .flatMap(credentials => {
      return this.http.post(SessionEffects.SIGNIN_ENDPOINT, credentials)
      .map(result => ({
        type: LoginActions.SIGNIN_SUCCESS,
        payload: result.json().meta
      }))
      .catch(error => {
        return Observable.of({
          type: LoginActions.SIGNIN_ERROR
        });
      });
    });
  }

}
