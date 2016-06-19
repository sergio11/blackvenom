import { bootstrap } from '@angular/platform-browser-dynamic';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { InstangularAppComponent, environment } from './app/';
import { FaComponent } from 'angular2-fontawesome/components'
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

enableProdMode();

bootstrap(InstangularAppComponent, [
  HTTP_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: FaComponent, multi: true }),
  provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
    TranslateService
]);
