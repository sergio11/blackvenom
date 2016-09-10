import { combineReducers } from '@ngrx/store';
import { accountReducer } from './accounts/'

export const appReducer = combineReducers({
  accounts: accountReducer
});
