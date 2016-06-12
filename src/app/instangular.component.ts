import { Component } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { HomeComponent } from './+home';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import {HeaderComponent} from './header';
import { TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';


@Component({
  moduleId: module.id,
  selector: 'instangular-app',
  templateUrl: 'instangular.component.html',
  directives: [AlertComponent, CORE_DIRECTIVES, ROUTER_DIRECTIVES, HeaderComponent],
  styleUrls: ['instangular.component.css'],
  pipes: [TranslatePipe]
})
@RouteConfig([
  {path: '/home', name: 'Home' , component: HomeComponent},
  {path: '/**', redirectTo:['Home']}
])
export class InstangularAppComponent {
  constructor(private translate: TranslateService) {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

         // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}
