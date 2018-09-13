import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { RoomNgrxListComponent } from './room-ngrx.list.component';
import { RoomNgrxComponent }     from './room-ngrx.component';
import { AuthGuard }             from '../shared/sdk/guards/auth.guard';

const roomNgrxRoutes: Routes = [
  {
    path: '',
    component: RoomNgrxListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'room/:id',
    component: RoomNgrxComponent,
    canActivate: [ AuthGuard ]
  }
];

export const roomNgrxRouting: ModuleWithProviders = RouterModule.forChild(roomNgrxRoutes);
