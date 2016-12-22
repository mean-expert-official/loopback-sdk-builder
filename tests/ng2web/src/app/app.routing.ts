import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const appRoutes: Routes = [
  {
    path: 'access',
    loadChildren: './access/access.module#AccessModule'
  },
  {
    path: '',
    loadChildren: './room/room.module#RoomModule'
  }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
