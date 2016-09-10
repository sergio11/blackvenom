import { Component, OpaqueToken, Inject } from '@angular/core';
import IAppState from './app.state';
import { mergeEffects } from '@ngrx/effects';

const EFFECTS = new OpaqueToken('Effects');

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(@Inject(EFFECTS) effects: any[], private store: Store<IAppState>){
     mergeEffects(effects).subscribe(store);
  }

}
