import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ILoginState } from './login.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.state';

@Injectable()
export class SessionSelectors {

  constructor(private store: Store<IAppState>){}

  public isLoading$(): Observable<boolean> {
    return this.store.select(state => state.accounts.session.isLoading);
  }

  public hasError$(): Observable<boolean> {
    return this.store.select(state => state.accounts.session.hasError);
  }

  public isExpired$(): Observable<boolean> {
    return this.store.select(state => state.accounts.session.isExpired);
  }

}
