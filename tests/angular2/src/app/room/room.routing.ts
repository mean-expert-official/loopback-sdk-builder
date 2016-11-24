import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { RoomListComponent }     from './room.list.component';
import { RoomComponent }         from './room.component';
import { AuthGuard }             from '../shared/auth.guard';

const roomRoutes: Routes = [
  {
    path: '',
    component: RoomListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    canActivate: [ AuthGuard ]
  }
];

export const roomRouting: ModuleWithProviders = RouterModule.forChild(roomRoutes);
