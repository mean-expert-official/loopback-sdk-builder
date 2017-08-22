/* tslint:disable */
import {
  NgModule,
  ModuleWithProviders,
  Inject,
  Optional,
  OpaqueToken,
  SkipSelf
} from '@angular/core';
import { Orm } from './orm';

export * from './orm';

export const ORM_FORROOT_GUARD = new OpaqueToken('ORM_FORROOT_GUARD');
export function provideForRootGuard(orm: Orm): any {
  if (orm) {
    throw new Error(
      `OrmModule.forRoot() called twice. Lazy loaded modules should use OrmModule.forChild() instead.`);
  }

  return 'guarded';
}

@NgModule({})
export class OrmModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OrmModule,
      providers: [
        {
          provide: ORM_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[Orm, new Optional(), new SkipSelf()]]
        },
        Orm
      ]
    };
  }

  constructor(@Optional() @Inject(ORM_FORROOT_GUARD) guard: any) {}
}
