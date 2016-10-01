import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { ILoginState } from './login.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class SessionSelectors {

  constructor(private store: Store<any>){}

  public isLoading$(): Observable<boolean> {
    return this.store.select(s => s.accounts.session.isLoading);
  }

  public hasError$(): Observable<boolean> {
      return this.store.select(s => s.accounts.session.hasError);
  }
}
