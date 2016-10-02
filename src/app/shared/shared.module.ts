import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from '../app.routing';
import { HttpClient } from '../services/httpclient.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  providers: [
    {
      provide: Http,
      useFactory: (
        backend: XHRBackend,
        defaultOptions: RequestOptions
      ) => new HttpClient(backend, defaultOptions),
      deps: [XHRBackend, RequestOptions]
    }
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    Ng2BootstrapModule,
  ]
})
export class SharedModule { }
