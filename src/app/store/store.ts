import { combineReducers } from 'redux';
import * as session from '../modules/session'

export interface IAppState {
  session?: session.ISession;
};

export const rootReducer = combineReducers<IAppState>({
  session: session.sessionReducer
});

export function deimmutify(store) {
  return {
    session: session.deimmutifySession(store.session),
  };
}

export function reimmutify(plain) {
  return {
    session: session.reimmutifySession(plain.session),
  };
}
