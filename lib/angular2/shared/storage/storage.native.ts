/* tslint:disable */
import * as AppSettings from 'application-settings';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageNative {
  set(key: string, value: any) {
    AppSettings.setString(key, String(value));
  }
  get(key: string): any {
    return AppSettings.getString(key);
  }
  remove(key: string): any {
    if (AppSettings.hasKey(key)) {
      AppSettings.remove(key);
    } else {
      console.log('Trying to remove unexisting key: ', key);
    }
  }
}
