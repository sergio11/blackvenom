import { SessionActions } from './session.actions';
import { ISession, IUser, UserRecord } from './session.types';
import { SESSION_STATE } from './session.initial-state';
import { IPayloadAction } from '../../app.types';

export function sessionReducer(state: ISession = SESSION_STATE, action: IPayloadAction): ISession {

  switch (action.type) {
    case SessionActions.LOGIN_USER:
      return state.merge({
        token: null,
        user: UserRecord({}),
        hasError: false,
        isLoading: true,
      });
    case SessionActions.LOGIN_USER_SUCCESS:
      return state.merge({
        token: action.payload.token,
        user: UserRecord(action.payload.profile),
        hasError: false,
        isLoading: false,
      });
    case SessionActions.LOGIN_USER_ERROR:
      return state.merge({
        token: null,
        user: UserRecord({}),
        hasError: true,
        isLoading: false,
      });
    case SessionActions.LOGOUT_USER:
      return SESSION_STATE;
    default:
      return state;
  }
}
