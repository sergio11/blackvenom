import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import ILoginState from 'login.state';

export function isLoading(){
  return (state$: Observable<ILoginState>) => state$
  .select(s => s.isLoading);
}
