import { Action } from '@ngrx/store';
import { initialState, ILoginState } from './login.state';
import LoginActions from 'login.actions';

export function loginReducer(state: ILoginState = initialState, action: Action): ILoginState {

  switch (action.type) {
    case LoginActions.SIGNIN:
      return state.merge({
        token: null,
        user: {},
        hasError: false,
        isLoading: true,
      });
    case LoginActions.SIGNIN_SUCCESS:
      return state.merge({
        token: action.payload.token,
        //user: UserRecord(action.payload.profile),
        user: {},
        hasError: false,
        isLoading: false,
      });
    case LoginActions.SIGNIN_ERROR:
      return state.merge({
        token: null,
        user: {},
        hasError: true,
        isLoading: false,
      });
    case LoginActions.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
