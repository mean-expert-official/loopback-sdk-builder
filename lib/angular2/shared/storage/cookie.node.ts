declare var Zone: any;
import { Injectable } from '@angular/core';

@Injectable()
export class CookieNode {

  get(key: string) {
    let cookies: { [key: string]: number } = Zone.current.get('req').cookies;
    return cookies[key];
  }

  set(key: string, value: any): any {
    Zone.current.get('res').cookies(key, value).send('Cookie is set');
  }
  // Will this be really needed?
  remove(key: string, value: any): any {
    Zone.current.get('res').cookies(key, '; expires=Thu, 01 Jan 1970 00:00:01 GMT;').send('Cookie is removed');
  }
}
