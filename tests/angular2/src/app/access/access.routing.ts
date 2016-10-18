import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AccessComponent }       from './access.component';

const accessRoutes: Routes = [
  {
    path: '',
    component: AccessComponent
  }
];

export const accessRouting: ModuleWithProviders = RouterModule.forChild(accessRoutes);
