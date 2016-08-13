import { combineReducers } from 'redux';
import * as session from './modules/session';
import { IAppState } from './app.types';
export * from './app.types';
export * from './root.epics';

//root reducer
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

export let middleware = [];

export let enhancers = [];
