import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ILoginState } from './login.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.state';

@Injectable()
export class SessionSelectors {

  constructor(private store: Store<any>){}

  private getSessionState$(state$: Observable<IAppState>): Observable<ILoginState>{
    return state$.select(s => s.accounts.session);
  }

  public isLoading$(): Observable<boolean> {
    return this.store.let(this.getSessionState$).let((state$: Observable<ILoginState>): Observable<boolean> => state$.select(s => s.isLoading));
  }

  public hasError$(): Observable<boolean> {
      return this.store.let(this.getSessionState$).let((state$: Observable<ILoginState>): Observable<boolean> => state$.select(s => s.hasError));
  }
}
