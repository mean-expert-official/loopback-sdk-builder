import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './+access/access.component';
import { RoomComponent } from './+room/room.component';
import { AuthGuard } from './shared/auth.guard';

const appRoutes: Routes = [
  { path: 'access', component: AccessComponent },
  { path: 'room', component: RoomComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: RoomComponent, canActivate: [ AuthGuard ] }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
