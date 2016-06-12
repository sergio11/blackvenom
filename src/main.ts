import { bootstrap } from '@angular/platform-browser-dynamic';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode, provide } from '@angular/core';
import { InstangularAppComponent, environment } from './app/';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

enableProdMode();

bootstrap(InstangularAppComponent, [
  HTTP_PROVIDERS,
  provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
    TranslateService,
    ROUTER_PROVIDERS
]);
