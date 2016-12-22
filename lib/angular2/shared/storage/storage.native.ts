/* tslint:disable */
import * as AppSettings from 'application-settings';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageNative {
  set(key: string, value: any) {
    AppSettings.setString(
      key,
      String(typeof value === 'object' ? JSON.stringify(value) : value)
    );
  }
  get(key: string): any {
    let data: string = AppSettings.getString(key);
    return this.isJSON(data) ? JSON.parse(data) : data;
  }
  remove(key: string): any {
    if (AppSettings.hasKey(key)) {
      AppSettings.remove(key);
    } else {
      console.log('Trying to remove unexisting key: ', key);
    }
  }
  private isJSON(data: string) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
}
