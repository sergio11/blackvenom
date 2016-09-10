import * as login from './+login';
import { combineReducers } from '@ngrx/store';

 /**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AccountsState {
  session: login.ILoginState;
}

export const accountReducer = combineReducers({
  session: login.loginReducer
});
