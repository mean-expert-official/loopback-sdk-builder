import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2AppComponent } from '../app/angular2.component';

beforeEachProviders(() => [Angular2AppComponent]);

describe('App: Angular2', () => {
  it('should create the app',
      inject([Angular2AppComponent], (app: Angular2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2 works!\'',
      inject([Angular2AppComponent], (app: Angular2AppComponent) => {
    expect(app.title).toEqual('angular2 works!');
  }));
});
