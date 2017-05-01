import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AccessNgrxComponent }   from './access-ngrx.component';

const accessNgrxRoutes: Routes = [
  {
    path: '',
    component: AccessNgrxComponent
  }
];

export const accessNgrxRouting: ModuleWithProviders = RouterModule.forChild(accessNgrxRoutes);
