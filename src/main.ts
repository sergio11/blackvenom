import { bootstrap } from '@angular/platform-browser-dynamic';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { InstangularAppComponent, environment, APP_ROUTES } from './app/';
import { FaComponent } from 'angular2-fontawesome/components';
import {ROUTER_DIRECTIVES,provideRouter} from '@angular/router';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { ACTION_PROVIDERS } from './app/modules';

enableProdMode();

bootstrap(InstangularAppComponent, [
  NgRedux,
  ACTION_PROVIDERS,
  HTTP_PROVIDERS,
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
