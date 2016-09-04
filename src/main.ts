import { bootstrap } from '@angular/platform-browser-dynamic';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { InstangularAppComponent, environment, APP_ROUTES } from './app/';
import { FaComponent } from 'angular2-fontawesome/components';
import { ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { DevToolsExtension, NgRedux } from 'ng2-redux';
import { ACTION_PROVIDERS } from './app/redux/modules';

if (!environment.production) {
  enableProdMode();
} else {
  //import 'zone.js/dist/long-stack-trace-zone.min';
}

bootstrap(InstangularAppComponent, [
  DevToolsExtension,
  NgRedux,
  HTTP_PROVIDERS,
  ACTION_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: FaComponent, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true }),
  provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
  }),
  // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
  TranslateService,
  provideRouter(APP_ROUTES),
  disableDeprecatedForms(),
  provideForms()
]);
