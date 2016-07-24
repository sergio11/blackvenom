import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { persistState } from 'redux-localstorage';
import * as session from './modules/session'
export * from './app.types';

//root reducer
export const rootReducer = combineReducers<IAppState>({
  session: session.sessionReducer
});
//root epic
export const rootEpic = combineEpics(
  session.SessionEpics
);

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

export let enhancers = [
  persistState(
    '',
    {
      key: 'angular2-redux-seed',
      serialize: store => JSON.stringify(deimmutify(store)),
      deserialize: state => reimmutify(JSON.parse(state)),
    })
];
