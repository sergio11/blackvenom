import { Component } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {HeaderComponent} from './components';
import { TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { NgRedux, select } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';
import {rootReducer, RootEpics, middleware, enhancers} from './redux/'

@Component({
  moduleId: module.id,
  selector: 'instangular-app',
  templateUrl: 'instangular.component.html',
  directives: [AlertComponent, CORE_DIRECTIVES, HeaderComponent],
  styleUrls: ['instangular.component.css'],
  pipes: [TranslatePipe]
})
export class InstangularAppComponent {

  constructor(
    private translate: TranslateService,
    private ngRedux: NgRedux<IAppState>,
    private rootEpic: RootEpics) {

        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

         // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);

        middleware.push(createEpicMiddleware(this.rootEpic.combineEpics));
        ngRedux.configureStore(rootReducer, {}, middleware, enhancers);

    }
}
