import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule,
    Ng2BootstrapModule,
  ]
})
export class SharedModule { }
