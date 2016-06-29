import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angular2AppComponent, environment } from './app/';
import { API_PROVIDERS } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2AppComponent, [...API_PROVIDERS]);
