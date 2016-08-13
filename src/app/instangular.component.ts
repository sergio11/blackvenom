import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { HeaderComponent } from './components';
import { TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, middleware, enhancers, IAppState, reimmutify } from './redux/'
import { EPICS_PROVIDERS, SessionEpics } from './redux/modules';
import { environment } from './environment';

@Component({
  moduleId: module.id,
  selector: 'instangular-app',
  templateUrl: 'instangular.component.html',
  directives: [AlertComponent, CORE_DIRECTIVES, HeaderComponent],
  styleUrls: ['instangular.component.css'],
  pipes: [TranslatePipe],
  providers: [EPICS_PROVIDERS]
})
export class InstangularAppComponent {

  constructor(
    private devTools: DevToolsExtension,
    private translate: TranslateService,
    private ngRedux: NgRedux<IAppState>,
    private sessionEpic: SessionEpics) {

        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

         // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);

        const enh = (!environment.production && devTools.isEnabled()) ?
        [ ... enhancers, devTools.enhancer({
          deserializeState: reimmutify,
        }) ] :
        enhancers;

        //middleware.push(createEpicMiddleware(this.sessionEpic.login));
        this.ngRedux.configureStore(rootReducer, {}, middleware, enhancers);

    }
}
