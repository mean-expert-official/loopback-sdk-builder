/* tslint:disable */
import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { Orm } from './orm';

export * from './orm';

@NgModule({})
export class OrmModule {
  constructor(@Optional() @SkipSelf() parentModule: OrmModule) {
    if (parentModule) {
      throw new Error(
        'OrmModule.forRoot() called twice. Lazy loaded modules do not need to import OrmModule.',
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OrmModule,
      providers: [ Orm ]
    };
  }
}
