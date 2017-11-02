import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AuthGuard as NgrxAuthGuard } from './shared/sdk/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'access',
    loadChildren: './access/access.module#AccessModule'
  },
  {
    path: 'access-ngrx',
    loadChildren: './access-ngrx/access-ngrx.module#AccessNgrxModule'
  },
  {
    path: 'ngrx-home',
    loadChildren: './room-ngrx/room-ngrx.module#RoomNgrxModule'
  },
  {
    path: '',
    loadChildren: './room/room.module#RoomModule'
  }
];

export const appRoutingProviders: any[] = [
  AuthGuard, NgrxAuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
