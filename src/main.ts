import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { InstangularAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(InstangularAppComponent);

