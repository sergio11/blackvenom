import { Injectable } from '@angular/core';
import { SessionEpics } from './modules/session';
import { combineEpics } from 'redux-observable';

@Injectable()
export class RootEpics {

  constructor(private sessionEpic: SessionEpics) {}

  combineEpics(): any{
    return combineEpics(
      this.sessionEpic.login
    );
  }

}
