import { Action } from '@ngrx/store';
import { initialState, ILoginState } from './login.state';
import { LoginActions } from './login.actions';

export function loginReducer(state: ILoginState = initialState, action: Action): ILoginState {

  switch (action.type) {
    case LoginActions.SIGNIN:
      return (<any>Object).assign(state, {
        token: null,
        user: {},
        hasError: false,
        isLoading: true,
        isExpired: false
      });
    case LoginActions.SIGNIN_SUCCESS:
      return (<any>Object).assign(state, {
        token: action.payload.token,
        //user: UserRecord(action.payload.profile),
        user: {},
        hasError: false,
        isLoading: false,
        isExpired: false
      });
    case LoginActions.SIGNIN_ERROR:
      return (<any>Object).assign(state, {
        token: null,
        user: {},
        hasError: true,
        isLoading: false,
        isExpired: false
      });
    case LoginActions.LOGOUT_USER:
      return initialState;
    case LoginActions.SESSION_EXPIRED:
      return (<any>Object).assign(state, {
        token: null,
        user: {},
        hasError: false,
        isLoading: false,
        isExpired: true
      });
    default:
      return state;
  }
}
