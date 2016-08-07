import { Action } from 'redux';
import { ISession } from './modules'

//App State
export interface IAppState {
  session?: ISession;
};

//Play Load
export interface IPayloadAction extends Action {
  payload?: any;
}
