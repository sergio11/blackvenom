import { Action } from 'redux';

//App State
export interface IAppState {
  session?: session.ISession;
};

//Play Load
export interface IPayloadAction extends Action {
  payload?: any;
}
