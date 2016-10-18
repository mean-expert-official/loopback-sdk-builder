import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { RoomComponent }         from './room.component';
import { AuthGuard }             from '../shared/auth.guard';

const roomRoutes: Routes = [
  {
    path: '',
    component: RoomComponent,
    canActivate: [ AuthGuard ]
  }
];

export const roomRouting: ModuleWithProviders = RouterModule.forChild(roomRoutes);
