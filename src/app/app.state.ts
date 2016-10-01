import { AccountsState, accountsInitialState } from './accounts/';

export interface IAppState {
  accounts: AccountsState;
}

export const appInitialState: IAppState = {
  accounts: accountsInitialState
}
